import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// Constants
const ROOT = new URL('../', import.meta.url);
const MANIFEST = JSON.parse(readFileSync(new URL('manifest.json', ROOT), 'utf8'));
const CHANGELOG = readFileSync(new URL('CHANGELOG.md', ROOT), 'utf8').replace(/\r\n/g, '\n');
const UNRELEASED = 'Unreleased';
const LANGUAGES = ['### English', '### Deutsch'];

// Helpers
function changelogHeadings(changelog) {
  return changelog
    .split('\n')
    .map((line) => line.match(/^## \[([^\]]+)\]/)?.[1])
    .filter(Boolean);
}

function newestChangelogVersion(changelog) {
  return changelogHeadings(changelog).find((name) => name !== UNRELEASED);
}

function changelogSection(changelog, version) {
  const heading = `## [${version}]`;
  const start = changelog.indexOf(heading);
  if (start === -1) return undefined;
  const rest = changelog.slice(start + heading.length);
  const end = rest.indexOf('\n## [');
  return (end === -1 ? rest : rest.slice(0, end)).trim();
}

function assertBothLanguages(name, section) {
  for (const language of LANGUAGES) {
    assert.ok(section.includes(language), `the section [${name}] in CHANGELOG.md has no "${language}" part`);
  }
}

// Changelog
test('newest changelog section has the manifest version', () => {
  assert.equal(newestChangelogVersion(CHANGELOG), MANIFEST.version);
  const section = changelogSection(CHANGELOG, MANIFEST.version);
  assertBothLanguages(MANIFEST.version, section);
  assert.ok(
    section.split('\n').some((line) => line.startsWith('- ')),
    `the section [${MANIFEST.version}] in CHANGELOG.md lists no changes`,
  );
});

test('every released changelog section has both languages', () => {
  for (const name of changelogHeadings(CHANGELOG).filter((name) => name !== UNRELEASED)) {
    assertBothLanguages(name, changelogSection(CHANGELOG, name));
  }
});

test('changelog keeps unreleased on top', () => {
  const position = changelogHeadings(CHANGELOG).indexOf(UNRELEASED);
  assert.ok(position <= 0, `[${UNRELEASED}] must be the first section of CHANGELOG.md`);
  const section = changelogSection(CHANGELOG, UNRELEASED) ?? '';
  if (section) assertBothLanguages(UNRELEASED, section);
});

// Helpers tests
test('helpers read versions and sections', () => {
  const changelog = '# Changelog\n\n## [1.2.3] – 2026-01-01\n\ntext\n\n## [1.2.2] – 2025-12-01\n\nold\n';
  const withUnreleased = '# Changelog\n\n## [Unreleased]\n\nnew\n\n## [1.2.3] – 2026-01-01\n';

  assert.equal(newestChangelogVersion(changelog), '1.2.3');
  assert.equal(newestChangelogVersion(withUnreleased), '1.2.3');
  assert.equal(newestChangelogVersion('# Changelog\n\n## [Unreleased]\n'), undefined);
  assert.equal(changelogSection(withUnreleased, UNRELEASED), 'new');
  assert.equal(changelogSection(changelog, '1.2.3'), '– 2026-01-01\n\ntext');
  assert.equal(changelogSection(changelog, '0.9.0'), undefined);
});

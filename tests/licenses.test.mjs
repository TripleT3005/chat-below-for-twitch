import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// Constants
const ROOT = new URL('../', import.meta.url);
const LOCKFILE = JSON.parse(readFileSync(new URL('package-lock.json', ROOT), 'utf8'));
const ALLOWED_LICENSES = new Set([
  'MIT',
  'ISC',
  'Apache-2.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  '0BSD',
  'BlueOak-1.0.0',
  'CC0-1.0',
  'Unlicense',
  'Zlib',
]);

// Helpers
function tokenize(expression) {
  return expression.match(/\(|\)|[^\s()]+/g) ?? [];
}

function isAllowed(expression) {
  const tokens = tokenize(expression);
  let position = 0;

  function parseOr() {
    let allowed = parseAnd();
    while (tokens[position] === 'OR') {
      position += 1;
      allowed = parseAnd() || allowed;
    }
    return allowed;
  }

  function parseAnd() {
    let allowed = parseAtom();
    while (tokens[position] === 'AND') {
      position += 1;
      allowed = parseAtom() && allowed;
    }
    return allowed;
  }

  function parseAtom() {
    const token = tokens[position];
    position += 1;
    if (token === '(') {
      const allowed = parseOr();
      if (tokens[position] !== ')') throw new Error(`Unbalanced license expression: ${expression}`);
      position += 1;
      return allowed;
    }
    if (token === undefined || token === ')') throw new Error(`Incomplete license expression: ${expression}`);
    return ALLOWED_LICENSES.has(token);
  }

  const allowed = parseOr();
  if (position !== tokens.length) throw new Error(`Unexpected token in license expression: ${expression}`);
  return allowed;
}

function shippedPackages(lockfile) {
  return Object.entries(lockfile.packages)
    .filter(([path, entry]) => path !== '' && !entry.dev)
    .map(([path, entry]) => ({ name: path.replace(/^.*node_modules\//, ''), license: entry.license }));
}

// License expressions
test('accepts permissive licenses and allowed alternatives', () => {
  assert.equal(isAllowed('MIT'), true);
  assert.equal(isAllowed('(MIT OR Apache-2.0)'), true);
  assert.equal(isAllowed('MIT OR GPL-3.0-only'), true);
  assert.equal(isAllowed('(MIT OR Apache-2.0) AND BSD-3-Clause'), true);
});

test('rejects copyleft licenses without an allowed alternative', () => {
  assert.equal(isAllowed('AGPL-3.0-only'), false);
  assert.equal(isAllowed('GPL-2.0-or-later'), false);
  assert.equal(isAllowed('MIT AND GPL-3.0-only'), false);
});

test('rejects malformed expressions', () => {
  assert.throws(() => isAllowed('(MIT OR Apache-2.0'));
  assert.throws(() => isAllowed(''));
});

// Dependencies
test('every shipped dependency has an allowed license', () => {
  const rejected = shippedPackages(LOCKFILE).filter(({ license }) => !license || !isAllowed(license));
  assert.deepEqual(
    rejected.map(({ name, license }) => `${name}: ${license ?? 'no license'}`),
    [],
    'The extension ships these dependencies, but their licenses are not on the allow list',
  );
});

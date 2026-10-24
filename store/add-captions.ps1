param(
    [string]$SourceDir = (Join-Path $PSScriptRoot 'raw'),
    [string]$OutputDir = (Join-Path $PSScriptRoot '..\screenshots')
)

# Data
$dash = [char]0x2013
$items = @(
    @{ File = '01-chat-below.png'; Caption = "Twitch chat below the video $dash made for side-by-side windows" },
    @{ File = '02-without-extension.png'; Caption = 'Without the extension: chat next to the video' },
    @{ File = '03-resize-divider.png'; Caption = "Drag the divider to resize $dash header bar transparent via right-click" },
    @{ File = '04-narrow-window.png'; Caption = 'Narrow window: header bar and sidebar hidden for maximum space' },
    @{ File = '05-compact-chat.png'; Caption = 'Shrink the chat down to its header row' }
)

# Layout
Add-Type -AssemblyName System.Drawing
$width = 1280
$height = 800
$captionHeight = 84
$margin = 24
$boxWidth = 1100
$boxHeight = $height - $captionHeight - $margin

New-Item -ItemType Directory -Force $OutputDir | Out-Null

foreach ($item in $items) {
    $shot = [System.Drawing.Image]::FromFile((Join-Path $SourceDir $item.File))
    $scale = [Math]::Min($boxWidth / $shot.Width, $boxHeight / $shot.Height)
    $shotWidth = [int]($shot.Width * $scale)
    $shotHeight = [int]($shot.Height * $scale)
    $shotX = [int](($width - $shotWidth) / 2)
    $shotY = [int]($captionHeight + ($boxHeight - $shotHeight) / 2)

    $canvas = [System.Drawing.Bitmap]::new($width, $height, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g = [System.Drawing.Graphics]::FromImage($canvas)
    $g.SmoothingMode = 'AntiAlias'
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.TextRenderingHint = 'AntiAliasGridFit'

    $background = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
        [System.Drawing.Point]::new(0, 0), [System.Drawing.Point]::new(0, $height),
        [System.Drawing.Color]::FromArgb(0x2B, 0x22, 0x5E), [System.Drawing.Color]::FromArgb(0x12, 0x12, 0x16))
    $g.FillRectangle($background, 0, 0, $width, $height)

    $font = [System.Drawing.Font]::new('Segoe UI Semibold', 26)
    $format = [System.Drawing.StringFormat]::new()
    $format.Alignment = 'Center'
    $format.LineAlignment = 'Center'
    $g.DrawString($item.Caption, $font, [System.Drawing.Brushes]::White, [System.Drawing.RectangleF]::new(0, 0, $width, $captionHeight), $format)

    $shadow = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(90, 0, 0, 0))
    $g.FillRectangle($shadow, $shotX + 6, $shotY + 8, $shotWidth, $shotHeight)
    $g.DrawImage($shot, $shotX, $shotY, $shotWidth, $shotHeight)
    $border = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(0x77, 0x5C, 0xFF), 2)
    $g.DrawRectangle($border, $shotX - 1, $shotY - 1, $shotWidth + 1, $shotHeight + 1)

    $canvas.Save((Join-Path $OutputDir $item.File), [System.Drawing.Imaging.ImageFormat]::Png)

    $border.Dispose(); $shadow.Dispose(); $format.Dispose(); $font.Dispose(); $background.Dispose()
    $g.Dispose(); $canvas.Dispose(); $shot.Dispose()
    $item.File
}

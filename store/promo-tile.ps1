param(
    [string]$LogoPath = (Join-Path $PSScriptRoot 'images\store-logo-300.png'),
    [string]$OutputPath = (Join-Path $PSScriptRoot 'images\promo-small-440x280.png')
)

# Layout
Add-Type -AssemblyName System.Drawing
$width = 440
$height = 280

$canvas = [System.Drawing.Bitmap]::new($width, $height, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
$g = [System.Drawing.Graphics]::FromImage($canvas)
$g.SmoothingMode = 'AntiAlias'
$g.InterpolationMode = 'HighQualityBicubic'
$g.TextRenderingHint = 'AntiAliasGridFit'

$background = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.Point]::new(0, 0), [System.Drawing.Point]::new($width, $height),
    [System.Drawing.Color]::FromArgb(0x2B, 0x22, 0x5E), [System.Drawing.Color]::FromArgb(0x12, 0x12, 0x16))
$g.FillRectangle($background, 0, 0, $width, $height)

# Logo
$logo = [System.Drawing.Image]::FromFile($LogoPath)
$g.DrawImage($logo, [int](($width - 112) / 2), 28, 112, 112)

# Text
$format = [System.Drawing.StringFormat]::new()
$format.Alignment = 'Center'
$title = [System.Drawing.Font]::new('Segoe UI Semibold', 24)
$subtitle = [System.Drawing.Font]::new('Segoe UI', 13)
$muted = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(0xC8, 0xC2, 0xE8))
$g.DrawString('Chat Below for Twitch', $title, [System.Drawing.Brushes]::White, [System.Drawing.RectangleF]::new(0, 150, $width, 44), $format)
$g.DrawString('Chat under the video for side-by-side windows', $subtitle, $muted, [System.Drawing.RectangleF]::new(0, 198, $width, 30), $format)

$canvas.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$muted.Dispose(); $subtitle.Dispose(); $title.Dispose(); $format.Dispose(); $logo.Dispose()
$background.Dispose(); $g.Dispose(); $canvas.Dispose()

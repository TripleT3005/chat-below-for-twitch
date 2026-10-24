param(
    [string]$OutputPath = (Join-Path $PSScriptRoot 'images\store-logo-300.png'),
    [int]$Size = 300
)

# Shapes
Add-Type -AssemblyName System.Drawing
function New-RoundedRect([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
    $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $d = 2 * $r
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    $path
}

# Drawing
$s = $Size / 128
$bitmap = [System.Drawing.Bitmap]::new($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bitmap)
$g.SmoothingMode = 'AntiAlias'
$g.PixelOffsetMode = 'HighQuality'
$g.Clear([System.Drawing.Color]::Transparent)

$purple = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(0x77, 0x5C, 0xFF))
$white = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
$faded = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(0x96, 0xFF, 0xFF, 0xFF))

$g.FillPath($purple, (New-RoundedRect 0 0 $Size $Size (26 * $s)))
$g.FillPath($white, (New-RoundedRect (20 * $s) (20 * $s) (88 * $s) (52 * $s) (4 * $s)))
$g.CompositingMode = 'SourceCopy'
$g.FillPath($faded, (New-RoundedRect (20 * $s) (79 * $s) (88 * $s) (30 * $s) (4 * $s)))

$bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$faded.Dispose(); $white.Dispose(); $purple.Dispose(); $g.Dispose(); $bitmap.Dispose()

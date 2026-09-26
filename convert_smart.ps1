$path = 'c:\Users\pedro\OneDrive\Desktop\Top-bancadas\logo.jpeg'
$outPath = 'c:\Users\pedro\OneDrive\Desktop\Top-bancadas\logo_final.png'
Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap $path
$bg = $bmp.GetPixel(0,0)
$threshold = 30
for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $color = $bmp.GetPixel($x, $y)
        $diffR = [math]::Abs($color.R - $bg.R)
        $diffG = [math]::Abs($color.G - $bg.G)
        $diffB = [math]::Abs($color.B - $bg.B)
        if ($diffR -lt $threshold -and $diffG -lt $threshold -and $diffB -lt $threshold) {
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

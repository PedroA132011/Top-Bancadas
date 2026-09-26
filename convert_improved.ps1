$path = 'c:\Users\pedro\OneDrive\Desktop\Top-bancadas\logo.jpeg'
$outPath = 'c:\Users\pedro\OneDrive\Desktop\Top-bancadas\logo.png'
Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap $path
for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $color = $bmp.GetPixel($x, $y)
        if ($color.R -lt 40 -and $color.G -lt 40 -and $color.B -lt 40) {
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
    }
}
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
echo 'Done'

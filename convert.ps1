$path = 'c:\Users\pedro\OneDrive\Desktop\Top-bancadas\logo.jpeg'
$outPath = 'c:\Users\pedro\OneDrive\Desktop\Top-bancadas\logo.png'
Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap $path
$color = $bmp.GetPixel(0,0)
$bmp.MakeTransparent($color)
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
echo 'Done'

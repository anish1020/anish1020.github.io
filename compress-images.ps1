# Image Compression Helper Script for Portfolio Performance
# This script helps identify images that need compression and provides guidance

Write-Host "🖼️  Portfolio Image Compression Analysis" -ForegroundColor Cyan
Write-Host "=====================================`n" -ForegroundColor Cyan

# Get all image files
$imageFiles = Get-ChildItem -Path "assets" -Include "*.png", "*.jpg", "*.jpeg" -ErrorAction SilentlyContinue

if (-not $imageFiles) {
    Write-Host "❌ No image files found in assets folder" -ForegroundColor Red
    exit
}

Write-Host "📊 Current Image Sizes:" -ForegroundColor Yellow
Write-Host "----------------------`n" -ForegroundColor Yellow

$totalSize = 0
$largeImages = @()

foreach ($file in $imageFiles) {
    $sizeKB = [math]::Round($file.Length / 1KB, 2)
    $totalSize += $sizeKB
    
    $status = "✅ Good"
    $color = "Green"
    
    if ($sizeKB -gt 100) {
        $status = "⚠️  Large"
        $color = "Yellow"
        $largeImages += $file
    }
    
    if ($sizeKB -gt 200) {
        $status = "❌ Too Large"
        $color = "Red"
    }
    
    Write-Host "$($file.Name): $sizeKB KB - $status" -ForegroundColor $color
}

Write-Host "`n📈 Summary:" -ForegroundColor Cyan
Write-Host "----------" -ForegroundColor Cyan
Write-Host "Total Images: $($imageFiles.Count)"
Write-Host "Total Size: $([math]::Round($totalSize, 2)) KB"
Write-Host "Large Images (>100KB): $($largeImages.Count)"

if ($largeImages.Count -gt 0) {
    Write-Host "`n🎯 Optimization Recommendations:" -ForegroundColor Yellow
    Write-Host "--------------------------------" -ForegroundColor Yellow
    
    foreach ($img in $largeImages) {
        $currentSize = [math]::Round($img.Length / 1KB, 2)
        $targetSize = [math]::Round($currentSize * 0.3, 2)  # Target 70% reduction
        
        Write-Host "📁 $($img.Name):"
        Write-Host "   Current: $currentSize KB"
        Write-Host "   Target: $targetSize KB (70% reduction)"
        Write-Host "   Savings: $([math]::Round($currentSize - $targetSize, 2)) KB`n"
    }
    
    Write-Host "🛠️  Compression Tools:" -ForegroundColor Green
    Write-Host "--------------------" -ForegroundColor Green
    Write-Host "1. 🌐 TinyPNG: https://tinypng.com/"
    Write-Host "2. 🌐 Squoosh: https://squoosh.app/"
    Write-Host "3. 🌐 Compressor.io: https://compressor.io/"
    
    Write-Host "`n📱 WebP Conversion:" -ForegroundColor Blue
    Write-Host "------------------" -ForegroundColor Blue
    Write-Host "Convert to WebP format for better compression:"
    Write-Host "• Use online tools or install cwebp"
    Write-Host "• Expected savings: 25-50% additional reduction"
    
    $potentialSavings = 0
    foreach ($img in $largeImages) {
        $potentialSavings += ($img.Length / 1KB) * 0.7  # 70% reduction
    }
    
    Write-Host "`n💰 Expected Performance Gains:" -ForegroundColor Green
    Write-Host "-----------------------------" -ForegroundColor Green
    Write-Host "• Total size reduction: ~$([math]::Round($potentialSavings, 2)) KB"
    Write-Host "• Mobile load time improvement: ~2-3 seconds"
    Write-Host "• Desktop load time improvement: ~1-2 seconds"
    Write-Host "• Lighthouse score improvement: +5-15 points"
    
} else {
    Write-Host "`n✅ All images are optimally sized!" -ForegroundColor Green
}

Write-Host "`n🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "-------------" -ForegroundColor Cyan
Write-Host "1. Compress large images using the tools above"
Write-Host "2. Convert images to WebP format"
Write-Host "3. Update HTML to use WebP with PNG/JPG fallback"
Write-Host "4. Test performance with Lighthouse"

# Create a backup folder if it doesn't exist
if (-not (Test-Path "assets/backup")) {
    New-Item -ItemType Directory -Path "assets/backup" -Force | Out-Null
    Write-Host "`n📁 Created backup folder: assets/backup" -ForegroundColor Blue
    Write-Host "💡 Tip: Copy original images here before compressing" -ForegroundColor Blue
}
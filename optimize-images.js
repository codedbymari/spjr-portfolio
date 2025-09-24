const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimizeHeroImage() {
  const inputPath = 'public/assets/images/Hero.png';
  const outputDir = 'public/assets/images/';
  
  // Check if input file exists
  if (!fs.existsSync(inputPath)) {
    console.error('Hero.png not found at:', inputPath);
    return;
  }

  try {
    console.log('Starting image optimization...');
    
    // Mobile version (440px wide)
    await sharp(inputPath)
      .resize(440, null, { 
        withoutEnlargement: true,
        fit: 'cover'
      })
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, 'Hero-mobile.webp'));
    console.log('✓ Mobile WebP created');

    await sharp(inputPath)
      .resize(440, null, { 
        withoutEnlargement: true,
        fit: 'cover'
      })
      .png({ quality: 80 })
      .toFile(path.join(outputDir, 'Hero-mobile.png'));
    console.log('✓ Mobile PNG created');

    // Tablet version (800px wide)
    await sharp(inputPath)
      .resize(800, null, { 
        withoutEnlargement: true,
        fit: 'cover'
      })
      .webp({ quality: 85 })
      .toFile(path.join(outputDir, 'Hero-tablet.webp'));
    console.log('✓ Tablet WebP created');

    await sharp(inputPath)
      .resize(800, null, { 
        withoutEnlargement: true,
        fit: 'cover'
      })
      .png({ quality: 85 })
      .toFile(path.join(outputDir, 'Hero-tablet.png'));
    console.log('✓ Tablet PNG created');

    // Desktop version (1400px wide)
    await sharp(inputPath)
      .resize(1400, null, { 
        withoutEnlargement: true,
        fit: 'cover'
      })
      .webp({ quality: 90 })
      .toFile(path.join(outputDir, 'Hero-desktop.webp'));
    console.log('✓ Desktop WebP created');

    await sharp(inputPath)
      .resize(1400, null, { 
        withoutEnlargement: true,
        fit: 'cover'
      })
      .png({ quality: 90 })
      .toFile(path.join(outputDir, 'Hero-desktop.png'));
    console.log('✓ Desktop PNG created');

    console.log('\n🎉 All optimized images created successfully!');
    
    // Show file sizes
    const files = [
      'Hero-mobile.webp',
      'Hero-mobile.png', 
      'Hero-tablet.webp',
      'Hero-tablet.png',
      'Hero-desktop.webp',
      'Hero-desktop.png'
    ];
    
    console.log('\nFile sizes:');
    files.forEach(file => {
      const filePath = path.join(outputDir, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`${file}: ${sizeKB}KB`);
      }
    });

  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeHeroImage();
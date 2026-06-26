const sharp = require('sharp');

async function cropImage() {
  try {
    await sharp('public/images/Logo.png')
      .trim()
      .toFile('public/images/Logo_cropped.png');
    console.log('Successfully cropped the logo!');
  } catch (err) {
    console.error('Error cropping image:', err);
  }
}

cropImage();

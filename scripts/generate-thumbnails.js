import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const artworkDir = join(__dirname, '../public/images/artwork');
const thumbnailDir = join(artworkDir, 'thumbnails');

const folders = ['awakening', 'made_to_order', 'paddy_series_1', 'paddy_series_2'];
const imageExtensions = ['.jpg', '.jpeg', '.png', '.jfif', '.webp'];

async function generateThumbnails() {
  for (const folder of folders) {
    const srcDir = join(artworkDir, folder);
    const destDir = join(thumbnailDir, folder);

    // Create destination directory
    await mkdir(destDir, { recursive: true });

    // Get all image files
    const files = await readdir(srcDir);
    const imageFiles = files.filter(f =>
      imageExtensions.includes(extname(f).toLowerCase())
    );

    console.log(`Processing ${folder}: ${imageFiles.length} files`);

    for (const file of imageFiles) {
      const srcPath = join(srcDir, file);
      // Always output as .jpg for consistency
      const destFileName = basename(file, extname(file)) + '.jpg';
      const destPath = join(destDir, destFileName);

      try {
        await sharp(srcPath)
          .resize(400, null, { withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toFile(destPath);
        console.log(`  ✓ ${file} -> ${destFileName}`);
      } catch (err) {
        console.error(`  ✗ ${file}: ${err.message}`);
      }
    }
  }

  console.log('\nDone!');
}

generateThumbnails();

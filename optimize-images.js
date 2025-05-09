import sharp from "sharp";
import fs from "fs";
import path from "path";

// Function to optimize a single image
const optimizeImage = async (inputPath, options = {}) => {
  const { width, quality = 80, outputPath } = options;

  try {
    if (!fs.existsSync(inputPath)) {
      console.log(`File not found: ${inputPath}`);
      return;
    }

    const imageProcess = sharp(inputPath);

    if (width) {
      imageProcess.resize(width);
    }

    await imageProcess
      .png({ quality, compressionLevel: 9 })
      .toFile(
        outputPath || `${inputPath.replace(/\.[^.]+$/, "")}-optimized.png`,
      );

    if (outputPath) {
      console.log(`Optimized: ${inputPath} → ${outputPath}`);
    } else {
      fs.unlinkSync(inputPath);
      fs.renameSync(
        `${inputPath.replace(/\.[^.]+$/, "")}-optimized.png`,
        inputPath,
      );
      console.log(`Optimized in place: ${inputPath}`);
    }
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
};

// Optimize Icon.png
const optimizeIcon = async () => {
  try {
    console.log("Optimizing Icon.png...");
    await optimizeImage("public/Icon.png", { width: 192 });
    await optimizeImage("src/Icon.png", { width: 192 });
    console.log("Icon.png optimized successfully!");
  } catch (error) {
    console.error("Error optimizing Icon.png:", error);
  }
};

// Optimize images in lovable-uploads folder
const optimizeLovableUploads = async () => {
  const uploadsDir = "public/lovable-uploads";

  if (!fs.existsSync(uploadsDir)) {
    console.log(`Directory not found: ${uploadsDir}`);
    return;
  }

  try {
    const files = fs.readdirSync(uploadsDir);
    const allowedFiles = [
      "a0278ce1-b82d-4ed6-a186-14a9503ef65c.png",
      "af28398b-9e23-4e2b-9de1-bda457e09fd8.png",
      "c4fcdd31-cfe6-458c-8e77-fe481577108f.png",
    ];

    for (const file of files) {
      if (allowedFiles.includes(file) && file.endsWith(".png")) {
        const filePath = path.join(uploadsDir, file);
        console.log(`Optimizing ${filePath}...`);
        await optimizeImage(filePath, { width: 800 });
      }
    }

    console.log("Lovable uploads optimized successfully!");
  } catch (error) {
    console.error("Error optimizing lovable uploads:", error);
  }
};

// Run optimizations
optimizeIcon();
optimizeLovableUploads();

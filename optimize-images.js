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

    // Create a temporary output path if none provided
    const tempOutputPath =
      outputPath || `${inputPath.replace(/\.[^.]+$/, "")}-optimized.png`;

    // Process the image with width only to maintain aspect ratio
    const imageProcess = sharp(inputPath);

    if (width) {
      // Resize with width only to maintain aspect ratio
      imageProcess.resize(width, null, {
        fit: "inside",
        withoutEnlargement: true, // Force resize even if smaller
      });
    }

    // Apply high compression
    await imageProcess
      .png({ quality, compressionLevel: 9 })
      .toFile(tempOutputPath);

    // Verify the file was created
    if (!fs.existsSync(tempOutputPath)) {
      throw new Error(`Failed to create optimized image at ${tempOutputPath}`);
    }

    if (outputPath) {
      console.log(`Optimized: ${inputPath} → ${outputPath}`);
    } else {
      // Replace the original file with the optimized version
      fs.unlinkSync(inputPath);
      fs.renameSync(tempOutputPath, inputPath);
      console.log(
        `Optimized in place: ${inputPath} (resized to ${width}px width)`,
      );
    }
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
};

// Optimize Icon.png
const optimizeIcon = async () => {
  try {
    console.log("Optimizing Icon.png...");

    // Check if files exist before optimizing
    if (fs.existsSync("public/Icon.png")) {
      // Create a completely new icon at 16x16 pixels (favicon size)
      await optimizeImage("public/Icon.png", {
        width: 16,
        quality: 100, // Maximum quality for small icon
        outputPath: "public/favicon.ico", // Save as favicon.ico
      });

      // Create a proportionally resized version for the browser tab
      await optimizeImage("public/Icon.png", {
        width: 32,
        quality: 100, // Maximum quality for icon
        outputPath: "public/Icon-2.png", // Save as Icon-2.png
      });
      console.log("public/Icon.png optimized to 16px and 32px versions");
    } else {
      console.log("public/Icon.png not found");
    }

    if (fs.existsSync("src/Icon.png")) {
      await optimizeImage("src/Icon.png", {
        width: 32,
        quality: 100, // Maximum quality for icon
        outputPath: "src/Icon-32.png", // Save as a new file
      });
      console.log("src/Icon.png optimized to 32px width");
    } else {
      console.log("src/Icon.png not found");
    }

    console.log("Icon.png optimization completed!");
  } catch (error) {
    console.error("Error optimizing Icon.png:", error);
  }
};

// Optimize Claude-inspired icon
const optimizeClaudeIcon = async () => {
  try {
    console.log("Optimizing Claude-inspired icon...");

    // Check if file exists before optimizing
    if (fs.existsSync("public/icons/claude-inspired-icon.png")) {
      // Create a favicon version
      await optimizeImage("public/icons/claude-inspired-icon.png", {
        width: 16,
        quality: 100, // Maximum quality for small icon
        outputPath: "public/favicon.ico", // Replace the favicon
      });

      // Create a tab icon version
      await optimizeImage("public/icons/claude-inspired-icon.png", {
        width: 24,
        quality: 100, // Maximum quality for icon
        outputPath: "public/claude-tab-icon.png", // Save as a new file
      });

      // Create a larger version for other uses
      await optimizeImage("public/icons/claude-inspired-icon.png", {
        width: 192,
        quality: 100, // Maximum quality for icon
        outputPath: "public/claude-icon-192.png", // Save as a new file for PWA
      });

      console.log("Claude-inspired icon optimized to multiple sizes");
    } else {
      console.log("public/icons/claude-inspired-icon.png not found");
    }
  } catch (error) {
    console.error("Error optimizing Claude-inspired icon:", error);
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
optimizeClaudeIcon();
optimizeLovableUploads();

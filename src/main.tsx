import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Import and initialize Tempo Devtools
import { TempoDevtools } from "tempo-devtools";
import { checkSupabaseConnection } from "./lib/checkSupabaseConnection";
import { uploadPublicImagesToSupabase } from "./lib/imageUtils";
TempoDevtools.init();

// Test Supabase connection on startup with more detailed logging
console.log("Starting Supabase connection check...");
checkSupabaseConnection()
  .then((result) => {
    console.log("Supabase connection check result:", result);
    if (result.success) {
      // Add a slight delay before uploading images to ensure the app is fully loaded
      setTimeout(() => {
        console.log("Starting image upload process...");
        // Upload public images to Supabase storage
        uploadPublicImagesToSupabase()
          .then((success) => {
            console.log(
              "Images upload result:",
              success ? "Success" : "Failed",
            );
          })
          .catch((err) => {
            console.error("Error uploading images:", err);
          });
      }, 2000); // 2 second delay
    }
  })
  .catch((err) => {
    console.error("Unexpected error in connection check:", err);
  });

// Add error handling to catch rendering issues
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found!");
  } else {
    createRoot(rootElement).render(<App />);
    console.log("App successfully rendered");
  }
} catch (error) {
  console.error("Failed to render the app:", error);
  // Display a fallback UI when rendering fails
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>Something went wrong</h1>
        <p>Please check the console for more information.</p>
      </div>
    `;
  }
}

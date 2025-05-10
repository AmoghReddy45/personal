import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Import and initialize Tempo Devtools
import { TempoDevtools } from "tempo-devtools";
import { checkSupabaseConnection } from "./lib/checkSupabaseConnection";
TempoDevtools.init();

// Test Supabase connection on startup
checkSupabaseConnection().then((result) => {
  console.log("Supabase connection check result:", result);
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

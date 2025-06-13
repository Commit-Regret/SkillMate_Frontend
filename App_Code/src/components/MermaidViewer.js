import React from "react";
import { WebView } from "react-native-webview";

const MermaidViewer = ({ mermaidCode }) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; padding: 16px; }
        .mermaid { width: 100%; }
      </style>
      <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
      <script>
        window.addEventListener('load', () => {
          mermaid.initialize({ startOnLoad: true });
        });
      </script>
    </head>
    <body>
      <div class="mermaid">
        ${mermaidCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
      </div>
    </body>
    </html>
  `;

  return (
    <WebView originWhitelist={["*"]} source={{ html }} style={{ flex: 1 }} />
  );
};

export default MermaidViewer;

// import React from "react";
// import { WebView } from "react-native-webview";

// const MermaidViewer = ({ mermaidCode }) => {
//   const html = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <style>
//         body { margin: 0; padding: 16px; }
//         .mermaid { width: 100%; }
//       </style>
//       <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
//       <script>
//         window.addEventListener('load', () => {
//           mermaid.initialize({ startOnLoad: true });
//         });
//       </script>
//     </head>
//     <body>
//       <div class="mermaid">
//         ${mermaidCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
//       </div>
//     </body>
//     </html>
//   `;

//   return (
//     <WebView originWhitelist={["*"]} source={{ html }} style={{ flex: 1 }} />
//   );
// };

// export default MermaidViewer;

import React from "react";
import { WebView } from "react-native-webview";

const MermaidViewer = ({ mermaidCode }) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        #container {
          width: 100vw;
          height: 100vh;
          touch-action: none; /* Needed for panzoom to work properly */
        }
        .mermaid {
          width: 100%;
          height: auto;
        }
      </style>

      <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/panzoom@9.4.0/dist/panzoom.min.js"></script>
    </head>
    <body>
      <div id="container">
        <div class="mermaid">
          ${mermaidCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
        </div>
      </div>

      <script>
        mermaid.initialize({ startOnLoad: true });

        window.addEventListener('load', () => {
          const observer = new MutationObserver(() => {
            const svg = document.querySelector('svg');
            if (svg && !svg.__panzoomAttached) {
              svg.__panzoomAttached = true;
              panzoom(svg, {
                bounds: true,
                boundsPadding: 0.1,
                zoomSpeed: 0.065,
                maxZoom: 5,
                minZoom: 0.5,
              });
            }
          });

          observer.observe(document.getElementById('container'), {
            childList: true,
            subtree: true,
          });
        });
      </script>
    </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html }}
      style={{ flex: 1 }}
      javaScriptEnabled
      scrollEnabled={false} // disable native scroll so panzoom handles it
    />
  );
};

export default MermaidViewer;

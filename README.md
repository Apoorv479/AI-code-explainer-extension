Here is the professional `README.md` file based on the analysis of your project code and structure.

```markdown
# AI Code Explainer Extension

## Project Description
AI Code Explainer is a Google Chrome extension built to assist developers in understanding complex code snippets directly within the browser. Utilizing the Chrome Side Panel API and Google's Gemini AI, this tool allows users to select code on any webpage, invoke a context menu action, and receive a detailed, natural language explanation of the logic, syntax, and potential bugs without leaving the current tab.

## Architecture & Workflow
The application follows a standard Chrome Extension Manifest V3 architecture integrated with a React frontend.

1.  **User Interaction:** The user selects text on a webpage and clicks the "Explain this code with AI" context menu item.
2.  **Background Service:** The `background.js` service worker captures the selected text and the active tab context.
3.  **Data Persistence:** The selected text is stored in `chrome.storage.local` to bridge the communication gap between the background script and the UI.
4.  **UI Trigger:** The background script programmatically opens the Chrome Side Panel.
5.  **AI Processing:** The React application running in the side panel retrieves the stored code and the user's API key, sends a request to the Google Gemini API, and renders the response using Markdown.

## Key Features
* **Context Menu Integration:** Seamless integration with the browser's native right-click menu for text selection.
* **Side Panel Interface:** Utilizes the Chrome Side Panel API to provide a persistent, non-intrusive UI alongside the main content.
* **Generative AI Integration:** Powered by Google's Gemini models (configured for `gemini-2.0-flash` or `gemini-flash-latest`) for high-speed, accurate code analysis.
* **Secure Key Management:** User API keys are stored locally within the user's browser storage (`chrome.storage.local`) and are not transmitted to any third-party servers other than the Google AI endpoint.
* **Markdown Rendering:** Explanations are formatted with syntax highlighting and structured text for readability.

## Tech Stack
* **Core:** JavaScript (ES6+), HTML5, CSS3
* **Framework:** React 18
* **Build Tool:** Vite
* **Extension Standard:** Chrome Manifest V3
* **AI SDK:** @google/generative-ai
* **Utilities:** react-markdown

## Prerequisites
Before setting up the project, ensure you have the following installed:
* **Node.js:** Version 18.0.0 or higher
* **npm:** Installed with Node.js
* **Web Browser:** Google Chrome (latest version)
* **API Key:** A valid API key from [Google AI Studio](https://aistudio.google.com/)

## Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/ai-code-explainer-extension.git](https://github.com/YOUR_USERNAME/ai-code-explainer-extension.git)
    cd ai-code-explainer-extension
    ```

2.  **Install Dependencies**
    Execute the following command to install required node modules:
    ```bash
    npm install
    ```

3.  **Build the Project**
    Compile the React application and assets into the production-ready `dist` folder:
    ```bash
    npm run build
    ```

## Usage

### Loading the Extension
1.  Open Google Chrome and navigate to `chrome://extensions/`.
2.  Enable **Developer mode** using the toggle in the top-right corner.
3.  Click the **Load unpacked** button.
4.  Select the `dist` folder generated in the root of your project directory during the build step.

### Running the Application
1.  **Configuration:** Click the extension icon in the toolbar or open the side panel. Enter your Google Gemini API key when prompted.
2.  **Execution:**
    * Navigate to any webpage containing code (e.g., GitHub, StackOverflow, Documentation).
    * Highlight a code snippet.
    * Right-click and select **"Explain this code with AI"**.
    * The side panel will open and display the explanation.

## Project Structure

```text
ai-code-explainer-extension/
├── dist/                  # Production build output (Load this folder in Chrome)
├── public/                # Static assets
│   ├── background.js      # Chrome Service Worker for context menus
│   └── manifest.json      # Extension configuration and permissions
├── src/                   # Source code
│   ├── App.jsx            # Main React component and AI logic
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite build configuration
└── README.md              # Project documentation

```

## Permissions

The extension requires the following permissions in `manifest.json`:

* `contextMenus`: To add the "Explain with AI" option to the right-click menu.
* `sidePanel`: To display the application interface in the browser side panel.
* `storage`: To persist the API key and selected text across browser sessions.

```

```

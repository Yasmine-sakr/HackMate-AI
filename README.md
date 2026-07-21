# HackMate AI

## Your AI Hackathon Co-Founder

HackMate AI is an innovative tool designed to empower hackathon participants by transforming their raw ideas into a structured Hackathon Canvas in seconds. Leveraging the power of OpenAI's GPT models, HackMate AI provides comprehensive insights into project ideas, MVP (Minimum Viable Product) suggestions, recommended tech stacks, team role allocations, a 48-hour development roadmap, monetization strategies, and winning tips for hackathons.

This project was developed for the OpenAI Build Week, emphasizing the integration and utilization of OpenAI technologies.

## Features

*   **AI-Powered Idea Generation:** Turn any concept into a detailed Hackathon Canvas.
*   **Comprehensive Canvas:** Generates `ideaSummary`, `mvp`, `techStack`, `teamRoles`, `plan48Hours`, `monetization`, and `winningTips`.
*   **Editable Canvas:** Users can directly edit any section of the generated canvas to refine details.
*   **Export Functionality:** Export the generated canvas as Markdown or PDF for easy sharing and documentation.
*   **User-Friendly Interface:** Clean and responsive design built with React, Vite, and TailwindCSS.

## Technological Implementation (OpenAI Build Week Focus)

This project heavily relies on OpenAI's advanced models and tools, specifically targeting the requirements of the OpenAI Build Week:

*   **OpenAI GPT-4o (or GPT-5.6 if available):** The core AI logic for generating the Hackathon Canvas is powered by OpenAI's GPT-4o model. This model is used to interpret user input and generate structured JSON output conforming to the Hackathon Canvas schema. The `src/services/openai.js` file demonstrates the integration with the OpenAI API.

*   **Codex Integration (Conceptual/Workflow):** While direct runtime integration of Codex is not applicable for a frontend application in the same way as GPT models, the development process of HackMate AI was significantly accelerated by using Codex (or similar AI coding assistants like GitHub Copilot, which is powered by OpenAI Codex) for:
    *   **Code Generation:** Assisting in scaffolding React components, utility functions, and API integration logic.
    *   **Debugging and Refactoring:** Helping identify and fix issues, and suggesting improvements to code structure and efficiency.
    *   **Documentation:** Generating initial drafts for comments and README content.
    *   **Learning and Exploration:** Understanding new libraries and frameworks by asking Codex for explanations and examples.

    *To fulfill the Codex requirement for the OpenAI Build Week, a detailed explanation of how Codex was used during development would be provided in the submission, potentially including timestamped session logs or commit messages indicating AI assistance.*

## Setup and Installation

To get HackMate AI up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd HackMate-AI
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure OpenAI API Key:**
    Create a `.env` file in the root directory of the project and add your OpenAI API key:
    ```
    VITE_OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
    ```
    *Replace `YOUR_OPENAI_API_KEY_HERE` with your actual OpenAI API Key.*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

1.  **Start Building:** On the landing page, click 
"🚀 Start Building" to enter the chat interface.
2.  **Enter your Idea:** In the chat input, describe your hackathon idea, team skills, or deadline. For example: "I need an idea for a healthcare app for a 48-hour hackathon, focusing on AI for diagnosis."
3.  **Generate Canvas:** HackMate AI will process your input and generate a comprehensive Hackathon Canvas.
4.  **Explore and Edit:** Click on any section of the generated canvas to expand it. You can also click the "Edit" button to modify the content directly.
5.  **Export:** Use the "Export as Markdown" or "Export as PDF" buttons to save your canvas.

## Project Structure

```
HackMate-AI/
├── public/
│   └── images/             # Static assets like logos and icons
├── src/
│   ├── assets/             # Images used in components
│   ├── components/         # Reusable React components (e.g., ChatInput, HackathonCanvas)
│   ├── services/
│   │   └── openai.js       # OpenAI API integration logic
│   ├── utils/
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Entry point for React application
├── .env                    # Environment variables (e.g., OpenAI API Key)
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to fork the repository, create a new branch, and submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please open an issue in the repository.

# HackMate AI

## Your AI Co-Founder for Building Winning Hackathon Projects

HackMate AI is an innovative tool designed to empower hackathon participants by transforming their raw ideas into a structured Hackathon Canvas in seconds. Leveraging the power of OpenAI's GPT models, HackMate AI provides comprehensive insights into project ideas, MVP (Minimum Viable Product) suggestions, recommended tech stacks, team role allocations, a 48-hour development roadmap, monetization strategies, and winning tips for hackathons.

This project was developed for the OpenAI Build Week, emphasizing the integration and utilization of OpenAI technologies.

## Features

*   **AI-Powered Idea Generation:** Turn any concept into a detailed Hackathon Canvas.
*   **Comprehensive Canvas:** Generates `ideaSummary`, `mvp`, `techStack`, `teamRoles`, `plan48Hours`, `monetization`, and `winningTips`.
*   **Editable Canvas:** Users can directly edit any section of the generated canvas to refine details.
*   **Export Functionality:** Export the generated canvas as Markdown or PDF for easy sharing and documentation.
*   **User-Friendly Interface:** Clean and responsive design built with React, Vite, and TailwindCSS.
## AI Development Process

HackMate AI was developed using AI-assisted engineering.

### ChatGPT (GPT-5.6)

ChatGPT was used throughout the project to:

- Plan the overall project architecture
- Design the Hackathon Canvas structure
- Improve prompts for better AI responses
- Debug React components
- Improve the UI/UX
- Review project structure
- Help prepare the README and documentation
- Review deployment and submission requirements

### OpenAI Codex

OpenAI Codex acted as the development assistant during implementation.

It helped with:

- Refactoring React components
- Debugging runtime issues
- Reviewing component structure
- Improving project organization
- Fixing API integration problems
- Reviewing deployment workflow
- Assisting with Git and GitHub issues

Codex significantly reduced development time by providing code suggestions, debugging support, and architectural improvements throughout the project.

### Gemini API

The final application uses Google's Gemini API to generate a complete Hackathon Canvas based on the user's project idea.

The AI returns structured JSON including:

- Idea Summary
- MVP
- Tech Stack
- Team Roles
- 48-Hour Plan
- Monetization
- Winning Tips

The generated canvas can then be edited by the user and exported as Markdown or PDF.

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

3.  **Configure GEMINI API Key:**
    Create a `.env` file in the root directory of the project and add your GEMINI APIkey:
    ```
    VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```
    *Replace `YOUR_GEMINI_API_KEY_HERE` with your actual GEMINI API Key.*

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
│   │   └── gemini.js     # Gemini API integration logic
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

## Developer

Created by Yasmine Sakr

GitHub:
https://github.com/Yasmine-sakr

LinkedIn:
https://www.linkedin.com/in/yasmine-sakr-952690326

## Acknowledgments

Special thanks to:

- Google Gemini API for powering the Hackathon Canvas generation.
- OpenAI ChatGPT (GPT-5.6) for architecture planning, debugging, documentation, and development support.
- OpenAI Codex for code review, refactoring, debugging assistance, and implementation guidance throughout development.


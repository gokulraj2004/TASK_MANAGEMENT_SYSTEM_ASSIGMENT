# Task Management Application

## Overview
A simple and efficient task management application built with React.js. Users can create, edit, delete, and mark tasks as complete. The app also supports filtering, sorting, and drag-and-drop functionality.

## Features
- Add, edit, delete, and complete tasks
- Filter and sort tasks by status, date, and priority
- Responsive design for both mobile and desktop
- Drag-and-drop functionality for task organization
- Uses React hooks for state management
- Data persistence with localStorage

## Tech Stack
- **Frontend**: React.js, Redux, Material UI
- **State Management**: Redux
- **Styling**: Material UI
- **Storage**: localStorage

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/gokulraj2004/TASK_MANAGEMENT_SYSTEM_ASSIGMENT.git
   cd task-manager
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm start
   # or
   yarn start
   ```
4. Open `http://localhost:3000` in your browser.

## Deployment
The app is live at: [Task Manager](https://symphonious-squirrel-a2f271.netlify.app/)

For deploying updates:
1. Build the project:
   ```sh
   npm run build
   ```
2. Deploy to GitHub Pages, Netlify, or Vercel.

## Folder Structure
```
/task-manager
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Main application pages
│   ├── redux/       # Redux store & slices
│   ├── hooks/       # Custom React hooks
│   ├── utils/       # Utility functions
│   ├── styles/      # Global styles
│   ├── App.js       # Root component
│   ├── index.js     # Entry point
├── .gitignore
├── package.json
├── README.md
```

## Contribution
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```sh
   git commit -m "Added new feature"
   ```
4. Push and open a pull request.

## License
This project is licensed under the MIT License.

---
### Author: S.GOKUL RAJ

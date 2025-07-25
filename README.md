<div align="center">
  <h1>TalkTribe 💬(language learning platform)</h1>
  <h3>Real-time Chat & Video Calling Application</h3>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
  [![GitHub stars](https://img.shields.io/github/stars/yourusername/talktribe?style=social)](https://github.com/yourusername/talktribe/stargazers)

  ![Demo App](./frontend/public/screenshot-for-readme.png)
</div>

## ✨ Features

### 💬 Real-time Messaging
- Instant messaging with read receipts
- Typing indicators
- Emoji reactions & message replies
- File sharing support
- Message search and history

### 📹 Video Calling
- High-quality 1-on-1 and group video calls
- Screen sharing capabilities
- Call recording (optional)
- Virtual backgrounds
- Mute/Unmute controls

### 🔒 Security & Authentication
- JWT-based authentication
- End-to-end encryption for messages
- Role-based access control
- Secure file storage

### 🎨 User Experience
- 32+ customizable themes
- Dark/Light mode
- Responsive design for all devices
- Push notifications
- Keyboard shortcuts

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React 18](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/v5) & [Axios](https://axios-http.com/)
- **Real-time:** [Socket.IO Client](https://socket.io/), [Stream Chat](https://getstream.io/chat/)
- **Video:** [Stream Video](https://getstream.io/video/)
- **Routing:** [React Router v6](https://reactrouter.com/)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (v18+)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** [JWT](https://jwt.io/), [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Real-time:** [Socket.IO](https://socket.io/)
- **Storage:** [Multer](https://github.com/expressjs/multer) for file uploads
- **Validation:** [Joi](https://joi.dev/)

### Development Tools
- **Package Manager:** [pnpm](https://pnpm.io/) (recommended) or npm
- **Linting:** [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Version Control:** [Git](https://git-scm.com/)
- **Containerization:** [Docker](https://www.docker.com/) (optional)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [MongoDB](https://www.mongodb.com/try/download/community) (v6.0+)
- [Git](https://git-scm.com/)
- [pnpm](https://pnpm.io/installation) (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/talktribe.git
   cd talktribe
   ```

2. **Install dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install
   
   # Or using npm
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` in both `frontend` and `backend` directories
   - Update the environment variables with your configuration

4. **Start the development servers**
   ```bash
   # Start backend server
   cd backend
   pnpm dev
   
   # In a new terminal, start frontend
   cd ../frontend
   pnpm dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📦 Deployment

### Frontend Deployment
```bash
# Build for production
cd frontend
pnpm build

# The build files will be in the `dist` directory
```

### Backend Deployment
```bash
# Build for production
cd backend
pnpm build

# Start production server
pnpm start
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Stream](https://getstream.io/) for the amazing chat & video APIs
- [Vite](https://vitejs.dev/) for the fantastic build tool
- All the open-source libraries that made this project possible

## 📞 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

Project Link: [https://github.com/yourusername/talktribe](https://github.com/yourusername/talktribe)

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/talktribe.git
    cd talktribe
    ```

2.  **Setup Backend:**

    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory and add the following variables:

    ```
    PORT=5001
    MONGO_URI=your_mongo_db_connection_string
    STREAM_API_KEY=your_stream_api_key
    STREAM_API_SECRET=your_stream_api_secret
    JWT_SECRET_KEY=your_super_secret_jwt_key
    NODE_ENV=development
    ```

3.  **Setup Frontend:**

    ```bash
    cd ../frontend
    npm install
    ```

    Create a `.env` file in the `frontend` directory and add your Stream API key:

    ```
    VITE_STREAM_API_KEY=your_stream_api_key
    ```

## 📜 Available Scripts

### Backend

- `npm run dev`: Starts the development server with Nodemon.

### Frontend

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the source code.
- `npm run preview`: Previews the production build.

## 📁 Project Structure

```
/backend
  /src
    /controllers
    /db
    /middleware
    /models
    /routes
    /socket
    server.js
  .env
  package.json
/frontend
  /src
    /components
    /hooks
    /pages
    /utils
    App.jsx
    main.jsx
  .env
  package.json
README.md
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Stream](https://getstream.io/) for their powerful chat and video APIs.
- The creators of all the open-source libraries used in this project.

#   T a l k T r i b e 
 
 
# 🏠 Hostel Management System

A modern, full-stack hostel management application built with React, Node.js, and MongoDB. Features persistent authentication, beautiful UI with dark/light mode, and role-based access control.

## ✨ Features

- **🔐 Persistent Authentication**: Cookie-based authentication with automatic session management
- **🌙 Dark/Light Mode**: Beautiful theme switching with system preference detection
- **👥 Role-Based Access**: Admin, Staff, and Resident roles with different permissions
- **🎨 Modern UI**: Beautiful, responsive design with Framer Motion animations
- **📱 Mobile-First**: Optimized for all device sizes
- **🔒 Secure**: HTTP-only cookies, JWT tokens, and proper CORS configuration
- **⚡ Fast**: Built with Vite for lightning-fast development and builds
- **🎭 Theme Persistence**: Remembers user's theme preference across sessions

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd Hostel_Management_Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**

   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string and JWT secret
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd hoste_frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## 🔑 Demo Credentials

### Admin Account

- **Email:** azardevacc@gmail.com
- **Password:** azardev@123

### Staff Account

- **Email:** staff@hostel.com
- **Password:** staff123

### Resident Account

- **Email:** resident@hostel.com
- **Password:** resident123

## 🏗️ Project Structure

```
Hostel-Management-mern/
├── hoste_frontend/          # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # Theme and Auth contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # Authentication and API services
│   │   └── utils/          # Utility functions
│   └── package.json
├── Hostel_Management_Backend/  # Node.js backend
│   ├── Controllers/        # Business logic
│   ├── Models/            # Database models
│   ├── Routes/            # API endpoints
│   ├── Middlewares/       # Authentication middleware
│   └── server.js          # Main server file
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

### API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `GET /api/auth/userdashboard` - User dashboard

## 🎨 UI Components

- **NavBar**: Responsive navigation with user authentication status and theme toggle
- **ThemeToggle**: Beautiful theme switcher with smooth animations
- **LoginPage**: Beautiful login form with image carousel and dark mode support
- **ProtectedRoutes**: Route protection based on authentication
- **LoadingButton**: Reusable loading button component
- **Toast Notifications**: User feedback with react-toastify
- **AuthStatus**: Debug component for development (shows auth state)

## 🌙 Theme System

### Features

- **Automatic Detection**: Detects system theme preference
- **Persistent Storage**: Remembers user's choice in localStorage
- **Smooth Transitions**: Beautiful animations between themes
- **CSS Variables**: Dynamic color schemes for both themes
- **Component Integration**: All components automatically adapt to theme

### Usage

```jsx
import { useTheme } from "../contexts/ThemeContext";

const { isDarkMode, toggleTheme, theme } = useTheme();

// Toggle theme
<button onClick={toggleTheme}>{isDarkMode ? "🌞" : "🌙"}</button>;
```

## 🔐 Authentication Flow

1. **Login**: User submits credentials → Server validates → Sets HTTP-only cookies
2. **Session**: Cookies automatically sent with requests → Middleware validates JWT
3. **Logout**: Clears cookies and redirects to home page
4. **Persistence**: Authentication state maintained across browser sessions
5. **Theme Persistence**: User's theme preference saved and restored

## 🚀 Deployment

### Backend

- Set `NODE_ENV=production` in environment
- Update CORS origins for production domain
- Use HTTPS in production for secure cookies

### Frontend

- Update `VITE_API_URL` to production backend URL
- Build with `npm run build`
- Deploy to your preferred hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the console for error messages
2. Verify your environment variables
3. Ensure MongoDB is running
4. Check network connectivity between frontend and backend
5. Use the AuthStatus debug component to check authentication state

## 🔄 Recent Updates

- ✅ Enhanced authentication with cookie-based sessions
- ✅ **NEW: Dark/Light mode theme system**
- ✅ **NEW: Theme persistence across sessions**
- ✅ Improved UI with modern design and animations
- ✅ Better error handling and user feedback
- ✅ Responsive navigation with user status and theme toggle
- ✅ Environment-based configuration
- ✅ Enhanced security with HTTP-only cookies
- ✅ **NEW: Smooth theme transitions and animations**
- ✅ **NEW: System theme preference detection**

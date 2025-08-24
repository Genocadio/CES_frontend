# Citizen Engagement System (CES) - Frontend

A modern React TypeScript frontend application for the Citizen Engagement System, designed to facilitate citizen engagement and participation in democratic processes.

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 18.x or higher
- **npm** or **yarn**: Package manager
- **Backend API**: Spring Boot application running (see [Backend Repository](https://github.com/Genocadio/CITIZEN_ENGAGEMENT_SYSTEM))

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-frontend-repo-url>
   cd CES_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```bash
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
CES_frontend/
├── src/
│   ├── components/           # React components
│   │   ├── admin/           # Admin portal components
│   │   ├── auth/            # Authentication components
│   │   ├── citizen/         # Citizen engagement components
│   │   └── shared/          # Shared/common components
│   ├── config/              # Configuration files
│   ├── contexts/            # React contexts
│   ├── hooks/               # Custom React hooks
│   ├── i18n/                # Internationalization
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── public/                  # Static assets
├── index.html               # Entry HTML file
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## 🛠️ Technology Stack

### Frontend Framework
- **React**: 18.3.1 - Modern React with hooks
- **TypeScript**: 5.5.3 - Type-safe JavaScript
- **Vite**: 5.4.2 - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS**: 3.4.1 - Utility-first CSS framework
- **PostCSS**: 8.4.35 - CSS processing
- **Autoprefixer**: 10.4.18 - CSS vendor prefixing

### Development Tools
- **ESLint**: 9.9.1 - Code linting and formatting
- **TypeScript ESLint**: 8.3.0 - TypeScript-specific linting rules

### External Libraries
- **Cloudinary React**: 1.8.1 - Image upload and management
- **Lucide React**: 0.344.0 - Icon library

## 🔧 Configuration

### Environment Variables
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8080  # Backend API base URL
```

### TypeScript Configuration
- **Target**: ES2020
- **Module**: ESNext
- **JSX**: React JSX
- **Strict Mode**: Enabled
- **Module Resolution**: Bundler mode

### Build Configuration
- **Development Server**: Port 5173
- **Build Output**: `dist/` directory
- **Hot Module Replacement**: Enabled
- **Optimization**: Excludes lucide-react from dependency optimization

## 🌐 Backend Integration

This frontend connects to a Spring Boot backend application. For backend setup and API documentation, see:

**[Backend Repository](https://github.com/Genocadio/CITIZEN_ENGAGEMENT_SYSTEM)**

### API Endpoints
The frontend expects the following backend endpoints:

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh

#### User Management
- `PUT /api/users/{id}/complete-profile` - Profile completion
- `GET /api/users/leaders` - Search leaders

#### Content Management
- `GET/POST /api/issues` - Issue management
- `GET/POST /api/topics` - Topic management
- `GET/POST /api/announcements` - Announcements
- `GET/POST /api/comments` - Comments system
- `GET/POST /api/responses` - Government responses

## 📱 Features

### Citizen Features
- **User Registration & Authentication**: Complete user management system
- **Issue Reporting**: Create and track community issues
- **Topic Discussions**: Participate in community discussions
- **Government Responses**: View and rate official responses
- **Multi-language Support**: English, Kinyarwanda, and French
- **Location-based Services**: Rwandan administrative structure support

### Admin Features
- **Admin Portal**: Dedicated administrative interface
- **Issue Management**: Track and manage citizen issues
- **Survey Management**: Create and manage community surveys
- **Announcement System**: Publish community announcements
- **User Management**: Oversee citizen accounts

### Technical Features
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Live data synchronization
- **File Uploads**: Cloudinary integration for media
- **Session Persistence**: User authentication state management
- **Error Handling**: Comprehensive error management

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Package Management
npm install          # Install dependencies
npm update           # Update dependencies
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Environment Variables**: Secure configuration management
- **Input Validation**: Client-side and server-side validation
- **Session Management**: Secure session handling
- **Role-based Access**: Different interfaces for different user types

## 🌍 Internationalization

The application supports multiple languages:
- **English** (en)
- **Kinyarwanda** (rw)
- **French** (fr)

Language switching is available throughout the application interface.

## 📊 Development Workflow

### 1. Development Mode
```bash
npm run dev
```
- Hot module replacement
- Fast refresh
- Development server on port 5173

### 2. Building for Production
```bash
npm run build
```
- Optimized production build
- Minified code
- Asset optimization

### 3. Code Quality
```bash
npm run lint
```
- ESLint configuration
- TypeScript checking
- Code formatting

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 5173
   lsof -ti:5173 | xargs kill -9
   ```

2. **API connection errors**
   - Verify backend is running on `localhost:8080`
   - Check `.env` file configuration
   - Verify CORS settings on backend

3. **Build errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **TypeScript errors**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

### Debug Information
- Check browser console for detailed logs
- Verify environment variables are loaded
- Check network tab for API calls
- Verify localStorage contents for authentication state

## 📚 Additional Documentation

For detailed information about specific features, see:
- `ADMIN_AUTHENTICATION_README.md` - Admin authentication system
- `CLOUDINARY_SETUP.md` - File upload configuration
- `FILTERING_FEATURES.md` - Search and filtering capabilities
- `RATING_SYSTEM_README.md` - Response rating system
- `REGIONAL_AND_ATTACHMENTS.md` - Location and file management
- `SESSION_PERSISTENCE_README.md` - User session management
- `USER_SYSTEM_README.md` - User management system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Support

For questions and support:
- Create an issue in the repository
- Contact the development team
- Check the backend repository for API-related issues

## 📄 License

This project is part of the Citizen Engagement System initiative.

---

**Note**: This frontend application requires a running backend API server. Ensure the backend is properly configured and running before starting the frontend development server.

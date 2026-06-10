# FundNest - Refactored Project

A modern, modular funding platform for social innovation projects using vanilla JavaScript.

## Project Structure

```
WeJump Vibecoding 101/
├── index.html              # Main entry point (modular)
├── css/
│   └── style.css          # All styling (separated)
├── js/
│   ├── auth.js            # Authentication & user management
│   ├── projects.js        # Project management
│   ├── utils.js           # Utility functions
│   └── app.js             # Main application logic
└── README.md              # This file
```

## Features Implemented ✅

### 1. **Login System** ✅
- User registration and login authentication
- Secure session management using localStorage
- Unique email and username validation
- Password protection (6+ characters required)

### 2. **Launch Idea & Browse Ideas Pages** ✅
- Create new funding projects
- Browse all active projects
- Real-time project rendering

### 3. **Image Upload Support** ✅
- Upload project images (JPG, PNG, GIF, WebP)
- File size validation (max 5MB)
- Drag-and-drop functionality
- Base64 image storage
- Image preview before upload

### 4. **QR Code Generation** ✅
- **Implementation**: Uses the **qr-server.com API** (free, no download required)
- Generates shareable QR codes for each project
- Copy share link functionality
- Works completely with vanilla JavaScript (no external libraries)

### 5. **YouTube Video Support** ✅
- Add YouTube video URLs to projects
- Automatic video ID extraction
- Embedded video player on project cards
- Supports multiple YouTube URL formats:
  - `youtube.com/watch?v=VIDEO_ID`
  - `youtu.be/VIDEO_ID`
  - Direct video ID input

### 6. **User Profile Page** ✅
Display user statistics and activities:
- **Profile Information**: Name, email, username, join date
- **Statistics**: 
  - Number of projects created
  - Number of projects liked
  - Total amount donated
- **Liked Projects**: View all liked projects
- **Donated Projects**: View all projects you've donated to with amounts
- **Created Projects**: View your created projects with funding progress

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: Browser localStorage (no backend required)
- **QR Codes**: qr-server.com API (external service, no download)
- **Video**: YouTube iFrame API

## How to Use

### Getting Started
1. Open `index.html` in a modern web browser
2. Register a new account or login with credentials
3. Start exploring!

### Creating a Project
1. Navigate to "Launch Idea" tab
2. Fill in project details (title, description, funding goal)
3. Upload a project image (optional, drag-drop or click)
4. Add YouTube video URL (optional)
5. Click "Launch Your Idea"

### Supporting Projects
1. Go to "Browse Ideas" tab
2. View project details and videos
3. Click "Like" to like a project
4. Click "Share" to generate a QR code
5. Enter donation amount and click "Donate"

### Managing Your Profile
1. Click "Profile" button in header
2. View your statistics and activity
3. See all your liked, donated, and created projects

## Features Breakdown

### Authentication (auth.js)
- User registration with validation
- Login/logout functionality
- Session persistence
- User profile management
- Like/donation tracking per user

### Project Management (projects.js)
- Create new projects
- Store project metadata (images, videos, funding)
- Donation tracking and history
- Funding progress calculation
- Project retrieval and filtering

### Utilities (utils.js)
- File validation and conversion
- YouTube URL extraction
- QR code generation (via API)
- Email validation
- Currency and date formatting
- HTML escaping for security

### Main App (app.js)
- Login/Register UI management
- Main application interface
- Page navigation
- Form handling
- Project rendering
- Event management
- Profile display

## QR Code Implementation Note

⚠️ **Important**: This project generates QR codes using the free **qr-server.com API** rather than a client-side library. This approach:

✅ **Advantages**:
- No need to download/install third-party packages
- Uses vanilla JavaScript only
- Free and reliable service
- Works in all modern browsers

⚠️ **Considerations**:
- Requires internet connection for QR generation
- Depends on external API availability
- QR code is generated as an image URL, not embedded

**Alternative if needed**: If you require offline QR code generation, you would need to include a library like `qrcode.js` (which can be added later without modifying the architecture).

## Browser Compatibility

- Chrome/Edge (90+)
- Firefox (88+)
- Safari (14+)
- Modern mobile browsers

## Data Storage

All data is stored in browser localStorage:
- Users data: `fundnest_users`
- Current session: `fundnest_current_user`
- Projects: `fundnest_projects`

**Note**: Data persists locally in each browser. To clear all data, use browser Developer Tools → Application → Local Storage → Clear All.

## Code Quality

- **Pure Vanilla JavaScript** - No frameworks or build tools required
- **Modular Architecture** - Separate files for concerns
- **Security** - HTML escaping, password validation, secure session handling
- **Responsive Design** - Mobile-friendly CSS
- **Clean Code** - Well-commented, organized structure

## Future Enhancements

- Backend integration for data persistence
- User authentication with JWT
- Email verification
- Advanced search and filtering
- Payment gateway integration
- Social sharing features
- Comment system
- Project updates/milestones

## License

Open source - Free to use and modify
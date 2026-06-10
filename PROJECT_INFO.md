# FundNest - Project Overview

## Team Info

**Team Name:** FundNest
**Team Lead:** Aashrith
**Members:** Hanjimin, Hyojeong, Pranava

---

## The Idea

**One-Line Pitch:**
A crowdfunding platform where students, creators, and inventors showcase ideas and receive funding from supporters who believe in their potential.

**The Problem:**
Students and emerging inventors struggle to fund great ideas. Existing platforms like Kickstarter and GoFundMe are saturated, making it hard for brilliant concepts to stand out and reach the right audience.

**Our Solution:**
FundNest is a dedicated space for creators. Users can share ideas with images, videos, and real-time funding progress. Supporters can easily discover, like, and donate to projects. We're focused and simple—designed specifically for emerging talent.

**Who We're Building For:**
- Students with innovative ideas
- Young entrepreneurs and startups
- Artists and inventors
- Anyone with a great idea but limited funds

---

## Features

1. **Login & User Profiles** - Sign up, create profiles, track your stats
2. **Create Projects** - Launch ideas with title, description, images, and videos
3. **Image & Video Support** - Upload project images (drag-and-drop) and embed YouTube videos
4. **Browse & Discover** - Find and support other projects
5. **Donate** - Give money to projects you believe in
6. **Like Projects** - Save favorites to your profile
7. **QR Code Sharing** - Generate shareable QR codes for social media
8. **User Dashboard** - View your donations, liked projects, and created projects

---

## Tech Stack

**Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
**Data Storage:** Browser localStorage (for now)
**Future Backend:** Python/Node.js
**Future Database:** Google Firebase
**External APIs:** qr-server.com (QR codes), YouTube (video embedding)

**Why Vanilla JS?** No packages needed. Clean, lightweight, and runs directly in the browser.

---

## Current Status

✅ **Fully Functional**
- All features built and working
- User authentication
- Project creation and browsing
- Image uploads with drag-drop
- YouTube video support
- QR code generation
- Donation system
- User profiles and stats

---

## File Structure

```
FundNest/
├── index.html          # Main app
├── css/
│   └── style.css      # All styles
├── js/
│   ├── auth.js        # Login & users
│   ├── projects.js    # Project logic
│   ├── utils.js       # Helpers & QR codes
│   └── app.js         # Main app controller
```

---

## How to Use

1. Open `index.html` in your browser
2. Sign up or log in
3. Create a project or browse existing ones
4. Support projects you like by donating or liking them
5. Check your profile to see your activity

---

## What's Next?

- Backend server (Python/Node.js)
- Real database with Firebase
- Payment processing
- Comments and updates
- Mobile app

// ==================== MAIN APPLICATION MODULE ====================

class App {
    constructor() {
        this.currentImageData = null;
        this.init();
    }

    init() {
        // Check if user is logged in
        if (!authManager.isLoggedIn()) {
            this.showLoginPage();
        } else {
            this.showMainApp();
        }
    }

    // ==================== LOGIN PAGE ====================
    showLoginPage() {
        document.body.innerHTML = `
            <div class="login-page">
                <div class="login-container">
                    <h1>🚀 FundNest</h1>
                    <p class="subtitle">Where Social Ideas Find Their Home</p>
                    
                    <div class="login-tabs">
                        <button class="login-tab active" id="loginTabBtn">Login</button>
                        <button class="login-tab" id="registerTabBtn">Register</button>
                    </div>

                    <!-- Login Form -->
                    <form class="login-form active" id="loginForm">
                        <div class="form-group">
                            <label for="loginEmail">Email</label>
                            <input type="email" id="loginEmail" placeholder="Enter your email" required>
                        </div>
                        <div class="form-group">
                            <label for="loginPassword">Password</label>
                            <input type="password" id="loginPassword" placeholder="Enter your password" required>
                        </div>
                        <button type="submit" class="btn">Login</button>
                    </form>

                    <!-- Register Form -->
                    <form class="login-form" id="registerForm">
                        <div class="form-group">
                            <label for="registerFullName">Full Name</label>
                            <input type="text" id="registerFullName" placeholder="Enter your full name" required>
                        </div>
                        <div class="form-group">
                            <label for="registerUsername">Username</label>
                            <input type="text" id="registerUsername" placeholder="Choose a username" required>
                        </div>
                        <div class="form-group">
                            <label for="registerEmail">Email</label>
                            <input type="email" id="registerEmail" placeholder="Enter your email" required>
                        </div>
                        <div class="form-group">
                            <label for="registerPassword">Password</label>
                            <input type="password" id="registerPassword" placeholder="Create a password" required>
                        </div>
                        <button type="submit" class="btn">Register</button>
                    </form>

                    <div class="error-message" id="errorMessage"></div>
                </div>
            </div>
        `;

        this.setupLoginEvents();
    }

    setupLoginEvents() {
        const loginTabBtn = document.getElementById('loginTabBtn');
        const registerTabBtn = document.getElementById('registerTabBtn');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        // Tab switching
        loginTabBtn.addEventListener('click', () => {
            loginTabBtn.classList.add('active');
            registerTabBtn.classList.remove('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        });

        registerTabBtn.addEventListener('click', () => {
            registerTabBtn.classList.add('active');
            loginTabBtn.classList.remove('active');
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        });

        // Login form submission
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            const result = authManager.login(email, password);
            if (result.success) {
                this.showMainApp();
            } else {
                this.showError(result.message);
            }
        });

        // Register form submission
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('registerFullName').value.trim();
            const username = document.getElementById('registerUsername').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;

            if (!Utils.validateEmail(email)) {
                this.showError('Please enter a valid email address');
                return;
            }

            if (password.length < 6) {
                this.showError('Password must be at least 6 characters');
                return;
            }

            const result = authManager.register(username, email, password, fullName);
            if (result.success) {
                this.showError('Registration successful! Please login.', 'success');
                setTimeout(() => {
                    loginTabBtn.click();
                    document.getElementById('loginEmail').value = email;
                }, 1500);
            } else {
                this.showError(result.message);
            }
        });
    }

    showError(message, type = 'error') {
        const errorElement = document.getElementById('errorMessage');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.className = type === 'success' ? 'error-message show' : 'error-message show';
        }
    }

    // ==================== MAIN APP ====================
    showMainApp() {
        document.body.innerHTML = `
            <header>
                <h1>🚀 FundNest</h1>
                <div class="header-nav">
                    <button class="nav-btn active" onclick="app.switchPage('launch')">Launch Idea</button>
                    <button class="nav-btn" onclick="app.switchPage('browse')">Browse Ideas</button>
                    <button class="profile-btn" onclick="app.switchPage('profile')">Profile</button>
                    <button class="logout-btn" onclick="app.logout()">Logout</button>
                </div>
            </header>

            <div class="container">
                <!-- Launch Idea Page -->
                <div class="page active" id="launch-page">
                    <div class="launch-page">
                        <div class="success-message" id="successMessage">
                            ✓ Your idea has been launched successfully!
                        </div>
                        <div class="error-message" id="launchErrorMessage"></div>
                        
                        <section class="form-section">
                            <h2>Launch Your Idea</h2>
                            <p style="color: #6b7280; margin-bottom: 1.5rem; font-size: 0.95rem;">Share your innovative idea and help it find funding. Describe how your invention will make a positive impact.</p>
                            <form id="projectForm">
                                <div class="form-group">
                                    <label for="title">Project Title</label>
                                    <input type="text" id="title" placeholder="What is your amazing invention?" required>
                                </div>
                                <div class="form-group">
                                    <label for="description">Project Description & Social Impact</label>
                                    <textarea id="description" placeholder="Describe how your idea will bring positive changes to society..." required></textarea>
                                </div>
                                <div class="image-upload-group">
                                    <label for="projectImage">Project Image (Optional)</label>
                                    <p style="color: #6b7280; font-size: 0.85rem; margin-bottom: 0.5rem;">Accepted formats: JPG, PNG, GIF, WebP (Max 5MB)</p>
                                    <input type="file" id="projectImage" class="file-input" accept="image/*">
                                    <div class="image-preview" id="imagePreview">
                                        <div class="image-placeholder">Click to upload image or drag here</div>
                                    </div>
                                    <button type="button" class="btn btn-upload" onclick="document.getElementById('projectImage').click()">Choose Image</button>
                                </div>
                                <div class="form-group">
                                    <label for="videoUrl">YouTube Video URL (Optional)</label>
                                    <input type="text" id="videoUrl" placeholder="e.g., https://youtube.com/watch?v=...">
                                </div>
                                <div class="form-group">
                                    <label for="goal">Target Funding Goal ($)</label>
                                    <input type="number" id="goal" placeholder="Enter target goal amount" min="100" required>
                                </div>
                                <button type="submit" class="btn">🎯 Launch Your Idea</button>
                            </form>
                        </section>
                    </div>
                </div>

                <!-- Browse Ideas Page -->
                <div class="page" id="browse-page">
                    <section class="list-section">
                        <h2>🌟 Explore Active Ideas</h2>
                        <p style="color: #6b7280; margin-bottom: 1.5rem; font-size: 0.95rem;">Discover innovative projects and support the ideas you believe in.</p>
                        <div class="project-grid" id="projectGrid">
                            <!-- Project cards will be injected here -->
                        </div>
                        <div class="empty-state" id="emptyState" style="display: none;">
                            <h3>No ideas yet</h3>
                            <p>Be the first to launch an idea! Go to "Launch Idea" tab to get started.</p>
                        </div>
                    </section>
                </div>

                <!-- Profile Page -->
                <div class="page" id="profile-page">
                    <div class="profile-page">
                        <div class="profile-header">
                            <h2>👤 My Profile</h2>
                            <div id="profileInfo"></div>
                            <div class="profile-stats" id="profileStats"></div>
                        </div>

                        <div class="profile-section">
                            <h3>💚 Liked Projects</h3>
                            <div id="likedProjectsContainer"></div>
                        </div>

                        <div class="profile-section">
                            <h3>💰 Donated Projects</h3>
                            <div id="donatedProjectsContainer"></div>
                        </div>

                        <div class="profile-section">
                            <h3>🚀 My Created Projects</h3>
                            <div id="createdProjectsContainer"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- QR Code Modal -->
            <div class="modal" id="qrModal">
                <div class="modal-content">
                    <h2>Share Project</h2>
                    <p id="qrModalText"></p>
                    <div class="qr-code-container">
                        <img id="qrCodeImage" alt="QR Code">
                    </div>
                    <button class="btn btn-small" onclick="app.copyShareLink()">Copy Share Link</button>
                    <button class="modal-close" onclick="app.closeQRModal()">Close</button>
                </div>
            </div>
        `;

        this.setupMainAppEvents();
        this.renderProjects();
        this.renderProfile();
    }

    setupMainAppEvents() {
        const projectForm = document.getElementById('projectForm');
        const projectImage = document.getElementById('projectImage');
        const imagePreview = document.getElementById('imagePreview');

        // Image upload
        projectImage.addEventListener('change', (e) => this.handleImageUpload(e));

        // Drag and drop
        imagePreview.addEventListener('dragover', (e) => {
            e.preventDefault();
            imagePreview.style.borderColor = '#4f46e5';
            imagePreview.style.backgroundColor = '#eef2ff';
        });

        imagePreview.addEventListener('dragleave', (e) => {
            e.preventDefault();
            imagePreview.style.borderColor = '#d1d5db';
            imagePreview.style.backgroundColor = '#f3f4f6';
        });

        imagePreview.addEventListener('drop', (e) => {
            e.preventDefault();
            imagePreview.style.borderColor = '#d1d5db';
            imagePreview.style.backgroundColor = '#f3f4f6';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                projectImage.files = files;
                const changeEvent = new Event('change', { bubbles: true });
                projectImage.dispatchEvent(changeEvent);
            }
        });

        imagePreview.addEventListener('click', () => {
            projectImage.click();
        });

        // Form submission
        projectForm.addEventListener('submit', (e) => this.handleProjectSubmit(e));
    }

    async handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const validation = Utils.validateImageFile(file);
        if (!validation.valid) {
            Utils.showNotification(validation.message, 'error');
            return;
        }

        try {
            this.currentImageData = await Utils.fileToBase64(file);
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.innerHTML = `<img src="${this.currentImageData}" alt="Preview">`;
        } catch (error) {
            Utils.showNotification('Error loading image', 'error');
        }
    }

    handleProjectSubmit(e) {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const videoUrl = document.getElementById('videoUrl').value.trim();
        const goal = parseInt(document.getElementById('goal').value);

        if (!title || !description || goal < 100) {
            Utils.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Validate video URL if provided
        let videoId = null;
        if (videoUrl) {
            videoId = Utils.extractYoutubeId(videoUrl);
            if (!videoId) {
                Utils.showNotification('Invalid YouTube URL', 'error');
                return;
            }
        }

        const currentUser = authManager.getCurrentUser();
        const newProject = projectManager.createProject({
            creatorId: currentUser.id,
            creator: currentUser.fullName,
            title,
            description,
            image: this.currentImageData,
            videoUrl: videoId,
            goal
        });

        // Add to user's created projects
        authManager.updateUserProfile(currentUser.id, {
            createdProjects: [...(currentUser.createdProjects || []), newProject.id]
        });

        // Show success message
        const successMsg = document.getElementById('successMessage');
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 3000);

        // Reset form
        document.getElementById('projectForm').reset();
        this.currentImageData = null;
        document.getElementById('imagePreview').innerHTML = '<div class="image-placeholder">Click to upload image or drag here</div>';
    }

    renderProjects() {
        const projectGrid = document.getElementById('projectGrid');
        const emptyState = document.getElementById('emptyState');
        const projects = projectManager.getAllProjects();
        const currentUser = authManager.getCurrentUser();

        if (projects.length === 0) {
            projectGrid.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        projectGrid.innerHTML = '';

        projects.forEach(project => {
            const percent = projectManager.getFundingPercentage(project.id);
            const isFunded = projectManager.isFullyFunded(project.id);
            const isCompleted = isFunded ? 'Funded!' : `${percent}% Funded`;
            const isLiked = authManager.hasLikedProject(currentUser.id, project.id);

            let imageHtml = '';
            if (project.image) {
                imageHtml = `<div class="project-image"><img src="${project.image}" alt="${escapeHtml(project.title)}"></div>`;
            }

            let videoHtml = '';
            if (project.videoUrl) {
                const embedUrl = Utils.getYoutubeEmbedUrl(project.videoUrl);
                if (embedUrl) {
                    videoHtml = `
                        <div class="video-container">
                            <iframe src="${embedUrl}" allowfullscreen></iframe>
                        </div>
                    `;
                }
            }

            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                ${imageHtml}
                <span class="project-badge">💡 Creator Project</span>
                <h3 class="project-title">${escapeHtml(project.title)}</h3>
                <p class="project-creator">👤 ${escapeHtml(project.creator)}</p>
                <p class="project-desc">${escapeHtml(project.description)}</p>
                
                ${videoHtml}

                <div class="progress-container">
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${percent}%"></div>
                    </div>
                    <div class="progress-stats">
                        <span>${isCompleted}</span>
                        <span>${Utils.formatCurrency(project.current)} / ${Utils.formatCurrency(project.goal)}</span>
                    </div>
                </div>

                <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                    <button class="like-btn ${isLiked ? 'liked' : ''}" onclick="app.toggleLike(${project.id})">
                        ${isLiked ? '❤️ Liked' : '🤍 Like'}
                    </button>
                    <button class="btn btn-small" onclick="app.showQRCode(${project.id})">📱 Share</button>
                </div>

                <div class="donate-box">
                    <input type="number" class="donate-input" id="amount-${project.id}" placeholder="Donation ($)" min="1" max="10000">
                    <button class="btn donate-btn" onclick="app.donate(${project.id})">Donate</button>
                </div>
            `;
            projectGrid.appendChild(card);
        });
    }

    donate(projectId) {
        const inputField = document.getElementById(`amount-${projectId}`);
        const amount = parseInt(inputField.value);

        if (isNaN(amount) || amount <= 0) {
            Utils.showNotification('Please enter a valid donation amount', 'error');
            return;
        }

        const result = projectManager.donate(projectId, amount, authManager.getCurrentUser().id, authManager.getCurrentUser().fullName);
        if (result.success) {
            const currentUser = authManager.getCurrentUser();
            authManager.addDonatedProject(currentUser.id, projectId, amount);
            
            Utils.showNotification(`🎉 Thank you for your support! $${amount.toLocaleString()} donated.`, 'success');
            inputField.value = '';
            this.renderProjects();
        } else {
            Utils.showNotification(result.message, 'error');
        }
    }

    toggleLike(projectId) {
        const currentUser = authManager.getCurrentUser();
        if (authManager.hasLikedProject(currentUser.id, projectId)) {
            authManager.removeLikedProject(currentUser.id, projectId);
        } else {
            authManager.addLikedProject(currentUser.id, projectId);
        }
        this.renderProjects();
    }

    showQRCode(projectId) {
        const project = projectManager.getProjectById(projectId);
        if (!project) return;

        const shareUrl = `${window.location.origin}?project=${projectId}`;
        const qrCodeUrl = Utils.generateQRCode(shareUrl);

        this.currentShareLink = shareUrl;

        document.getElementById('qrModalText').textContent = `Share "${project.title}"`;
        document.getElementById('qrCodeImage').src = qrCodeUrl;
        document.getElementById('qrModal').classList.add('active');
    }

    closeQRModal() {
        document.getElementById('qrModal').classList.remove('active');
    }

    async copyShareLink() {
        if (this.currentShareLink) {
            try {
                await Utils.copyToClipboard(this.currentShareLink);
                Utils.showNotification('Share link copied to clipboard!', 'success');
            } catch (error) {
                Utils.showNotification('Failed to copy link', 'error');
            }
        }
    }

    renderProfile() {
        const currentUser = authManager.getCurrentUser();

        // Profile info
        const profileInfo = document.getElementById('profileInfo');
        profileInfo.innerHTML = `
            <p><strong>Name:</strong> ${escapeHtml(currentUser.fullName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(currentUser.email)}</p>
            <p><strong>Username:</strong> ${escapeHtml(currentUser.username)}</p>
            <p><strong>Member Since:</strong> ${Utils.formatDate(currentUser.createdAt)}</p>
        `;

        // Stats
        const createdCount = currentUser.createdProjects ? currentUser.createdProjects.length : 0;
        const likedCount = currentUser.likedProjects ? currentUser.likedProjects.length : 0;
        const totalDonations = (currentUser.donatedProjects || []).reduce((sum, d) => sum + d.amount, 0);

        const profileStats = document.getElementById('profileStats');
        profileStats.innerHTML = `
            <div class="stat-box">
                <div class="stat-value">${createdCount}</div>
                <div class="stat-label">Projects Created</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">${likedCount}</div>
                <div class="stat-label">Projects Liked</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">${Utils.formatCurrency(totalDonations)}</div>
                <div class="stat-label">Total Donated</div>
            </div>
        `;

        // Liked projects
        const likedContainer = document.getElementById('likedProjectsContainer');
        const likedProjects = (currentUser.likedProjects || []).map(id => projectManager.getProjectById(id)).filter(p => p);
        if (likedProjects.length === 0) {
            likedContainer.innerHTML = '<p style="color: #9ca3af;">No liked projects yet.</p>';
        } else {
            likedContainer.innerHTML = likedProjects.map(p => `
                <div class="project-card">
                    <h4>${escapeHtml(p.title)}</h4>
                    <p style="color: #6b7280; font-size: 0.85rem;">by ${escapeHtml(p.creator)}</p>
                </div>
            `).join('');
        }

        // Donated projects
        const donatedContainer = document.getElementById('donatedProjectsContainer');
        const donatedProjects = (currentUser.donatedProjects || []);
        if (donatedProjects.length === 0) {
            donatedContainer.innerHTML = '<p style="color: #9ca3af;">No donations yet.</p>';
        } else {
            donatedContainer.innerHTML = donatedProjects.map(d => {
                const project = projectManager.getProjectById(d.projectId);
                return `
                    <div class="project-card">
                        <h4>${project ? escapeHtml(project.title) : 'Project Deleted'}</h4>
                        <p style="color: #6b7280; font-size: 0.85rem;">Donated: ${Utils.formatCurrency(d.amount)} on ${Utils.formatDate(d.donatedAt)}</p>
                    </div>
                `;
            }).join('');
        }

        // Created projects
        const createdContainer = document.getElementById('createdProjectsContainer');
        const createdProjects = (currentUser.createdProjects || []).map(id => projectManager.getProjectById(id)).filter(p => p);
        if (createdProjects.length === 0) {
            createdContainer.innerHTML = '<p style="color: #9ca3af;">You haven\'t created any projects yet.</p>';
        } else {
            createdContainer.innerHTML = createdProjects.map(p => `
                <div class="project-card">
                    <h4>${escapeHtml(p.title)}</h4>
                    <p style="color: #6b7280; font-size: 0.85rem;">${Utils.formatCurrency(p.current)} / ${Utils.formatCurrency(p.goal)}</p>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${projectManager.getFundingPercentage(p.id)}%"></div>
                    </div>
                </div>
            `).join('');
        }
    }

    switchPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // Show selected page
        const pageElement = document.getElementById(pageName + '-page');
        if (pageElement) {
            pageElement.classList.add('active');
        }

        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Refresh projects when switching to browse
        if (pageName === 'browse') {
            this.renderProjects();
        }

        // Refresh profile when switching
        if (pageName === 'profile') {
            this.renderProfile();
        }
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            authManager.logout();
            this.init();
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

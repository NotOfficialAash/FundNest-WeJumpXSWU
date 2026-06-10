// ==================== AUTHENTICATION MODULE ====================

class AuthManager {
    constructor() {
        this.USERS_KEY = 'fundnest_users';
        this.CURRENT_USER_KEY = 'fundnest_current_user';
        this.users = this.loadUsers();
        this.currentUser = this.loadCurrentUser();
    }

    // Load users from localStorage
    loadUsers() {
        const stored = localStorage.getItem(this.USERS_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(this.users));
    }

    // Load current logged-in user
    loadCurrentUser() {
        const stored = localStorage.getItem(this.CURRENT_USER_KEY);
        return stored ? JSON.parse(stored) : null;
    }

    // Save current user
    saveCurrentUser() {
        if (this.currentUser) {
            localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(this.currentUser));
        }
    }

    // Register a new user
    register(username, email, password, fullName) {
        // Check if user already exists
        if (this.users.some(u => u.email === email || u.username === username)) {
            return { success: false, message: 'Email or username already exists' };
        }

        // Create new user object
        const newUser = {
            id: Date.now(),
            username,
            email,
            password, // Note: In production, this should be hashed
            fullName,
            createdAt: new Date().toISOString(),
            likedProjects: [],
            donatedProjects: [],
            createdProjects: []
        };

        this.users.push(newUser);
        this.saveUsers();
        return { success: true, message: 'Registration successful' };
    }

    // Login user
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        // Set current user (without password)
        this.currentUser = { ...user };
        delete this.currentUser.password;
        this.saveCurrentUser();
        
        return { success: true, message: 'Login successful', user: this.currentUser };
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem(this.CURRENT_USER_KEY);
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Update user profile
    updateUserProfile(userId, updateData) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            return { success: false, message: 'User not found' };
        }

        this.users[userIndex] = { ...this.users[userIndex], ...updateData };
        this.saveUsers();

        // Update current user if it's the logged-in user
        if (this.currentUser && this.currentUser.id === userId) {
            this.currentUser = { ...this.users[userIndex] };
            delete this.currentUser.password;
            this.saveCurrentUser();
        }

        return { success: true, message: 'Profile updated' };
    }

    // Add liked project to user
    addLikedProject(userId, projectId) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex === -1) return false;

        if (!this.users[userIndex].likedProjects.includes(projectId)) {
            this.users[userIndex].likedProjects.push(projectId);
            this.saveUsers();

            // Update current user
            if (this.currentUser && this.currentUser.id === userId) {
                this.currentUser.likedProjects = this.users[userIndex].likedProjects;
                this.saveCurrentUser();
            }
        }
        return true;
    }

    // Remove liked project from user
    removeLikedProject(userId, projectId) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex === -1) return false;

        this.users[userIndex].likedProjects = this.users[userIndex].likedProjects.filter(
            id => id !== projectId
        );
        this.saveUsers();

        // Update current user
        if (this.currentUser && this.currentUser.id === userId) {
            this.currentUser.likedProjects = this.users[userIndex].likedProjects;
            this.saveCurrentUser();
        }
        return true;
    }

    // Check if user liked a project
    hasLikedProject(userId, projectId) {
        const user = this.users.find(u => u.id === userId);
        return user ? user.likedProjects.includes(projectId) : false;
    }

    // Add donated project to user
    addDonatedProject(userId, projectId, amount) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex === -1) return false;

        const existingDonation = this.users[userIndex].donatedProjects.find(d => d.projectId === projectId);
        
        if (existingDonation) {
            existingDonation.amount += amount;
            existingDonation.lastDonatedAt = new Date().toISOString();
        } else {
            this.users[userIndex].donatedProjects.push({
                projectId,
                amount,
                donatedAt: new Date().toISOString(),
                lastDonatedAt: new Date().toISOString()
            });
        }

        this.saveUsers();

        // Update current user
        if (this.currentUser && this.currentUser.id === userId) {
            this.currentUser.donatedProjects = this.users[userIndex].donatedProjects;
            this.saveCurrentUser();
        }
        return true;
    }

    // Get user by ID
    getUserById(userId) {
        return this.users.find(u => u.id === userId);
    }
}

// Create global instance
const authManager = new AuthManager();

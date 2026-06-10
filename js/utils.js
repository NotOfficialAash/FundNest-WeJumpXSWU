// ==================== UTILITY FUNCTIONS ====================

class Utils {
    // Convert file to base64
    static fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Validate image file
    static validateImageFile(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            return { valid: false, message: 'Invalid file type. Please upload JPG, PNG, GIF, or WebP.' };
        }

        if (file.size > maxSize) {
            return { valid: false, message: 'File size exceeds 5MB limit.' };
        }

        return { valid: true };
    }

    // Extract YouTube video ID from URL
    static extractYoutubeId(url) {
        if (!url) return null;

        const regexes = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /^([a-zA-Z0-9_-]{11})$/
        ];

        for (let regex of regexes) {
            const match = url.match(regex);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    }

    // Generate QR code using external API (no download needed)
    static generateQRCode(data, size = 300) {
        // Using qr-server.com API (free, no authentication needed)
        const encodedData = encodeURIComponent(data);
        return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}`;
    }

    // Escape HTML to prevent XSS
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Format currency
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    // Format date
    static formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }

    // Get YouTube embed URL
    static getYoutubeEmbedUrl(videoId) {
        if (!videoId) return null;
        return `https://www.youtube.com/embed/${videoId}`;
    }

    // Validate email
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Generate unique ID
    static generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    }

    // Copy to clipboard
    static copyToClipboard(text) {
        return new Promise((resolve, reject) => {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text)
                    .then(resolve)
                    .catch(reject);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    resolve();
                } catch (err) {
                    reject(err);
                }
                document.body.removeChild(textArea);
            }
        });
    }

    // Show notification
    static showNotification(message, type = 'success', duration = 3000) {
        const messageElement = document.getElementById(type + 'Message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.classList.add('show');
            setTimeout(() => {
                messageElement.classList.remove('show');
            }, duration);
        }
    }
}

// Create utility functions for app
function switchPage(pageName) {
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
        renderProjects();
    }
}

function escapeHtml(text) {
    return Utils.escapeHtml(text);
}

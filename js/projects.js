// ==================== PROJECTS MODULE ====================

class ProjectManager {
    constructor() {
        this.PROJECTS_KEY = 'fundnest_projects';
        this.projects = this.loadProjects();
    }

    // Load projects from localStorage
    loadProjects() {
        const stored = localStorage.getItem(this.PROJECTS_KEY);
        if (stored) {
            return JSON.parse(stored);
        }

        // Initial demo data
        return [
            {
                id: 1,
                creatorId: 'demo1',
                creator: "Minji Kim (Student Inventor)",
                title: "Haptic-Based Smart Wearable Compass for the Visually Impaired",
                description: "An open-source hardware project designed to improve upon inconvenient voice guidance systems, helping users intuitively perceive directions and obstacles through subtle vibration patterns.",
                goal: 3000,
                current: 1250,
                image: null,
                videoUrl: null,
                createdAt: new Date().toISOString(),
                donors: []
            },
            {
                id: 2,
                creatorId: 'demo2',
                creator: "Team Kookhee (Design Alliance)",
                title: "Upcycled Modular Furniture from Wasted Plastic Bottle Caps",
                description: "We create unique, one-of-a-kind daily furniture by leveraging irregular aesthetics. A portion of the proceeds will be reinvested into local community environmental cleanups.",
                goal: 1500,
                current: 1500,
                image: null,
                videoUrl: null,
                createdAt: new Date().toISOString(),
                donors: []
            }
        ];
    }

    // Save projects to localStorage
    saveProjects() {
        localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(this.projects));
    }

    // Create a new project
    createProject(projectData) {
        const newProject = {
            id: Date.now(),
            creatorId: projectData.creatorId,
            creator: projectData.creator,
            title: projectData.title,
            description: projectData.description,
            goal: projectData.goal,
            current: 0,
            image: projectData.image || null,
            videoUrl: projectData.videoUrl || null,
            createdAt: new Date().toISOString(),
            donors: []
        };

        this.projects.unshift(newProject);
        this.saveProjects();
        return newProject;
    }

    // Get all projects
    getAllProjects() {
        return this.projects;
    }

    // Get project by ID
    getProjectById(projectId) {
        return this.projects.find(p => p.id === projectId);
    }

    // Get projects by creator
    getProjectsByCreator(creatorId) {
        return this.projects.filter(p => p.creatorId === creatorId);
    }

    // Donate to a project
    donate(projectId, amount, donorId, donorName) {
        const project = this.getProjectById(projectId);
        if (!project) return { success: false, message: 'Project not found' };

        if (amount <= 0 || amount > 10000) {
            return { success: false, message: 'Donation amount must be between $1 and $10,000' };
        }

        project.current += amount;

        // Add donor record
        const existingDonor = project.donors.find(d => d.donorId === donorId);
        if (existingDonor) {
            existingDonor.totalAmount += amount;
            existingDonor.donationCount += 1;
            existingDonor.lastDonatedAt = new Date().toISOString();
        } else {
            project.donors.push({
                donorId,
                donorName,
                totalAmount: amount,
                donationCount: 1,
                donatedAt: new Date().toISOString(),
                lastDonatedAt: new Date().toISOString()
            });
        }

        this.saveProjects();
        return { success: true, message: 'Donation successful', project };
    }

    // Get funding percentage
    getFundingPercentage(projectId) {
        const project = this.getProjectById(projectId);
        if (!project) return 0;
        return Math.min(Math.round((project.current / project.goal) * 100), 100);
    }

    // Check if project is fully funded
    isFullyFunded(projectId) {
        const project = this.getProjectById(projectId);
        if (!project) return false;
        return project.current >= project.goal;
    }

    // Get total donated amount by user to a project
    getUserDonationAmount(userId, projectId) {
        const project = this.getProjectById(projectId);
        if (!project) return 0;
        
        const donor = project.donors.find(d => d.donorId === userId);
        return donor ? donor.totalAmount : 0;
    }
}

// Create global instance
const projectManager = new ProjectManager();

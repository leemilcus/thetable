// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Data Storage (using localStorage for demo - in production, use backend)
let sermons = JSON.parse(localStorage.getItem('sermons')) || [
    {
        id: 1,
        title: "The Power of Community",
        speaker: "Pastor John",
        date: "2024-01-15",
        description: "Understanding the importance of fellowship at God's table.",
        audioUrl: "#",
        imageUrl: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        title: "Faith in Action",
        speaker: "Pastor Sarah",
        date: "2024-01-08",
        description: "Living out your faith in everyday situations.",
        audioUrl: "#",
        imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
];

let events = JSON.parse(localStorage.getItem('events')) || [
    {
        id: 1,
        title: "Men's Conference",
        date: "2024-02-15",
        time: "8:00 AM - 4:00 PM",
        location: "Church Main Hall",
        description: "A day of empowerment and fellowship for men."
    },
    {
        id: 2,
        title: "Women's Retreat",
        date: "2024-03-10",
        time: "All Day",
        location: "Mountain View Retreat Center",
        description: "A refreshing getaway for women to connect with God."
    },
    {
        id: 3,
        title: "Youth Night",
        date: "2024-01-20",
        time: "6:00 PM - 9:00 PM",
        location: "Youth Center",
        description: "Worship, games, and fellowship for teens."
    }
];

let projects = JSON.parse(localStorage.getItem('projects')) || [
    {
        id: 1,
        title: "Community Food Drive",
        description: "Provided meals for 500 families in our community.",
        date: "December 2023",
        imageUrl: "https://images.unsplash.com/photo-1593113598336-cb59a3c56e6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        title: "School Supply Giveaway",
        description: "Donated backpacks and supplies to 200 local students.",
        date: "January 2024",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-51767f47b746?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
];

// Load Sermons
function loadSermons() {
    const container = document.getElementById('sermons-container');
    if (!container) return;

    container.innerHTML = sermons.map(sermon => `
        <div class="sermon-card">
            <div class="sermon-image">
                <img src="${sermon.imageUrl}" alt="${sermon.title}">
            </div>
            <div class="sermon-content">
                <h3>${sermon.title}</h3>
                <p class="sermon-meta">${sermon.speaker} | ${formatDate(sermon.date)}</p>
                <p class="sermon-description">${sermon.description}</p>
                <div class="sermon-audio">
                    <audio controls>
                        <source src="${sermon.audioUrl}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Events
function loadEvents() {
    const container = document.getElementById('events-container');
    if (!container) return;

    container.innerHTML = events.map(event => `
        <div class="event-item">
            <div class="event-date">
                <strong>${formatDate(event.date)}</strong>
                <br>
                <small>${event.time}</small>
            </div>
            <div class="event-details">
                <h3>${event.title}</h3>
                <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                <p>${event.description}</p>
            </div>
            <a href="#" class="btn-event">RSVP</a>
        </div>
    `).join('');
}

// Load Projects
function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.imageUrl}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="sermon-meta">${project.date}</p>
                <p>${project.description}</p>
            </div>
        </div>
    `).join('');
}

// Format Date Helper
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Admin Panel (Simple implementation)
let isAdminLoggedIn = false;

// Secret admin access (in production, use proper authentication)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        toggleAdminPanel();
    }
});

function toggleAdminPanel() {
    let adminPanel = document.querySelector('.admin-panel');
    
    if (!adminPanel) {
        createAdminPanel();
    } else {
        adminPanel.classList.toggle('active');
    }
}

function createAdminPanel() {
    const adminPanel = document.createElement('div');
    adminPanel.className = 'admin-panel active';
    adminPanel.innerHTML = `
        <div class="admin-content">
            <div class="admin-nav">
                <h2>Admin Dashboard - The Table</h2>
                <button class="close-admin" onclick="this.closest('.admin-panel').classList.remove('active')">&times;</button>
            </div>
            <div class="admin-tabs">
                <button class="admin-tab active" onclick="showAdminTab('sermons')">Sermons</button>
                <button class="admin-tab" onclick="showAdminTab('events')">Events</button>
                <button class="admin-tab" onclick="showAdminTab('projects')">Projects</button>
            </div>
            <div id="admin-content">
                ${getAdminSermonsForm()}
            </div>
        </div>
    `;
    document.body.appendChild(adminPanel);
}

function showAdminTab(tab) {
    const content = document.getElementById('admin-content');
    const tabs = document.querySelectorAll('.admin-tab');
    
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    switch(tab) {
        case 'sermons':
            content.innerHTML = getAdminSermonsForm();
            break;
        case 'events':
            content.innerHTML = getAdminEventsForm();
            break;
        case 'projects':
            content.innerHTML = getAdminProjectsForm();
            break;
    }
}

function getAdminSermonsForm() {
    return `
        <div class="admin-form">
            <h3>Add New Sermon</h3>
            <input type="text" id="sermon-title" placeholder="Sermon Title" required>
            <input type="text" id="sermon-speaker" placeholder="Speaker" required>
            <input type="date" id="sermon-date" required>
            <textarea id="sermon-description" placeholder="Description" rows="3" required></textarea>
            <input type="url" id="sermon-audio" placeholder="Audio URL" required>
            <input type="url" id="sermon-image" placeholder="Image URL" required>
            <button onclick="addSermon()">Add Sermon</button>
            
            <h3 style="margin-top: 2rem;">Current Sermons</h3>
            <div style="max-height: 300px; overflow-y: auto;">
                ${sermons.map(s => `
                    <div style="border: 1px solid black; padding: 0.5rem; margin: 0.5rem 0; display: flex; justify-content: space-between; align-items: center;">
                        <span>${s.title} - ${s.speaker}</span>
                        <button onclick="deleteSermon(${s.id})" style="background: black; color: white; border: none; padding: 0.3rem 0.8rem; cursor: pointer;">Delete</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getAdminEventsForm() {
    return `
        <div class="admin-form">
            <h3>Add New Event</h3>
            <input type="text" id="event-title" placeholder="Event Title" required>
            <input type="date" id="event-date" required>
            <input type="text" id="event-time" placeholder="Time (e.g., 8:00 AM - 4:00 PM)" required>
            <input type="text" id="event-location" placeholder="Location" required>
            <textarea id="event-description" placeholder="Description" rows="3" required></textarea>
            <button onclick="addEvent()">Add Event</button>
            
            <h3 style="margin-top: 2rem;">Current Events</h3>
            <div style="max-height: 300px; overflow-y: auto;">
                ${events.map(e => `
                    <div style="border: 1px solid black; padding: 0.5rem; margin: 0.5rem 0; display: flex; justify-content: space-between; align-items: center;">
                        <span>${e.title} - ${e.date}</span>
                        <button onclick="deleteEvent(${e.id})" style="background: black; color: white; border: none; padding: 0.3rem 0.8rem; cursor: pointer;">Delete</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getAdminProjectsForm() {
    return `
        <div class="admin-form">
            <h3>Add New Project</h3>
            <input type="text" id="project-title" placeholder="Project Title" required>
            <input type="text" id="project-date" placeholder="Date (e.g., December 2023)" required>
            <textarea id="project-description" placeholder="Description" rows="3" required></textarea>
            <input type="url" id="project-image" placeholder="Image URL" required>
            <button onclick="addProject()">Add Project</button>
            
            <h3 style="margin-top: 2rem;">Current Projects</h3>
            <div style="max-height: 300px; overflow-y: auto;">
                ${projects.map(p => `
                    <div style="border: 1px solid black; padding: 0.5rem; margin: 0.5rem 0; display: flex; justify-content: space-between; align-items: center;">
                        <span>${p.title} - ${p.date}</span>
                        <button onclick="deleteProject(${p.id})" style="background: black; color: white; border: none; padding: 0.3rem 0.8rem; cursor: pointer;">Delete</button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Admin Functions
function addSermon() {
    const newSermon = {
        id: Date.now(),
        title: document.getElementById('sermon-title').value,
        speaker: document.getElementById('sermon-speaker').value,
        date: document.getElementById('sermon-date').value,
        description: document.getElementById('sermon-description').value,
        audioUrl: document.getElementById('sermon-audio').value,
        imageUrl: document.getElementById('sermon-image').value
    };
    
    sermons.push(newSermon);
    localStorage.setItem('sermons', JSON.stringify(sermons));
    loadSermons();
    
    // Refresh admin panel
    showAdminTab('sermons');
}

function addEvent() {
    const newEvent = {
        id: Date.now(),
        title: document.getElementById('event-title').value,
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        location: document.getElementById('event-location').value,
        description: document.getElementById('event-description').value
    };
    
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents();
    showAdminTab('events');
}

function addProject() {
    const newProject = {
        id: Date.now(),
        title: document.getElementById('project-title').value,
        date: document.getElementById('project-date').value,
        description: document.getElementById('project-description').value,
        imageUrl: document.getElementById('project-image').value
    };
    
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    loadProjects();
    showAdminTab('projects');
}

function deleteSermon(id) {
    sermons = sermons.filter(s => s.id !== id);
    localStorage.setItem('sermons', JSON.stringify(sermons));
    loadSermons();
    showAdminTab('sermons');
}

function deleteEvent(id) {
    events = events.filter(e => e.id !== id);
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents();
    showAdminTab('events');
}

function deleteProject(id) {
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('projects', JSON.stringify(projects));
    loadProjects();
    showAdminTab('projects');
}

// Form Submissions
document.addEventListener('DOMContentLoaded', () => {
    loadSermons();
    loadEvents();
    loadProjects();
    
    // New Convert Form
    const convertForm = document.getElementById('new-convert-form');
    if (convertForm) {
        convertForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In production, send to backend
            alert('Thank you for connecting with us! We will reach out to you soon.');
            convertForm.reset();
        });
    }
    
    // Feedback Form
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In production, send to backend
            alert('Thank you for your feedback! We appreciate you.');
            feedbackForm.reset();
        });
    }
});

// Ministry Details Modal
function showMinistryDetails(ministry) {
    const ministryInfo = {
        'sunday-school': {
            title: 'Sunday School',
            details: 'Our Sunday School ministry provides age-appropriate Bible teaching for children from toddlers to pre-teens. We meet every Sunday at 9:00 AM in the children\'s wing.',
            contact: 'Contact: children@thetable.org'
        },
        'youth': {
            title: 'Youth Ministry',
            details: 'For teens in grades 7-12, our youth ministry offers dynamic worship, relevant teaching, and fun activities. We meet Wednesdays at 7:00 PM and Fridays at 6:00 PM.',
            contact: 'Contact: youth@thetable.org'
        },
        'couples': {
            title: 'Couples Ministry',
            details: 'Whether you\'re dating, engaged, or married, our couples ministry provides resources, events, and community to help you build a Christ-centered relationship.',
            contact: 'Contact: couples@thetable.org'
        }
    };
    
    const info = ministryInfo[ministry];
    if (info) {
        alert(`${info.title}\n\n${info.details}\n\n${info.contact}`);
    }
}

// Helplytics AI - Storage Layer
// Initialize LocalStorage with dummy data if not exists

const DUMMY_USERS = [
  { id: 1, name: "Ayesha Khan", role: "Both", location: "Karachi",
    email: "ayesha@helplytics.ai", password: "demo123",
    skills: ["Figma","UI/UX","HTML/CSS","Career Guidance"],
    interests: ["Hackathons","UI/UX","Community Building"],
    trustScore: 100, contributions: 35,
    badges: ["Design Ally","Fast Responder","Top Mentor"] },

  { id: 2, name: "Hassan Ali", role: "Can Help", location: "Lahore",
    email: "hassan@helplytics.ai", password: "demo123",
    skills: ["JavaScript","React","Git/GitHub"],
    interests: ["Open Source","Web Dev"],
    trustScore: 88, contributions: 24,
    badges: ["Code Rescuer","Bug Hunter"] },

  { id: 3, name: "Sara Noor", role: "Both", location: "Remote",
    email: "sara@helplytics.ai", password: "demo123",
    skills: ["Python","Data Analysis"],
    interests: ["Data Science","Community"],
    trustScore: 74, contributions: 11,
    badges: ["Community Voice"] }
];

const DUMMY_REQUESTS = [
  { id: 1, title: "Need help", description: "helpn needed",
    category: "Web Development", urgency: "High", status: "Solved",
    tags: ["HTML","CSS"], posterId: 1, posterName: "Ayesha Khan",
    location: "Karachi", helperIds: [2], createdAt: "2026-04-18" },

  { id: 2, title: "Need help making my portfolio responsive before demo day",
    description: "My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.",
    category: "Web Development", urgency: "High", status: "Solved",
    tags: ["HTML/CSS","Responsive","Portfolio"], posterId: 3, posterName: "Sara Noor",
    location: "Karachi", helperIds: [1], createdAt: "2026-04-17" },

  { id: 3, title: "Looking for Figma feedback on a volunteer event poster",
    description: "I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.",
    category: "Design", urgency: "Medium", status: "Open",
    tags: ["Figma","Poster","Design Review"], posterId: 1, posterName: "Ayesha Khan",
    location: "Lahore", helperIds: [2], createdAt: "2026-04-16" },

  { id: 4, title: "Need mock interview support for internship applications",
    description: "Applying to frontend internships and need someone to practice behavioral and technical interview questions.",
    category: "Career", urgency: "Low", status: "Solved",
    tags: ["Interview Prep","Career","Frontend"], posterId: 3, posterName: "Sara Noor",
    location: "Remote", helperIds: [1,2], createdAt: "2026-04-15" }
];

const DUMMY_NOTIFICATIONS = [
  { id: 1, title: '"Need help" was marked as solved', type: "Status", time: "Just now", read: false },
  { id: 2, title: 'Ayesha Khan offered help on "Need help"', type: "Match", time: "Just now", read: false },
  { id: 3, title: 'Your request "Need help" is now live in the community feed', type: "Request", time: "Just now", read: false },
  { id: 4, title: 'New helper matched to your responsive portfolio request', type: "Match", time: "12 min ago", read: false },
  { id: 5, title: 'Your trust score increased after a solved request', type: "Reputation", time: "1 hr ago", read: false },
  { id: 6, title: 'AI Center detected rising demand for interview prep', type: "Insight", time: "Today", read: true }
];

const DUMMY_MESSAGES = [
  { id: 1, participants: ["Ayesha Khan", "Hassan Ali"],
    messages: [
      { sender: "Hassan Ali", text: "Hey, I can help with your CSS issue!", time: "10:30 AM" },
      { sender: "Ayesha Khan", text: "That would be amazing, thank you!", time: "10:32 AM" },
      { sender: "Hassan Ali", text: "Share your code and I'll review it.", time: "10:33 AM" }
    ]
  },
  { id: 2, participants: ["Ayesha Khan", "Sara Noor"],
    messages: [
      { sender: "Sara Noor", text: "I saw your Figma request, I can help!", time: "Yesterday" },
      { sender: "Ayesha Khan", text: "Perfect! Let me share the file.", time: "Yesterday" }
    ]
  }
];

// Initialize LocalStorage
if (!localStorage.getItem('hh_users')) {
  localStorage.setItem('hh_users', JSON.stringify(DUMMY_USERS));
}
if (!localStorage.getItem('hh_requests')) {
  localStorage.setItem('hh_requests', JSON.stringify(DUMMY_REQUESTS));
}
if (!localStorage.getItem('hh_notifications')) {
  localStorage.setItem('hh_notifications', JSON.stringify(DUMMY_NOTIFICATIONS));
}
if (!localStorage.getItem('hh_messages')) {
  localStorage.setItem('hh_messages', JSON.stringify(DUMMY_MESSAGES));
}

// Helper functions
function getUsers() {
  return JSON.parse(localStorage.getItem('hh_users')) || [];
}

function getRequests() {
  return JSON.parse(localStorage.getItem('hh_requests')) || [];
}

function getNotifications() {
  return JSON.parse(localStorage.getItem('hh_notifications')) || [];
}

function getMessages() {
  return JSON.parse(localStorage.getItem('hh_messages')) || [];
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('hh_current_user')) || null;
}

function saveRequests(arr) {
  localStorage.setItem('hh_requests', JSON.stringify(arr));
}

function saveUsers(arr) {
  localStorage.setItem('hh_users', JSON.stringify(arr));
}

function saveNotifications(arr) {
  localStorage.setItem('hh_notifications', JSON.stringify(arr));
}

function saveMessages(arr) {
  localStorage.setItem('hh_messages', JSON.stringify(arr));
}

function setCurrentUser(obj) {
  localStorage.setItem('hh_current_user', JSON.stringify(obj));
}

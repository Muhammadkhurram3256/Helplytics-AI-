// AI Center page JS - ai-center.html

// Auth guard
const currentUser = getCurrentUser();
if (!currentUser) {
  window.location.href = "auth.html";
}

const requests = getRequests();
const users = getUsers();

// Trend Pulse
const categoryCount = requests.reduce((acc, r) => {
  acc[r.category] = (acc[r.category] || 0) + 1;
  return acc;
}, {});
const trendCategory = Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b, 'None');

// Urgency Watch
const urgencyWatch = requests.filter(r => r.urgency === 'High' && r.status === 'Open').length;

// Mentor Pool
const mentorPool = users.filter(u => u.trustScore >= 80).length;

// Update stats
const statValues = document.querySelectorAll('.ai-stats-row .stat-value');
statValues[0].textContent = trendCategory;
statValues[1].textContent = urgencyWatch;
statValues[2].textContent = mentorPool;

// AI Recommendations
const openRequests = requests.filter(r => r.status === 'Open').sort((a, b) => {
  if (a.urgency === 'High' && b.urgency !== 'High') return -1;
  if (b.urgency === 'High' && a.urgency !== 'High') return 1;
  return 0;
});

const recoList = document.querySelector('.ai-reco-list');
recoList.innerHTML = '';
const icons = ['⚡', '🔥', '📊', '💡', '🚀'];
openRequests.forEach((req, i) => {
  const item = document.createElement('div');
  item.className = 'ai-reco-item';
  item.innerHTML = `
    <div class="ai-reco-icon">${icons[i % icons.length]}</div>
    <div class="ai-reco-content">
      <div class="ai-reco-title">${req.title}</div>
      <div class="ai-reco-summary">${rewriteSuggestion(req.title, req.category, req.urgency)}</div>
      <div class="badge-row">
        <span class="badge badge-category">${req.category}</span>
        <span class="badge badge-${req.urgency.toLowerCase()}">${req.urgency}</span>
      </div>
    </div>
  `;
  recoList.appendChild(item);
});
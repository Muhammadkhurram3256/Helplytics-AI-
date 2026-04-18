// Dashboard page JS - dashboard.html

// Auth guard
const currentUser = getCurrentUser();
if (!currentUser) {
  window.location.href = "auth.html";
}

// Populate user name
document.querySelector('.hero-banner h1').textContent = `Welcome back, ${currentUser.name}.`;

// Populate stat cards
const requests = getRequests();
const posted = requests.filter(r => r.posterId === currentUser.id).length;
const solved = requests.filter(r => r.posterId === currentUser.id && r.status === "Solved").length;
const trust = currentUser.trustScore + "%";
const contributions = currentUser.contributions;

const statValues = document.querySelectorAll('.stat-card .stat-value');
statValues[0].textContent = posted;
statValues[1].textContent = solved;
statValues[2].textContent = trust;
statValues[3].textContent = contributions;

// Populate Recent Requests
const userRequests = requests.filter(r => r.posterId === currentUser.id).slice(-3).reverse();
const requestItems = document.querySelectorAll('.request-list-item');
userRequests.forEach((req, i) => {
  if (requestItems[i]) {
    const titleEl = requestItems[i].querySelector('.request-list-title');
    const badgeRow = requestItems[i].querySelector('.badge-row');
    titleEl.textContent = req.title;
    badgeRow.innerHTML = `
      <span class="badge badge-category">${req.category}</span>
      <span class="badge badge-${req.urgency.toLowerCase()}">${req.urgency}</span>
      <span class="badge badge-${req.status.toLowerCase()}">${req.status}</span>
    `;
  }
});

// Populate AI Insights
const allRequests = getRequests();
const categoryCount = allRequests.reduce((acc, r) => {
  acc[r.category] = (acc[r.category] || 0) + 1;
  return acc;
}, {});
const trendCategory = Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b, '');

const urgencyWatch = allRequests.filter(r => r.urgency === "High" && r.status === "Open").length;

const users = getUsers();
const mentorPool = users.filter(u => u.trustScore >= 80).length;

const insightValues = document.querySelectorAll('.ai-insight-value');
insightValues[0].textContent = `${trendCategory} requests trending`;
insightValues[1].textContent = `${urgencyWatch} requests need immediate attention`;
insightValues[2].textContent = `${mentorPool} top helpers available`;
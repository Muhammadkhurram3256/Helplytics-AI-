// Request Detail page JS - request-detail.html

// Auth guard
const currentUser = getCurrentUser();
if (!currentUser) {
  window.location.href = "auth.html";
}

const params = new URLSearchParams(window.location.search);
const requestId = parseInt(params.get('id'));
const requests = getRequests();
const request = requests.find(r => r.id === requestId);
if (!request) {
  window.location.href = "explore.html"; // or error
}

const users = getUsers();

// Populate hero
const badgeRow = document.querySelector('.hero-banner .badge-row');
badgeRow.innerHTML = `
  <span class="badge badge-category">${request.category}</span>
  <span class="badge badge-${request.urgency.toLowerCase()}">${request.urgency}</span>
  <span class="badge badge-${request.status.toLowerCase()}">${request.status}</span>
`;
document.querySelector('.hero-banner h1').textContent = request.title;
document.querySelector('.hero-banner p').textContent = `Posted by ${request.posterName} · ${request.location} · ${request.helperIds.length} helpers ready`;

// AI summary
const aiSummaryP = document.querySelector('.ai-header + p');
aiSummaryP.textContent = rewriteSuggestion(request.title, request.category, request.urgency);
const tagPills = document.querySelector('.ai-header + p + .tag-pills');
tagPills.innerHTML = request.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');

// Full description
const fullDescP = document.querySelector('.card h2 + p');
fullDescP.textContent = request.description;

// Requester
const requesterAvatar = document.querySelector('.requester-block .avatar');
const requesterName = document.querySelector('.requester-name');
const requesterMeta = document.querySelector('.requester-meta');
const poster = users.find(u => u.id === request.posterId);
if (poster) {
  requesterAvatar.textContent = poster.name.split(' ').map(n => n[0]).join('').toUpperCase();
  requesterName.textContent = poster.name;
  requesterMeta.textContent = `${poster.location} · Trust Score ${poster.trustScore}%`;
}

// Helpers
const helpersCard = document.querySelector('.right-col .card:last-child');
const helpersContainer = helpersCard.querySelector('h2 + div');
helpersContainer.innerHTML = '';
request.helperIds.forEach(id => {
  const helper = users.find(u => u.id === id);
  if (helper) {
    const row = document.createElement('div');
    row.className = 'helper-row';
    row.innerHTML = `
      <div class="avatar avatar-dark">${helper.name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>
      <div class="helper-info">
        <div class="helper-name">${helper.name}</div>
        <div class="helper-skills">${helper.skills.join(', ')}</div>
      </div>
      <span class="badge badge-solved">${helper.trustScore}%</span>
    `;
    helpersContainer.appendChild(row);
  }
});

// Actions
const helpBtn = document.querySelector('.action-btns .btn-primary');
const solvedBtn = document.querySelector('.action-btns .btn-secondary');

if (request.helperIds.includes(currentUser.id)) {
  helpBtn.textContent = 'Helping ✓';
  helpBtn.disabled = true;
} else {
  helpBtn.addEventListener('click', function(e) {
    e.preventDefault();
    request.helperIds.push(currentUser.id);
    saveRequests(requests);
    currentUser.contributions += 1;
    currentUser.trustScore = calcTrustScore(currentUser, requests);
    const allUsers = getUsers();
    const userIndex = allUsers.findIndex(u => u.id === currentUser.id);
    allUsers[userIndex] = currentUser;
    saveUsers(allUsers);
    setCurrentUser(currentUser);
    const notifs = getNotifications();
    notifs.unshift({ id: Date.now(), title: `${currentUser.name} offered help on "${request.title}"`, type: "Match", time: "Just now", read: false });
    saveNotifications(notifs);
    // Re-render
    location.reload(); // simple way
  });
}

if (request.posterId === currentUser.id && request.status === 'Open') {
  solvedBtn.addEventListener('click', function(e) {
    e.preventDefault();
    request.status = 'Solved';
    saveRequests(requests);
    request.helperIds.forEach(id => {
      const helper = users.find(u => u.id === id);
      if (helper) {
        helper.trustScore = Math.min(helper.trustScore + 10, 100);
      }
    });
    saveUsers(users);
    const notifs = getNotifications();
    notifs.unshift({ id: Date.now(), title: `"${request.title}" was marked as solved`, type: "Status", time: "Just now", read: false });
    saveNotifications(notifs);
    // Update UI
    badgeRow.innerHTML = badgeRow.innerHTML.replace('badge-open', 'badge-solved').replace('Open', 'Solved');
    solvedBtn.disabled = true;
  });
} else {
  solvedBtn.disabled = true;
}
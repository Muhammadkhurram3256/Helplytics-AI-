// Leaderboard page JS - leaderboard.html

// Auth guard
const currentUser = getCurrentUser();
if (!currentUser) {
  window.location.href = "auth.html";
}

const requests = getRequests();
let users = getUsers();

// Recalculate trust scores
users.forEach(u => {
  u.trustScore = calcTrustScore(u, requests);
});
saveUsers(users);

// Sort by trustScore descending
users.sort((a, b) => b.trustScore - a.trustScore);

// Render rankings
const rankingsCard = document.querySelector('.leaderboard-grid .card:first-child');
const rankingsContainer = rankingsCard.querySelector('h2');
rankingsContainer.insertAdjacentHTML('afterend', '<div id="rankings-list"></div>');
const rankingsList = document.getElementById('rankings-list');
users.forEach((u, i) => {
  const row = document.createElement('div');
  row.className = 'leader-row';
  row.innerHTML = `
    <div class="leader-rank">#${i + 1}</div>
    <div class="avatar avatar-teal">${u.name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>
    <div class="leader-info">
      <div class="leader-name">${u.name}</div>
      <div class="leader-skills">${u.skills.join(', ')}</div>
    </div>
    <div class="leader-score">
      <div class="leader-score-val">${u.trustScore}%</div>
      <div class="leader-score-sub">${u.contributions} contributions</div>
    </div>
  `;
  rankingsList.appendChild(row);
});

// Render badge system
const badgeCard = document.querySelector('.leaderboard-grid .card:last-child');
const badgeContainer = badgeCard.querySelector('h2');
badgeContainer.insertAdjacentHTML('afterend', '<div id="badge-list"></div>');
const badgeList = document.getElementById('badge-list');
users.forEach(u => {
  const row = document.createElement('div');
  row.className = 'progress-row';
  row.innerHTML = `
    <div class="progress-name">
      <span class="progress-label">${u.name}</span>
      <span class="progress-pct">${u.trustScore}%</span>
    </div>
    <div class="progress-bar-track">
      <div class="progress-bar-fill" style="width: ${u.trustScore}%;"></div>
    </div>
    <div class="badge-list" style="margin-top: var(--space-sm);">
      ${u.badges.map(b => `<span class="badge-achievement">${b}</span>`).join('')}
    </div>
  `;
  if (badgeList.children.length > 0) {
    badgeList.appendChild(document.createElement('hr')).className = 'divider';
  }
  badgeList.appendChild(row);
});
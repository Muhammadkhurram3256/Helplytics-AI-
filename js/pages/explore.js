// Explore page JS - explore.html

// Auth guard
const currentUser = getCurrentUser();
if (!currentUser) {
  window.location.href = "auth.html";
}

const requests = getRequests();
const users = getUsers();
let filteredRequests = [...requests];

const feedList = document.querySelector('.feed-list');
const categorySelect = document.querySelector('.filter-sidebar select:nth-child(1)');
const urgencySelect = document.querySelector('.filter-sidebar select:nth-child(2)');
const skillsInput = document.querySelector('.filter-sidebar input:nth-child(1)');
const locationInput = document.querySelector('.filter-sidebar input:nth-child(2)');

function renderRequests(reqs) {
  feedList.innerHTML = '';
  reqs.forEach(req => {
    const helpersCount = req.helperIds.length;
    const card = document.createElement('div');
    card.className = 'request-card';
    card.innerHTML = `
      <div class="badge-row">
        <span class="badge badge-category">${req.category}</span>
        <span class="badge badge-${req.urgency.toLowerCase()}">${req.urgency}</span>
        <span class="badge badge-${req.status.toLowerCase()}">${req.status}</span>
      </div>
      <div class="request-card-title">${req.title}</div>
      <p class="request-card-desc">${req.description}</p>
      <div class="tag-pills">
        ${req.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
      </div>
      <div class="request-card-meta">
        <span>${req.posterName}</span>
        <span>·</span>
        <span>${req.location}</span>
        <span>·</span>
        <span>${helpersCount} helpers ready</span>
      </div>
      <a href="request-detail.html?id=${req.id}" class="btn btn-primary btn-sm" style="align-self: flex-start;">Open details</a>
    `;
    feedList.appendChild(card);
  });
}

function applyFilters() {
  let filtered = [...requests];
  const categoryValue = categorySelect.value;
  if (categoryValue !== 'All Categories') {
    const categoryMap = {
      'UI/UX Design': 'Design',
      'Web Development': 'Web Development',
      'Career': 'Career',
      'Data Science': 'Data Science',
      'Mobile Dev': 'General' // assuming
    };
    const cat = categoryMap[categoryValue] || categoryValue;
    filtered = filtered.filter(r => r.category === cat);
  }
  const urgencyValue = urgencySelect.value;
  if (urgencyValue !== 'All Urgencies') {
    const urgMap = {
      'Urgent': 'High',
      'Medium': 'Medium',
      'Low': 'Low'
    };
    const urg = urgMap[urgencyValue];
    filtered = filtered.filter(r => r.urgency === urg);
  }
  const skillsValue = skillsInput.value.trim().toLowerCase();
  if (skillsValue) {
    filtered = filtered.filter(r => r.tags.some(t => t.toLowerCase().includes(skillsValue)));
  }
  const locationValue = locationInput.value.trim().toLowerCase();
  if (locationValue) {
    filtered = filtered.filter(r => r.location.toLowerCase().includes(locationValue));
  }
  filteredRequests = filtered;
  renderRequests(filteredRequests);
}

categorySelect.addEventListener('change', applyFilters);
urgencySelect.addEventListener('change', applyFilters);
skillsInput.addEventListener('input', applyFilters);
locationInput.addEventListener('input', applyFilters);

// Initial render
renderRequests(requests);
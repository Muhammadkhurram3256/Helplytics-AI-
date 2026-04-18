// Create Request page JS - create-request.html

// Auth guard
const currentUser = getCurrentUser();
if (!currentUser) {
  window.location.href = "auth.html";
}

const titleInput = document.querySelector('.create-request-grid .card .form-input');
const descTextarea = document.querySelector('.create-request-grid .card .form-textarea');
const tagsInput = document.querySelectorAll('.create-request-grid .card .form-input')[2];
const categorySelect = document.querySelectorAll('.create-request-grid .card .form-select')[0];
const urgencySelect = document.querySelectorAll('.create-request-grid .card .form-select')[1];

const suggestedCategory = document.querySelector('.ai-row-val.text-accent');
const detectedUrgencyBadge = document.querySelector('.ai-row-val .badge');
const suggestedTagsDiv = document.querySelector('.ai-row div[style*="text-align: right"]');
const rewriteP = document.querySelector('.ai-row p');

function updateAI() {
  const text = titleInput.value + ' ' + descTextarea.value;
  const category = detectCategory(text);
  const urgency = detectUrgency(text);
  const tags = suggestTags(text);
  const rewrite = rewriteSuggestion(titleInput.value, category, urgency);

  suggestedCategory.textContent = category;
  detectedUrgencyBadge.className = `badge badge-${urgency.toLowerCase()}`;
  detectedUrgencyBadge.textContent = urgency;
  suggestedTagsDiv.innerHTML = tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
  rewriteP.textContent = rewrite;
}

titleInput.addEventListener('input', updateAI);
descTextarea.addEventListener('input', updateAI);

// Apply AI suggestions
document.querySelector('.form-btn-row .btn-outline').addEventListener('click', function(e) {
  e.preventDefault();
  const text = titleInput.value + ' ' + descTextarea.value;
  const category = detectCategory(text);
  const urgency = detectUrgency(text);
  const tags = suggestTags(text);

  // Map category
  const categoryMap = {
    'Design': 'UI/UX Design',
    'Web Development': 'Web Development',
    'Career': 'Career',
    'Data Science': 'Data Science',
    'General': 'Other'
  };
  categorySelect.value = categoryMap[category] || 'Other';

  // Map urgency
  const urgencyMap = {
    'High': 'Urgent — I need help within hours',
    'Medium': 'Medium — I need help within a day',
    'Low': 'Low — This can wait a few days'
  };
  urgencySelect.value = urgencyMap[urgency];

  tagsInput.value = tags.join(', ');
});

// Publish request
document.querySelector('.form-btn-row .btn-primary').addEventListener('click', function(e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title) {
    alert('Please enter a request title.');
    return;
  }
  const description = descTextarea.value.trim();
  const tags = tagsInput.value.split(',').map(s => s.trim());
  const categoryValue = categorySelect.value;
  const categoryMapReverse = {
    'UI/UX Design': 'Design',
    'Web Development': 'Web Development',
    'Career': 'Career',
    'Data Science': 'Data Science',
    'Mobile Dev': 'General',
    'Other': 'General'
  };
  const category = categoryMapReverse[categoryValue] || 'General';
  const urgencyValue = urgencySelect.value;
  const urgencyMapReverse = {
    'Urgent — I need help within hours': 'High',
    'Medium — I need help within a day': 'Medium',
    'Low — This can wait a few days': 'Low'
  };
  const urgency = urgencyMapReverse[urgencyValue] || 'Low';

  const newRequest = {
    id: Date.now(),
    title,
    description,
    category,
    urgency,
    tags,
    status: 'Open',
    posterId: currentUser.id,
    posterName: currentUser.name,
    location: currentUser.location,
    helperIds: [],
    createdAt: new Date().toLocaleDateString()
  };

  const requests = getRequests();
  requests.push(newRequest);
  saveRequests(requests);

  const notifs = getNotifications();
  notifs.unshift({ id: Date.now(), title: `Your request "${title}" is now live`, type: "Request", time: "Just now", read: false });
  saveNotifications(notifs);

  window.location.href = "explore.html";
});
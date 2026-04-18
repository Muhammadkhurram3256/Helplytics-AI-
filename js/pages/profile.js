// Profile page JS - profile.html

// Auth guard
const currentUser = getCurrentUser();
if (!currentUser) {
  window.location.href = "auth.html";
}

// Populate hero
document.querySelector('.hero-banner h1').textContent = currentUser.name;
document.querySelector('.hero-banner p').textContent = `${currentUser.role} · ${currentUser.location}`;

// Populate public profile
document.querySelector('.profile-stat-val').textContent = currentUser.trustScore + '%'; // first one
const statVals = document.querySelectorAll('.profile-stat-val');
statVals[1].textContent = currentUser.contributions;
const requests = getRequests();
const posted = requests.filter(r => r.posterId === currentUser.id).length;
const solved = requests.filter(r => r.posterId === currentUser.id && r.status === 'Solved').length;
statVals[2].textContent = posted;
statVals[3].textContent = solved;

const skillsPills = document.querySelector('.skills-section .tag-pills');
skillsPills.innerHTML = currentUser.skills.map(s => `<span class="tag-pill">${s}</span>`).join('');

const badgesRow = document.querySelector('.badge-row');
badgesRow.innerHTML = currentUser.badges.map(b => `<span class="badge badge-solved">${b}</span>`).join('');

// Populate edit form
const inputs = document.querySelectorAll('.card:last-child .form-input');
inputs[0].value = currentUser.name;
inputs[1].value = currentUser.location;
inputs[2].value = currentUser.skills.join(', ');
inputs[3].value = currentUser.interests.join(', ');

const select = document.querySelector('.card:last-child .form-select');
select.value = currentUser.role;

// Save profile
const saveBtn = document.querySelector('.card:last-child .btn-primary');
saveBtn.addEventListener('click', function(e) {
  e.preventDefault();
  const name = inputs[0].value;
  const location = inputs[1].value;
  const skills = inputs[2].value.split(',').map(s => s.trim());
  const interests = inputs[3].value.split(',').map(s => s.trim());
  const role = select.value;

  const updatedUser = { ...currentUser, name, location, skills, interests, role };
  setCurrentUser(updatedUser);

  const users = getUsers();
  const index = users.findIndex(u => u.id === currentUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    saveUsers(users);
  }

  // Show success message
  let msg = saveBtn.nextElementSibling;
  if (!msg || !msg.classList.contains('success-msg')) {
    msg = document.createElement('p');
    msg.className = 'success-msg';
    msg.style.color = 'var(--color-accent)';
    msg.style.marginTop = 'var(--space-sm)';
    saveBtn.parentNode.insertBefore(msg, saveBtn.nextSibling);
  }
  msg.textContent = 'Profile saved successfully ✓';
});
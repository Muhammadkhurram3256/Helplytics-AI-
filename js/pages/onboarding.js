// Onboarding page JS - onboarding.html

// Auth guard
const currentUser = getCurrentUser();
if (!currentUser) {
  window.location.href = "auth.html";
}

// Live AI suggestion
const skillsInput = document.querySelectorAll('.onboarding-form-card .form-input')[2];
const suggestionDiv = document.querySelector('.onboarding-form-card .ai-tags:not(.mb-md)');

skillsInput.addEventListener('input', function() {
  const value = this.value;
  const category = detectCategory(value);
  suggestionDiv.innerHTML = `<span class="tag-pill">${category}</span>`;
});

// Complete setup button click
document.querySelector('.onboarding-form-card .btn-primary').addEventListener('click', function(e) {
  e.preventDefault();
  const inputs = document.querySelectorAll('.onboarding-form-card .form-input');
  const name = inputs[0].value;
  const location = inputs[1].value;
  const skills = inputs[2].value.split(',').map(s => s.trim());
  const interests = inputs[3].value.split(',').map(s => s.trim());

  const updatedUser = { ...currentUser, name, location, skills, interests };
  setCurrentUser(updatedUser);

  const users = getUsers();
  const index = users.findIndex(u => u.id === currentUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    saveUsers(users);
  }

  window.location.href = "dashboard.html";
});
// Auth page JS - auth.html

// On page load: if current user exists, redirect to dashboard
const currentUser = getCurrentUser();
if (currentUser) {
  window.location.href = "dashboard.html";
}

// Continue to dashboard button click
document.querySelector('.auth-form-card .btn-primary').addEventListener('click', function(e) {
  e.preventDefault();
  const selectedName = document.querySelector('.auth-form-card select').value;
  const users = getUsers();
  const matchedUser = users.find(u => u.name === selectedName);
  if (matchedUser) {
    setCurrentUser(matchedUser);
    const notifs = getNotifications();
    notifs.unshift({ id: Date.now(), title: `Welcome back, ${matchedUser.name}!`, type: "System", time: "Just now", read: false });
    saveNotifications(notifs);
    window.location.href = "dashboard.html";
  }
});
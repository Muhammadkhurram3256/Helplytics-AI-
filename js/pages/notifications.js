// Notifications page JS - notifications.html

// Auth guard
const currentUser = getCurrentUser();
if (!currentUser) {
  window.location.href = "auth.html";
}

const notifs = getNotifications().sort((a, b) => b.id - a.id); // newest first
const notifCard = document.querySelector('.notif-card');
const notifRows = notifCard.querySelectorAll('.notif-row');
notifRows.forEach(row => row.remove()); // remove static

notifs.forEach(notif => {
  const row = document.createElement('div');
  row.className = 'notif-row';
  row.innerHTML = `
    <div>
      <div class="notif-title">${notif.title}</div>
      <div class="notif-meta">${notif.type} · ${notif.time}</div>
    </div>
    <span class="badge-${notif.read ? 'read' : 'unread'}">${notif.read ? 'Read' : 'Unread'}</span>
  `;
  row.addEventListener('click', () => {
    if (!notif.read) {
      notif.read = true;
      saveNotifications(notifs);
      row.querySelector('.badge-unread').textContent = 'Read';
      row.querySelector('.badge-unread').className = 'badge-read';
    }
  });
  notifCard.appendChild(row);
});
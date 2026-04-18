// Messages page JS - messages.html

// Auth guard
const currentUser = getCurrentUser();
if (!currentUser) {
  window.location.href = "auth.html";
}

const messages = getMessages();
const convList = document.querySelector('.conv-list');
const chatArea = document.querySelector('.chat-area');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input');
const sendBtn = document.querySelector('.chat-input-area .btn');

let activeThread = null;

// Render conversation list
function renderConvList() {
  convList.innerHTML = '';
  messages.forEach(thread => {
    if (thread.participants.includes(currentUser.name)) {
      const other = thread.participants.find(p => p !== currentUser.name);
      const lastMsg = thread.messages[thread.messages.length - 1];
      const item = document.createElement('div');
      item.className = 'conv-item';
      item.innerHTML = `
        <div class="avatar avatar-dark">${other.split(' ').map(n => n[0]).join('').toUpperCase()}</div>
        <div class="conv-info">
          <div class="conv-name">${other}</div>
          <div class="conv-preview">${lastMsg ? lastMsg.text : ''}</div>
        </div>
        <div class="conv-meta">
          <span class="conv-time">${lastMsg ? lastMsg.time : ''}</span>
        </div>
      `;
      item.addEventListener('click', () => loadThread(thread));
      convList.appendChild(item);
    }
  });
}

// Load thread
function loadThread(thread) {
  activeThread = thread;
  const other = thread.participants.find(p => p !== currentUser.name);
  document.querySelector('.chat-header-name').textContent = other;
  // Assume status
  document.querySelector('.chat-header-status').textContent = 'Online';
  renderMessages(thread);
}

// Render messages
function renderMessages(thread) {
  chatMessages.innerHTML = '';
  thread.messages.forEach(msg => {
    const row = document.createElement('div');
    row.className = msg.sender === currentUser.name ? 'msg-row msg-row-sent' : 'msg-row msg-row-received';
    row.innerHTML = `
      <div class="msg-bubble ${msg.sender === currentUser.name ? 'msg-bubble-sent' : 'msg-bubble-received'}">${msg.text}</div>
      <div class="msg-time">${msg.time}</div>
    `;
    chatMessages.appendChild(row);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message
function sendMessage() {
  const text = chatInput.value.trim();
  if (!text || !activeThread) return;
  const newMsg = { sender: currentUser.name, text, time: 'Just now' };
  activeThread.messages.push(newMsg);
  saveMessages(messages);
  renderMessages(activeThread);
  renderConvList(); // update preview
  chatInput.value = '';
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});

// Initial render
renderConvList();
if (messages.length > 0) {
  loadThread(messages[0]); // load first
}
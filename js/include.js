// Dynamically highlights the nav link matching the current page URL.
// Useful as a utility; page-specific nav-active classes in HTML are the fallback.
(function() {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function(link) {
    if (link.getAttribute('href') === page) {
      link.classList.add('nav-active');
    }
  });
})();

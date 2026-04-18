// Helplytics AI - AI Simulation Logic

function detectCategory(text) {
  var t = text.toLowerCase();
  if (t.includes('css') || t.includes('html') || t.includes('javascript') || t.includes('react') || t.includes('portfolio') || t.includes('responsive') || t.includes('web') || t.includes('frontend')) return "Web Development";
  if (t.includes('figma') || t.includes('design') || t.includes('poster') || t.includes('ui') || t.includes('ux') || t.includes('wireframe') || t.includes('layout')) return "Design";
  if (t.includes('interview') || t.includes('internship') || t.includes('career') || t.includes('resume') || t.includes('job') || t.includes('cv')) return "Career";
  if (t.includes('python') || t.includes('data') || t.includes('analysis') || t.includes('machine learning') || t.includes('pandas')) return "Data Science";
  if (t.includes('community') || t.includes('event') || t.includes('volunteer') || t.includes('team')) return "Community";
  return "General";
}

function detectUrgency(text) {
  var t = text.toLowerCase();
  if (t.includes('urgent') || t.includes('asap') || t.includes('today') || t.includes('tonight') || t.includes('deadline') || t.includes('tomorrow') || t.includes('immediately') || t.includes('critical')) return "High";
  if (t.includes('soon') || t.includes('this week') || t.includes('few days') || t.includes('next week')) return "Medium";
  return "Low";
}

function suggestTags(text) {
  var bank = ["HTML","CSS","JavaScript","React","Figma","Python","UI/UX","Responsive","Portfolio","Career","Interview","Design","Data","Git"];
  var t = text.toLowerCase();
  return bank.filter(tag => t.includes(tag.toLowerCase())).slice(0, 5);
}

function rewriteSuggestion(title, category, urgency) {
  return `${category} request with ${urgency.toLowerCase()} urgency. Best suited for members with relevant ${category} expertise who can respond quickly.`;
}

function calcTrustScore(user, requests) {
  var base = 50;
  var solved = requests.filter(r => r.helperIds.includes(user.id) && r.status === 'Solved').length;
  var helped = requests.filter(r => r.helperIds.includes(user.id)).length;
  return Math.min(base + solved * 10 + helped * 5, 100);
}

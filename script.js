// Dev Dhanush portfolio interactions
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('dev-dhanush-theme');
if (savedTheme === 'light') body.classList.add('light');
themeToggle.textContent = body.classList.contains('light') ? '☾' : '☼';
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const light = body.classList.contains('light');
  themeToggle.textContent = light ? '☾' : '☼';
  localStorage.setItem('dev-dhanush-theme', light ? 'light' : 'dark');
});

// Cursor-following glow and subtle progress line.
const glow = document.querySelector('.cursor-glow');
let pointerX = innerWidth / 2, pointerY = innerHeight / 2;
window.addEventListener('pointermove', e => {
  pointerX = e.clientX; pointerY = e.clientY;
  if (glow) { glow.style.left = pointerX + 'px'; glow.style.top = pointerY + 'px'; }
}, {passive:true});
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  document.querySelector('.scroll-progress').style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
}, {passive:true});

// Reveal elements as they enter the viewport.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Music: attempt autoplay, but browsers commonly block sound until a user gesture.
// The always-visible player lets visitors start or pause the supplied Suzume.mp3.
const audio = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const musicStatus = document.getElementById('musicStatus');
const musicPlayer = document.getElementById('musicPlayer');
const musicMute = document.getElementById('musicMute');
audio.volume = 0.35;
function updateMusicUI() {
  const playing = !audio.paused;
  musicToggle.textContent = playing ? 'Ⅱ' : '▶';
  musicStatus.textContent = playing ? 'NOW PLAYING' : 'CLICK TO PLAY';
  musicPlayer.classList.toggle('playing', playing);
  musicMute.textContent = audio.muted ? '×' : '♪';
}
async function playMusic() {
  try { await audio.play(); updateMusicUI(); }
  catch (_) { musicStatus.textContent = 'TAP ▶ TO PLAY'; }
}
musicToggle.addEventListener('click', async () => {
  if (audio.paused) await playMusic();
  else { audio.pause(); updateMusicUI(); }
});
musicMute.addEventListener('click', () => { audio.muted = !audio.muted; updateMusicUI(); });
audio.addEventListener('play', updateMusicUI);
audio.addEventListener('pause', updateMusicUI);
audio.addEventListener('ended', updateMusicUI);
window.addEventListener('load', () => { playMusic(); });

// Project list is intentionally easy to edit. Update the cards in index.html too
// when you want custom project visuals; this list controls the displayed count.
const projects = [
  { name: 'CodeX', description: 'Coding helper bot', url: 'https://discord.com/oauth2/authorize?client_id=1551477036416106606&permissions=8&integration_type=0&scope=bot' },
  { name: 'Web Experiments', description: 'Creative web concepts', url: 'https://github.com/jizzyog041-boop' },
  { name: 'Dev Tools & Bots', description: 'Tools and automation', url: 'https://github.com/jizzyog041-boop' }
];
document.getElementById('projectCount').textContent = String(projects.length).padStart(2, '0');

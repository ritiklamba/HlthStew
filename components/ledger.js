function initDotGrid() {
  const grid = document.getElementById('dotGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const saved = JSON.parse(localStorage.getItem('hlthstew_dots') || '[]');
  for (let i = 0; i < 45; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot ' + (saved[i] || 'dot-empty');
    dot.title = `Day ${i + 1}`;
    dot.addEventListener('click', () => cycleDot(dot, i));
    grid.appendChild(dot);
  }
}

function cycleDot(dot, idx) {
  const states = ['dot-empty', 'dot-done', 'dot-miss'];
  const current = states.findIndex(s => dot.classList.contains(s));
  const next = states[(current + 1) % states.length];
  states.forEach(s => dot.classList.remove(s));
  dot.classList.add(next);
  const saved = JSON.parse(localStorage.getItem('hlthstew_dots') || '[]');
  saved[idx] = next;
  localStorage.setItem('hlthstew_dots', JSON.stringify(saved));
}

document.addEventListener('DOMContentLoaded', () => {
  initDotGrid();
  const dateEl = document.getElementById('ledgerDate');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-US',
      { weekday: 'long', month: 'long', day: 'numeric' });
  }
});
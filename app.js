let debounceTimer;
function debounce(fn, delay = 100) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fn, delay);
}
const TARGETS = { calories: 3000, protein: 200, carbs: 400, fats: 80 };
let totals = { calories: 0, protein: 0, carbs: 0, fats: 0 };
let loggedItems = [];

function updateAll() {
  updateVessel();
  updateRings();
  saveToStorage();
}

function recalcTotals() {
  totals = { calories: 0, protein: 0, carbs: 0, fats: 0 };
  loggedItems.forEach(item => {
    totals.calories += item.calories;
    totals.protein += item.protein;
    totals.carbs += item.carbs;
    totals.fats += item.fats;
  });
}

document.getElementById('foodInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && this.value.trim()) {
    const parsed = parseFood(this.value.trim());
    if (parsed) {
      loggedItems.push(parsed);
      recalcTotals();
      addLoggedItem(parsed, loggedItems.length - 1);
      this.value = '';
      document.getElementById('ghostText').textContent = 'Start typing to see estimates...';
      debounce(updateAll);
    }
  }
});

let ghostTimer;
document.getElementById('foodInput').addEventListener('input', function() {
  clearTimeout(ghostTimer);
  ghostTimer = setTimeout(() => {
    if (this.value.trim()) {
      const parsed = parseFood(this.value.trim());
      if (parsed) {
        document.getElementById('ghostText').textContent =
          `~${parsed.calories} kcal · P ${parsed.protein}g · C ${parsed.carbs}g · F ${parsed.fats}g`;
      }
    } else {
      document.getElementById('ghostText').textContent = 'Start typing to see estimates...';
    }
  }, 300);
});

function addLoggedItem(item, idx) {
  const list = document.getElementById('loggedList');
  const div = document.createElement('div');
  div.className = 'logged-item';
  div.dataset.idx = idx;
  div.innerHTML = `<span>${item.name}</span><span class="item-kcal">${item.calories} kcal</span><span class="item-del">×</span>`;
  div.querySelector('.item-del').addEventListener('click', () => removeItem(div));
  list.appendChild(div);
}

function removeItem(el) {
  const idx = parseInt(el.dataset.idx);
  loggedItems.splice(idx, 1);
  el.remove();
  recalcTotals();
  rerenderList();
 debounce(updateAll);
}

function rerenderList() {
  const list = document.getElementById('loggedList');
  list.innerHTML = '';
  loggedItems.forEach((item, idx) => addLoggedItem(item, idx));
}

document.getElementById('exportBtn').addEventListener('click', exportLog);
document.getElementById('ledgerArea').addEventListener('input', saveToStorage);

const today = new Date();
document.getElementById('ledgerDate').textContent =
  today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

initDotGrid();
loadFromStorage();
debounce(updateAll);
function safeRead(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function currentDateKey() {
  return new Date().toDateString();
}

function saveToStorage() {
  localStorage.setItem('hlthstew_totals', JSON.stringify(totals));
  localStorage.setItem('hlthstew_items', JSON.stringify(loggedItems));
  localStorage.setItem(`hlthstew_ledger_${currentDateKey()}`, document.getElementById('ledgerArea').value);
}

function loadFromStorage() {
  const today = currentDateKey();
  const savedDate = localStorage.getItem('hlthstew_date');
  const savedTotals = safeRead('hlthstew_totals', null);
  const savedItems = safeRead('hlthstew_items', []);

  if (savedTotals && savedDate && savedDate !== today) {
    saveHistoryDay(savedTotals, savedDate);
    localStorage.setItem('hlthstew_totals', JSON.stringify({ calories: 0, protein: 0, carbs: 0, fats: 0 }));
    localStorage.setItem('hlthstew_items', JSON.stringify([]));
  } else if (savedTotals) {
    Object.assign(totals, savedTotals);
    savedItems.forEach((item, index) => { loggedItems.push(item); addLoggedItem(item, index); });
  }
  localStorage.setItem('hlthstew_date', today);

  const ledger = localStorage.getItem(`hlthstew_ledger_${today}`) || '';
  if (ledger) document.getElementById('ledgerArea').value = ledger;
}

function saveHistoryDay(dayTotals, date) {
  const history = safeRead('hlthstew_history', []);
  if (!dayTotals || Object.values(dayTotals).every(value => Number(value) === 0)) return;
  history.push({ ...dayTotals, date });
  if (history.length > 30) history.shift();
  localStorage.setItem('hlthstew_history', JSON.stringify(history));
}

function exportLog() {
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const ledger = document.getElementById('ledgerArea').value;
  const md = `# HlthStew Log — ${date}\n\n## Nutrition\n- Calories: ${totals.calories} kcal\n- Protein: ${totals.protein}g\n- Carbs: ${totals.carbs}g\n- Fats: ${totals.fats}g\n\n## Ledger\n${ledger}`;
  const blob = new Blob([md], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `hlthstew-${new Date().toISOString().split('T')[0]}.md`;
  a.click();
}


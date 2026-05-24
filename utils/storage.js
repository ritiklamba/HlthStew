function saveToStorage() {
  localStorage.setItem('hlthstew_totals', JSON.stringify(totals));
  localStorage.setItem('hlthstew_items', JSON.stringify(loggedItems));
  localStorage.setItem('hlthstew_ledger', document.getElementById('ledgerArea').value);
}

function loadFromStorage() {
  const savedTotals = localStorage.getItem('hlthstew_totals');
  if (savedTotals) {
    const t = JSON.parse(savedTotals);
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('hlthstew_date');
    if (savedDate === today) {
      Object.assign(totals, t);
      const items = JSON.parse(localStorage.getItem('hlthstew_items') || '[]');
      items.forEach(item => { loggedItems.push(item); addLoggedItem(item); });
    } else {
      saveHistoryDay();
      localStorage.setItem('hlthstew_date', today);
    }
  } else {
    localStorage.setItem('hlthstew_date', new Date().toDateString());
  }
  const ledger = localStorage.getItem('hlthstew_ledger');
  if (ledger) document.getElementById('ledgerArea').value = ledger;
}

function saveHistoryDay() {
  const history = JSON.parse(localStorage.getItem('hlthstew_history') || '[]');
  history.push({ ...totals, date: new Date().toDateString() });
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

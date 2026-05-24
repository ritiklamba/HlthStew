let chronosChart = null;

function initGraph() {
  const ctx = document.getElementById('chronosChart').getContext('2d');
  const history = JSON.parse(localStorage.getItem('hlthstew_history') || '[]');
  const labels = history.map((_, i) => `Day ${i + 1}`);
  const calData = history.map(d => d.calories || 0);
  const proData = history.map(d => d.protein || 0);
  const carbData = history.map(d => d.carbs || 0);

  chronosChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels.length ? labels : ['Day 1'],
      datasets: [
        { label: 'Calories', data: calData.length ? calData : [0], borderColor: '#993C1D', borderWidth: 2, tension: 0.4, pointRadius: 2, pointBackgroundColor: '#993C1D' },
        { label: 'Protein', data: proData.length ? proData : [0], borderColor: '#3B6D11', borderWidth: 1.5, tension: 0.4, pointRadius: 2, pointBackgroundColor: '#3B6D11' },
        { label: 'Carbs', data: carbData.length ? carbData : [0], borderColor: '#854F0B', borderWidth: 1.5, tension: 0.4, pointRadius: 2, pointBackgroundColor: '#854F0B' },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: '#E2D5C3' }, ticks: { color: '#B0A090', font: { size: 10 } } },
        y: { grid: { color: '#E2D5C3' }, ticks: { color: '#B0A090', font: { size: 10 } } }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', initGraph);

// Settings Panel
function initSettings() {
  const defaults = {
    name: 'Aryan',
    currentWeight: 61.5,
    targetWeight: 80,
    targetCalories: 3000,
    targetProtein: 200,
    targetCarbs: 400,
    targetFats: 80,
    cycleLength: 45,
    currentDay: 12,
    cycleName: 'Bulk cycle'
  };

  const saved = JSON.parse(localStorage.getItem('hlthstew_settings') || '{}');
  const settings = { ...defaults, ...saved };
  applySettings(settings);

  // Build panel HTML
  const panel = document.createElement('div');
  panel.id = 'settingsPanel';
  panel.className = 'settings-overlay hidden';
  panel.innerHTML = `
    <div class="settings-card">
      <div class="settings-header">
        <span class="settings-title">Settings</span>
        <span class="settings-close" id="settingsClose">✕</span>
      </div>
      <div class="settings-body">
        <div class="settings-group">
          <label>Name</label>
          <input type="text" id="s-name" value="${settings.name}" />
        </div>
        <div class="settings-group">
          <label>Current Weight (kg)</label>
          <input type="number" id="s-cweight" value="${settings.currentWeight}" step="0.1" />
        </div>
        <div class="settings-group">
          <label>Target Weight (kg)</label>
          <input type="number" id="s-tweight" value="${settings.targetWeight}" step="0.1" />
        </div>
        <div class="settings-group">
          <label>Daily Calorie Target</label>
          <input type="number" id="s-calories" value="${settings.targetCalories}" step="50" />
        </div>
        <div class="settings-group">
          <label>Protein Target (g)</label>
          <input type="number" id="s-protein" value="${settings.targetProtein}" step="5" />
        </div>
        <div class="settings-group">
          <label>Carbs Target (g)</label>
          <input type="number" id="s-carbs" value="${settings.targetCarbs}" step="10" />
        </div>
        <div class="settings-group">
          <label>Fats Target (g)</label>
          <input type="number" id="s-fats" value="${settings.targetFats}" step="5" />
        </div>
        <div class="settings-group">
          <label>Cycle Length (days)</label>
          <input type="number" id="s-cycle" value="${settings.cycleLength}" step="1" />
        </div>
        <div class="settings-group">
          <label>Current Day</label>
          <input type="number" id="s-day" value="${settings.currentDay}" step="1" />
        </div>
        <div class="settings-group">
          <label>Cycle Name</label>
          <input type="text" id="s-cyclename" value="${settings.cycleName}" />
        </div>
        <button class="settings-save" id="settingsSave">Save Changes</button>
      </div>
    </div>
  `;
  document.body.appendChild(panel);

  document.getElementById('settingsBtn').addEventListener('click', () => {
    panel.classList.remove('hidden');
  });
  document.getElementById('settingsClose').addEventListener('click', () => {
    panel.classList.add('hidden');
  });
  panel.addEventListener('click', (e) => {
    if (e.target === panel) panel.classList.add('hidden');
  });
  document.getElementById('settingsSave').addEventListener('click', saveSettings);
}

function saveSettings() {
  const settings = {
    name: document.getElementById('s-name').value,
    currentWeight: parseFloat(document.getElementById('s-cweight').value),
    targetWeight: parseFloat(document.getElementById('s-tweight').value),
    targetCalories: parseInt(document.getElementById('s-calories').value),
    targetProtein: parseInt(document.getElementById('s-protein').value),
    targetCarbs: parseInt(document.getElementById('s-carbs').value),
    targetFats: parseInt(document.getElementById('s-fats').value),
    cycleLength: parseInt(document.getElementById('s-cycle').value),
    currentDay: parseInt(document.getElementById('s-day').value),
    cycleName: document.getElementById('s-cyclename').value
  };
  localStorage.setItem('hlthstew_settings', JSON.stringify(settings));
  applySettings(settings);
  document.getElementById('settingsPanel').classList.add('hidden');
}

function applySettings(s) {
  TARGETS.calories = s.targetCalories;
  TARGETS.protein = s.targetProtein;
  TARGETS.carbs = s.targetCarbs;
  TARGETS.fats = s.targetFats;

  document.querySelector('.session-text').textContent = s.name;
  document.querySelector('.avatar').textContent = s.name.charAt(0).toUpperCase();
  document.querySelector('.bio-pill').innerHTML = `${s.currentWeight} kg <span class="arr">→</span> ${s.targetWeight} kg`;
  document.querySelector('.day-counter').innerHTML = `Day <strong>${s.currentDay}</strong> of ${s.cycleLength}`;
  document.querySelector('.cycle-label').textContent = s.cycleName;
  document.getElementById('watchProgress').textContent = `${s.currentDay} / ${s.cycleLength}`;

  const ringTargets = document.querySelectorAll('.ring-target');
  if (ringTargets[0]) ringTargets[0].textContent = `/ ${s.targetProtein}g`;
  if (ringTargets[1]) ringTargets[1].textContent = `/ ${s.targetCarbs}g`;
  if (ringTargets[2]) ringTargets[2].textContent = `/ ${s.targetFats}g`;
}

document.addEventListener('DOMContentLoaded', initSettings);
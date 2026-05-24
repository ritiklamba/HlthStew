function initPIN() {
  const savedPIN = localStorage.getItem('hlthstew_pin');

  // Build overlay
  const overlay = document.createElement('div');
  overlay.id = 'pinOverlay';
  overlay.className = 'pin-overlay';
  overlay.innerHTML = `
    <div class="pin-card">
      <div class="pin-logo">hlthstew</div>
      <div class="pin-subtitle" id="pinSubtitle">${savedPIN ? 'Enter your PIN' : 'Create a PIN'}</div>
      <div class="pin-dots">
        <div class="pin-dot" id="pd0"></div>
        <div class="pin-dot" id="pd1"></div>
        <div class="pin-dot" id="pd2"></div>
        <div class="pin-dot" id="pd3"></div>
      </div>
      <div class="pin-error" id="pinError"></div>
      <div class="pin-grid">
        <button class="pin-btn" data-val="1">1</button>
        <button class="pin-btn" data-val="2">2</button>
        <button class="pin-btn" data-val="3">3</button>
        <button class="pin-btn" data-val="4">4</button>
        <button class="pin-btn" data-val="5">5</button>
        <button class="pin-btn" data-val="6">6</button>
        <button class="pin-btn" data-val="7">7</button>
        <button class="pin-btn" data-val="8">8</button>
        <button class="pin-btn" data-val="9">9</button>
        <button class="pin-btn pin-clear" data-val="clear">✕</button>
        <button class="pin-btn" data-val="0">0</button>
        <button class="pin-btn pin-del" data-val="del">⌫</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  let entered = '';
  let confirmPIN = '';
  let step = savedPIN ? 'enter' : 'create';

  function updateDots() {
    for (let i = 0; i < 4; i++) {
      const dot = document.getElementById('pd' + i);
      dot.classList.toggle('filled', i < entered.length);
    }
  }

  function showError(msg) {
    const el = document.getElementById('pinError');
    el.textContent = msg;
    setTimeout(() => el.textContent = '', 1500);
    entered = '';
    updateDots();
  }

  function handleInput(val) {
    if (val === 'clear') { entered = ''; updateDots(); return; }
    if (val === 'del') { entered = entered.slice(0, -1); updateDots(); return; }
    if (entered.length >= 4) return;
    entered += val;
    updateDots();

    if (entered.length === 4) {
      setTimeout(() => {
        if (step === 'create') {
          confirmPIN = entered;
          entered = '';
          step = 'confirm';
          document.getElementById('pinSubtitle').textContent = 'Confirm your PIN';
          updateDots();
        } else if (step === 'confirm') {
          if (entered === confirmPIN) {
            localStorage.setItem('hlthstew_pin', entered);
            overlay.remove();
          } else {
            showError('PINs do not match. Try again.');
            step = 'create';
            confirmPIN = '';
            document.getElementById('pinSubtitle').textContent = 'Create a PIN';
          }
        } else if (step === 'enter') {
          if (entered === savedPIN) {
            overlay.classList.add('unlocked');
            setTimeout(() => overlay.remove(), 300);
          } else {
            showError('Incorrect PIN. Try again.');
          }
        }
      }, 100);
    }
  }

  overlay.querySelectorAll('.pin-btn').forEach(btn => {
    btn.addEventListener('click', () => handleInput(btn.dataset.val));
  });

  document.addEventListener('keydown', function(e) {
    if (!document.getElementById('pinOverlay')) return;
    if (e.key >= '0' && e.key <= '9') handleInput(e.key);
    if (e.key === 'Backspace') handleInput('del');
    if (e.key === 'Escape') handleInput('clear');
  });
}

document.addEventListener('DOMContentLoaded', initPIN);
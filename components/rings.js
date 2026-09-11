function updateRings() {
  const circumference = 2 * Math.PI * 24;
  updateRing('protein', totals.protein, TARGETS.protein, circumference);
  updateRing('carbs', totals.carbs, TARGETS.carbs, circumference);
  updateRing('fats', totals.fats, TARGETS.fats, circumference);
}

function updateRing(name, val, target, circ) {
 const pct = target > 0 ? Math.min(val / target, 1) : 0;
  const dash = pct * circ;
  document.getElementById(name + 'Ring').setAttribute('stroke-dasharray', `${dash} ${circ}`);
  document.getElementById(name + 'Pct').textContent = Math.round(pct * 100) + '%';
  const valueEl = document.getElementById(name + 'Val');
  valueEl.replaceChildren();
  valueEl.append(`${Math.round(val)}g `);
  const targetEl = document.createElement('span');
  targetEl.className = 'ring-target';
  targetEl.textContent = `/ ${target}g`;
  valueEl.append(targetEl);
}


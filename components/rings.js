function updateRings() {
  const circumference = 2 * Math.PI * 24;
  updateRing('protein', totals.protein, TARGETS.protein, circumference);
  updateRing('carbs', totals.carbs, TARGETS.carbs, circumference);
  updateRing('fats', totals.fats, TARGETS.fats, circumference);
}

function updateRing(name, val, target, circ) {
  const pct = Math.min(val / target, 1);
  const dash = pct * circ;
  document.getElementById(name + 'Ring').setAttribute('stroke-dasharray', `${dash} ${circ}`);
  document.getElementById(name + 'Pct').textContent = Math.round(pct * 100) + '%';
  document.getElementById(name + 'Val').innerHTML =
    `${Math.round(val)}g <span class="ring-target">/ ${target}g</span>`;
}

function updateVessel() {
  const pct = Math.min(totals.calories / TARGETS.calories, 1);
  const bowlHeight = 146;
  const totalFilled = bowlHeight * pct;

  const proteinShare = totals.calories > 0 ? (totals.protein * 4) / totals.calories : 0.33;
  const carbsShare = totals.calories > 0 ? (totals.carbs * 4) / totals.calories : 0.34;
  const fatsShare = totals.calories > 0 ? (totals.fats * 9) / totals.calories : 0.33;

  const fH = totalFilled * fatsShare;
  const cH = totalFilled * carbsShare;
  const pH = totalFilled * proteinShare;

  const base = 174;

  document.getElementById('fatsLayer').setAttribute('y', base - fH);
  document.getElementById('fatsLayer').setAttribute('height', fH);

  document.getElementById('carbsLayer').setAttribute('y', base - fH - cH);
  document.getElementById('carbsLayer').setAttribute('height', cH);

  document.getElementById('proteinLayer').setAttribute('y', base - fH - cH - pH);
  document.getElementById('proteinLayer').setAttribute('height', pH);

  const pctDisplay = Math.round(pct * 100);
  document.getElementById('fillPct').textContent = pctDisplay + '% filled';
  document.getElementById('calNumber').textContent = totals.calories.toLocaleString();
  document.getElementById('calTarget').textContent =
    `Target ${TARGETS.calories.toLocaleString()} kcal · ${pctDisplay}% filled`;
}

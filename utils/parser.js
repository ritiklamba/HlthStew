let foodDB = {};
let foodDBLoaded = false;

fetch('data/foods.json')
  .then(r => r.json())
  .then(data => { foodDB = data; foodDBLoaded = true; });

let ghostTimer;

function parseFood(input) {
  input = input.toLowerCase().trim();
  const gramsMatch = input.match(/(\d+)\s*g\s+(.+)/);
  const countMatch = input.match(/(\d+)\s+(.+)/);

  if (gramsMatch) {
    const grams = parseInt(gramsMatch[1]);
    const food = findFood(gramsMatch[2].trim());
    if (food && food.per100) {
      const r = grams / 100;
      return { name: `${grams}g ${gramsMatch[2].trim()}`, calories: Math.round(food.per100.calories * r), protein: Math.round(food.per100.protein * r * 10) / 10, carbs: Math.round(food.per100.carbs * r * 10) / 10, fats: Math.round(food.per100.fats * r * 10) / 10 };
    }
  }

  if (countMatch) {
    const count = parseInt(countMatch[1]);
    const food = findFood(countMatch[2].trim());
    if (food && food.per1) {
      return { name: `${count} ${countMatch[2].trim()}`, calories: Math.round(food.per1.calories * count), protein: Math.round(food.per1.protein * count * 10) / 10, carbs: Math.round(food.per1.carbs * count * 10) / 10, fats: Math.round(food.per1.fats * count * 10) / 10 };
    }
  }

  return { name: input, calories: 100, protein: 5, carbs: 10, fats: 3 };
}

function findFood(name) {
  for (const key of Object.keys(foodDB)) {
    if (name.includes(key)) return foodDB[key];
  }
  return null;
}
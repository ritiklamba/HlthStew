const foodDB = {
  'chicken': { per100: { calories: 165, protein: 31, carbs: 0, fats: 4 } },
  'egg': { per1: { calories: 70, protein: 6, carbs: 0.5, fats: 5 } },
  'eggs': { per1: { calories: 70, protein: 6, carbs: 0.5, fats: 5 } },
  'rice': { per100: { calories: 130, protein: 2.7, carbs: 28, fats: 0.3 } },
  'oats': { per100: { calories: 389, protein: 17, carbs: 66, fats: 7 } },
  'milk': { per100: { calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3 } },
  'banana': { per1: { calories: 89, protein: 1.1, carbs: 23, fats: 0.3 } },
  'bread': { per100: { calories: 265, protein: 9, carbs: 49, fats: 3.2 } },
  'paneer': { per100: { calories: 265, protein: 18, carbs: 3.4, fats: 20 } },
  'dal': { per100: { calories: 116, protein: 9, carbs: 20, fats: 0.4 } },
  'roti': { per1: { calories: 71, protein: 2.7, carbs: 14, fats: 0.8 } },
  'whey': { per100: { calories: 400, protein: 80, carbs: 10, fats: 5 } },
  'almonds': { per100: { calories: 579, protein: 21, carbs: 22, fats: 50 } },
  'peanut butter': { per100: { calories: 588, protein: 25, carbs: 20, fats: 50 } },
};

function parseFood(input) {
  input = input.toLowerCase().trim();
  const gramsMatch = input.match(/(\d+)\s*g\s+(.+)/);
  const countMatch = input.match(/(\d+)\s+(.+)/);

  if (gramsMatch) {
    const grams = parseInt(gramsMatch[1]);
    const foodName = gramsMatch[2].trim();
    const food = findFood(foodName);
    if (food && food.per100) {
      const ratio = grams / 100;
      return {
        name: `${grams}g ${foodName}`,
        calories: Math.round(food.per100.calories * ratio),
        protein: Math.round(food.per100.protein * ratio * 10) / 10,
        carbs: Math.round(food.per100.carbs * ratio * 10) / 10,
        fats: Math.round(food.per100.fats * ratio * 10) / 10,
      };
    }
  }

  if (countMatch) {
    const count = parseInt(countMatch[1]);
    const foodName = countMatch[2].trim();
    const food = findFood(foodName);
    if (food && food.per1) {
      return {
        name: `${count} ${foodName}`,
        calories: Math.round(food.per1.calories * count),
        protein: Math.round(food.per1.protein * count * 10) / 10,
        carbs: Math.round(food.per1.carbs * count * 10) / 10,
        fats: Math.round(food.per1.fats * count * 10) / 10,
      };
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
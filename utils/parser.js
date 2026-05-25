const foodDB = {
  "chicken": { "per100": { "calories": 165, "protein": 31, "carbs": 0, "fats": 4 } },
  "chicken breast": { "per100": { "calories": 165, "protein": 31, "carbs": 0, "fats": 4 } },
  "egg": { "per1": { "calories": 70, "protein": 6, "carbs": 0.5, "fats": 5 } },
  "eggs": { "per1": { "calories": 70, "protein": 6, "carbs": 0.5, "fats": 5 } },
  "rice": { "per100": { "calories": 130, "protein": 2.7, "carbs": 28, "fats": 0.3 } },
  "oats": { "per100": { "calories": 389, "protein": 17, "carbs": 66, "fats": 7 } },
  "milk": { "per100": { "calories": 61, "protein": 3.2, "carbs": 4.8, "fats": 3.3 } },
  "banana": { "per1": { "calories": 89, "protein": 1.1, "carbs": 23, "fats": 0.3 } },
  "paneer": { "per100": { "calories": 265, "protein": 18, "carbs": 3.4, "fats": 20 } },
  "dal": { "per100": { "calories": 116, "protein": 9, "carbs": 20, "fats": 0.4 } },
  "roti": { "per1": { "calories": 71, "protein": 2.7, "carbs": 14, "fats": 0.8 } },
  "chapati": { "per1": { "calories": 71, "protein": 2.7, "carbs": 14, "fats": 0.8 } },
  "paratha": { "per1": { "calories": 180, "protein": 3.5, "carbs": 24, "fats": 8 } },
  "bread": { "per1": { "calories": 79, "protein": 2.7, "carbs": 15, "fats": 1 } },
  "whey": { "per100": { "calories": 400, "protein": 80, "carbs": 10, "fats": 5 } },
  "almonds": { "per100": { "calories": 579, "protein": 21, "carbs": 22, "fats": 50 } },
  "peanut butter": { "per100": { "calories": 588, "protein": 25, "carbs": 20, "fats": 50 } },
  "curd": { "per100": { "calories": 60, "protein": 3.5, "carbs": 4, "fats": 3.3 } },
  "yogurt": { "per100": { "calories": 60, "protein": 3.5, "carbs": 4, "fats": 3.3 } },
  "potato": { "per100": { "calories": 77, "protein": 2, "carbs": 17, "fats": 0.1 } },
  "sweet potato": { "per100": { "calories": 86, "protein": 1.6, "carbs": 20, "fats": 0.1 } },
  "tuna": { "per100": { "calories": 116, "protein": 26, "carbs": 0, "fats": 1 } },
  "salmon": { "per100": { "calories": 208, "protein": 20, "carbs": 0, "fats": 13 } },
  "rajma": { "per100": { "calories": 127, "protein": 8.7, "carbs": 22, "fats": 0.5 } },
  "moong dal": { "per100": { "calories": 105, "protein": 7, "carbs": 19, "fats": 0.4 } },
  "idli": { "per1": { "calories": 39, "protein": 2, "carbs": 8, "fats": 0.2 } },
  "dosa": { "per1": { "calories": 120, "protein": 3.5, "carbs": 20, "fats": 3 } },
  "ghee": { "per100": { "calories": 900, "protein": 0, "carbs": 0, "fats": 100 } },
  "butter": { "per100": { "calories": 717, "protein": 0.9, "carbs": 0.1, "fats": 81 } },
  "apple": { "per1": { "calories": 95, "protein": 0.5, "carbs": 25, "fats": 0.3 } },
  "peanuts": { "per100": { "calories": 567, "protein": 26, "carbs": 16, "fats": 49 } }
};



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
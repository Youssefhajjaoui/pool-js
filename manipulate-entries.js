const { log } = require("console");

const filterEntries = (obj, predicate) => {
    return Object.fromEntries(
        Object.entries(obj).filter(entry => predicate(entry))
    );
};

const mapEntries = (obj, mapper) => {
    return Object.fromEntries(
        Object.entries(obj).map(entry => mapper(entry))
    );
};

const reduceEntries = (obj, reducer, initialValue) => {
    return Object.entries(obj).reduce(
        (acc, entry) => reducer(acc, entry),
        initialValue
    );
};

const totalCalories = (cart) => {
    return reduceEntries(cart, (total, [item, quantity]) => {
        return total + (nutritionDB[item].calories * quantity / 100);
    }, 0).toFixed(1) * 1; // Apply toFixed at the end, after summing the total
};


const lowCarbs = (cart) => {
    //cart = totalCalories(cart)
    return filterEntries(cart, ([item, vel]) => {
        const carbsPer100g = (nutritionDB[item].carbs * vel) / 100;
        return carbsPer100g < 50;
    });
};

const cartTotal = (cart) => {
    return reduceEntries(cart, (acc, [key, quantity]) => {
        const nutrition = nutritionDB[key];

        if (nutrition) {
            acc[key] = {
                calories: (nutrition.calories * quantity) / 100,
                protein: (nutrition.protein * quantity) / 100,
                carbs: (nutrition.carbs * quantity) / 100,
                sugar: (nutrition.sugar * quantity) / 100,
                fiber: (nutrition.fiber * quantity) / 100,
                fat: (nutrition.fat * quantity) / 100,
            };
        }

        return acc;
    }, {});
};

// return reduceEntries(cart, (totals, [item, quantity]) => {
//     const itemNutrition = nutritionDB[item];
//     for (let nutrient in itemNutrition) {
//         if (typeof itemNutrition[nutrient] === 'number') {
//             totals[nutrient] = (totals[nutrient] || 0) + ((itemNutrition[nutrient] * quantity) / 100);
//         }
//     }
//     return totals;
// }, {});

const groceriesCart1 = { oil: 500, onion: 230, garlic: 220, paprika: 480 }
const groceriesCart2 = { tomato: 700, vinegar: 120, orange: 450 }
const total1 = {
    oil: {
        calories: 240,
        protein: 0,
        carbs: 0,
        sugar: 615,
        fiber: 0,
        fat: 755,
    },
    onion: {
        calories: 0,
        protein: 2.3,
        carbs: 20.7,
        sugar: 0,
        fiber: 0,
        fat: 0,
    },
    garlic: {
        calories: 327.8,
        protein: 14.08,
        carbs: 72.6,
        sugar: 2.2,
        fiber: 4.62,
        fat: 1.1,
    },
    paprika: {
        calories: 1353.6,
        protein: 67.872,
        carbs: 259.152,
        sugar: 4.8,
        fiber: 0,
        fat: 61.872,
    },
}
const total2 = {
    orange: {
        calories: 220.5,
        carbs: 58.5,
        fat: 0.45,
        fiber: 0.9,
        protein: 4.05,
        sugar: 40.5,
    },
    tomato: {
        calories: 126,
        carbs: 27.3,
        fat: 1.4,
        fiber: 8.4,
        protein: 6.3,
        sugar: 18.2,
    },
    vinegar: {
        calories: 24,
        carbs: 0.72,
        fat: 0,
        fiber: 0,
        protein: 0.048,
        sugar: 0.48,
    },
}

const nutritionDB = {
    tomato: { calories: 18, protein: 0.9, carbs: 3.9, sugar: 2.6, fiber: 1.2, fat: 0.2 },
    vinegar: { calories: 20, protein: 0.04, carbs: 0.6, sugar: 0.4, fiber: 0, fat: 0 },
    oil: { calories: 48, protein: 0, carbs: 0, sugar: 123, fiber: 0, fat: 151 },
    onion: { calories: 0, protein: 1, carbs: 9, sugar: 0, fiber: 0, fat: 0 },
    garlic: { calories: 149, protein: 6.4, carbs: 33, sugar: 1, fiber: 2.1, fat: 0.5 },
    paprika: { calories: 282, protein: 14.14, carbs: 53.99, sugar: 1, fiber: 0, fat: 12.89 },
    sugar: { calories: 387, protein: 0, carbs: 100, sugar: 100, fiber: 0, fat: 0 },
    orange: { calories: 49, protein: 0.9, carbs: 13, sugar: 9, fiber: 0.2, fat: 0.1 },
}
// /*/ // ⚡

// console.log(
//     filterEntries(groceriesCart1, ([, v]) => v < 300),
//     // { onion: 230, garlic: 220 },
// )

// console.log(
//     mapEntries(groceriesCart1, ([k, v]) => [
//         v > 250 ? `✔️${k}` : `❌${k}`,
//         v - 250,
//     ]),
//     // {
//     // '✔️oil': 250,
//     // '❌onion': -20,
//     // '❌garlic': -30,
//     // '✔️paprika': 230,
//     // },
// )


// console.log(
//     mapEntries(
//         filterEntries(groceriesCart1, ([k, v]) => k === 'onion'),
//         ([k, v]) => [`✔️${k}`, v - 100],
//     ),
//     // { '✔️onion': 130 },
// )


// console.log(
//     reduceEntries(groceriesCart1, (acc, [k, v]) => acc + k + v, ''),
//     // 'oil500onion230garlic220paprika480',
// )


//console.log(lowCarbs(groceriesCart1))
// , { oil: 500, onion: 230 })

//console.log(lowCarbs(groceriesCart2))
//  { vinegar: 120, tomato: 700 })


console.log(totalCalories(groceriesCart1)/*, 1921.4*/)
console.log(totalCalories(groceriesCart2)/*, 370.5*/)

console.log(cartTotal(groceriesCart1)/*, total1*/)
console.log(cartTotal(groceriesCart2)/*, total2*/)
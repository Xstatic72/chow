// utils/slug.ts
export const mealSlug = (meal) => {
    const name = meal.strMeal
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    return `${meal.idMeal}-${name}`
}
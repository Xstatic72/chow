export const useSaved = () => {
    const savedItems = useState('saved', () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('saved');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    })

    const toggleSave = (meal) => {
        const index = savedItems.value.findIndex(item => item.idMeal === meal.idMeal);
        if (index === -1) {
            savedItems.value.push(meal);
        } else {
            savedItems.value.splice(index, 1);
        }
        localStorage.setItem('saved', JSON.stringify(savedItems.value));
    }

    const isSaved = (meal) => {
        return savedItems.value.some(item => item.idMeal === meal.idMeal);
    }

    return {
        savedItems,
        toggleSave,
        isSaved
    }
}
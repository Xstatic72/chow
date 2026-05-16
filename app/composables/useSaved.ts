
export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb?: string;
  strCategory?: string;
  strArea?: string;
  [key: string]: any; 
}

export type SavedMeal = Pick<Meal, 'idMeal' | 'strMeal' | 'strMealThumb' | 'strCategory' | 'strArea'>;






export const useSaved = () => {
    const savedItems = useState<SavedMeal[]>('saved', () => [])

    onMounted(() => {
        if (import.meta.client) {
            const saved = localStorage.getItem('saved');
        
            if (saved) savedItems.value = JSON.parse(saved);
        }
    });


    const toggleSave = (meal: Meal): void => {
        const index = savedItems.value.findIndex(item => item.idMeal === meal.idMeal);
        if (index === -1) {
            savedItems.value.push(({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strCategory: meal.strCategory,
            strArea: meal.strArea
    }));
        } else {
            savedItems.value.splice(index, 1);
        }
        localStorage.setItem('saved', JSON.stringify(savedItems.value));
    }

    const isSaved = (meal: Pick<Meal, 'idMeal'>): boolean => {
        return savedItems.value.some(item => item.idMeal === meal.idMeal);
    }

    

    return {
        savedItems,
        toggleSave,
        isSaved,
    }
}
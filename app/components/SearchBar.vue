<template>
    <div class="relative group">
        <SearchIcon class="lg:absolute left-4 top-1/2 h-5 w-5 lg:-translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors duration-200" />
        <input
            v-model="searchQuery"
            @input="debouncedSearch(searchQuery)"
            @focus="isSearchActive = true"
            @blur="isSearchActive = false"  
            class="w-80 rounded-xl bg-gray-50 border hidden md:block border-gray-200 py-2.5 pl-12 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[var(--color-primary)] transition-all duration-200"
            type="text"
            placeholder="search for a meal"
        />
        <div 
        v-show="isSearchActive" 
        @mousedown.prevent
        class="absolute hide-scrollbar z-[50] backdrop-blur-md bg-green-500/60 rounded-xl overflow-y-auto top-14 min-h-[200px] max-h-[300px] w-full flex text-white">
            <div v-if="searchResults.length > 0" class="flex flex-col w-full">
                <div 
                v-for="meal in searchResults" 
                :key="meal.idMeal" 
                @click="goToMeal(meal)"
                class="flex items-center px-3 py-3.5 border-b border-gray-300 hover:bg-white/20 cursor-pointer transition-all duration-200 group">
                 {{ meal.strMeal }} 
                </div>
            </div>
            <div v-else class="w-full h-full text-center my-auto">
                type to search
            </div>
        </div>
    </div>
</template>

<script setup>
import { Search as SearchIcon } from '@lucide/vue';
import { mealSlug } from '~/utils/slug';

const searchQuery = ref('');
const isSearchActive = ref(false);
const searchResults = ref([])

const debounce = (func, delay = 400) => {
    let timeOut;
    return (...args) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            func(...args);
        }, delay);
    }; 


}

const handleSearch = async (query) => {
    if (!query.trim()) {
        searchResults.value = []
        return
    }

    localStorage.setItem('searchValue', query);

    const data = await $fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
    searchResults.value = data?.meals || []
    console.log(searchResults.value);
}

const debouncedSearch = debounce(handleSearch, 300)

const goToMeal = (meal) => {
    navigateTo(`/dashboard/meal/${mealSlug(meal)}`)
    isSearchActive.value = false
}

</script>

<style scoped>

</style>
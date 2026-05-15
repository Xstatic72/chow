<template>
    <div class="relative group">
         <Search  class="lg:absolute left-4 top-1/2 h-5 w-5 lg:-translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors duration-200 hidden md:block" />

        <button
            v-if="!isMobileExpanded"
            @click="openMobile"
            class="md:hidden p-2 rounded-lg"
            aria-label="Open search"
        >
            <Search class="h-5 w-5 text-gray-400" />
        </button>

        <input
            ref="inputRef"
            v-model="searchQuery"
            @input="debouncedSearch(searchQuery)"
            @focus="isSearchActive = true"
            @blur="isSearchActive = false"
            :class="[
                'rounded-xl bg-gray-50 border border-gray-200 py-2.5 pl-12 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[var(--color-primary)] transition-all duration-200',
                isMobileExpanded ? 'block w-full' : 'hidden md:block w-80'
            ]"
            type="text"
            placeholder="search for a meal"
        />

        <button v-if="isMobileExpanded" @click="closeMobile" class="md:hidden absolute right-3 top-1/2 -translate-y-1/2 p-1">
            <X class="h-5 w-5 text-gray-500" />
        </button>

        <div
            v-show="isSearchActive || isMobileExpanded"
            @mousedown.prevent
            class="absolute hide-scrollbar z-50 backdrop-blur-md bg-green-500/60 rounded-xl overflow-y-auto top-14 min-h-[200px] max-h-[300px] w-full flex text-white"
        >
            <div v-if="searchResults.length > 0" class="flex flex-col w-full">
                <div
                    v-for="meal in searchResults"
                    :key="meal.idMeal"
                    @click="goToMeal(meal)"
                    class="flex items-center px-3 py-3.5 border-b border-gray-300 hover:bg-white/20 cursor-pointer transition-all duration-200 group"
                >
                    {{ meal.strMeal }}
                </div>
            </div>
            <div v-else class="w-full h-full text-center my-auto text-white">
                type to search
            </div>
        </div>
    </div>
</template>

<script setup>
import { Search, X } from '@lucide/vue';
import { mealSlug } from '~/utils/slug';
import { nextTick } from 'vue';

const searchQuery = ref('');
const isSearchActive = ref(false);
const isMobileExpanded = useState('mobileSearchExpanded', () => false);
const searchResults = ref([])
const inputRef = ref(null)

const openMobile = async () => {
    isMobileExpanded.value = true
    await nextTick()
    inputRef.value?.focus()
}

const closeMobile = () => {
    isMobileExpanded.value = false
    isSearchActive.value = false
}

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
    isMobileExpanded.value = false
}

</script>

<style scoped>

</style>
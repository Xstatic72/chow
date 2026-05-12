<template>
    <div class="relative group">
        <SearchIcon class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors duration-200" />
        <input
            v-model="searchQuery"
            @input="debounce(searchQuery)"
            @focus="isSearchActive = true"
            @blur="isSearchActive = false"  
            class="w-80 rounded-xl bg-gray-50 border border-gray-200 py-2.5 pl-12 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[var(--color-primary)] transition-all duration-200"
            type="text"
            placeholder="search for a meal"
        />
        <div 
        v-show="isSearchActive" 
        @mousedown.prevent
        class="absolute z-[50] backdrop-blur-md bg-green-500/60 rounded-xl overflow-y-auto top-14 h-[200px] max-h-[350px] w-full flex justify-center items-center text-white">
            type to search
        </div>
    </div>
</template>

<script setup>
import { Search as SearchIcon } from '@lucide/vue';

const searchQuery = ref('');
const isSearchActive = ref(false);

const debounce = (func, delay = 400) => {
    let timeOut;
    return (...args) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            func(...args);
        }, delay);
    }; 


}
</script>

<style scoped>

</style>
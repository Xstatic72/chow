<template>
    <div>
        <header class="flex justify-between px-8 items-center p-2 border-b border-[var(--color-primary-light)]">
            <NuxtLink to="/"><h1 class="text-[var(--color-primary)] text-2xl">Chow</h1></NuxtLink>
            <div @click="userOptions = !userOptions" :class="['relative flex text-[var(--color-primary)] font-semibold ml-[10rem] p-2 rounded-xl cursor-pointer', { 'hover:bg-green-100': !userOptions }]">
                <p  class="text-lg">Hey, {{ name }}</p>
                <Transition
                enter-active-class="transition duration-500 ease-out"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
                >
                <div v-if="userOptions" role="menu" aria-label="User menu" @keydown.esc="userOptions = false" class="absolute top-16 -left-11 z-50 min-w-[12rem] w-48 bg-[var(--color-primary)] text-white rounded-lg py-2 shadow-xl text-sm">
                    <div role="menuitem" tabindex="0" class="h-12 flex items-center px-4 hover:bg-emerald-300 focus:bg-emerald-300 focus:outline-none">Saved recipes</div>
                    <div role="menuitem" tabindex="0" class="h-12 flex items-center px-4 hover:bg-emerald-300 focus:bg-emerald-300 focus:outline-none">About</div>
                    <div role="menuitem" tabindex="0" @click="logout" class="h-12 flex items-center px-4 hover:bg-emerald-300 focus:bg-emerald-300 focus:outline-none">Logout</div>
                </div>
                </Transition>
                <ChevronDown  :class="['ml-2 mt-1 transition-transform duration-500', {'rotate-180': userOptions}]" />
            </div>
            <div class="relative group">
                <SearchIcon class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors duration-200" />
                <input class="w-80 rounded-xl bg-gray-50 border border-gray-200 py-2.5 pl-12 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[var(--color-primary)] transition-all duration-200" type="text" placeholder="search for a meal">
            </div>
        </header>
        <div class="grid grid-cols-4 gap-4 p-4 pt-8">
            <div
                class="relative cursor-pointer col-span-2 h-[86dvh] bg-cover bg-center rounded-xl overflow-hidden hover:translate-y-[-10px] hover:shadow-lg hover:-rotate-[0.3deg] transition-all hover:shadow-[var(--color-btn-hover)] duration-500"
                :style="{ backgroundImage: `url('${randomMeal?.strMealThumb}')` }"
            >
                <div class="absolute inset-0 bg-black/45"></div>
                <div class="relative flex justify-between z-10 p-8">
                    <p class="text-white text-4xl font-bold pb-2">{{ randomMeal?.strMeal }}</p>
                    <Heart class="text-white size-10 p-2 rounded-full backdrop-blur-lg bg-[#86a384]/50" />
                </div>
                <div class="absolute flex items-center bottom-4 left-4 z-10">
                    <p class="text-white text-xl p-6">Try this! or</p>
                    <button @click="getRandomMeal" class="flex items-center p-4 bg-transparent hover:bg-[var(--color-btn-hover)] text-white border-2 border-[var(--color-btn-hover)] rounded-xl transition-colors duration-300">Something else <Shuffle class="ml-1" /></button>
                </div>
            </div>
            <div class="col-span-2 flex flex-col gap-4">
                <div class="grid grid-cols-2 gap-4">
                    <Card
                        v-if="mealOTD?.strMeal"
                        title="Meal of the Day"
                        :image="mealOTD?.strMealThumb"
                        :name="mealOTD?.strMeal"
                    />
                    <Card
                        v-if="categoryOTD?.strCategory"
                        title="Category of the Day"
                        :image="categoryOTD?.strCategoryThumb"
                        :name="categoryOTD?.strCategory"
                    />
                </div>

                <div class="flex rounded-xl gap-8 border-2 p-6 bg-[var(--color-primary)]">
                    <DiscoverTabs
                        class="mt-12"
                        :active-tab="activeDiscover"
                        @select="loadDiscover"
                    />
                    <div class="flex-1">
                        <div>
                            <p class="text-3xl text-white font-semibold mb-6">Discover By</p>
                        </div>
                        
                        <div class="max-h-[500px] overflow-y-auto">
                            <List-item :key="index" v-for="item in discoverItems" :item="item" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { Search as SearchIcon } from '@lucide/vue';
import { Heart, Shuffle, ChevronDown } from '@lucide/vue';

const mealOTD = ref({})
const categoryOTD = ref({})
const name = ref("You")
const userOptions = ref(false);
const { data: randomMealData, refresh: refreshRandomMeal } = await useFetch('https://www.themealdb.com/api/json/v1/1/random.php')

const randomMeal = computed(() => randomMealData.value?.meals?.[0])
const getRandomMeal = () => refreshRandomMeal();

// get meal for the day locally if exists, otherwise fetch a new one and store it in localStorage
const initMealLogic = async () => {
    const cashedMeal = localStorage.getItem('mealOTD');
    if (cashedMeal) {
        const parsed = JSON.parse(cashedMeal);
        const saveDate = new Date(parsed.timeStamp).toDateString();
        const today = new Date().toDateString();
        if (saveDate === today) {
            mealOTD.value = parsed.meal;
            return;
        }
        
    }
    //now fetch a new meal and store it in localStorage
    const data  = await $fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const meal = data?.meals?.[0];

    if(meal) {
        mealOTD.value = meal;
        localStorage.setItem('mealOTD', JSON.stringify({
            meal, 
            timeStamp: new Date().toISOString()

    }));
    }
}

//fetch all categories and pick one randomly for the category of the day card
//store in localStorage with date validation, same as mealOTD
const initCategoryLogic = async () => {
    const cachedCategory = localStorage.getItem('categoryOTD');
    if (cachedCategory) {
        const parsed = JSON.parse(cachedCategory);
        const saveDate = new Date(parsed.timeStamp).toDateString();
        const today = new Date().toDateString();
        if (saveDate === today) {
            categoryOTD.value = parsed.category;
            return;
        }
    }
    
    // Fetch new category and store it in localStorage
    let data = await $fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

    const categories = data?.categories || [];
    if (categories.length > 0) {
        const randomIndex = Math.floor(Math.random() * categories.length);
        const category = categories[randomIndex];
        categoryOTD.value = category;
        localStorage.setItem('categoryOTD', JSON.stringify({
            category,
            timeStamp: new Date().toISOString()
        }));
    }
}

//fetch discover items based on  categories, countries, ingredients

const discoverItems = ref([]);
const activeDiscover = ref('Categories');

const endpoints = {
    Categories: "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
    Countries: "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
    Ingredients: "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
}
const loadDiscover = async (type) => {
    activeDiscover.value = type;
    const url = endpoints[type];
    if (!url) return;
    const data = await $fetch(url);
    if (type === "Categories") {
        discoverItems.value = data?.meals?.map(item => item.strCategory) || [];
    } else if (type === "Countries") {
        discoverItems.value = data?.meals?.map(item => item.strArea) || [];
    } else if (type === "Ingredients") {
        discoverItems.value = data?.meals?.map(item => item.strIngredient) || [];
    }
}


onMounted(() => {
    name.value = localStorage.getItem('name') || "You";
    initMealLogic();
    initCategoryLogic();
    loadDiscover('Categories')
})

const logout = () => {
    if (import.meta.client) {
        localStorage.clear();
    }
    navigateTo('/');
}

</script>

<style scoped></style>
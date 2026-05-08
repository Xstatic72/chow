<template>
    <div>
        <header class="flex justify-around items-center p-2 bg-gray-100">
            <NuxtLink to="/"><h1 class="text-[var(--color-primary)] text-2xl">Chow</h1></NuxtLink>
            <p class="text-lg text-[var(--color-primary)] font-semibold opacity-80">Hi, {{ name }}</p>
            <div class="relative">
                <SearchIcon class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input class="w-72 rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" placeholder="search for a meal">
            </div>
        </header>
        <div class="grid grid-cols-4 gap-4 p-4 pt-8">
            <div
                class="relative col-span-2 h-[86dvh] bg-cover bg-center rounded-xl overflow-hidden hover:translate-y-[-10px] hover:shadow-lg hover:-rotate-[0.2deg] transition-all hover:shadow-green-600 duration-500"
                :style="{ backgroundImage: `url('${randomMeal?.strMealThumb}')` }"
            >
                <div class="absolute inset-0 bg-black/45"></div>
                <div class="relative flex justify-between z-10 p-8">
                    <p class="text-white text-2xl pb-2">{{ randomMeal?.strMeal }}</p>
                    <Heart class="text-white size-10 p-2 rounded-full backdrop-blur-lg bg-[#86a384]/50" />
                </div>
                <div class="absolute flex items-center bottom-4 left-4 z-10">
                    <p class="text-white text-xl p-6">Try this! or</p>
                    <button @click="getRandomMeal" class="flex items-center p-4 bg-transparent hover:bg-emerald-600 text-white border-2 border-emerald-600 rounded-xl transition-colors duration-300">Something else <Shuffle class="ml-1" /></button>
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

                <div class="flex gap-2 border-2 p-4 rounded">
                    <div calss="">
                        <div @click="loadDiscover('Categories')" class="p-2 px-3 m-4 rounded-full bg-emerald-50">Categories</div>
                        <div @click="loadDiscover('Countries')" class="p-2 px-3 m-4 rounded-full bg-emerald-50">Countries</div>
                        <div @click="loadDiscover('Ingredients')" class="p-2 px-3 m-4 rounded-full bg-emerald-50">Ingredients</div>
                    </div>
                    <div class="flex-1">
                        <p class="text-xl text-[var(--color-primary)] font-semibold">Discover meals</p>
                        <div class="max-h-[700px] overflow-y-auto">
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
import { Heart, Shuffle } from '@lucide/vue';

const mealOTD = ref({})
const categoryOTD = ref({})
const name = ref(null)
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

const endpoints = {
    Categories: "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
    Countries: "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
    Ingredients: "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
}
const loadDiscover = async (type) => {
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
    name.value = localStorage.getItem('name');
    initMealLogic();
    initCategoryLogic();
})



</script>

<style scoped></style>
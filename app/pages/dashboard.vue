<template>
    <div>
        <Header />
        <div class="grid grid-cols-4 h-[90dvh] gap-4 p-4 pt-8">
            <div
                class="relative cursor-pointer col-span-2 h-[86dvh] bg-cover bg-center rounded-xl overflow-hidden hover:translate-y-[-10px] hover:shadow-lg hover:-rotate-[0.3deg] transition-all hover:shadow-green-500/50 duration-500"
                :style="{ backgroundImage: `url('${randomMeal?.strMealThumb}')` }"
            >
                <div class="absolute inset-0 bg-black/45"></div>
                <div class="relative flex justify-between z-10 p-8">
                    <p class="text-white max-w-md text-4xl font-bold pb-2">{{ randomMeal?.strMeal }}</p>
                    <Heart 
                    @click="toggleSave(randomMeal); $forceUpdate()"
                     :class="['cursor-pointer transition-transform duration-200', {'fill-green-200 scale-110' : isSaved(randomMeal)}]"
                    class="text-white size-10 p-2 rounded-full backdrop-blur-lg bg-[#86a384]/50 hover:bg-green-300/50" />
                </div>
                <div class="absolute flex items-center bottom-4 left-4 z-10">
                    <p class="text-white text-xl p-6">Try this! or</p>
                    <button @click="getRandomMeal" class="flex items-center p-4 bg-transparent hover:bg-[var(--color-btn-hover)] text-white font-bold text-xl border-2 border-[var(--color-btn-hover)] rounded-xl transition-colors duration-300">Something else <Shuffle class="ml-1" /></button>
                </div>
            </div>
            <div class="col-span-2 grid grid-rows-[1fr_2fr] gap-4 min-h-0">
                <div class="row-span-1 grid grid-cols-2 gap-4">
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

                <div class="row-span-1 min-h-0 flex rounded-xl gap-8 border-2 p-6 bg-[var(--color-primary)]">
                    <div class="flex-1 flex flex-col min-h-0">
                        <div class="flex items-center justify-between mb-4">
                            <p class="text-3xl text-white font-semibold">Discover By</p>
                            <DiscoverTabs
                            :active-tab="activeDiscover"
                            @select="loadDiscover"
                            />
                        </div>
                        
                        <div class="flex flex-wrap mt-2 gap-3 min-h-0 overflow-y-auto">
                            <List-item :key="index" v-for="(item, index) in discoverItems" :item="item" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
const {toggleSave, isSaved} = useSaved();
import { Heart, Shuffle } from '@lucide/vue';

const mealOTD = ref({})
const categoryOTD = ref({})
const { data: randomMealData, refresh: refreshRandomMeal } = await useFetch('https://www.themealdb.com/api/json/v1/1/random.php')

const randomMeal = computed(() => randomMealData.value?.meals?.[0])
const getRandomMeal = () => refreshRandomMeal();

// get meal for the day locally if exists, otherwise fetch a new one and store it in localStorage

const getDailyItem = async (key, fetchFunc) => {
    const cachedItem = localStorage.getItem(key);
    if (cachedItem) {
        const parsed = JSON.parse(cachedItem);
        const saveDate = new Date(parsed.timeStamp).toDateString();
        const today = new Date().toDateString();
        if (saveDate === today) {
            return parsed.item;
        }
    }
    //now fetch a new item and store it in localStorage
    const item =  await fetchFunc();
    localStorage.setItem(key, JSON.stringify({
        item,
        timeStamp: new Date().toISOString()
    }));
    return item;
}

const initMealLogic = async () => {

    //now fetch a new meal and store it in localStorage
    mealOTD.value = await getDailyItem('mealOTD', async () => {
        const data = await $fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        return data?.meals?.[0];
    });
}

//fetch all categories and pick one randomly for the category of the day card
//store in localStorage with date validation, same as mealOTD
const initCategoryLogic = async () => {
    
    // Fetch new category and store it in localStorage
    categoryOTD.value = await getDailyItem('categoryOTD', async () => {
        const data = await $fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const categories = data?.categories || [];
        return categories[Math.floor(Math.random() * categories.length)];
    });
    
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
    initMealLogic();
    initCategoryLogic();
    loadDiscover('Categories')
})

</script>

<style scoped></style>
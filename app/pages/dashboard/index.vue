<template>
    <div>
        <div class="grid grid-cols-1 lg:grid-cols-4 lg:h-[90dvh] md:gap-4 p-3 md:p-4 mt-4">
            <div
                class="relative cursor-pointer   md:col-span-2 min-h-[350px] md:h-[86dvh] bg-cover bg-center rounded-xl overflow-hidden hover:translate-y-[-10px] hover:shadow-lg hover:-rotate-[0.3deg] transition-all hover:shadow-green-500/50 duration-500"
                :style="{ backgroundImage: `url('${randomMeal?.strMealThumb}')` }"
                @click="randomMeal && navigateTo(`/dashboard/meal/${mealSlug(randomMeal)}`)"
            >
                <div class="absolute inset-0 bg-black/45"></div>
                <div class="relative flex justify-between z-10 p-4 md:p-8">
                    <div>
                        <p class="text-white max-w-xs md:max-w-md text-xl md:text-4xl font-bold pb-2">{{ randomMeal?.strMeal }}</p>
                        <div class="flex gap-4">
                            <div class="flex items-center gap-2">
                            <PillLink :link="`/dashboard/discover/${randomMeal?.strCategory}?type=category`" :name="randomMeal?.strCategory" />
                            <PillLink :link="`/dashboard/discover/${randomMeal?.strArea}?type=country`" :name="randomMeal?.strArea" />
                        </div>
            
                        </div>
                        
                    </div>
                    <Heart 
                        @click.stop="toggleSave(randomMeal); $forceUpdate()"
                        :class="['cursor-pointer transition-transform duration-200', {'fill-green-200 scale-110' : isSaved(randomMeal)}]"
                        class="text-white size-10 p-2 rounded-full backdrop-blur-lg bg-[#86a384]/50 hover:bg-green-300/50" />
                </div>
                <div class="absolute flex items-center bottom-4 left-4 z-10">
                    <p class="text-white md:text-xl p-6">Try this! or</p>
                    <button @click.stop="getRandomMeal" class="flex items-center p-4 bg-transparent hover:bg-[var(--color-btn-hover)] text-white font-bold md:text-xl border-2 border-[var(--color-btn-hover)] rounded-xl transition-colors duration-300">Something else <Shuffle class="ml-1" /></button>
                </div>
            </div>
            <div class="col-span-2 grid grid-rows-[auto_1fr] gap-4 min-h-0 mt-4 lg:mt-0">
                <div class="row-span-1 grid grid-cols-2 justify-start gap-4 md:gap-8">
                    <div v-if="mealOTD?.strMeal" class="cursor-pointer " @click="navigateTo(`/dashboard/meal/${mealSlug(mealOTD)}`)">
                        <Card
                            title="Meal of the Day"
                            :image="mealOTD?.strMealThumb"
                            :name="mealOTD?.strMeal"
                        />
                    </div>
                    <div v-if="categoryOTD?.strCategory" class="cursor-pointer " @click="navigateTo(`/dashboard/discover/${categoryOTD.strCategory}?type=category`)">
                        <Card
                            title="Category of the Day"
                            :image="categoryOTD?.strCategoryThumb"
                            :name="categoryOTD?.strCategory"
                        />
                    </div>
                </div>

                <div class="row-span-1 min-h-0 flex rounded-xl px-3 gap-8 py-6 bg-[var(--color-primary)]">
                    <div class="flex-1 flex flex-col min-h-0">
                        <div class="md:flex items-center justify-between mb-4">
                            <p class="text-xl md:text-3xl text-white font-semibold mb-4">Discover By <span class="text-xs md:text-sm -full">({{ discoverItems.length }})</span></p>
                            <DiscoverTabs
                            :active-tab="activeDiscover"
                            @select="loadDiscover"
                            />
                        </div>
                        
                        <div class="flex flex-wrap mt-2 gap-3 min-h-0 max-h-[400px] overflow-y-auto scrollbar-thin">
                            <List-item :key="index" v-for="(item, index) in discoverItems" :item="item" :type="discoverType" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'app'
})

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

const typeMap = {
    Categories: 'category',
    Countries: 'country',
    Ingredients: 'ingredient'
}

const discoverType = computed(() => typeMap[activeDiscover.value] || 'category')

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
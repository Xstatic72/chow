<template>
    <div class="p-8">
        <button @click="navigateTo('/dashboard')" class="mb-4 text-[var(--color-primary)] hover:underline">
                <ArrowLeft class="inline-block mr-1 text-lg" /> Home
                </button>

                <h1 class="text-2xl font-bold text-[var(--color-primary)] max-w-lg mb-6">{{ meal.strMeal }}</h1>
         <div class="flex">
            <div>
                <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-full max-w-md rounded-lg mb-4" />
            </div>
            <div class="grid grid-cols-5 gap-8 m-10 lg:ml-32">
                <Ingredient v-for="(ingr, index) in ingredients" :key="index" :name="ingr.name" :image="`https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingr.name)}.png`" />
            </div>
         </div>
        
       

        
        <p>{{ meal.strInstructions }}</p>
    
     <div>
        <iframe v-if="meal.strYoutube" :src="meal.strYoutube.replace('watch?v=', 'embed/')" frameborder="0" allowfullscreen class="w-[350px] h-64 mt-4 rounded-lg"></iframe>
     </div>
     </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'app'
})

import { ArrowLeft } from '@lucide/vue';


const route = useRoute()
const id = (route.params.slug as string).split('-')[0]

const {data, status} = await useAsyncData(`meal-${id}`, () => $fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`))

const meal = computed(() => data.value?.meals?.[0] || {})

//parse the ingredients into an array
const ingredients = computed(() => {
    if (!meal.value) return []
    const ingr = []
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal.value[`strIngredient${i}`]
        const measure = meal.value[`strMeasure${i}`]
        if (ingredient) ingr.push({
            display: `${measure} ${ingredient}`,
            name: ingredient
        })
    }
    return ingr
})
</script>

<style scoped>

</style>
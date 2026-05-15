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
        <Ingredient 
          v-for="(ingr, index) in ingredients" 
          :key="index" 
          :name="ingr.display" 
          :image="`https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingr.name)}.png`" 
        />
      </div>
    </div>
    
    <div class="flex flex-col md:flex-row gap-6 mt-4">
      <div v-if="meal.strYoutube">
        <iframe :src="meal.strYoutube.replace('watch?v=', 'embed/')" frameborder="0" allowfullscreen class="w-[350px] h-64 rounded-lg"></iframe>
      </div>
      
      <div class="flex-1 space-y-4 p-6 bg-gray-50 rounded-lg">
        <h2 class="text-xl font-semibold mb-2">Instructions</h2>
        <p v-for="(step, index) in formattedSteps" :key="index" class="text-gray-700 leading-relaxed">
          <strong class="text-[var(--color-primary)]">Step {{ index + 1 }}:</strong> {{ step }}
        </p>
      </div>
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

const { data, status } = await useAsyncData(`meal-${id}`, () => 
  $fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
)

const meal = computed(() => data.value?.meals?.[0] || {})

// Split raw instructions into an array of individual steps
const formattedSteps = computed(() => {
  const instructions = meal.value.strInstructions
  if (!instructions) return []
  
  return instructions
    .split(/step\s+\d+/i)
    .map(step => step.trim())
    .filter(step => step.length > 0)
})

// Parse the ingredients into an array
const ingredients = computed(() => {
  if (!meal.value) return []
  const ingr = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = (meal.value[`strIngredient${i}`] || '').trim()
    const measure = (meal.value[`strMeasure${i}`] || '').trim()
    if (ingredient) {
      ingr.push({
        display: `${measure} ${ingredient}`.trim(),
        name: ingredient
      })
    }
  }
  return ingr
})
</script>

<style scoped>
</style>

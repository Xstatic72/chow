<template>
  <div class="p-8">
    <button @click="navigateTo('/dashboard')" class="mb-4 text-[var(--color-primary)] hover:underline">
      <ArrowLeft class="inline-block mr-1 text-lg" /> Home
    </button>

    <h1 class="text-3xl font-bold text-[var(--color-primary)] mb-6">{{ config.label }}: <span class="capitalize">{{ filterValue }}</span></h1>

    <div v-if="meals.length > 0" class="grid grid-cols-4 gap-6">
      <div v-for="meal in meals" :key="meal.idMeal" class="cursor-pointer" @click="navigateTo(`/dashboard/meal/${mealSlug(meal)}`)">
        <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-full rounded-lg mb-2" />
        <p class="font-semibold">{{ meal.strMeal }}</p>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-8">No meals found for this {{ config.label.toLowerCase() }}</div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue';
import { mealSlug } from '~/utils/slug';

definePageMeta({ layout: 'app' })

const route = useRoute()
const filterType = (route.query.type as string) || 'category'
const filterValue = route.params.slug as string

const typeMap = {
  category: { param: 'c', label: 'Category' },
  country: { param: 'a', label: 'Country' },
  ingredient: { param: 'i', label: 'Ingredient' }
}

const config = typeMap[filterType] || typeMap['category']

const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?${config.param}=${encodeURIComponent(filterValue)}`

const { data } = await useFetch(apiUrl)

const meals = computed(() => data.value?.meals || [])
</script>

<style lang="scss" scoped>

</style>

<template>
    <div class="p-8">
        <h1 class="text-2xl font-bold text-[var(--color-primary)] mb-6">Saved Recipes</h1>
        
        <div v-if="savedItems.length === 0" class="flex flex-col items-center justify-center h-[60vh] text-gray-400">
            <p class="text-lg">No saved recipes yet</p>
            <NuxtLink to="/dashboard" class="mt-4 text-[var(--color-primary)] hover:underline text-sm">
                Discover meals →
            </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-3 gap-4">
            <Card
                v-for="meal in savedItems"
                :key="meal.idMeal"
                :name="meal.strMeal"
                :image="meal.strMealThumb"
                @click="navigateTo(`/dashboard/meal/${meal.idMeal}`)"
            />
        </div>
    </div>
</template>

<script setup>
    definePageMeta({ layout: 'app' })
    const { savedItems } = useSaved()
</script>

<style scoped>

</style>
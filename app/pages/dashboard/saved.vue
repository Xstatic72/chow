<template>
    <div class="p-4 md:p-8 lg:px-16">
        <button @click="navigateTo('/dashboard')" class="mb-4 hover:underline" :style="{ color: 'var(--color-primary)' }">
            <ArrowLeft class="inline-block mr-1 text-lg" /> Home
        </button>
        <h1 class="text-2xl font-bold mb-6" :style="{ color: 'var(--color-primary)' }">Saved Recipes <span class="text-gray-500 text-sm">({{ savedItems.length }})</span></h1>
        

        <div v-if="savedItems.length === 0" class="flex flex-col items-center justify-center h-[80dvh] text-gray-400">
            <p class="text-lg">No saved recipes yet</p>
            <NuxtLink to="/dashboard" class="mt-4 hover:underline text-2xl" :style="{ color: 'var(--color-primary)' }">
                Discover meals →
            </NuxtLink>
        </div>

        <div v-else class="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                <div v-for="(meal, index) in savedItems" :key="index" class="cursor-pointer hover:-translate-y-0.5 transition-transform duration-700" @click="navigateTo(`/dashboard/meal/${mealSlug(meal)}`)">
                    <div class="relative rounded-xl border border-gray-100 bg-white/70 p-3 shadow-sm">
                        <div class="flex sm:flex-row gap-3 sm:items-start">
                            <img :src="meal.strMealThumb" :alt="meal.strMeal" class="rounded-xl size-20 sm:size-24 object-cover shrink-0">
                            <div class="flex-wrap gap-2">
                                        <PillLink :link="`/dashboard/discover/${meal.strCategory}?type=category`" :name="meal.strCategory" class="bg-green-600/90 m-2 block text-[0.625rem]"  />
                                        <PillLink :link="`/dashboard/discover/${meal.strArea}?type=country`" :name="meal.strArea" class="bg-green-600/90 block m-2 text-[0.625rem]"  />
                            </div>
                        </div>

                        <div class="relative z-10">
                            <p class="text-md font-bold max-w-sm pb-2">{{ meal.strMeal }}</p>                    
                        </div>
                        <button @click.stop="toggleSave(meal); $forceUpdate()" class="absolute top-2 right-2 text-white size-10 p-2 rounded-full backdrop-blur-lg bg-[#86a384]/50 hover:bg-green-300/50 transition-colors duration-300">
                            <Trash2 :class="['cursor-pointer text-red-500 transition-transform duration-200', {'scale-110' : isSaved(meal)}]" />
                        </button>
                    </div>
                        
                </div>
        </div>
    </div>
</template>

<script setup>
    import { Trash2, ArrowLeft } from '@lucide/vue';
    definePageMeta({ layout: 'app' })
    const { savedItems, toggleSave, isSaved } = useSaved()
</script>

<style scoped>

</style>
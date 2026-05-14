<template>
    <div class="p-8">
        <button @click="navigateTo('/dashboard')" class="mb-4 text-[var(--color-primary)] hover:underline">
            <ArrowLeft class="inline-block mr-1 text-lg" /> Home
        </button>
        <h1 class="text-2xl font-bold text-[var(--color-primary)] mb-6">Saved Recipes <span class="text-gray-500 text-sm">({{ savedItems.length }})</span></h1>
        

        <div v-if="savedItems.length === 0" class="flex flex-col items-center justify-center h-[80dvh] text-gray-400">
            <p class="text-lg">No saved recipes yet</p>
            <NuxtLink to="/dashboard" class="mt-4 text-[var(--color-primary)] hover:underline text-2xl">
                Discover meals →
            </NuxtLink>
        </div>

        <div v-else class="relative grid grid-cols-5 gap-4">
                <div v-for="(meal, index) in savedItems" :key="index" class="cursor-pointer" @click="navigateTo(`/dashboard/meal/${mealSlug(meal)}`)">
                    <div class="relative w-[240px] h-[200px] bg-cover p-4 bg-center content-end text-left rounded-xl hover:-translate-y-2 hover:-rotate-1 transition-all hover:shadow-lg hover:shadow-green-500/40 duration-500" :style="{ backgroundImage: `url('${meal.strMealThumb}')` }">
                        <div class="absolute inset-0 bg-black bg-opacity-30 rounded-xl"></div>
                        <div class="relative z-10">
                            <p class="text-white text-md font-bold max-w-sm pb-2">{{ meal.strMeal }}</p>
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
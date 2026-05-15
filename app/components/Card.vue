<template>
    
        <p class="md:text-xl text-[var(--color-primary)] font-bold pb-2">{{ title }}</p>
        <div class="relative w-[175px] h-[170px] md:w-[350px] md:h-[250px] bg-cover p-4 bg-center content-end text-left rounded-xl hover:translate-y-[-8px] hover:-rotate-1 transition-all hover:shadow-lg hover:shadow-green-500/40 duration-500" :style="{ backgroundImage: `url('${image}')` }">
            <div class="absolute inset-0 bg-black bg-opacity-30 rounded-xl"></div>
            <div class="relative z-10">
                <p class="text-white md:text-2xl font-bold max-w-sm pb-2">{{ name }}</p>
            </div>
            
        </div>

</template>

<script setup>
    defineProps({
        image: String,
        title: String,
        name: String
    })
</script>

<style scoped>

</style>
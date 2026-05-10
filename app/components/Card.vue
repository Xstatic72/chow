<template>
    <div>
        <div class="relative w-[350px] h-[400px] bg-cover p-4 bg-center content-end text-left rounded-xl hover:translate-y-[-10px] hover:shadow-lg hover:-rotate-1 transition-all hover:shadow-[var(--color-btn-hover)] duration-500" :style="{ backgroundImage: `url('${image}')` }">
            <div class="absolute inset-0 bg-black bg-opacity-30 rounded-xl"></div>
            <div class="relative z-10">
                <p class="text-white text-2xl font-bold pb-2">{{ name }}</p>
            </div>
            
        </div>
        <p class="text-xl text-[var(--color-primary)] font-bold pt-4">{{ title }}</p>
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
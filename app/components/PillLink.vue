<template>
    
        <NuxtLink :to="link" @click.stop class="px-3 py-1 text-center rounded-full backdrop-blur-sm text-white text-xs font-medium cursor-pointer bg-green-200/20 hover:bg-[var(--color-primary)] hover:text-white transition-all hover:scale-105 active:scale-95 duration-200">
            {{ name }}
        </NuxtLink>
    
</template>

<script setup>
defineProps({
    name: String,
    link: String
})

</script>

<style scoped>

</style>
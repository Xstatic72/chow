<template>
    <span>
        <p class="text-white px-4 py-1.5 border-2 cursor-pointer hover:bg-[var(--color-primary-light)] rounded-full">{{item}}</p>
    </span>
</template>

<script setup>
    defineProps({
        item: String
    })
</script>

<style scoped>

</style>
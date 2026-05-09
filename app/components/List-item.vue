<template>
    <div>
        <p class="text-white p-4 border-b cursor-pointer hover:bg-[var(--color-primary-light)] rounded-xl">{{item}}</p>
    </div>
</template>

<script setup>
    defineProps({
        item: String
    })
</script>

<style scoped>

</style>
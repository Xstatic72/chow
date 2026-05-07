<template>
    <div>
        <p>{{ error.statusCode }}</p>
        <p class="text-5xl">OMO</p>
        <p>{{ error.message }}</p>
    </div>
</template>

<script setup>
    defineProps(['error'])
</script>

<style scoped>

</style>
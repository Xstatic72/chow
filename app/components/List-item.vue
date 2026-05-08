<template>
    <div>
        <p class="p-4 border-b">{{item}}</p>
    </div>
</template>

<script setup>
    const props = defineProps({
        item: String
    })
</script>

<style scoped>

</style>
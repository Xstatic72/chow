<template>
    <span>
        <p @click="goToDiscover" class="text-white text-xs px-4 bg-white/15 py-1.5 border whitespace-nowrap cursor-pointer hover:bg-white hover:text-[var(--color-primary)] rounded-full">{{item}}</p>
    </span>
</template>

<script setup>
const props = defineProps({
    item: String,
    type: String // 'category' | 'country' | 'ingredient'
})

const goToDiscover = () => {
    navigateTo(`/dashboard/discover/${props.item}?type=${props.type}`)
}
</script>

<style scoped>

</style>
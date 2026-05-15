<template>
    <span>
        <p @click="goToDiscover" class="text-white px-4 py-1.5 border-2 cursor-pointer hover:bg-[var(--color-primary-light)] rounded-full">{{item}}</p>
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
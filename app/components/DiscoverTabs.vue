<template>
    <div class="shrink-0 flex bg-white/20 rounded-xl p-1 gap-1">
        <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            @click="$emit('select', tab)"
            :class="[
                'block w-full py-1.5 px-4 mx- ml-0 rounded-xl text-sm cursor-pointer transition-transform duration-200 transform hover:scale-95 ',
                activeTab === tab
                    ? 'bg-white text-[var(--color-primary)]'
                    : 'text-white hover:bg-white/20'
            ]"
        >
            {{ tab }}
        </button>
    </div>
</template>

<script setup>
defineProps({
    tabs: {
        type: Array,
        default: () => ['Categories', 'Countries', 'Ingredients']
    },
    activeTab: {
        type: String,
        default: 'Categories'
    }
})

defineEmits(['select'])
</script>

<style scoped></style>
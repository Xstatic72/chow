<template>
    <div class="shrink-0">
        <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            @click="$emit('select', tab)"
            :class="[
                'block w-full p-2 px-3 m-4 ml-0 rounded-full cursor-pointer transition-transform duration-200 transform hover:-translate-y-1 hover:shadow-md hover:bg-emerald-100',
                activeTab === tab
                    ? 'border-2 border-emerald-700 bg-emerald-200'
                    : 'bg-emerald-50 border-2 border-transparent'
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
<template>
    <div class="relative flex bg-white/20 rounded-xl p-1">
        <div
            class="absolute rounded-xl bg-white"
            :style="{
                width: slider.width + 'px',
                height: slider.height + 'px',
                transform: `translateX(${slider.left}px)`,
                transition: 'transform 600ms cubic-bezier(0.44, 1.45 , 0.64, 1), width 500ms ease'
            }"
        />

        <button
            v-for="tab in tabs"
            :key="tab"
            :ref="el => { if (el) tabRefs[tab] = el }"
            type="button"
            @click="$emit('select', tab)"
            :class="[
                'relative z-10 py-1.5 px-5 rounded-xl text-sm cursor-pointer transition-all duration-500',
                activeTab === tab ? 'text-[var(--color-primary)]' : 'text-white hover:bg-white/20 hover:scale-90'
            ]"
        >
            {{ tab }}
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    tabs: { type: Array, default: () => ['Categories', 'Countries', 'Ingredients'] },
    activeTab: { type: String, default: 'Categories' }
})

defineEmits(['select'])

const tabRefs = ref({})
const slider = ref({ width: 0, height: 0, left: 0 })

const updateSlider = () => {
    const activeEl = tabRefs.value[props.activeTab]
    if (!activeEl) return
    slider.value = {
        width: activeEl.offsetWidth,
        height: activeEl.offsetHeight,
        left: activeEl.offsetLeft - 4
    }
}

watch(() => props.activeTab, () => nextTick(updateSlider))
onMounted(() => nextTick(updateSlider))
</script>
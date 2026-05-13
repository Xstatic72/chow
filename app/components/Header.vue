<template>
    <header class="flex justify-between px-8 items-center p-2 border-b border-[var(--color-primary-light)]">
        <NuxtLink to="/"><h1 class="text-[var(--color-primary)] text-2xl">Chow</h1></NuxtLink>
        <div @click="isUserOptionsOpen = !isUserOptionsOpen" :class="['relative flex text-[var(--color-primary)] font-semibold ml-[10rem] p-2 rounded-xl cursor-pointer', { 'hover:bg-green-100': !isUserOptionsOpen }]">
            <p  class="text-lg">Hey, {{ name }}</p>
            <Transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="-translate-y-10 opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-5"
            >
            <div v-if="isUserOptionsOpen" role="menu" aria-label="User menu" @keydown.esc="isUserOptionsOpen = false" class="absolute top-16 -left-11 z-50 min-w-[12rem] w-48 backdrop-blur-md bg-green-500/60 text-white rounded-lg py-2 shadow-xl text-sm">
                <div role="menuitem" tabindex="0" class="h-12 flex items-center px-4 hover:bg-emerald-300 focus:bg-emerald-300 focus:outline-none">Saved recipes</div>
                <div role="menuitem" tabindex="0" class="h-12 flex items-center px-4 hover:bg-emerald-300 focus:bg-emerald-300 focus:outline-none">About</div>
                <div role="menuitem" tabindex="0" @click="logout" class="h-12 flex items-center px-4 hover:bg-emerald-300 focus:bg-emerald-300 focus:outline-none">Logout</div>
            </div>
            </Transition>
            <ChevronDown  :class="['ml-2 mt-1 transition-transform duration-500', {'rotate-180': isUserOptionsOpen}]" />
        </div>
        <SearchBar />
    </header>
</template>

<script setup>
import { ChevronDown } from '@lucide/vue';

const name = ref('You')
const isUserOptionsOpen = ref(false);

onMounted(() => {
    name.value = localStorage.getItem('name') || 'You';
})

const logout = () => {
    if (import.meta.client) {
        localStorage.clear()
    }
    navigateTo('/')
}
</script>

<style scoped></style>

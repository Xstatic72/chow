<template>
    <header class="flex justify-between md:px-8 items-center p-2 border-b border-[var(--color-primary-light)]">
        <NuxtLink to="/"><h1 class="text-[var(--color-primary)] text-lg md:text-2xl">Chow</h1></NuxtLink>
        <div ref="dropdownRef" @click="isUserOptionsOpen = !isUserOptionsOpen" :class="['relative flex text-[var(--color-primary)] font-semibold lg:ml-[10rem] p-2 rounded-xl cursor-pointer', { 'hover:bg-green-100': !isUserOptionsOpen }]">
            <p class=" text-sm md:text-lg whitespace-nowrap">Hey, {{ name }}</p>
            <Transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="-translate-y-10 opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-5"
            >
            <div v-if="isUserOptionsOpen" role="menu" aria-label="User menu" @keydown.esc="isUserOptionsOpen = false" class="absolute top-16 -left-11 z-50 min-w-[12rem] w-48 backdrop-blur-md bg-green-500/60 text-white rounded-lg py-2 shadow-xl text-sm">
                <NuxtLink @click="navigateTo('/dashboard/saved')" role="menuitem" tabindex="0" class="h-12 flex items-center px-4 hover:bg-emerald-300 focus:bg-emerald-300 focus:outline-none"><Heart class="mr-2 h-5 w-5 text-red-400" />Saved recipes</NuxtLink>
                <NuxtLink @click="isAboutOpen=true" role="menuitem" tabindex="0" class="h-12 flex items-center px-4 hover:bg-emerald-300 focus:bg-emerald-300 focus:outline-none"><Info class="mr-2 h-5 w-5" />About</NuxtLink>
                <NuxtLink role="menuitem" tabindex="0" @click="logout" class="h-12 flex items-center px-4 hover:bg-emerald-300 focus:bg-emerald-300 focus:outline-none"><LogOut class="mr-2 h-5 w-5" />Logout</NuxtLink>
            </div>
            </Transition>
            <ChevronDown :class="['ml-2 mt-1 size-4 md:size-5 transition-transform duration-500', {'rotate-180': isUserOptionsOpen}]" />
        </div>
        <Teleport to="body">
            <About v-if="isAboutOpen" @close="isAboutOpen=false" />
        </Teleport>
        <SearchBar />
    </header>
</template>

<script setup lang="ts">
import { ChevronDown, Heart, LogOut, Info } from '@lucide/vue';

const { savedItems } = useSaved()
const name = ref('You')
const isMobileExpanded = useState('mobileSearchExpanded', () => false)
const isUserOptionsOpen = ref(false)
const isAboutOpen = ref(false)
const dropdownRef = ref(null)

const handleClickOutside = (e: MouseEvent) => {
if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isUserOptionsOpen.value = false
}
}

watch(isUserOptionsOpen, (val) => {
    if (val) {
        document.addEventListener('click', handleClickOutside)
    } else {
        document.removeEventListener('click', handleClickOutside)
    }
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})

onMounted(() => {
    name.value = localStorage.getItem('name') || 'You';
})

const logout = () => {
    if (import.meta.client) {
        localStorage.clear()
        savedItems.value = []
    }
    navigateTo('/')
    

}
</script>

<style scoped></style>

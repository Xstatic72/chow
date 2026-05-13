<template>
    <Transition
        appear
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >

        <div 
            class="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/50"
            @click.self="$emit('close')"
        >
        <div class="backdrop-blur-md bg-green-500/60 text-white rounded-xl p-8 max-w-md text-xl w-full">
             <button @click="$emit('close')" class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200">
                <X class="size-6" />
            </button>
            <h1 class="text-2xl pb-4">Chow</h1>
            <p>Welcome to Chow! This platform was built by <a href="https://onyedikachukwu.vercel.app/" target="_blank" class="underline hover:text-gray-300">Onyedikachukwu Okeke</a> in May, 2026
              as a capstone project during an internship at <a href="https://wearecheck.co/" target="_blank" class="underline hover:text-gray-300">Check</a>.</p>
              <p> This app was built around the API from <a href="https://www.themealdb.com/api.php" target="_blank" class="underline hover:text-gray-300">TheMealDB.com</a>. Chow serves as a hands-on exploration of responsive frontend architecture using Vue and Nuxt.</p>
        </div>
        </div>
    </Transition>
</template>

<script setup>
    import { X } from '@lucide/vue';

</script>

<style scoped>

</style>
<template>
    <div class="h-[100dvh] flex items-center px-16">
        <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-4 justify-center pr-8">
            <h1 class="text-6xl mb-4 font-bold scale-y-[1.5]" style="color: var(--color-primary);">Welcome to Chow</h1>
            <p>Find fun recipes for meals from around the world. Whether you're a seasoned chef or just starting your cooking journey, these recipes are your key to creating mouthwatering masterpieces in your very own kitchen.</p>
            <div class="text-lg flex gap-4 mt-4">
                <input v-model="name" class="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" placeholder="What's your name?">
                <button :disabled="!name.trim()" @click="startExploring" class="btn transition-colors duration-300">Start exploring</button>

            </div>
        </div>
        <div class="w-full rounded-xl overflow-hidden hover:translate-y-[-10px] hover:shadow-lg hover:-rotate-1 transition-all hover:shadow-green-800 duration-500">
            <img class="object-contain" src="\assets\images\lily-banse--YHSwy6uqvk-unsplash.jpg" alt="Delicious Food">
        </div>
    </div>
    </div>

</template>

<script setup>
    const name = ref('');
    const startExploring = () => {

        localStorage.setItem('name', name.value);

        // redirect to dashboard page
        navigateTo('/dashboard');
    };
</script>

<style>

@font-face {
    font-family: Matemasie;
    src: url('/assets/fonts/Matemasie-Regular.ttf') format('truetype');
}
@font-face {
    font-family: Exo;
    src: url('/assets/fonts/static/Exo2-Light.ttf') format('truetype');
}

:root {
    --color-primary: #29ce60;
    --color-btn-hover: #01b03b;
}

h1 {
    font-family: Matemasie, sans-serif;
}
p {
    font-family: Exo, sans-serif;
}


.btn {
        background-color: var(--color-primary);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.35rem;
}
.btn:hover {
        background-color: var(--color-btn-hover);
}
.btn:active {
        scale: 90%;
}

input {
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.375rem;    /* rounded-md */
  padding-top: 0.5rem;       /* py-2 */
  padding-bottom: 0.5rem;    /* py-2 */
  padding-left: 1rem;        /* px-4 */
  padding-right: 1rem;       /* px-4 */
}

input:focus {
  outline: 2px solid transparent; /* focus:outline-none */
  outline-offset: 2px;
  box-shadow: 0 0 0 2px #22c55e;  /* focus:ring-2 focus:ring-green-500 */
}

</style>
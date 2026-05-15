<template>
    <div class="min-h-screen flex items-center px-6 md:px-16 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-center">
            <div class="flex flex-col gap-4 justify-center pr-0 md:pr-8">
                <h1 class="text-4xl md:text-6xl mb-4 font-bold" style="color: var(--color-primary);">Welcome to Chow</h1>
                <p class="text-base md:text-lg text-gray-700">Find fun recipes for meals from around the world. Whether you're a seasoned chef or just starting your cooking journey, these recipes are your key to creating mouthwatering masterpieces in your very own kitchen.</p>

                <div class="text-lg flex flex-col md:flex-row gap-4 mt-4">
                    <input v-model="name" class="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-full md:w-auto" type="text" placeholder="What's your name?">
                    <button :disabled="!name.trim()" @click="startExploring" class="btn transition-colors duration-300 w-full md:w-auto">Start exploring</button>
                </div>
            </div>

            <div class="w-full rounded-xl overflow-hidden transition-transform duration-500 hover:shadow-lg">
                <img class="object-cover w-full h-64 md:h-auto rounded-lg" src="/assets/images/lily-banse--YHSwy6uqvk-unsplash.jpg" alt="Delicious Food">
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
    --color-primary: #29c15c;
    --color-btn-hover: #0ca53f;
    --color-primary-light: #20d55ccd;
}

.hide-scrollbar {
  /* For Firefox */
  scrollbar-width: none;
  
  /* For Internet Explorer and Edge */
  -ms-overflow-style: none;
}

/* For Chrome, Safari, and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

h1 {
    font-family: Matemasie, sans-serif;
}
p {
    font-family: Exo, sans-serif;
}

.scrollbar-thin {
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.4) transparent;
    }

    .scrollbar-thin::-webkit-scrollbar {
        width: 4px;
    }

    .scrollbar-thin::-webkit-scrollbar-track {
        background: transparent;
    }

    .scrollbar-thin::-webkit-scrollbar-thumb {
        background-color: rgba(255,255,255,0.4);
        border-radius: 999px;
    }

    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background-color: rgba(255,255,255,0.7);
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
    box-shadow: 0 0 0 2px var(--color-primary);
}

</style>
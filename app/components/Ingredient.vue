<template>
    <div>
        <div class="flex bg-cover p-4 bg-center content-end text-left rounded-xl hover:translate-y-[-8px] hover:-rotate-1 transition-all duration-500">
             <div class="">   
                <img :src="image" alt="ingredient image" class="size-16 object-cover rounded-xl" />
                <p class=" text-sm font-bold max-w-sm pb-2 text-[var(--color-primary)]">{{ name }}</p>         
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    image: String,
    name: String,
})
</script>


<style scoped>

</style>
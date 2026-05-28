<template>
    <div class="loader mx-auto">

    </div>
</template>

<script setup>

</script>

<style scoped>
    .loader {
    border: 5px solid #f3f3f300;
    border-radius: 50%;
    border-top: 3px solid #ffffff72;
    width: 30px;
    height: 30px;
    -webkit-animation: spin 2s infinite ease-in-out; /* Safari */
    animation: spin 2s infinite ease-in-out;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
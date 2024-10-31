<script lang="ts" setup xmlns="http://www.w3.org/1999/html">

defineEmits(["onClick"]);

</script>

<template>
  <div class="flex gap-1 w-full text-sm">
    <div class="text-gray-700 border-left-1 ml-1"></div>
    <div class="flex justify-content-between gap-2 w-full">
      <div class="text-gray-700">Assurance 1 an casse</div>
      <div class="flex gap-2">
        <div class="text-red-500 line-through">10€</div>
        <div class="text-gray-700">8.7€</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
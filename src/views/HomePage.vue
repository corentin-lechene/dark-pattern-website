<script lang="ts" setup>

import ProductsForYou from "@/components/ProductsForYou.vue";
import ProductsNews from "@/components/ProductsNews.vue";
</script>

<template>
  <div class="content flex flex-column pb-4 overflow-y-scroll" style="gap: 0.65em">
    <ProductsForYou/>

    <ProductsNews/>
  </div>
</template>

<style scoped>

</style>
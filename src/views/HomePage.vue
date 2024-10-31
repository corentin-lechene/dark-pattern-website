<script lang="ts" setup>

import ProductsForYou from "@/components/ProductsForYou.vue";
import ProductsNews from "@/components/ProductsNews.vue";
</script>

<template>
  <div class="content flex flex-column pb-4 overflow-y-scroll" style="gap: 0.65em; min-height: 85%;">
    <ProductsForYou/>

    <ProductsNews :seed="1" title="Nouveautés"/>
    <ProductsNews :seed="6" title="Incontournables"/>
    <ProductsNews :seed="12" title="Meilleures ventes"/>
  </div>
</template>

<style scoped>

</style>
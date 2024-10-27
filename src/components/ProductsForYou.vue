<script lang="ts" setup>

import SliderBase from "@/components/SliderBase.vue";
import ProductCard from "@/components/ProductCard.vue";

import products from "@/data/products.json";
</script>

<template>
  <SliderBase class="pt-2" title="Pour vous" view-all>
    <ProductCard v-for="(product, i) in products.slice(10)" :key="i" :product="product"/>
  </SliderBase>
</template>

<style scoped>

</style>
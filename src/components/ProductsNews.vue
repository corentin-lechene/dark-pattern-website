<script lang="ts" setup>

import ProductCard from "@/components/ProductCard.vue";
import SliderBase from "@/components/SliderBase.vue";

import products from "@/data/products.json";
</script>

<template>
  <SliderBase title="Nouveaux produits" view-all>
    <ProductCard v-for="(product, i) in products.reverse().slice(10)" :key="i" :product="product"/>
  </SliderBase>
</template>

<style scoped>

</style>
<script lang="ts" setup>

import SliderBase from "@/components/SliderBase.vue";
import ProductCard from "@/components/ProductCard.vue";
import {useCartStore} from "@/stores/cart.store";

import products from "@/data/products.json";

const cartStore = useCartStore();

</script>

<template>
  <SliderBase class="" title="Pour vous" view-all>
    <ProductCard v-for="(product, i) in products.slice(10).filter(p => p.id !== cartStore.currentProduct.id)" :key="i"
                 :product="product"/>
  </SliderBase>
</template>

<style scoped>

</style>
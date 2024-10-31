<script lang="ts" setup>

import ProductCard from "@/components/ProductCard.vue";
import SliderBase from "@/components/SliderBase.vue";

import products from "@/data/products.json";
import {ref} from "vue";


const props = defineProps({
  title: String,
  seed: {
    type: Number,
    default: 0
  }
})

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffleArrayWithSeed(arr: any[], seed: number) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}


const productsSorted = ref(shuffleArrayWithSeed(products, props.seed));

</script>

<template>
  <SliderBase :title="title" view-all>
    <ProductCard v-for="(product, i) in productsSorted" :key="i" :product="product"/>
  </SliderBase>
</template>

<style scoped>
</style>
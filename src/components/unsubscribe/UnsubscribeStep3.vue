<script lang="ts" setup>

import SliderBase from "@/components/SliderBase.vue";
import ProductCard from "@/components/ProductCard.vue";

import products from "@/data/products.json";
import CategoriesSlider from "@/components/CategoriesSlider.vue";
</script>

<template>
  <div class="content flex flex-column align-items-center py-4"
       style="min-height: 85%; gap: 0.65em">
    <div class="text-3xl text-center font-medium mt-4">Des nouvelles offres</div>
    <div class="flex flex-column gap-2 w-full">
      <div class="text-center text-gray-600">Rien que pour vous !</div>
    </div>

    <div class="flex flex-column gap-2 w-full">
      <SliderBase title="Promotions">
        <ProductCard v-for="(product, i) in products.slice(15, 20)" :key="i" :product="product"/>
      </SliderBase>

      <CategoriesSlider/>

    </div>

    <div class="w-full px-4">
      <Button class="w-full" label="J'en profite" severity="success" @click="$router.push({name: 'Subscription'})"/>
    </div>

    <div>
      <Button class="text-black-alpha-50" label="Non merci" link severity="contrast" @click="$emit('next')"/>
    </div>
  </div>
</template>

<style scoped>

</style>
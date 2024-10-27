<script lang="ts" setup>

import SliderBase from "@/components/SliderBase.vue";
import ProductCard from "@/components/ProductCard.vue";

import products from "@/data/products.json";
</script>

<template>
  <div class="content flex flex-column align-items-center py-4"
       style="min-height: 85%; gap: 0.65em">
    <div class="text-2xl text-center">C'est vraiment dommage !</div>
    <div class="text-center px-4">Vous nous quittez si tôt à l'approche d'une grosse réduction</div>

    <div class="w-full ">
      <SliderBase title="Promotions">
        <ProductCard v-for="(product, i) in products.slice(15, 20)" :key="i" :product="product"/>
      </SliderBase>
    </div>

    <div class="w-full px-4">
      <Button class="w-full" label="J'en profite" severity="success" @click="$router.push({name: 'Subscription'})"/>
    </div>

    <div>
      <Button label="Non merci" severity="secondary" @click="$emit('next')"/>
    </div>
  </div>
</template>

<style scoped>

</style>
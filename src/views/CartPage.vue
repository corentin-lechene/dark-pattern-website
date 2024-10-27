<script lang="ts" setup>

import products from "@/data/products.json";
import BannerProduct from "@/components/BannerProduct.vue";
import ProductListItem from "@/components/ProductListItem.vue";

const randomProduct = products[Math.floor(Math.random() * products.length)];

</script>

<template>
  <div class="content flex flex-column pb-4 overflow-y-scroll" style="min-height: 85%; gap: 0.65em">
    <BannerProduct :product="randomProduct"/>

    <div class="flex flex-column gap-3 px-4">
      <div class="text-xl">Votre panier</div>
      <div class="flex flex-column gap-5">
        <ProductListItem
            v-for="(product, i) in products.slice(2, 5)"
            :key="i"
            :product="product"
            button-color="danger"
            buttonLabel="Retirer"
        />
      </div>
    </div>
    <div class="px-4 py-2 fixed z-5" style="bottom: 10%; right: 35%">
      <Button
          class="w-full"
          label="Valider le panier"
          size="large"
          @click="() => $router.push({name: 'Payment'})"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
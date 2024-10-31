<script lang="ts" setup>

import BannerProduct from "@/components/BannerProduct.vue";
import ProductListItem from "@/components/ProductListItem.vue";
import {useCartStore} from "@/stores/cart.store";
import products from "@/data/products.json";

const cartStore = useCartStore();

const randomProduct = products[Math.floor(Math.random() * products.length)];

</script>

<template>
  <div class="content flex flex-column pb-4 overflow-y-scroll" style="min-height: 85%; gap: 0.65em">
    <BannerProduct :product="randomProduct"/>

    <div class="flex flex-column gap-3 px-4 mt-2">
      <div class="text-xl">Tous les produits</div>
      <div class="flex flex-column gap-5">
        <ProductListItem
            v-for="(product, i) in products"
            :key="i"
            :product="product"
            button-color="danger"
            buttonLabel="Retirer"
            view
            @on-click="cartStore.add(product)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
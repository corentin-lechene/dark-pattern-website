<script lang="ts" setup>

import BannerProduct from "@/components/BannerProduct.vue";
import ProductListItem from "@/components/ProductListItem.vue";
import {useCartStore} from "@/stores/cart.store";
import products from "@/data/products.json";
import {computed} from "vue";

const cartStore = useCartStore();

const randomProduct = products[Math.floor(Math.random() * products.length)];
const cartProducts = cartStore.cart;

const isRandomProductInCart = computed(() => {
  return cartProducts.some(p => p.id === randomProduct.id);
});

</script>

<template>
  <div class="content flex flex-column pb-4 overflow-y-scroll" style="min-height: 85%; gap: 0.65em">
    <BannerProduct v-if="!isRandomProductInCart" :product="randomProduct" @on-click="cartStore.add(randomProduct)"/>

    <div class="flex flex-column gap-3 px-4 pt-4">
      <div class="text-xl">Votre panier</div>
      <div v-if="cartProducts.length > 0" class="flex flex-column gap-5">
        <ProductListItem
            v-for="(product, i) in cartProducts"
            :key="i"
            :product="product"
            button-color="danger"
            buttonLabel="Retirer"
            @on-click="cartStore.remove(product.id)"
        />
      </div>
      <div v-else>
        <div class="text-sm text-gray-600">Votre panier est vide</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
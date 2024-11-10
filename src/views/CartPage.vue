<script lang="ts" setup>

import ProductListItem from "@/components/ProductListItem.vue";
import {useCartStore} from "@/stores/cart.store";
import {computed} from "vue";

const cartStore = useCartStore();

const cartProducts = computed(() => cartStore.cart);

</script>

<template>
  <div class="content flex flex-column pb-4 overflow-y-scroll" style="min-height: 85%; gap: 0.65em; height: 100%;">
    <div v-if="cartProducts.length > 0" class="flex flex-column gap-3 px-4 pt-4">
      <div class="text-xl font-medium">Produits ({{ cartProducts.length }})</div>
      <div class="flex flex-column gap-3">
        <ProductListItem
            v-for="(product, i) in cartProducts"
            :key="i"
            :product="product"
            class="border-bottom-1 pb-3 border-gray-200"
            button-color="danger"
            buttonLabel="Retirer"
            handle-insurance
            @on-click="cartStore.remove(product.id)"
        />
      </div>
    </div>
    <div v-else class="flex flex-column align-items-center justify-content-center"
         style="height: 80%; min-height: 80%;">
      <img alt="empty cart" src="@/assets/images/empty-cart.jpg" style="width: 50%;"/>
      <div class="text-xl mb-1 font-semibold">Ajouter des produits à votre panier</div>
      <div class="text-sm text-gray-700 font-medium text-center">Ensuite vous pourrez passer au paiement<br> afin de
        recvoir vos cadres
      </div>

      <Button class="mt-4" label="Commencer le shopping" @click="$router.push({name: 'Home'})"/>
    </div>
  </div>
</template>

<style scoped>

</style>
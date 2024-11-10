<script lang="ts" setup>

import ProductListItem from "@/components/ProductListItem.vue";
import {useCartStore} from "@/stores/cart.store";
import products from "@/data/products.json";
import {computed} from "vue";
import {useRoute} from "vue-router";
import {Product} from "@/models/product.model";

const route = useRoute();
const cartStore = useCartStore();

const allProducts: Product[] = computed(() => {
  const category = route.query['category_name'];
  if (category) {
    return products.filter(product => product.category.name === category);
  }
  return products;
});

</script>

<template>
  <div class="content flex flex-column pb-4 overflow-y-scroll" style="min-height: 85%; gap: 0.65em">

    <div class="flex flex-column gap-3 px-4 mt-2">
      <div class="text-xl">Tous les produits</div>
      <div class="flex flex-column gap-5">
        <ProductListItem
            v-for="(product, i) in allProducts"
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
<script lang="ts" setup>

import {Product} from "@/models/product.model";

interface ProductCardProps {
  product: Product;
}

defineProps<ProductCardProps>();

</script>

<template>
  <div class="flex flex-column gap-2">
    <div class="w-10rem">
      <img
          :src="product.image"
          alt="product image"
          class="w-full h-full border-round"
          @click="$router.push({name: 'Product', params: {product_id: product.id}})"
      />
    </div>
    <div class="flex flex-column">
      <div class="flex flex-column">
        <div class="flex justify-content-between">
          <div class="text-lg">{{ product.name }}</div>
          <div>{{ product.price }}€</div>
        </div>
      </div>
      <div class="text-sm text-gray-700 overflow-hidden" style="max-height: 15px">{{ product.description }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>
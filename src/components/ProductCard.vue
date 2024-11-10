<script lang="ts" setup>

import {Product} from "@/models/product.model";

interface ProductCardProps {
  product: Product;
}

defineProps<ProductCardProps>();

</script>

<template>
  <div class="flex flex-column shadow-2 my-2 border-round-lg">
    <div class="cube cursor-pointer relative">
      <div class="absolute border-round-xl px-2 py-1 shadow-2 bg-green-600" style="top: 5%; right: 5%">
        {{ (product.price * parseFloat('1.' + product.size)) }}€
      </div>
      <img
          :src="product.image"
          alt="product image"
          class="w-full h-full border-round"
          style="object-fit: cover"
          @click="$router.push({name: 'Product', params: {product_id: product.id}})"
      />
    </div>
    <div class="flex flex-column gap-2 p-2">
      <div class="text-lg">{{ product.name }}</div>
      <div class="text-sm text-gray-700 overflow-hidden">{{ product.description }}</div>
    </div>
  </div>
</template>

<style scoped>
.cube {
  width: auto;
  height: 130px;
  max-width: 200px;
  min-width: 200px;
}
</style>
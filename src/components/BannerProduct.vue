<script lang="ts" setup>

import {Product} from "@/models/product.model";

interface BannerProductProps {
  product: Product;
}

defineProps<BannerProductProps>();
defineEmits(["on-click"]);

</script>

<template>
  <div class="flex align-items-center justify-content-center w-full bg-gray-200 py-3 px-5">
    <div class="flex gap-3">
      <div class="cube">
        <img :src="product.image" alt="product image" class="w-full h-full border-round" style="object-fit: cover"/>
      </div>
      <div class="flex flex-column">
        <div class="text-xl">{{ product.name }}</div>
        <div class="text-gray-700 py-2">{{ product.description }}</div>
        <!-- prix barré + prix achat       -->
        <div class="flex justify-content-between align-items-center">
          <div class="flex gap-1">
            <div class="text-red-500 line-through">{{ product.price }}€</div>
            <div>{{ product.price * 0.87 }}€</div>
          </div>
          <Button label="Ajouter" size="small" @click="$emit('on-click')"></Button>
        </div>
      </div>
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
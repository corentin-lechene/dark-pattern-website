<script lang="ts" setup>

import {Product} from "@/models/product.model";
import InsuranceListItem from "@/components/InsuranceListItem.vue";

interface ProductListItemProps {
  product: Product;
  buttonLabel: string;
  buttonColor: string | "secondary" | "success" | "info" | "warning" | "help" | "danger" | "contrast" | undefined;
  view?: boolean;
}

defineProps<ProductListItemProps>();

</script>

<template>
  <div class="flex flex-column gap-3">
    <!-- Produit   -->
    <div class="flex gap-3"
         @click="$router.push({name: 'Product', params: {product_id: product.id}})"
    >
      <div class="cube">
        <img
            :src="product.image"
            alt="product image"
            class="w-auto h-full border-round"
        />
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
          <Button v-if="!view" :label="buttonLabel" :severity="buttonColor" size="small"
                  @click="$emit('onClick')"></Button>
        </div>
      </div>
    </div>
    <!-- Assurance   -->
    <div v-if="product.insurance && !view" class="flex gap-3 w-full">
      <div class="border-gray-800 border-left-1"></div>
      <InsuranceListItem/>
    </div>
  </div>
</template>

<style scoped>

.cube {
  width: auto;
  height: 110px;
}

</style>
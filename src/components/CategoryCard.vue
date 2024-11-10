<script lang="ts" setup>

import {Category} from "@/models/product.model";

interface CategoryCardProps {
  category: Category;
}

defineProps<CategoryCardProps>();

</script>

<template>
  <div class="flex flex-column">
    <div class="text-sm text-gray-500 font-semibold">{{ category.name }}</div>
    <div class="border-round-xl shadow-4 my-2 cursor-pointer" style="background: #855C23;"
         @click="$router.push({name: 'Products', query: {category_name: category.name}})">
      <div class="cube">
        <img :src="category.image" alt="category image" class="w-full h-full border-round-top"
             style="object-fit: cover"/>
      </div>
      <div class="text-white text-sm px-2 pb-3 pt-2">{{ category.description }}</div>
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
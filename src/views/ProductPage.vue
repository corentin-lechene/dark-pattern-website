<script lang="ts" setup>


import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import products from "@/data/products.json";
import ProductsForYou from "@/components/ProductsForYou.vue";

const route = useRoute();
const router = useRouter();

const product = ref();

onMounted(() => {
  const productId = route.params['product_id'];
  if (!productId) {
    return router.push({name: 'Home'});
  }

  product.value = products.find(p => p.id === productId);
  if (!product.value) {
    return router.push({name: 'Home'});
  }
})
</script>

<template>
  <div v-if="product" class="flex flex-column" style="min-height: 85%">
    <div class="flex justify-content-center relative overflow-hidden p-2">
      <img :src="product.image" alt="product image" class="absolute"
           style="width: 100%; z-index: -1; filter: blur(10px);"/>
      <img :src="product.image" alt="product image" style="width: 80%;"/>
      <Button class="absolute" label="Ajouter au panier" style="bottom: 2.5%;"/>

    </div>
    <div class="flex flex-column gap-1 px-3 py-3">
      <div class="flex flex-column">
        <div class="flex justify-content-between">
          <div class="text-xl">{{ product.name }}</div>
          <div class="text-lg">{{ product.price }}€</div>
        </div>
      </div>
      <div class="text-sm text-gray-700 overflow-hidden">{{ product.description }}</div>
    </div>

    <ProductsForYou/>

  </div>
</template>

<style scoped>

</style>
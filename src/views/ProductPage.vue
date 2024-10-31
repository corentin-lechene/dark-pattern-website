<script lang="ts" setup>


import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import products from "@/data/products.json";
import ProductsForYou from "@/components/ProductsForYou.vue";
import {useCartStore} from "@/stores/cart.store";
import {useToast} from "primevue/usetoast";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const toast = useToast();

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

function handleAddToCart() {
  cartStore.add(product.value);
  toast.add({severity: 'success', summary: 'Produit ajouté au panier', life: 3000});
}

</script>

<template>
  <div v-if="product" class="flex flex-column" style="min-height: 85%">
    <Toast position="top-center"/>
    <div class="flex justify-content-center relative overflow-hidden p-2">
      <img :src="product.image" alt="product image" class="absolute"
           style="width: 100%; z-index: 0; filter: blur(10px);"/>
      <img :src="product.image" alt="product image" class="relative" style="width: 80%; z-index: 1;"/>
      <Button
          class="absolute"
          label="Ajouter au panier"
          style="bottom: 2.5%; z-index: 2;"
          @click="handleAddToCart()"
      />

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
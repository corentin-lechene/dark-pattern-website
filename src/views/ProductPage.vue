<script lang="ts" setup>


import {onMounted, onUpdated, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import products from "@/data/products.json";
import ProductsForYou from "@/components/ProductsForYou.vue";
import {useCartStore} from "@/stores/cart.store";
import Comments from "@/components/Comments.vue";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const product = ref();
const currentSize = ref('30x30');

onUpdated(() => handleOnMounted())

onMounted(() => handleOnMounted())

function handleOnMounted() {
  const productId = route.params['product_id'];
  if (!productId) {
    return router.push({name: 'Home'});
  }

  product.value = products.find(p => p.id === productId);
  if (!product.value) {
    return router.push({name: 'Home'});
  }

  cartStore.currentProduct = product.value;
}
</script>

<template>
  <div v-if="product" class="flex flex-column" style="min-height: 82.5%">
    <div class="flex justify-content-center relative">
      <img :src="product.image" alt="product image" class="relative w-full" style="z-index: 0;"/>

      <div class="absolute z-5 bg-white shadow-2 p-4 border-round-xl gap-2 flex flex-column"
           style="bottom: -40%; width: 85%;">
        <div class="flex flex-column">
          <div class="flex justify-content-between">
            <div class="text-xl">{{ product.name }}</div>
            <div class="text-lg">{{ product.price * parseFloat('1.' + currentSize[0]) }}€</div>
          </div>
        </div>
        <div class="text-sm text-gray-700 overflow-hidden">{{ product.description }}</div>
        <div class="flex mt-2">
          <div v-for="size in ['20x20', '30x30', '40x40']" class="flex flex-column">
            <div
                :class="currentSize === size ? 'bg-gray-200' : ''"
                class="border-round-lg p-2 cursor-pointer"
                @click="currentSize = size; cartStore.currentProduct.size = parseInt(size[0])"
            >{{ size }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <Comments :product="product" style="margin-top: 7.5em;"/>

    <ProductsForYou/>

  </div>
</template>

<style scoped>

</style>
<script lang="ts" setup>

import {Product} from "@/models/product.model";
import {useCartStore} from "@/stores/cart.store";
import {ref} from "vue";
import {useObjectiveStore} from "@/stores/objective.store";

const cartStore = useCartStore();
const objectiveStore = useObjectiveStore();

interface ProductListItemProps {
  product: Product;
  buttonLabel: string;
  buttonColor: string | "secondary" | "success" | "info" | "warning" | "help" | "danger" | "contrast" | undefined;
  view?: boolean;
  handleInsurance?: boolean;
}

const props = defineProps<ProductListItemProps>();
defineEmits(["onClick"]);

const insurance = ref(props.product.insurance);

function handleClick() {
  if (insurance.value) {
    cartStore.removeInsurance(props.product.id);
    objectiveStore.removedInsurance();
  } else {
    cartStore.addInsurance(props.product.id);
  }
  insurance.value = !insurance.value;
}

</script>

<template>
  <div class="flex justify-content-between align-items-center w-full">
    <div class="flex gap-3">
      <div class="cube">
        <img
            :src="product.image"
            alt="product image"
            class="w-full h-full border-round cursor-pointer"
            style="object-fit: cover"
            @click="$router.push({name: 'Product', params: {product_id: product.id}})"
        />
      </div>
      <div class="flex flex-column gap-1">
        <div
            class="text-xl cursor-pointer font-medium"
            @click="$router.push({name: 'Product', params: {product_id: product.id}})">
          {{ product.name }}
        </div>
        <!-- prix barré + prix achat       -->
        <div class="flex justify-content-between align-items-center text-lg">
          <div class="flex align-items-center gap-1">
            <div class="">{{ (product.price * parseFloat('1.' + product.size)) }}€</div>
            <div class="px-2 py-1 border-round-2xl bg-primary text-sm">
              <span v-if="product.size === 2">S</span>
              <span v-if="product.size === 3">M</span>
              <span v-if="product.size === 4">L</span>
            </div>
            <!-- Insurance       -->
            <div v-if="handleInsurance" :class="{ 'bg-primary': insurance }"
                 class="flex px-2 py-1 border-round-2xl text-sm cursor-pointer" @click="handleClick()">
              <i class="pi pi-shield"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <i class="pi pi-trash cursor-pointer text-2xl" @click="$emit('onClick')"></i>
    </div>
  </div>
</template>

<style scoped>

.cube {
  width: auto;
  height: 70px;
  max-width: 100px;
  min-width: 100px;
}

</style>
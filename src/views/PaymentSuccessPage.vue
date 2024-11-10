<script lang="ts" setup>

import {useCartStore} from "@/stores/cart.store";
import {useObjectiveStore} from "@/stores/objective.store";
import {onMounted} from "vue";

const cartStore = useCartStore();
const objectiveStore = useObjectiveStore();

const formatDate = new Date().toLocaleDateString();
const formatHour = new Date().toLocaleTimeString();

onMounted(() => {
  objectiveStore.paidCart();
})

</script>

<template>
  <div class="content flex flex-column justify-content-between p-4 overflow-y-scroll bg-white"
       style="min-height: 85%; gap: 0.65em; height: 85%;">
    <div class="flex flex-column justify-content-center h-full align-items-center gap-3 w-full">
      <div class="text-3xl font-bold">Paiement effectué</div>
      <div class="text-xl font-semibold">Commande #3456789</div>
      <div class="font-medium">Le {{ formatDate }} à {{ formatHour }}</div>
      <div class="text-sm font-semibold py-3">{{ cartStore.total }} €</div>
      <div>
        <i class="pi pi-check-circle text-green-700" style="font-size: 5rem"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
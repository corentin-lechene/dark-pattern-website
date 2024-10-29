<script lang="ts" setup>

import {ref} from "vue";

const newsletter = ref(true)
const newProduct = ref(true)
const orderUpdate = ref(true)
const realTimePromo = ref(true)
const orderAlert = ref(true)
const newProductAlert = ref(true)

</script>

<template>
  <div class="content flex flex-column p-4 overflow-y-scroll"
       style="min-height: 85%; gap: 0.65em">
    <div class="text-2xl">Mes préférences de notifications</div>
    <div class="flex flex-column gap-2 w-full">
      <div class="flex gap-2 align-items-center">
        <Checkbox v-model="newsletter" binary/>
        <span class="text-sm">Je souhaite recevoir des <span class="text-blue-500">promotions et offres spéciales</span></span>
      </div>
      <div class="flex gap-2 align-items-center">
        <Checkbox v-model="newProduct" binary/>
        <span class="text-sm">Je souhaite recevoir des notifications sur les <span class="text-blue-500">nouveaux produits</span></span>
      </div>
      <div class="flex gap-2 align-items-center">
        <Checkbox v-model="orderUpdate" binary/>
        <span class="text-sm">Je souhaite être informé des <span
            class="text-blue-500">mises à jour de commande</span></span>
      </div>
      <div class="flex gap-2 align-items-center">
        <Checkbox v-model="realTimePromo" binary/>
        <span class="text-sm">Je souhaite recevoir des <span
            class="text-blue-500">promotions en temps réel</span></span>
      </div>
      <div class="flex gap-2 align-items-center">
        <Checkbox v-model="orderAlert" binary/>
        <span class="text-sm">Je souhaite recevoir des <span
            class="text-blue-500">mises à jour de commande</span></span>
      </div>
      <div class="flex gap-2 align-items-center">
        <Checkbox v-model="newProductAlert" binary/>
        <span class="text-sm">Je souhaite recevoir des alertes pour <span class="text-blue-500">nouveaux produits</span></span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
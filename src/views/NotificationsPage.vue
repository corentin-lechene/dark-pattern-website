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
    <div class="text-2xl mb-2">Mes préférences de notifications</div>
    <div class="text-gray-600 text-sm">
      Vous pouvez personnaliser les notifications que vous souhaitez recevoir pour améliorer votre expérience.
    </div>


    <div class="flex flex-column gap-2 w-full">
      <div class="flex justify-content-between p-3 border-round-xl border-1 border-gray-300 shadow-2">
        <div class="flex flex-column gap-2">
          <div class="font-medium">Newsletter</div>
          <div class="text-gray-600 text-sm" style="max-width: 80%;">Recevoir les dernières actualités.</div>
        </div>
        <Checkbox v-model="newsletter" binary/>
      </div>

      <div class="flex justify-content-between p-3 border-round-xl border-1 border-gray-300 shadow-2">
        <div class="flex flex-column gap-2">
          <div class="font-medium">Nouveaux produits</div>
          <div class="text-gray-600 text-sm" style="max-width: 80%;">
            Recevoir des notifications sur les nouveaux
          </div>
        </div>
        <Checkbox v-model="newProduct" binary/>
      </div>

      <div class="flex justify-content-between p-3 border-round-xl border-1 border-gray-300 shadow-2">
        <div class="flex flex-column gap-2">
          <div class="font-medium">Mises à jour de commande</div>
          <div class="text-gray-600 text-sm" style="max-width: 80%;">Être informé des mises à jour de commande.</div>
        </div>
        <Checkbox v-model="orderUpdate" binary/>
      </div>

      <div class="flex justify-content-between p-3 border-round-xl border-1 border-gray-300 shadow-2">
        <div class="flex flex-column gap-2">
          <div class="font-medium">Promotions en temps réel</div>
          <div class="text-gray-600 text-sm" style="max-width: 80%;">Recevoir des promotions en temps réel.</div>
        </div>
        <Checkbox v-model="realTimePromo" binary/>
      </div>

      <div class="flex justify-content-between p-3 border-round-xl border-1 border-gray-300 shadow-2">
        <div class="flex flex-column gap-2">
          <div class="font-medium">Mises à jour de commande</div>
          <div class="text-gray-600 text-sm" style="max-width: 80%;">Recevoir des mises à jour de commande.</div>
        </div>
        <Checkbox v-model="orderAlert" binary/>
      </div>

      <div class="flex justify-content-between p-3 border-round-xl border-1 border-gray-300 shadow-2">
        <div class="flex flex-column gap-2">
          <div class="font-medium">Alertes nouveaux produits</div>
          <div class="text-gray-600 text-sm" style="max-width: 80%;">Recevoir des alertes pour les nouveaux produits.
          </div>
        </div>
        <Checkbox v-model="newProductAlert" binary/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
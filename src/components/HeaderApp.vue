<script lang="ts" setup>

import {ref} from "vue";

defineProps({
  logoOnly: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  backBtn: {
    type: Boolean,
    default: false,
  },
  shopButton: {
    type: Boolean,
    default: false,
  },
})

const items = ref({
  Home: 'Accueil',
  Subscription: 'Abonnement',
  UnSubscribe: 'Abonnement',
  UnsubscribeSuccess: 'Désabonnement réussi',
  Cart: 'Panier',
  Account: 'Compte',
  Product: 'Produit',
  Products: 'Produits',
  MyAccount: 'Mon compte',
  Payment: 'Paiement',
  PaymentSuccess: 'Paiement réussi',
})

</script>

<template>
  <div class="flex w-full sticky top-0 p-3 bg-gray-50 border-gray-200 border-bottom-1 overflow-hidden relative z-5">
    <div v-if="logoOnly" class="flex gap-1 align-items-center">
      <img alt="App Logo" class="w-2 h-2" src="@/assets/logo.jpg"/>
      <div class="font-semibold text-xl">Appli</div>
    </div>
    <div v-else class="flex gap-3 align-items-center text-2xl w-full">
      <div v-if="backBtn" class="p-2 border-round-xl cursor-pointer bg-gray-300" @click="$router.back()">
        <i class="pi pi-chevron-left"></i>
      </div>
      <div :class="{'text-center': backBtn}" class="w-full mr-6">{{ title in items ? items[title] : title }}</div>
      <div v-if="shopButton" class="px-4 py-2 border-round-xl cursor-pointer bg-green-300" @click="$router.back()">
        Acheter
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
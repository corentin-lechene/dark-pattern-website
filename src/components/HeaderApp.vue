<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {useCartStore} from "@/stores/cart.store";
import {useToast} from "primevue/usetoast";
import {useUserStore} from "@/stores/user.store";
import dayjs from "dayjs/esm/index.js";

const userStore = useUserStore();
const cartStore = useCartStore();
const toast = useToast();

defineEmits(['onOpenObjective']);

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
  shopProduct: {
    type: Boolean,
    default: false,
  },
})

const items = ref({
  Home: 'Accueil',
  Subscription: 'Abonnement',
  UnSubscribe: 'Désabonnement',
  UnsubscribeSuccess: 'Désabonnement réussi',
  Cart: 'Panier',
  Account: 'Compte',
  Product: 'Produit',
  Products: 'Produits',
  MyAccount: 'Mon compte',
  Payment: 'Paiement',
  PaymentSuccess: 'Paiement réussi',
  Policy: 'Politique de confidentialité',
})

const steps = ref([15, 25, 35, 45, 95]);
const timer = ref('');

onMounted(() => {
  if (userStore.startTime !== null) {
    setInterval(() => {
      if (!userStore.endTime) {
        //format : mm:ss using dayjs
        const seconds = dayjs().diff(dayjs(userStore.startTime), 'second');
        const minutes = Math.floor(seconds / 60);
        timer.value = `${minutes}:${seconds - minutes * 60}`;
      }
    }, 1000);
  }
})
</script>

<template>
  <div class="flex w-full sticky top-0 p-3 bg-gray-50 border-gray-200 border-bottom-1 overflow-hidden relative z-5">
    <div v-if="logoOnly" class="flex gap-1 align-items-center justify-content-between">
      <div class="flex align-items-center gap-2">
        <img alt="App Logo" class="w-2 h-2" src="@/assets/logo.png"/>
        <div class="font-semibold text-xl">Appli</div>
      </div>
      <div class="relative">
        <i class="pi pi-flag text-xl mr-2 bg-gray-200 p-3 cursor-pointer" style="border-radius: 100%"
           @click="$emit('onOpenObjective')"></i>
        <div v-if="userStore.startTime && !userStore.endTime"
             class="absolute top-0 right-0 bg-white border-1 border-gray-400 border-round-xl px-2 py-1 text-xs -mt-3">
          {{ timer }}
        </div>
      </div>
    </div>
    <div v-else class="flex gap-3 align-items-center text-2xl w-full">
      <div v-if="backBtn" class="cursor-pointer" @click="$router.back()">
        <i class="pi pi-chevron-left"></i>
      </div>

      <div :class="{'text-center': backBtn}" class="w-full mr-6">{{
          title in items ? items[title] : title
        }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  width: 100px;
  height: 0.3rem;
  background-color: #e0e0e0;
  border-radius: 0.5rem;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: #4CAF50;
}
</style>
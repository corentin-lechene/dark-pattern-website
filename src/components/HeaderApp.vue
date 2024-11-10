<script lang="ts" setup>

import {ref} from "vue";
import {useCartStore} from "@/stores/cart.store";
import {useToast} from "primevue/usetoast";
import {NotificationsService} from "@/services/notifications.service";
import {useUserStore} from "@/stores/user.store";

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
  UnSubscribe: 'Abonnement',
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

function notif() {
  toast.add({severity: 'success', summary: 'Produit ajouté au panier', life: 3000});
  setTimeout(() => {
    NotificationsService.show({
      title: "Vos produits vous attend",
      message: "N'oublier pas de valider votre panier, les produits sont limités !",
    })
  }, 10000)
}
</script>

<template>
  <div class="flex w-full sticky top-0 p-3 bg-gray-50 border-gray-200 border-bottom-1 overflow-hidden relative z-5">
    <div v-if="logoOnly" class="flex gap-1 align-items-center justify-content-between">
      <div class="flex align-items-center gap-2">
        <img alt="App Logo" class="w-2 h-2" src="@/assets/logo.png"/>
        <div class="font-semibold text-xl">Appli</div>
      </div>
      <div class="">
        <i class="pi pi-flag text-xl mr-2 bg-gray-200 p-3 cursor-pointer" style="border-radius: 100%"
           @click="$emit('onOpenObjective')"></i>
      </div>
    </div>
    <div v-else class="flex gap-3 align-items-center text-2xl w-full">
      <div v-if="backBtn" class="cursor-pointer" @click="$router.back()">
        <i class="pi pi-chevron-left"></i>
      </div>

      <div v-if="$route.name === 'UnSubscribe'" class="flex justify-content-center w-full">
        <div class="progress-bar -ml-7">
          <div :style="{width: `${steps[userStore.step]}%`}" class="progress-bar-fill"></div>
        </div>
      </div>
      <div v-else :class="{'text-center': backBtn}" class="w-full mr-6">{{
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
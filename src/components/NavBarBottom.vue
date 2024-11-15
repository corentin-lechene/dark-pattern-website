<script lang="ts" setup>

import {ref} from "vue";
import {useToast} from "primevue/usetoast";
import {useCartStore} from "@/stores/cart.store";
import {NotificationsService} from "@/services/notifications.service";
import router from "@/router";
import {useUserStore} from "@/stores/user.store";
import {useObjectiveStore} from "@/stores/objective.store";

const cartStore = useCartStore();
const toast = useToast();
const objectiveStore = useObjectiveStore();

const items = ref([
  {
    title: 'Accueil',
    name: 'Home',
    icon: 'pi-home',
  },
  {
    title: 'Abonnement',
    name: 'Subscription',
    icon: 'pi-id-card',
  },
  {
    title: 'Panier',
    name: 'Cart',
    icon: 'pi-shopping-cart',
  },
  {
    title: 'Compte',
    name: 'Account',
    icon: 'pi-user',
  },
])

function notif() {
  toast.add({severity: 'success', summary: 'Produit ajouté au panier avec l\'assurance', life: 3000});
  setTimeout(() => {
    NotificationsService.show({
      title: "Vos produits vous attend",
      message: "N'oublier pas de valider votre panier, les produits sont limités !",
    })
  }, 10000)
}


function handlePay() {
  toast.add({severity: 'success', summary: 'Paiement effectué avec succès', life: 3000});
  router.push({name: 'PaymentSuccess'});
}

function handleFinishPay() {
  cartStore.clear();
  router.push({name: 'Home'});
}

function handleAddProduct() {
  cartStore.addProduct(useUserStore().currentUser?.autoInsurance || false);
  notif();
  objectiveStore.addedArticle();
}

</script>

<template>
  <div class="nab-bar-bottom sticky bottom-0 w-full p-3 bg-gray-50 border-top-1 border-gray-300">
    <div class="flex flex-column gap-4">
      <!-- Cart Page   -->
      <div v-if="$route.name === 'Cart'" class="flex justify-content-evenly px-2">
        <div v-if="cartStore.cart.length > 0"
             class="flex justify-content-between w-full font-semibold px-4 py-3 bg-primary border-round-3xl cursor-pointer"
             @click="$router.push({name: 'Payment'})">
          <div>Continuer</div>
          <div>{{ cartStore.total }}€</div>
        </div>
        <div v-else
             class="flex justify-content-between text-white font-semibold w-full px-4 py-3 border-round-3xl cursor-pointer"
             style="background: #6366F1; opacity: 0.6;"
             @click="$router.push({name: 'Payment'})">
          <div class="font-medium ">Continuer</div>
          <div>{{ cartStore.total }}€</div>
        </div>
      </div>
      <!-- Product Page   -->
      <div v-else-if="$route.name === 'Product'" class="flex justify-content-evenly px-4">
        <Button class="w-full border-round-3xl px-4 py-3" icon="pi pi-credit-card" label="Ajouter au panier"
                severity="primary"
                @click="handleAddProduct()"/>
      </div>

      <!-- Product Page   -->
      <div v-else-if="$route.name === 'Payment'" class="flex justify-content-evenly px-4">
        <Button class="w-full border-round-3xl px-4 py-3" icon="pi pi-credit-card" label="Payer" severity="primary"
                @click="handlePay()"/>
      </div>
      <!-- Payment Success Page   -->
      <div v-else-if="$route.name === 'PaymentSuccess'" class="flex justify-content-evenly px-4">
        <Button class="w-full border-round-3xl px-4 py-3" label="Retour à l'accueil" severity="primary"
                @click="handleFinishPay()"/>
      </div>

      <!-- Default Page   -->
      <div v-if="$route.name !== 'PaymentSuccess'" class="flex justify-content-evenly">
        <div
            v-for="(item, i) in items"
            :key="i"
            :class="$route.name === item.name ? '' : 'opacity-50'"
            class="flex flex-column gap-1 align-items-center cursor-pointer"
            @click="$router.push({name: item.name})"
        >
          <div>
            <i :class="item.icon" class="pi text-xl"></i>
          </div>
          <div>{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nab-bar-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
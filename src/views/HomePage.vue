<script lang="ts" setup>
import ProductsForYou from "@/components/ProductsForYou.vue";
import ProductsNews from "@/components/ProductsNews.vue";
import {computed, onMounted, ref} from "vue";
import products from "@/data/products.json";
import ProductListItem from "@/components/ProductListItem.vue";
import {useCartStore} from "@/stores/cart.store";
import {useToast} from "primevue/usetoast";
import {useUserStore} from "@/stores/user.store";

const cartStore = useCartStore();
const userStore = useUserStore();
const toast = useToast();

const openProductLimitedDialog = ref(false);
const randomProduct = products[Math.floor(Math.random() * products.length)];
const remainingTime = ref(10 * 60); // Temps en secondes (10 minutes)

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60);
  const seconds = remainingTime.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

function startTimer() {
  const timerInterval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value -= 1;
    } else {
      clearInterval(timerInterval);
      openProductLimitedDialog.value = false; // Ferme la boîte de dialogue quand le temps est écoulé
      toast.add({
        severity: "warn",
        summary: "Temps écoulé",
        detail: "L'offre a expiré !",
        life: 5000,
      });
    }
  }, 1000);
}

function handleOpenProductLimitedDialog() {
  if (!userStore.isFirstTime) return;
  toast.add({
    severity: "info",
    summary: "Produit limité",
    detail: "Venez découvrir le produit phare !",
    life: 7500,
    closable: false,
  });
  userStore.isFirstTime = false;
  openProductLimitedDialog.value = true;
  startTimer();
}

onMounted(() => handleOpenProductLimitedDialog());

function handleAddProduct() {
  cartStore.add({
    id: randomProduct.id,
    name: randomProduct.name,
    price: randomProduct.price,
    image: randomProduct.image,
    description: randomProduct.description,
    insurance: true,
  });
  openProductLimitedDialog.value = false;
}
</script>

<template>
  <div
      class="content flex flex-column pb-4 overflow-y-scroll"
      style="gap: 0.65em; min-height: 85%;"
  >
    <ProductsForYou/>
    <ProductsNews :seed="1" title="Nouveautés"/>
    <ProductsNews :seed="6" title="Incontournables"/>
    <ProductsNews :seed="12" title="Meilleures ventes"/>

    <Dialog
        v-model:visible="openProductLimitedDialog"
        :base-z-index="0"
        class="mx-4"
        header="Produit limité"
        style="width: 450px; height: 95%;"
    >
      <div class="flex flex-column gap-3">
        <div class="text-xl">Venez découvrir le produit phare</div>
        <p class="text-gray-600">
          Tout le monde en parle, et tout le monde le veut.
          Voici la révolution qui va bouleverser votre quotidien.
        </p>

        <!-- Affichage du timer de 10 minutes -->
        <div class="timer">
          Temps restant : <span>{{ formattedTime }}</span>
        </div>

        <ProductListItem
            :product="randomProduct"
            button-color="primary"
            buttonLabel="Retirer"
            view
        />

        <Button class="w-full" label="Continuer" @click="handleAddProduct"/>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.timer {
  font-size: 1.2em;
  font-weight: bold;
  color: #e74c3c; /* Couleur pour indiquer un compte à rebours */
}
</style>
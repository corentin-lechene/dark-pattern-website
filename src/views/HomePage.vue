<script lang="ts" setup>
import ProductsForYou from "@/components/ProductsForYou.vue";
import ProductsNews from "@/components/ProductsNews.vue";
import {onMounted, ref} from "vue";
import products from "@/data/products.json";
import {useCartStore} from "@/stores/cart.store";
import {useToast} from "primevue/usetoast";
import {useUserStore} from "@/stores/user.store";
import BannerSubscription from "@/components/BannerSubscription.vue";
import CategoriesSlider from "@/components/CategoriesSlider.vue";
import {Product} from "@/models/product.model";
import Comments from "@/components/Comments.vue";
import {useObjectiveStore} from "@/stores/objective.store";

const cartStore = useCartStore();
const userStore = useUserStore();
const objectiveStore = useObjectiveStore();
const toast = useToast();

const openProductLimitedDialog = ref(false);
const randomProduct: Product = products[Math.floor(Math.random() * products.length)];
const canClose = ref(false);

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

  setTimeout(() => {
    canClose.value = true;
  }, 5000);
}

onMounted(() => handleOpenProductLimitedDialog());

function handleAddProduct() {
  cartStore.currentProduct = randomProduct;
  cartStore.addProduct(true)
  objectiveStore.addedArticle();
  openProductLimitedDialog.value = false;
}
</script>

<template>
  <div
      class="content flex flex-column pb-4 overflow-y-scroll"
      style="gap: 0.65em; min-height: 85%;"
  >
    <BannerSubscription v-if="userStore.currentUser?.subscription !== 'premium'"/>

    <ProductsForYou :class="{'mt-4': userStore.currentUser?.subscription === 'premium'}"/>

    <CategoriesSlider/>

    <ProductsNews :seed="1" title="Nouveautés"/>
    <ProductsNews :seed="6" title="Incontournables"/>
    <ProductsNews :seed="12" title="Meilleures ventes"/>

    <Dialog
        v-model:visible="openProductLimitedDialog"
        :closable="false"
        :pt="{header: {style: {padding: 0}}, content: {style: {padding: 0, position: 'relative'}}, root: {style: {border: 'none', borderRadius: '50px', height: '550px', maxHeight: '750px'}}}"
        class="m-4"
        modal
        style="width: 425px;"
    >
      <template #header>
        <div class="w-full h-15rem relative" style="border-radius: 30px">
          <div
              v-if="canClose"
              class="flex align-items-center absolute top-0 right-0 m-2 border-round-3xl bg-gray-400"
          >
            <div class="pl-3 text-white">Fermer</div>
            <i class="pi pi-times text-white p-2 text-sm cursor-pointer" style="margin-bottom: -2px"
               @click="openProductLimitedDialog = false"></i>
          </div>
          <img
              :src="randomProduct.image"
              alt="user-happy"
              class="w-full h-full border-round-top-xl"
              style="object-fit: cover; object-position: 0 0;"
          />
        </div>
      </template>
      <div class="flex flex-column gap-3 mt-3 relative px-4">
        <div class="flex justify-content-between">
          <div class="text-lg font-semibold">{{ randomProduct.name }}</div>
          <div class="text-lg">{{ randomProduct.price }}€</div>

        </div>
        <div>{{ randomProduct.description }}</div>
        <Comments :product="randomProduct" class="-mx-4"/>
      </div>
      <div class="flex justify-content-evenly px-4 py-2 w-full mt-1 sticky bottom-0 mb-2 bg-white">
        <Button
            class="w-full border-round-3xl px-2 py-2 border-gray-400 border-1"
            label="Ajouter au panier"
            severity="primary"
            @click="handleAddProduct()"
        />
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
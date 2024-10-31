<script lang="ts" setup>

import {useCartStore} from "@/stores/cart.store";
import InsuranceListItem from "@/components/InsuranceListItem.vue";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const cartStore = useCartStore();

const paypal = ref(false);
const cdc = ref(false);

const isDisabled = computed(() => !paypal.value && !cdc.value);

function handlePayment() {
  cartStore.clear();
  router.push({name: 'PaymentSuccess'});
}

</script>

<template>
  <div class="content flex flex-column justify-content-between p-4 overflow-y-scroll bg-white"
       style="min-height: 85%; gap: 0.65em">
    <div class="flex flex-column gap-2">
      <div class="flex flex-column gap-1">
        <div class="text-lg">Vous avez 3 produits</div>
        <div class="text-sm text-gray-600">Veuillez choisir un moyen de paiement</div>
        <div class="flex flex-column gap-3">
          <div class="flex gap-3 align-items-center">
            <Checkbox v-model="paypal" binary name="payment" type="radio" value="paypal" @change="cdc = false"/>
            <label for="paypal">Paypal</label>
          </div>
          <div class="flex gap-3 align-items-center">
            <Checkbox v-model="cdc" binary name="payment" value="credit-card" @change="paypal = false"/>
            <label for="credit-card">Carte de crédit</label>
          </div>
        </div>
      </div>
      <div class="flex flex-column gap-3 pt-2">
        <div class="text-xl font-bold">Résumé de la commande</div>
        <div class="flex flex-column gap-3">

          <div v-for="product in cartStore.cart" class="flex flex-column">
            <div class="flex justify-content-between">
              <div>{{ product.name }}</div>
              <div>{{ product.price }}€</div>
            </div>
            <InsuranceListItem v-if="product.insurance"/>
          </div>

          <Divider class="mb-0"/>
          <div class="flex justify-content-between">
            <div>Total</div>
            <div>{{ cartStore.total }}€</div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 py-4 z-5 w-full">
      <Button
          class="w-full"
          label="Payer"
          size="large"
          :disabled="isDisabled"
          severity="primary"
          @click="handlePayment()"
      ></Button>
    </div>
  </div>
</template>

<style scoped>

</style>
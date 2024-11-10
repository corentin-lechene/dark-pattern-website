<script lang="ts" setup>

import {ref} from "vue";
import {useCartStore} from "@/stores/cart.store";
import {useUserStore} from "@/stores/user.store";

const userStore = useUserStore();
const cartStore = useCartStore();

const visa = ref(true);
const paypal = ref(false);

const error = ref('');
const cardNumber = ref<string>('');
const cardExpiration = ref<string>('');
const cardCvc = ref<string>('');


</script>

<template>
  <div class="content flex flex-column justify-content-between p-4 overflow-y-scroll bg-white"
       style="min-height: 85%; gap: 0.65em">
    <div class="flex flex-column gap-2">
      <div class="text-xl font-medium">Moyen de paiement</div>
      <div class="flex gap-2 w-full">
        <div class="flex justify-content-between border-1 border-gray-400 w-full p-3 border-round-xl cursor-pointer"
             @click="visa = true; paypal = false">
          <div>Card</div>
          <Checkbox v-model="visa" binary label="Visa" @change="paypal = false"/>
        </div>
        <div class="flex justify-content-between border-1 border-gray-400 w-full p-3 border-round-xl cursor-pointer"
             @click="paypal = true; visa = false">
          <div>Paypal</div>
          <Checkbox v-model="paypal" binary label="Paypal" @change="visa = false"/>
        </div>
      </div>

      <!-- Credit Card     -->
      <div v-if="visa" class="flex flex-column gap-2 mt-2 mx-2">
        <div class="text-lg">Informations de paiement</div>
        <!-- Banner handle error     -->
        <div v-if="error" class="w-full bg-red-100 border-red-500 border-1 p-3 text-red-500 text-center border-round">
          <i class="pi pi-exclamation-triangle mr-1"></i>
          <span>{{ error }}</span>
        </div>
        <div class="flex flex-row gap-2">
          <div class="flex flex-column gap-1 w-full">
            <label for="cardNumber">Numéro de carte</label>
            <InputMask
                v-model="cardNumber"
                fluid
                mask="9999-9999-9999-9999"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                @input="error = ''"
            />
          </div>
        </div>
        <div class="flex gap-2">
          <div class="flex flex-column gap-1">
            <label for="cardExpiration">Date d'expiration</label>
            <InputMask
                v-model="cardExpiration"
                mask="99/99"
                placeholder="MM/YY"
                style="width: 100%;"
                @input="error = ''"
            />
          </div>
          <div class="flex flex-column gap-1">
            <label for="cardCvc">CVC</label>
            <InputMask
                v-model="cardCvc"
                mask="999"
                placeholder="XXX"
                style="width: 100%;"
                @input="error = ''"
            />
          </div>
        </div>
      </div>

      <!-- Paypal     -->
      <div v-else class="flex flex-column gap-2 mt-2 mx-2">
        <div class="text-lg">Paypal</div>
        <div class="flex flex-column gap-2">
          <InputText fluid placeholder="Email"/>
        </div>
      </div>

      <Divider class=""/>
      <!-- Récapitulatif     -->
      <div class="flex w-full flex-column gap-2">
        <div class="text-xl">Sous total</div>
        <div class="flex flex-column gap-1 w-full">
          <!-- Products         -->
          <div class="flex justify-content-between w-full">
            <div>{{ cartStore.cart.length }}x Produit<span v-if="cartStore.cart.length > 1">s</span></div>
            <div>{{ cartStore.productTotal }} €</div>
          </div>
          <!-- Insurance         -->
          <div class="flex justify-content-between w-full">
            <div>{{ cartStore.insuranceSize }}x Assurance<span v-if="cartStore.insuranceSize > 1">s</span></div>
            <div>{{ cartStore.insuranceTotal }} €</div>
          </div>
          <!-- Shipping         -->
          <div class="flex justify-content-between w-full">
            <div>Livraison</div>
            <div v-if="userStore.currentUser!.subscription === 'free'">4,99 €</div>
            <div v-else>0 €</div>
          </div>
        </div>
      </div>

      <Divider class="my-1"/>
      <!-- Récapitulatif     -->
      <div class="flex w-full justify-content-between gap-2">
        <div class="font-medium">Total</div>
        <div>{{
            (parseFloat(cartStore.total) + (userStore.currentUser!.subscription === 'free' ? 4.99 : 0)).toFixed(2)
          }} €
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
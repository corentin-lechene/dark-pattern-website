<script lang="ts" setup>

import {ref} from "vue";
import ProductsForYou from "@/components/ProductsForYou.vue";
import {useUserStore} from "@/stores/user.store";

const userStore = useUserStore();

const cardNumber = ref<string>('');
const cardExpiration = ref<string>('');
const cardCvc = ref<string>('');

const error = ref<string>('');


function handleSubscription() {
  if (cardNumber.value === '' || cardExpiration.value === '' || cardCvc.value === '') {
    error.value = 'Veuillez remplir tous les champs';
    return;
  }

  // check if expiration date is valid
  const expirationDate = cardExpiration.value.split('/');
  const month = parseInt(expirationDate[0]);
  const year = parseInt(expirationDate[1]);
  if (month < 1 || month > 12 || year < 24) {
    error.value = "Date d'expiration invalide";
    return;
  }

  userStore.currentUser!.hasSubscription = true;
}

</script>

<template>
  <!-- Pas encore souscrit  -->
  <div v-if="!userStore.hasSubscription"
       class="content degrade flex flex-column justify-content-between p-4 overflow-y-scroll"
       style="min-height: 85%; gap: 0.65em">
    <div class="flex flex-column gap-2">
      <div class="text-2xl font-bold">Abonnement en ligne</div>
      <div class="text-lg">Vous pouvez souscrire à un abonnement en ligne en remplissant le formulaire ci-dessous.</div>

      <div class="flex flex-column gap-2">
        <div class="text-lg font-bold">Informations de paiement</div>
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
            />
          </div>
          <div class="flex flex-column gap-1">
            <label for="cardCvc">CVC</label>
            <InputText
                v-model="cardCvc"
                mask="999"
                placeholder="XXX"
                style="width: 100%;"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-end">
        <Button label="Souscrire" @click="handleSubscription()"/>
      </div>

      <div class="flex flex-column gap-2">
        <div class="text-lg font-bold">Pourquoi souscrire à un abonnement en ligne ?</div>
        <div class="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nisl nec nunc
          ultricies
          fermentum. Nullam nec nisl nec nunc ultricies fermentum.
        </div>

        <div class="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nisl nec nunc
          ultricies
        </div>

        <div class="text-sm">
          Ultricies fermentum. Nullam nec nisl nec nunc ultricies fermentum.
        </div>

        <div class="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nisl nec nunc
          ultricies
          fermentum.
        </div>

        <div class="text-sm">
          Sed ut purus eget nunc. Nullam nec nisl nec nunc
          ultricies
        </div>
      </div>

    </div>
    <div class="text-xs text-center text-gray-300">
      En cliquant sur "Souscrire", vous acceptez de s'abonner à notre service en ligne d'une durée de 2 ans. Des frais
      de dossier peuvent s'appliquer
    </div>
  </div>

  <!-- A souscrit -->
  <div v-else
       class="content flex flex-column py-4 overflow-y-scroll"
       style="min-height: 85%; gap: 0.65em"
  >
    <div class="flex flex-column gap-2 px-4">
      <div class="flex justify-content-between align-items-center">
        <div class="text-2xl font-bold">Abonnement en ligne</div>
      </div>
      <div class="text-lg">Vous avez souscrit à un abonnement en ligne.</div>
      <div class="text-sm">
        Abonnement à 13,99€/mois.
      </div>
    </div>

    <ProductsForYou/>
  </div>
</template>

<style scoped>
.degrade {
  background: linear-gradient(180deg, #ffffff 60%, #b3b3b3 100%);
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
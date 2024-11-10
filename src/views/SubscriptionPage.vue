<script lang="ts" setup>

import {computed, ref} from "vue";
import {useUserStore} from "@/stores/user.store";
import ProductsForYou from "@/components/ProductsForYou.vue";
import {useToast} from "primevue/usetoast";
import {useObjectiveStore} from "@/stores/objective.store";

const toast = useToast();
const userStore = useUserStore();
const objectiveStore = useObjectiveStore();

const cardNumber = ref<string>('');
const cardExpiration = ref<string>('');
const cardCvc = ref<string>('');

const error = ref<string>('');
const premium = ref<boolean>(true);
const plus = ref<boolean>(false);

const isDisabled = computed(() => cardNumber.value === '' || cardExpiration.value === '' || cardCvc.value === '');

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
  userStore.currentUser!.subscription = premium.value ? 'premium' : 'plus';

  if (premium.value) {
    toast.add({
      severity: 'success',
      summary: 'Abonnement souscrit',
      detail: 'Tu es abonné(e) à Cadre Premium à 19,99€/mois',
      life: 3000,
    });
  } else {
    toast.add({
      severity: 'success',
      summary: 'Abonnement souscrit',
      detail: 'Tu es abonné(e) à Cadre Plus à 12,99€/mois + 7€ de frais de dossier',
      life: 3000,
    });
  }

  objectiveStore.subscribed(premium.value ? 'premium' : 'plus');
}

function handleChangeSubscription() {
  userStore.currentUser!.subscription = 'premium';
  toast.add({severity: 'success', summary: 'Abonnement changé', detail: 'Tu as changé d\'abonnement avec succès'});
  objectiveStore.subscribed('premium');
}

</script>

<template>
  <!-- Pas encore souscrit  -->
  <div v-if="!userStore.hasSubscription"
       :class="{'degrade-blue': premium, 'degrade-red': plus}"
       class="content flex flex-column justify-content-between px-6 py-6 overflow-y-scroll relative"
       style="min-height: 85%; gap: 0.65em; border-radius: 0;">
    <img v-if="premium" alt="halos" class="halo1" src="@/assets/halos/blue1.png"/>
    <img v-if="premium" alt="halos" class="halo2" src="@/assets/halos/blue2.png"/>
    <img v-if="plus" alt="halos" class="halo1" src="@/assets/halos/red1.png"/>
    <img v-if="plus" alt="halos" class="halo2" src="@/assets/halos/red2.png"/>

    <div class="flex flex-column justify-content-center gap-5">
      <div class="text-center text-3xl font-semibold mb-3">Choisir votre abonnement</div>

      <!-- Premium subscription     -->
      <div :class="{'border-2 border-primary-700': premium}"
           class="border-1 border-gray-300 shadow-3 border-round-xl px-4 py-3 cursor-pointer relative"
           @click="premium = true; plus = false"
      >
        <div :class="{'border-primary-900 border-2': premium}" :style="{top: premium ? '-8.5%' : '-6.6%'}"
             class="absolute bg-primary px-3 py-1 border-round-2xl"
        >🏆 Le plus populaire
        </div>
        <div class="flex flex-column gap-2">
          <div class="flex justify-content-between align-items-center">
            <div class="text-2xl font-semibold mt-2">Premium</div>
            <Checkbox v-model="premium" binary @change="plus = false"/>
          </div>
          <div style="width: 85%;">
            Le meilleur abonnement pour les personnes qui veulent profiter de tous les avantages de notre plateforme.
          </div>
          <div class="flex flex-column gap-1">
            <div>- VIP support 24/7</div>
            <div>- Expédition<span class="ml-1 text-primary">gratuite</span></div>
            <div>- Produits<span class="ml-1 text-primary">en avant premières</span></div>
            <div>- Prix<span class="ml-1 text-primary">réduit</span>*</div>
          </div>
          <div>19,99€/mois</div>
        </div>
      </div>
      <!-- Plus subscription     -->
      <div :class="{'border-2 border-red-700': plus}"
           class="border-1 border-gray-300 shadow-3 border-round-xl px-4 py-3 cursor-pointer relative"
           @click="premium = false; plus = true"
      >
        <div :class="{'border-red-700 border-2': plus}" :style="{top: plus ? '-8.5%' : '-6.6%'}"
             class="absolute bg-red-400 px-3 py-1 border-round-2xl"
        >
          🤷 Pour les économes
        </div>
        <div class="flex flex-column gap-2">
          <div class="flex justify-content-between align-items-center">
            <div class="text-2xl font-semibold mt-2">Plus</div>
            <Checkbox v-model="plus" binary @change="premium = false"/>
          </div>
          <div style="width: 80%;">
            L'abonnement qui vous permet de profiter de nos produits en avant première et plus.
          </div>
          <div class="flex flex-column gap-1">
            <div>- Produits<span class="ml-1 text-primary">en avant premières</span></div>
            <div>- Prix<span class="ml-1 text-primary">réduit</span>*</div>
          </div>
          <div>12,99€/mois</div>
        </div>
      </div>
    </div>

    <Divider class="w-full"/>

    <!-- Credit card    -->
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

    <Button
        v-if="plus"
        :disabled="isDisabled"
        class="gradient-bg-primary"
        icon="pi pi-credit-card"
        iconPos="right"
        label="Souscrire à l'abonnement le moins cher"
        severity="danger"
        @click="handleSubscription()"
    />
    <Button
        v-else
        :disabled="isDisabled"
        class="gradient-bg-primary"
        icon="pi pi-credit-card"
        iconPos="right"
        label="Souscrire au meilleur abonnement"
        @click="handleSubscription()"
    />

    <Divider class="w-full"/>

    <div class="text-xs text-center">* Prix réduit pour les abonnés</div>
    <div class="text-center">
      Abonnement sans engagement, vous pouvez vous désabonner à tout moment.
      Nos conditions générales s'appliquent.
      Nous ne stockons pas vos informations de paiement.
    </div>

    <div :class="{'text-primary-100': premium, 'text-red-100': plus}" class="text-xs text-center mt-8">
      En cliquant sur "Souscrire", vous acceptez de s'abonner à notre service en ligne d'une durée de 2 ans. Des frais
      de dossier peuvent s'appliquer pour l'abonnement Plus à hauteur de 7€.
    </div>
  </div>
  <div v-else class="content flex flex-column px-4 py-4 overflow-y-scroll"
       style="min-height: 85%; gap: 0.65em">
    <div class="text-2xl font-semibold">Mon abonnement</div>
    <!-- Banner    -->
    <div class="flex justify-content-between align-items-center w-full p-4 border-round-xl bg-white shadow-2">
      <div class="flex gap-3 align-items-center">
        <div>
          <i class="pi pi-id-card" style="font-size: 2rem"></i>
        </div>
        <div class="flex flex-column">
          <div class="text-gray-500">Abonné(e) à</div>
          <div class="text-xl font-semibold">
            Offre
            <span v-if="userStore.currentUser?.subscription === 'plus'" class="text-red-700">Cadre Plus</span>
            <span v-else class="text-primary-700">Cadre Premium</span>
          </div>
        </div>
      </div>
      <div v-if="userStore.currentUser?.subscription === 'plus'"
           class="bg-red-700 px-2 py-1 border-round-lg text-white">12,99€/mois
      </div>
      <div v-else class="bg-primary-500 px-2 py-1 border-round-lg text-white">19,99€/mois</div>
    </div>

    <!-- Description    -->
    <div>
      Vous êtes abonné à notre service en ligne, vous avez accès à tous nos produits en avant première et à des prix
      uniques.
    </div>

    <Divider/>

    <div v-if="userStore.currentUser?.subscription === 'plus'">
      <div>Vous avez choisi l'abonnement Plus, vous avez accès à nos produits en avant première et à des prix uniques.
      </div>
      <div>Vous pouvez vous désabonner à tout moment dans la section mon abonnement de ton compte.</div>
      <Button
          class="gradient-bg-primary mt-2"
          label="Ton expérience mérite le meilleur, change d'abonnement dés maintenant !"
          severity="success"
          @click="handleChangeSubscription()"
      />
    </div>
    <div v-else>
      <div class="text-lg font-semibold py-2">
        Tu possède le meilleur abonnement que nous proposons. Regarde ci-dessous les produits que tu pourrais avoir.
      </div>
    </div>

    <ProductsForYou class="-mx-4 mt-4"/>
  </div>
</template>

<style scoped>

.halo1, .halo2, .halo3 {
  position: absolute;
  width: auto;
  height: auto;
  z-index: 0;
  opacity: 60%;
}

.halo1 {
  position: absolute;
  top: 0%;
  left: 0;
  width: auto;
  height: auto;
}

.halo2 {
  position: absolute;
  top: 30%;
  right: 0%;
  width: auto;
  height: 30%;
}

.degrade-blue {
  background: linear-gradient(180deg, #ffffff 60%, var(--primary-400) 250%);
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.degrade-red {
  background: linear-gradient(180deg, #ffffff 60%, var(--red-400) 250%);
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
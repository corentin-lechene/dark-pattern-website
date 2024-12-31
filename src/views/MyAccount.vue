<script lang="ts" setup>

import {ref} from "vue";
import {useUserStore} from "@/stores/user.store";
import {useObjectiveStore} from "@/stores/objective.store";

const userStore = useUserStore();
const objectiveStore = useObjectiveStore();

const subscriptionRenew = ref(Boolean(userStore.currentUser!.subscriptionRenew));
const newsletter = ref(Boolean(userStore.currentUser!.newsletter));
const shareData = ref(Boolean(userStore.currentUser!.shareData));
const autoInsurance = ref(Boolean(userStore.currentUser!.autoInsurance));

const email = ref(String(userStore.currentUser!.email));

const openSubscriptionSettingsModal = ref(false);

function saveChanges() {
  userStore.currentUser!.newsletter = newsletter.value;
  userStore.currentUser!.shareData = shareData.value;
  userStore.currentUser!.subscriptionRenew = subscriptionRenew.value;
  userStore.currentUser!.autoInsurance = autoInsurance.value;
  objectiveStore.updatedPreferences();
}

const counter = ref(3918);
const height = ref('500px');

setInterval(() => {
  if (openSubscriptionSettingsModal.value) {
    counter.value++;
  }
}, 5000 + Math.floor(Math.random() * 1000));

function handleOpenSubscriptionModal() {
  openSubscriptionSettingsModal.value = true;
  if (!userStore.startTime) {
    userStore.startTime = new Date();
  }
}

</script>

<template>
  <div class="flex flex-column p-4 gap-4" style="min-height: 85%;">
    <div class="flex flex-column gap-3">
      <div class="text-2xl">Mes informations</div>
      <div class="flex flex-column gap-2 w-full">
        <div class="flex flex-column gap-2  w-full">
          <label for="email">Email</label>
          <InputText id="email" v-model="email" placeholder="Email"/>
        </div>
      </div>
    </div>

    <div class="flex flex-column gap-2">
      <div class="text-2xl pb-2">Mes préférences</div>

      <!-- Newsletter     -->
      <div class="flex justify-content-between p-3 border-round-xl border-1 border-gray-300 shadow-2">
        <div class="flex flex-column gap-2">
          <div class="font-medium">Newsletter</div>
          <div class="text-gray-600 text-sm" style="max-width: 80%;">Je ne souhaite pas recevoir les dernières
            actualités.
          </div>
        </div>
        <Checkbox v-model="newsletter" binary/>
      </div>

      <!-- Share data     -->
      <div class="flex justify-content-between p-3 border-round-xl border-1 border-gray-300 shadow-2">
        <div class="flex flex-column gap-2">
          <div class="font-medium">Mon expérience</div>
          <div class="text-gray-600 text-sm" style="max-width: 80%;">J'accepte de partager mes données pour améliorer
            mon expérience.
          </div>
        </div>
        <Checkbox v-model="shareData" binary/>
      </div>

      <!-- Abonnement     -->
      <div v-if="userStore.currentUser?.hasSubscription"
           class="flex justify-content-between p-3 border-round-xl border-1 border-gray-300 shadow-2">
        <div class="flex flex-column gap-2">
          <div class="font-medium">Abonnement</div>
          <div class="text-gray-600 text-sm" style="max-width: 80%;">J'autorise le renouvellement automatique de mon
            abonnement.
          </div>
        </div>
        <Checkbox v-model="subscriptionRenew" binary/>
      </div>

      <!-- Insurance     -->
      <div class="flex justify-content-between p-3 border-round-xl border-1 border-gray-300 shadow-2">
        <div class="flex flex-column gap-2">
          <div class="font-medium">Assurances</div>
          <div class="text-gray-600 text-sm" style="max-width: 80%;">J'ajoute automatiquement une assurance à mes
            articles.
          </div>
        </div>
        <Checkbox v-model="autoInsurance" binary/>
      </div>
    </div>

    <div class="flex justify-content-center">
      <Button class="w-full border-round-3xl" label="Sauvegarder pour le mois" severity="primary"
              style="padding: 10px 20px;"
              @click="saveChanges()"/>
    </div>

    <div v-if="userStore.currentUser?.subscription !== 'free'" class="flex flex-column gap-2">
      <div class="text-2xl pb-2">Mon abonnement</div>
      <div>
        <span>Vous avez choisi</span>
        <span>
          l'abonnement {{ userStore.currentUser?.subscription === 'premium' ? 'Premium' : 'Plus' }}
        </span>
        <span>, vous avez accès à tous nos produits en avant première et à des prix uniques.</span>
      </div>
      <div>Vous pouvez vous désabonner à tout moment dans la section mon abonnement de ton compte.</div>
      <div class="flex justify-content-center">
        <Button class="w-full border-round-3xl border-1 border-gray-400" label="Se désabonner"
                severity="secondary" style="padding: 10px 20px;" @click="handleOpenSubscriptionModal()"/>
      </div>
    </div>

    <Dialog
        v-model:visible="openSubscriptionSettingsModal"
        :closable="false"
        :pt="{
          header: { style: {padding: 0} },
          root: {style: {border: 'none', borderRadius: '50px'}}}"
        class="m-4"
        modal
        style="width: 425px; max-width: 450px; min-width: 350px;"
    >
      <template #header>
        <div class="w-full h-15rem relative" style="border-radius: 30px">
          <div
              class="absolute top-0 right-0 m-2 border-round-3xl bg-gray-400 cursor-pointer"
              @click="openSubscriptionSettingsModal = false"
          >
            <i class="pi pi-times text-white p-2 text-sm"></i>
          </div>
          <img
              alt="user-happy"
              class="w-full h-full border-round-top-xl"
              src="@/assets/images/user-happy.png"
              style="object-fit: cover; object-position: 0 0;"
          />
        </div>
      </template>
      <div class="flex flex-column gap-3 mt-3 remove-sliderbar" style="">
        <div class="text-lg font-semibold">Votre abonnement</div>
        <div>Aimer de tous, nos clients adore ce service. Vous êtes actuellement le <span
            class="text-green-700 font-semibold">{{ counter }}</span>ème client à nous faire confiance.
        </div>
        <div class="flex justify-content-evenly px-4 w-full">
          <Button
              class="w-full border-round-3xl px-2 py-2 border-gray-400 border-1"
              label="Continuer le désabonnement"
              severity="secondary"
              @click="$router.push({name: 'UnSubscribe'})"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>

</style>
<script lang="ts" setup>
import dayjs from "dayjs/esm/index.js";
import NavBarBottom from "@/components/NavBarBottom.vue";
import HeaderApp from "@/components/HeaderApp.vue";
import {computed, ref} from "vue";
import ObjectiveCard from "@/components/ObjectiveCard.vue";
import {useUserStore} from "@/stores/user.store";
import {ObjectiveType, useObjectiveStore} from "@/stores/objective.store";

dayjs.locale(localStorage.getItem('language') || 'fr');

const userStore = useUserStore();
const objectiveStore = useObjectiveStore();

const openObjectiveModal = ref(false);
const show = ref(false);

const endTime = ref("");

const needBackButton = ref([
  'Product',
  'Products',
  'MyAccount',
  'Payment',
  'UnSubscribe',
  'Policy',
  'About',
  'Notifications',
]);

const allObjectives = computed(() => [
  {
    succeed: objectiveStore.objectives[userStore.currentUser?.email || ''].includes(ObjectiveType.REGISTERED),
    color: 'gray-200',
    subtitle: "S'inscrire et se connecter",
    title: 'Inscription'
  },
  {
    succeed: objectiveStore.objectives[userStore.currentUser?.email || ''].includes(ObjectiveType.SUBSCRIBED_PLUS) || objectiveStore.objectives[userStore.currentUser?.email || ''].includes(ObjectiveType.SUBSCRIBED_PREMIUM),
    color: 'yellow-200',
    subtitle: "S'abonner à l'une des offres",
    title: 'Abonnement'
  },
  {
    succeed: objectiveStore.objectives[userStore.currentUser?.email || ''].includes(ObjectiveType.SUBSCRIBED_PREMIUM),
    color: 'orange-200',
    subtitle: "Passer à l'offre Premium",
    title: 'Premium Abonnement'
  },
  {
    succeed: objectiveStore.objectives[userStore.currentUser?.email || ''].includes(ObjectiveType.ADDED_ARTICLE),
    color: 'purple-200',
    subtitle: 'Ajouter un article au panier',
    title: 'Article'
  },
  {
    succeed: objectiveStore.objectives[userStore.currentUser?.email || ''].includes(ObjectiveType.REMOVED_INSURANCE),
    color: 'blue-200',
    subtitle: "Retirer l'assurance",
    title: 'Panier'
  },
  {
    succeed: objectiveStore.objectives[userStore.currentUser?.email || ''].includes(ObjectiveType.UPDATED_PREFERENCES),
    color: 'cyan-200',
    subtitle: 'Modifier les préférences de son compte',
    title: 'Compte'
  },
  {
    succeed: objectiveStore.objectives[userStore.currentUser?.email || ''].includes(ObjectiveType.PAID_CART),
    color: 'teal-200',
    subtitle: 'Payer son panier',
    title: 'Payer'
  },
  {
    succeed: objectiveStore.objectives[userStore.currentUser?.email || ''].includes(ObjectiveType.UNSUBSCRIBED),
    color: 'red-200',
    subtitle: "Se désabonner de l'offre prise",
    title: 'Désabonnement'
  },
]);

const displayedObjectives = ref<typeof allObjectives>([]);

function handleOpenObjective() {
  removeObjectives();
  addObjectives();
  if (userStore.endTime) {
    //format : mm:ss using dayjs
    const seconds = dayjs(userStore.endTime).diff(dayjs(userStore.startTime), 'second');
    const minutes = Math.floor(seconds / 60);
    endTime.value = `${minutes}:${seconds - minutes * 60} minutes`;
  }
  openObjectiveModal.value = true;
}

function removeObjectives() {
  show.value = false;
  displayedObjectives.value = [];
}

function addObjectives() {
  allObjectives.value.forEach((objective, index) => {
    setTimeout(() => {
      displayedObjectives.value.push(objective);

      if (index === allObjectives.value.length - 1) {
        if (displayedObjectives.value.every(obj => obj.succeed || (obj.color === 'orange-200' && !obj.succeed))) {
          show.value = true;
        }
      }
    }, index * 300);
  });
}
</script>

<template>
  <HeaderApp v-if="$route.name === 'Home'" logo-only @on-open-objective="handleOpenObjective()"/>
  <HeaderApp
      v-else
      :back-btn="needBackButton.includes($route.name)"
      :shop-button="$route.name === 'Cart'"
      :title="$route.name"
  />
  <router-view></router-view>

  <Dialog
      v-model:visible="openObjectiveModal"
      :closable="false"
      :pt="{header: {style: {padding: 0}}, content: {style: {padding: 0, position: 'relative'}}, root: {style: {border: 'none', borderRadius: '0.5em', height: '750px', maxHeight: '750px'}}}"
      class=""
      modal
      style="width: 85%; max-width: 450px"
  >
    <template #header>
      <div class="w-full h-3rem relative" style="border-radius: 30px">
        <div
            class="flex align-items-center absolute top-0 right-0 m-2 border-round-3xl bg-gray-400"
            @click="openObjectiveModal = false"
        >
          <i class="pi pi-times text-white p-2 text-sm cursor-pointer" style="margin-bottom: -2px"></i>
        </div>
      </div>
    </template>
    <div class="flex flex-column gap-1">
      <div class="text-2xl text-center font-medium">Objectifs</div>
      <div class="flex flex-column gap-2 w-full">
        <div class="text-center text-gray-600 px-5">Voici la liste des objectifs à réaliser pour compléter votre
          parcours.
        </div>
      </div>
    </div>
    <div class="p-3">
      <transition-group name="list" tag="div">
        <div class="px-3 flex flex-column gap-2 mt-3">
          <div v-if="show" class="font-medium">Vous avez fini tous les objectifs. Maintenant vous pouvez passer au
            questionnaire.
          </div>
          <div>Vous avez réussi à vous désabonner en {{ endTime }}.</div>
          <Button v-if="show" class="w-full border-round-3xl px-4 py-3" label="Répondre aux questions"
                  severity="success" @click="openObjectiveModal = false; $router.push({name: 'Questions'})"/>
        </div>

        <ObjectiveCard
            v-for="(objective, index) in displayedObjectives"
            :key="index"
            :color="objective.color"
            :subtitle="objective.subtitle"
            :succeed="objective.succeed"
            :title="objective.title"
            class="m-2"
        />
      </transition-group>
    </div>
  </Dialog>

  <NavBarBottom/>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
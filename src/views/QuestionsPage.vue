<script lang="ts" setup>


import {onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user.store";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const darkPatterns = ref([
  "Prévention de la comparaison",
  "Manipulation émotionnelle",
  "Publicités déguisées",
  "Fausse pénurie",
  "Fausse preuve sociale",
  "Microtransaction",
  "Fausse urgence",
  "Action forcée",
  "Difficulté à annuler",
  "Coûts cachés",
  "Abonnement caché",
  "Harcelement",
  "Obstruction",
  "Préréglage",
  "Interférence visuelle",
  "Formulation trompeuse",
  "Dissimuler des informations",
  "Dark notifications",
]);
const darkPatternResponse = ref([
  "Manipulation émotionnelle",
  "Fausse preuve sociale",
  "Difficulté à annuler",
  "Abonnement caché",
  "Obstruction",
  "Préréglage",
  "Dissimuler des informations",
  "Formulation trompeuse",
  "Interférence visuelle",
  "Dark notifications",
  "Publicités déguisées",
]);

const selectedPatterns = ref<string[]>([]);
const hasSubmitted = ref(false);

const mark = ref(0);
const maxMark = ref(darkPatternResponse.value.length);

onMounted(() => {
  darkPatterns.value = shuffle(darkPatterns.value)
})

function selectPattern(pattern: string) {
  if (hasSubmitted.value) return;

  if (selectedPatterns.value.includes(pattern)) {
    selectedPatterns.value = selectedPatterns.value.filter(p => p !== pattern);
  } else {
    selectedPatterns.value.push(pattern);
  }
}

function submit() {
  const negativeMark = selectedPatterns.value.filter(p => !darkPatternResponse.value.includes(p)).length * -1;
  const positiveMark = selectedPatterns.value.filter(p => darkPatternResponse.value.includes(p)).length;

  const m = selectedPatterns.value.length >= darkPatterns.value.length - 1
      ? positiveMark + negativeMark
      : positiveMark;
  mark.value = Math.max(0, m);
  hasSubmitted.value = true;
}

function shuffle(array: string[]) {
  return array.map(value => ({value, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(({value}) => value)
}

function handleResetApp() {
  userStore.resetApp();
  router.push({name: 'Login'});
}

</script>

<template>
  <div class="content flex flex-column p-4 overflow-y-scroll gap-4"
       style="min-height: 85%; gap: 0.65em">
    <div class="flex flex-column gap-1">
      <div class="text-lg font-medium">Expérience</div>
      <div>
        Vous venez de compléter une expérience sur l’utilisation abusive des dark patterns. Nous espérons que cette
        expérience vous a été instructive, même si elle a pu être inconfortable.
      </div>
      <div>
        L’objectif de cette démarche est de vous sensibiliser aux pratiques trompeuses que certaines entreprises
        emploient à travers les dark patterns.
      </div>
    </div>

    <div class="flex flex-column gap-1">
      <div class="text-lg font-medium">Questionnaire</div>
      <div>Nous vous invitons maintenant à identifier les types de dark patterns que vous avez rencontrés durant
        l’expérience.
      </div>
    </div>

    <div class="flex flex-wrap justify-content-between gap-2">
      <div
          v-for="pattern in darkPatterns"
          :class="selectedPatterns.includes(pattern) ? 'bg-gray-600 text-white' : 'bg-white'"
          class="flex justify-content-between p-3 border-round-xl border-1 border-gray-300 shadow-2 cursor-pointer"
          style="width: 48%" @click="selectPattern(pattern)"
      >
        <span>{{ pattern }}</span>
        <span v-if="hasSubmitted">
          <i v-if="darkPatternResponse.includes(pattern) && selectedPatterns.includes(pattern)"
             class="pi pi-check text-green-500"/>
          <i v-else-if="!darkPatternResponse.includes(pattern) && selectedPatterns.includes(pattern)"
             class="pi pi-times text-red-500"/>
        </span>
      </div>
    </div>

    <div v-if="!hasSubmitted" class="flex justify-content-center">
      <Button :disabled="hasSubmitted" class="w-full border-round-3xl" label="Valider" severity="primary"
              style="padding: 10px 20px;"
              @click="submit()"/>
    </div>
    <div v-else class="flex flex-column gap-2 justify-content-center">
      <div class="">
        Vous avez eu la note de <span class="font-semibold">{{ mark }}/{{ maxMark }}</span> sur l’identification des
        dark patterns.
      </div>
      <Button class="w-full border-round-3xl border-1 border-gray-300" label="Recommencer le questionnaire"
              style="padding: 10px 20px;"
              @click="hasSubmitted = false; mark = 0; selectedPatterns = []"/>
      <Button class="w-full border-round-3xl border-1 border-gray-300" label="Recommencer l'expérience"
              severity="secondary" style="padding: 10px 20px;"
              @click="handleResetApp()"/>
    </div>
  </div>
</template>

<style scoped>

</style>
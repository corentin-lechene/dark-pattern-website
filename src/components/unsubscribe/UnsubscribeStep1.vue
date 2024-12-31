<script lang="ts" setup>

import {ref} from "vue";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.store";

const toasts = useToast();
const router = useRouter();
const userStore = useUserStore();

const selectedReason = ref<string>('');
const selectedXp = ref<string>('');
const advice = ref<string>('');
const deception = ref<string>('');

const reasons = ref([
  {label: 'Je n\'ai pas trouvé ce que je cherchais', value: 'not_found'},
  {label: 'Je n\'ai pas aimé l\'application', value: 'not_liked'},
  {label: 'Je n\'ai pas trouvé l\'application utile', value: 'not_useful'},
  {label: 'Je n\'ai pas trouvé l\'application facile à utiliser', value: 'not_easy_to_use'},
  {label: 'Je n\'ai pas trouvé l\'application sécurisée', value: 'not_secure'},
  {label: 'Je n\'ai pas trouvé l\'application performante', value: 'not_performant'},
  {label: 'Je n\'ai pas trouvé l\'application ergonomique', value: 'not_ergonomic'},
])

const xps = ref([
  {label: 'Très bonne', value: 'very_good'},
  {label: 'Bonne', value: 'good'},
  {label: 'Moyenne', value: 'average'},
  {label: 'Mauvaise', value: 'bad'},
  {label: 'Très mauvaise', value: 'very_bad'},
])

function unsubscribeUser() {
  if (!selectedReason.value || !selectedXp.value || !advice.value || !deception.value) {
    toasts.add({severity: 'error', summary: 'Veuillez remplir les champs obligatoires', life: 3000});
    return;
  }

  userStore.unsubscribe();
  router.push({name: 'UnsubscribeSuccess'});
}

</script>

<template>
  <div class="content flex flex-column align-items-center p-4 overflow-y-scroll"
       style="min-height: 85%; gap: 0.55em">

    <div class="text-3xl text-center font-medium mt-4">Avant de partir</div>
    <div class="flex flex-column">
      <div class="text-center text-gray-600">Pourriez-vous prendre quelques instants pour nous donner votre avis ?</div>

      <div class="flex flex-column gap-4 mt-4">
        <div class="flex flex-column gap-2">
          <div class="text-lg font-medium">Pourriez-vous nous dire la raison ?</div>
          <Listbox v-model="selectedReason" :options="reasons" optionLabel="label" optionValue="value"/>
        </div>

        <div class="flex flex-column gap-2">
          <div class="text-lg font-medium">Expérience avec notre solution ?</div>
          <Listbox v-model="selectedXp" :options="xps" optionLabel="label" optionValue="value"/>
        </div>

        <div class="flex flex-column gap-2">
          <div class="text-lg font-medium">Avez vous des conseils ?</div>
          <Textarea id="advice" v-model="advice" :rows="4" placeholder="Un truc cool"/>
        </div>

        <div class="flex flex-column gap-2">
          <div class="text-lg font-medium">Qu'est-ce qui vous aimez pas ?</div>
          <Textarea id="advice" v-model="deception" :rows="4" placeholder="Une petite déception"/>
        </div>

        <div class="flex w-full gap-4">
          <Button class="w-full border-1 border-gray-400" label="Finalement non" severity="secondary"
                  @click="$router.push({name: 'Home'})"/>
          <Button class="w-10rem" label="Continuer" @click="unsubscribeUser()"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
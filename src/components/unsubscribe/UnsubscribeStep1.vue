<script lang="ts" setup>

import {ref} from "vue";

defineEmits(['next']);

const selectedReason = ref<string>('');
const selectedXp = ref<string>('');
const advice = ref<string>('');

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

</script>

<template>
  <div class="content flex flex-column align-items-center p-4 overflow-y-scroll"
       style="min-height: 85%; gap: 0.65em">
    <div class="text-2xl text-center">Vous voulez déjà partir ?</div>
    <div class="text-center">Nous sommes trop triste de vous voir partir</div>

    <div class="flex flex-column gap-4">
      <div class="flex flex-column gap-2">
        <div class="text-lg">Pourriez vous nous dire la raison ?</div>
        <Listbox v-model="selectedReason" :options="reasons" optionLabel="label" optionValue="value"/>
      </div>

      <div class="flex flex-column gap-2">
        <div class="text-lg">Expérience avec notre solution ?</div>
        <Listbox v-model="selectedXp" :options="xps" optionLabel="label" optionValue="value"/>
      </div>

      <div class="flex flex-column gap-2">
        <div class="text-lg">Avez vous des conseils ?</div>
        <InputText id="advice" v-model="advice" placeholder="Un truc cool"/>
      </div>

      <div class="w-full">
        <Button class="w-full" label="Finalement non" @click="$router.push({name: 'Home'})"/>
      </div>

      <div>
        <Button class="w-1/2" label="Continuer" severity="warning" @click="$emit('next')"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
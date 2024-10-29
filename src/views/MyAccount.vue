<script lang="ts" setup>

import {ref} from "vue";

const subscriptionRenew = ref(true)
const newsletter = ref(false)
const shareData = ref(true)
const autoInsurance = ref(true)
const save = ref(true)

const reAdd = () => {
  setTimeout(() => autoInsurance.value = true, 100)
}

</script>

<template>
  <div class="flex flex-column p-4 gap-4" style="min-height: 85%;">
    <div class="flex flex-column gap-3">
      <div class="text-2xl">Mes informations</div>
      <div class="flex flex-column gap-2 w-full">
        <div class="flex flex-column gap-2  w-full">
          <label for="email">Email</label>
          <InputText id="email" placeholder="Email"/>
        </div>
      </div>

    </div>

    <div class="flex flex-column gap-3">
      <div class="text-2xl">Mes préférences</div>
      <div class="flex flex-column gap-2 w-full">
        <div class="flex gap-2 align-items-center">
          <Checkbox v-model="newsletter" binary/>
          <span class="text-sm">Je ne souhaite pas recevoir la <span class="text-blue-500">newsletter</span></span>
        </div>
        <div class="flex gap-2 align-items-center">
          <Checkbox v-model="shareData" binary/>
          <span class="text-sm">J'accepte de partager mes données</span>
        </div>
        <div class="flex gap-2 align-items-center">
          <Checkbox v-model="save" binary @change="reAdd()"/>
          <span class="text-sm">Ne pas sauvegarder</span>
        </div>
        <div class="flex gap-2 align-items-center">
          <Checkbox v-model="subscriptionRenew" binary/>
          <span class="text-sm">Auto valider le renouvellement de mon abonnement</span>
        </div>
        <div class="flex gap-2 align-items-center">
          <Checkbox v-model="autoInsurance" binary @change="reAdd()"/>
          <span class="text-sm">Ajouter automatiquement une assurance</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
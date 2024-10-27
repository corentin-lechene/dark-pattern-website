<script lang="ts" setup>

import {ref} from "vue";

const password = ref('');

</script>

<template>
  <div class="content flex flex-column align-items-center p-4 overflow-y-scroll"
       style="min-height: 85%; gap: 0.65em">
    <div class="text-2xl text-center">Confirmation désabonnement</div>
    <div class="text-center">Pour confirmer et être sur à 100% que vous ne voulez plus de cette abonnement, merci de
      saisir votre mot de passe.
    </div>

    <div>
      <img alt="Sad face" class="w-full" src="@/assets/images/sad.webp"/>
    </div>

    <div class="w-full flex flex-column gap-2 pt-4">
      <div class="w-full">
        <InputText id="password" v-model="password" class="w-full" placeholder="Mot de passe" type="password"/>
      </div>

      <div class="w-full">
        <Button class="w-full" label="Résilier mon abonnement" @click="$router.push({name: 'UnsubscribeSuccess'})"/>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
<script lang="ts" setup>

import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";

const emit = defineEmits(['next']);
const toasts = useToast();
const router = useRouter();

function handleNext() {
  emit('next');
}

function handlePause() {
  toasts.add({severity: 'success', summary: 'Votre abonnement a été mis en pause pour ce mois-ci', life: 3000});
  router.push({name: 'home'});
}

</script>

<template>
  <div class="content flex flex-column align-items-center p-4 overflow-y-scroll"
       style="min-height: 85%; gap: 0.65em">
    <div class="text-3xl text-center font-medium mt-4">Vous décidez de partir pour ?</div>
    <div class="flex flex-column gap-2 w-full">
      <div class="text-center text-gray-600">Un mois ou pour toujours</div>

      <img alt="Sad face" class="w-full mt-3" src="@/assets/images/sad1.webp"/>
    </div>

    <div class="flex flex-column gap-4 mt-2">
      <div class="flex flex-column gap-2">
        <div class="text-lg font-medium">Les possibilités de résiliation</div>
        <div class="">
          Vous pouvez choisir de mettre en pause votre abonnement pour 1 mois ou indéfiniment.
        </div>
      </div>

      <div class="flex flex-column gap-2">
        <div class="text-lg font-medium">Des préventions ?</div>
        <div>Si vous souhaitez vous désabonner pour une raison particulière, vous ne pourrez plus bénéficier de nos
          avantages exclusifs.
        </div>
        <div>De plus, si vous avez des articles en cours de livraison, vous ne pourrez plus suivre leur état
          d'avancement, ni les recevoir et vous ne serez pas remboursé.
        </div>
      </div>

      <div class="flex w-full gap-4">
        <Button class="w-full border-1 border-gray-400" label="Continuer" @click="handleNext()"/>
        <Button class="w-20rem" label="Faisons une pause" severity="success" @click="handlePause()"/>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
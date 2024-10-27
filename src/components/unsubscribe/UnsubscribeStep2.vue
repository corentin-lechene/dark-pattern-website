<script lang="ts" setup>

defineEmits(['next', 'previous']);

</script>

<template>
  <div class="content flex flex-column align-items-center p-4 overflow-y-scroll"
       style="min-height: 85%; gap: 0.65em">
    <div class="text-2xl text-center">Mais vous partez ?</div>
    <div class="text-center">Pour un mois ou pour toujours</div>

    <img alt="Sad face" class="w-full" src="@/assets/images/sad1.webp"/>

    <div class="text-sm text-center text-gray-500">
      Vous pouvez choisir de mettre en pause votre abonnement pour une durée de 1 mois ou de le résilier définitivement.
    </div>

    <div class="text-lg text-center">
      Si vous souhaitez résilier votre abonnement, vous n'aurez plus accès à nos réductions exclusives.
    </div>

    <div class="text-center">
      Si vous avez des colis en cours, ils seront renvoyé dans l'entrepot et vous serez remboursé.
    </div>


    <div class="w-full">
      <Button class="w-full" label="Je ne veux plus" @click="$emit('next')"/>
    </div>

    <div>
      <Button label="Faisons une pause" severity="warning" @click="$router.push({name: 'Subscription'})"/>
    </div>

  </div>
</template>

<style scoped>

</style>
<script lang="ts" setup>

</script>

<template>
  <div class="content flex flex-column justify-content-between p-4 overflow-y-scroll bg-white"
       style="min-height: 85%; gap: 0.65em">
    <!-- success page    -->
    <div class="flex flex-column gap-3 pt-2">
      <div class="text-xl font-bold">Votre paiement a été effectué avec succès</div>
      <div class="flex flex-column gap-3">
        <div class="flex justify-content-between">
          <div>Montant</div>
          <div>60€</div>
        </div>
        <div class="flex justify-content-between">
          <div>Date</div>
          <div>23/09/2021</div>
        </div>
        <div class="flex justify-content-between">
          <div>Heure</div>
          <div>12:30</div>
        </div>
        <div class="flex justify-content-between">
          <div>Numéro de transaction</div>
          <div>1234567890</div>
        </div>
      </div>
    </div>

    <div class="px-4 py-4 z-5 w-full">
      <Button
          class="w-full"
          label="Retour à l'accueil"
          size="large"
          @click="() => $router.push({name: 'Home'})"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
<script lang="ts" setup>

</script>

<template>
  <div class="content flex flex-column justify-content-between p-4 overflow-y-scroll bg-white"
       style="min-height: 85%; gap: 0.65em">
    <div class="flex flex-column gap-2">
      <div class="flex flex-column gap-1">
        <div class="text-lg">Vous avez 3 produits</div>
        <div class="text-sm text-gray-600">Veuillez choisir un moyen de paiement</div>
        <div class="flex flex-column gap-3">
          <div class="flex gap-3 align-items-center">
            <input id="paypal" name="payment" type="radio" value="paypal"/>
            <label for="paypal">Paypal</label>
          </div>
          <div class="flex gap-3 align-items-center">
            <input id="credit-card" name="payment" type="radio" value="credit-card"/>
            <label for="credit-card">Carte de crédit</label>
          </div>
        </div>
      </div>
      <div class="flex flex-column gap-3 pt-2">
        <div class="text-xl font-bold">Résumé de la commande</div>
        <div class="flex flex-column gap-3">
          <div class="flex justify-content-between">
            <div>Produit 1</div>
            <div>10€</div>
          </div>
          <div class="flex justify-content-between">
            <div>Produit 2</div>
            <div>20€</div>
          </div>
          <div class="flex justify-content-between">
            <div>Produit 3</div>
            <div>30€</div>
          </div>
          <div class="flex justify-content-between">
            <div>Total</div>
            <div>60€</div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 py-4 z-5 w-full">
      <Button
          class="w-full"
          label="Payer"
          size="large"
          @click="() => $router.push({name: 'PaymentSuccess'})"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
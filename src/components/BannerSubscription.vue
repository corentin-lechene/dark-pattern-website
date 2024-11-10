<script lang="ts" setup>

</script>

<template>
  <div class="p-4">
    <div class="flex justify-content-between align-items-center w-full p-4 border-round-xl bg-white shadow-2">
      <div class="flex gap-3 align-items-center">
        <div>
          <i class="pi pi-gift" style="font-size: 2rem"></i>
        </div>
        <div class="flex flex-column">
          <div class="text-gray-500">Abonnement</div>
          <div class="text-xl">
            <span>Profiter de </span>
            <span class="text-primary font-bold">Cadre Prémium</span>
          </div>
        </div>
      </div>
      <div class="">
        <Button class="gradient-bg-primary" label="19,99€" severity="success" size="small"
                @click="$router.push({name: 'Subscription'})"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
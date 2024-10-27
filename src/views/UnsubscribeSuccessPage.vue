<script lang="ts" setup>

</script>

<template>
  <div class="content flex flex-column justify-content-between h-full p-4 overflow-y-scroll bg-white"
       style="min-height: 85%; gap: 0.65em">
    <!-- success page    -->
    <div class="flex flex-column h-full justify-content-center align-items-center gap-3 pt-2">
      <div class="text-xl font-bold">Vous avez bien été désabonné</div>
      <div class="px-4 py-4 z-5 w-full">
        <Button
            class="w-full"
            label="Retour à l'accueil"
            size="large"
            @click="() => $router.push({name: 'Home'})"
        />
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
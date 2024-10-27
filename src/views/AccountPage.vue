<script lang="ts" setup>


import AccountListItem from "@/components/AccountListItem.vue";
</script>

<template>
  <div class="content flex flex-column py-4 overflow-y-scroll bg-white" style="min-height: 85%; gap: 0.65em">

    <div class="flex flex-column gap-3 px-4">
      <div class="flex justify-content-center align-items-center">
        <img alt="portrait" class="w-10rem" src="https://randomuser.me/api/portraits/men/78.jpg"
             style="border-radius: 100%"/>
      </div>

      <div class="flex flex-column p-1 border-round-xl" style="background: rgba(214,227,255,0.75);">
        <AccountListItem disabled icon="pi-pencil" label="Modifier mes informations"/>
      </div>


      <div class="flex flex-column gap-2">
        <div class="text-xl">Préferences</div>
        <div class="flex flex-column p-1 border-round-xl" style="background: rgba(214,227,255,0.75);">
          <AccountListItem icon="pi-cog" label="Compte" @click="$router.push({name: 'MyAccount'})"/>
          <AccountListItem disabled icon="pi-bell" label="Notifications"/>
        </div>
      </div>

      <div class="flex flex-column gap-2">
        <div class="text-xl">Condidentialité</div>
        <div class="flex flex-column p-1 border-round-xl" style="background: rgba(214,227,255,0.75);">
          <AccountListItem disabled icon="pi-key" label="Politique de confidentialité"/>
          <AccountListItem disabled icon="pi-info-circle" label="À propos"/>
        </div>
      </div>

      <Button class="w-full" label="Réinitialiser" severity="danger"/>
    </div>
  </div>
</template>

<style scoped>
</style>
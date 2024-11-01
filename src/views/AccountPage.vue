<script lang="ts" setup>

import {useUserStore} from "@/stores/user.store";
import AccountListItem from "@/components/AccountListItem.vue";
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import {NotificationsService} from "@/services/notifications.service";

const router = useRouter();
const userStore = useUserStore();

function handleResetApp() {
  userStore.logout();
  window.location.reload();
  router.push({name: 'Login'});
}

onMounted(() => {
  setTimeout(() => {
    NotificationsService.show({
      title: "Ajourd'hui seulement",
      message: "Profitez de nos produits exclusifs à prix les plus bas"
    })
  }, 10000);
})

</script>

<template>
  <div class="content flex flex-column py-4 overflow-y-scroll bg-white" style="min-height: 85%; gap: 0.65em">

    <div class="flex flex-column gap-3 px-4">
      <div class="flex justify-content-center align-items-center">
        <img alt="portrait" class="w-10rem" src="https://randomuser.me/api/portraits/men/78.jpg"
             style="border-radius: 100%"/>
      </div>

      <div class="cursor-pointer flex flex-column p-1 border-round-xl" style="background: rgba(214,227,255,0.75);">
        <AccountListItem icon="pi-pencil" label="Modifier mes informations" @click="$router.push({name: 'MyAccount'})"/>
      </div>


      <div class="flex flex-column gap-2">
        <div class="text-xl">Préferences</div>
        <div class="cursor-pointer flex flex-column p-1 border-round-xl" style="background: rgba(214,227,255,0.75);">
          <AccountListItem icon="pi-cog" label="Compte" @click="$router.push({name: 'MyAccount'})"/>
          <AccountListItem icon="pi-bell" label="Notifications" @click="$router.push({name: 'Notifications'})"/>
        </div>
      </div>

      <div class="flex flex-column gap-2">
        <div class="text-xl">Condidentialité</div>
        <div class="cursor-pointer flex flex-column p-1 border-round-xl" style="background: rgba(214,227,255,0.75);">
          <AccountListItem icon="pi-key" label="Politique de confidentialité" @click="$router.push({name: 'Policy'})"/>
          <AccountListItem icon="pi-info-circle" label="À propos" @click="$router.push({name: 'About'})"/>
        </div>
      </div>

      <Button
          class="w-full"
          label="Recommencer l’expérience"
          severity="danger"
          @click="handleResetApp()"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
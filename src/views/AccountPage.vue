<script lang="ts" setup>

import {useUserStore} from "@/stores/user.store";
import AccountListItem from "@/components/AccountListItem.vue";
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import {NotificationsService} from "@/services/notifications.service";

const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  setTimeout(() => {
    NotificationsService.show({
      title: "Ajourd'hui seulement",
      message: "Profitez de nos produits exclusifs à prix les plus bas"
    })
  }, 10000);
})

function handleLogout() {
  userStore.logout();
  router.push({name: 'Login'});
}

</script>

<template>
  <div class="content flex flex-column py-4 overflow-y-scroll bg-white" style="min-height: 85%; gap: 0.65em">

    <div class="flex flex-column gap-3 px-4">
      <div class="flex flex-column gap-2 justify-content-center align-items-center">
        <img alt="portrait" class="w-8rem" src="https://randomuser.me/api/portraits/men/78.jpg"
             style="border-radius: 100%"/>
        <div class="font-medium text-gray-700">{{ userStore.currentUser?.email }}</div>
      </div>

      <div class="cursor-pointer flex flex-column p-1 border-round-xl bg-gray-100 border-gray-200 border-1 shadow-1">
        <AccountListItem icon="pi-user" label="Mes informations" @click="$router.push({name: 'MyAccount'})"/>
      </div>

      <div class="flex flex-column gap-2">
        <div class="text-xl font-medium">Préferences</div>
        <div class="cursor-pointer flex flex-column p-1 border-round-xl bg-gray-100 border-gray-200 border-1 shadow-1">
          <AccountListItem icon="pi-cog" label="Compte" @click="$router.push({name: 'MyAccount'})"/>
          <AccountListItem icon="pi-bell" label="Notifications" @click="$router.push({name: 'Notifications'})"/>
        </div>
      </div>

      <div class="flex flex-column gap-2">
        <div class="text-xl font-medium">Condidentialité</div>
        <div class="cursor-pointer flex flex-column p-1 border-round-xl bg-gray-100 border-gray-200 border-1 shadow-1">
          <AccountListItem icon="pi-key" label="Politique de confidentialité" @click="$router.push({name: 'Policy'})"/>
          <AccountListItem icon="pi-info-circle" label="À propos" @click="$router.push({name: 'About'})"/>
        </div>
      </div>

      <div class="w-full text-center text-gray-600">
        <Button class="border-round-3xl w-10rem px-2 py-2 border-gray-400 border-2 text-red-500" label="Déconnexion"
                link severity="secondary"
                @click="handleLogout()"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
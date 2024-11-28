<script lang="ts" setup>

import {ref} from "vue";
import {useRouter} from "vue-router";
import {NotificationsService} from "@/services/notifications.service";
import {useUserStore} from "@/stores/user.store";
import {useObjectiveStore} from "@/stores/objective.store";

const router = useRouter()
const userStore = useUserStore();
const objectiveStore = useObjectiveStore();

const email = ref('')
const password = ref('')

const error = ref('')

function handleLogin() {
  if (!email.value || !password.value) {
    error.value = "Veuillez remplir tous les champs"
    return
  }

  if (password.value.length < 8) {
    error.value = "Le mot de passe doit contenir au moins 8 caractères"
    return
  }

  try {
    userStore.login(email.value.trim().toLowerCase(), password.value);
    setTimeout(() => {
      NotificationsService.show({
        title: "Bienvenue",
        message: "Venir découvrir nos produits à prix réduits !"
      })
    }, 20000)
    objectiveStore.logged();
    router.push({name: 'Home'})
  } catch (e) {
    console.error(e)
    error.value = e.message as string
  }
}

</script>

<template>
  <div class="flex justify-content-center align-items-center h-full w-full h-full relative">

    <div class="flex flex-column gap-4 justify-content-center align-items-center px-6">
      <img alt="App Logo" class="w-3 h-3" src="@/assets/logo.png"/>
      <div class="text-3xl">Connexion</div>

      <!-- Banner handle error     -->
      <div v-if="error" class="w-full bg-red-100 border-red-500 border-1 p-3 text-red-500 text-center border-round">
        <i class="pi pi-exclamation-triangle mr-1"></i>
        <span>{{ error }}</span>
      </div>


      <div class="flex flex-column gap-2 w-full">
        <div class="text-lg">Adresse email</div>
        <InputText v-model="email" label="Email" placeholder="john.doe@email.fr" type="email"/>
      </div>

      <div class="flex flex-column gap-2 w-full">
        <div class="text-lg">Mot de passe</div>
        <Password v-model="password" :feedback="false" label="Mot de passe" placeholder="***********"/>
      </div>

      <Button class="w-full" label="Se connecter" @click="handleLogin()"/>

      <div class="text-sm">
        <span class="mr-1 text-gray-800">Pas encore de compte ?</span>
        <span class="cursor-pointer text-blue-500" @click="$router.push({name: 'Register'})">Inscrivez-vous</span>
      </div>

      <div class="text-xs absolute text-center" style="bottom: 20px">
        <span class="mr-1">En continuant, vous acceptez nos</span>
        <span class="text-blue-500 mr-1">Conditions d'utilisation</span>
        <span class="mr-1">et notre</span>
        <span class="text-blue-500">Politique de confidentialité</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
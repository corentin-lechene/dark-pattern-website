<script lang="ts" setup>

import {ref} from "vue";
import {useUserStore} from "@/stores/user.store";
import {useRouter} from "vue-router";
import {useObjectiveStore} from "@/stores/objective.store";

const router = useRouter()
const userStore = useUserStore();
const objectiveStore = useObjectiveStore();

const email = ref('')
const password = ref('')
const cgu = ref(false)
const newsletter = ref(false)
const shareData = ref(false)

const error = ref('')

function handleRegister() {
  if (!email.value || !password.value) {
    error.value = "Veuillez remplir tous les champs"
    return
  }

  if (password.value.length < 8) {
    error.value = "Le mot de passe doit contenir au moins 8 caractères"
    return
  }

  if (!cgu.value) {
    error.value = "Veuillez accepter les CGU"
    return
  }

  try {
    userStore.register(
        email.value.trim().toLowerCase(),
        password.value,
        !newsletter.value,
        shareData.value
    );

    objectiveStore.registered();
    router.push({name: 'Login'})
  } catch (e) {
    error.value = e.message as string
  }
}

</script>

<template>
  <div class="flex justify-content-center align-items-center h-full w-full h-full relative">

    <div class="flex flex-column gap-4 justify-content-center align-items-center px-6">
      <img alt="App Logo" class="w-3 h-3" src="@/assets/logo.png"/>
      <div class="text-3xl">Inscription</div>

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
        <Password v-model="password" label="Mot de passe" placeholder="***********"/>
      </div>

      <div class="flex flex-column gap-2 w-full">
        <div class="flex gap-2 align-items-center">
          <Checkbox v-model="cgu" binary/>
          <span class="text-sm">J'accepte les <span class="text-blue-500">CGU</span></span>
        </div>
        <div class="flex gap-2 align-items-center">
          <Checkbox v-model="newsletter" binary/>
          <span class="text-sm">Je souhaite recevoir la <span class="text-blue-500">newsletter</span></span>
        </div>
        <div class="flex gap-2 align-items-center">
          <Checkbox v-model="shareData" binary/>
          <span class="text-sm">J'accepte de partager mes données</span>
        </div>
      </div>

      <Button class="w-full" label="S'inscrire" @click="handleRegister()"/>

      <div class="text-sm">
        <span class="mr-1 text-gray-800">Déjà un compte ?</span>
        <span class="text-blue-500 cursor-pointer" @click="$router.push({name: 'Login'})">Connectez-vous</span>
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
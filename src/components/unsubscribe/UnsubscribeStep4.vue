<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user.store";
import {useRouter} from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const password = ref('');
const error = ref('');

const step = ref(0);

const openVerificationModal = ref(false);
const loading = ref(false);

function handleOpenDialog() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    openVerificationModal.value = true;
    userStore.step += 1;
  }, 2000);
}

function handleCheckPassword() {
  error.value = '';
  if (password.value === userStore.currentUser?.password) {
    if (step.value === 0) {
      step.value += 1;
      error.value = 'Mot de passe incorrect';
      password.value = "";
    } else {
      userStore.unsubscribe();
      router.push({name: 'UnsubscribeSuccess'});
    }

  } else {
    error.value = 'Mot de passe incorrect';
  }
}

onMounted(() => {
  step.value = 0;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 7500);
})

</script>

<template>
  <div class="content flex flex-column align-items-center p-4 overflow-y-scroll"
       style="min-height: 85%; gap: 0.65em">

    <div class="text-3xl text-center font-medium mt-4">C'est la fin, vraiment ?</div>
    <div class="flex flex-column gap-2 w-full">
      <div class="text-center text-gray-600 px-5">Soyez sur que vous pouvez à tout moment revenir sur votre décision.
      </div>
    </div>

    <div>
      <img alt="Sad face" class="w-full" src="@/assets/images/sad.webp"/>
    </div>

    <div class="flex flex-column gap-2">
      <div>Certaines fois les choses ne se passent pas comme prévu, mais nous sommes là pour vous aider.</div>
      <div>Afin de prendre en compte votre demande, nous allons vous vérifier votre identité.</div>
    </div>

    <Button v-if="loading" class="w-full" label="Arreter le processus" @click="$router.push({name: 'Home'})"/>
    <Button :loading="loading" class="w-full" label="Commencer la vérification" @click="handleOpenDialog()"/>

    <Dialog v-model:visible="openVerificationModal" :style="{width: '30rem'}" header="Vérification de votre identité" modal
            position="bottom">
      <div class="w-full flex flex-column gap-2">
        <div>Pour continer la résiliation de votre abonnement, veuillez renseigner votre mot de passe.</div>
        <div class="w-full">
          <Password id="password" v-model="password" :feedback="false" :invalid="error !== ''" class="w-full"
                    placeholder="Mot de passe" type="password"/>
          <small v-if="error" class="text-red-500"> {{ error }} !</small>
        </div>

        <div class="w-full mt-2">
          <Button class="w-full" label="Résilier mon abonnement" @click="handleCheckPassword()"/>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>

</style>
<script lang="ts" setup>

import {ref} from "vue";
import {Notification, NotificationsService} from "@/services/notifications.service";

const notification = ref<Notification>();

notification.value = {
  title: "",
  message: ""
};

</script>

<template>
  <div v-if="notification" class="notification w-full px-3 fixed hidden" style="z-index: 9999; max-width: 500px;">
    <div class="notification-inner flex align-items-center gap-2 cursor-pointer" style=""
         @click="NotificationsService.hide()">
      <div class="" style="width: 15%;">
        <img alt="Notification" class="w-full" src="@/assets/logo.png"/>
      </div>
      <div class="flex flex-column gap-1 w-full">
        <div class="flex justify-content-between w-full">
          <h3 id="notification-title" class="m-0">{{ notification.title }}</h3>
          <div class="text-gray-700 align-self-start">maintenant</div>
        </div>
        <p id="notification-message" class="m-0">{{ notification.message }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification {
  margin-top: calc(env(safe-area-inset-top) + 1rem);
}

.notification-inner {
  backdrop-filter: blur(0.5rem);
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
  padding: 0.75em 1.65em 0.75em 1.25em;
  border-radius: 2em;
}

.notification-animation {
  animation: slide-down 0.5s ease forwards, slide-up 0.5s ease 2.5s forwards;
}

@keyframes slide-down {
  from {
    transform: translateY(-150%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-150%);
  }
}
</style>
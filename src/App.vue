<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import NotificationPopup from "@/components/NotificationPopup.vue";

const router = useRouter();

const videoRef = ref<HTMLVideoElement | null>(null);
const isFirstTime = ref(false);
const isStarted = ref(true);

const startVideo = () => {
  if (videoRef.value) {
    videoRef.value.play().then(() => {
      isStarted.value = true;
      console.log("Vidéo démarrée");
      document.removeEventListener("click", startVideo);
    }).catch((error) => {
      console.error("Erreur lors du démarrage de la vidéo :", error);
    });
  }
};

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.addEventListener("ended", () => {
      isFirstTime.value = false;
      router.push({name: "Login"});
    });
  }

  document.addEventListener("click", startVideo);
});
</script>

<template>
  <div class="flex justify-content-center align-items-center h-full w-full relative">
    <div v-if="!isFirstTime" class="h-full w-full relative bg-white" style="max-width: 500px">
      <Toast
          :base-z-index="9999"
          :pt="{root: {style: {top: '3vh'}}}"
          position="top-center"
      />
      <NotificationPopup id="notificationRef"/>
      <router-view></router-view>
    </div>
    <div v-else
         class="flex flex-column justify-content-center align-items-center h-full w-full relative overflow-x-hidden"
         style="max-width: 449px">
      <video
          ref="videoRef"
          class="video"
          src="@/assets/videos/ouverture-app.mp4"
      ></video>
      <div class="overflow-x-hidden absolute">
        <img alt="Iphone" class="iphone" src="@/assets/images/iphone.png"/>
      </div>
    </div>
    <div v-if="!isStarted"
         class="flex justify-content-center align-items-center absolute middle h-screen w-screen font-bold">
      Cliquez pour démarrer...
    </div>
  </div>
</template>

<style scoped>
.video {
  height: 95vh;
  border-radius: 10%;
}

.iphone {
  height: 98vh;
}

.middle {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(225, 225, 225, 0.75);
  font-size: 2rem;
}
</style>
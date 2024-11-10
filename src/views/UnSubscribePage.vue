<script lang="ts" setup>
import {onMounted, ref} from "vue";
import UnsubscribeStep1 from "@/components/unsubscribe/UnsubscribeStep1.vue";
import UnsubscribeStep2 from "@/components/unsubscribe/UnsubscribeStep2.vue";
import UnsubscribeStep3 from "@/components/unsubscribe/UnsubscribeStep3.vue";
import UnsubscribeStep4 from "@/components/unsubscribe/UnsubscribeStep4.vue";
import {useUserStore} from "@/stores/user.store";

const userStore = useUserStore();

const steps = ref([
  UnsubscribeStep1,
  UnsubscribeStep2,
  UnsubscribeStep3,
  UnsubscribeStep4,
  UnsubscribeStep4,
]);

function handleNext() {
  userStore.step += 1;
  window.scrollTo({top: 0, behavior: 'smooth'}); // Défilement en haut avec animation
}


onMounted(() => {
  userStore.step = 0;
})

</script>

<template>
  <component :is="steps[userStore.step]" @next="handleNext()"/>
</template>

<style scoped>
</style>
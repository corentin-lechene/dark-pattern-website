<script lang="ts" setup>
import {ref} from "vue";
import UnsubscribeStep1 from "@/components/unsubscribe/UnsubscribeStep1.vue";
import UnsubscribeStep2 from "@/components/unsubscribe/UnsubscribeStep2.vue";
import UnsubscribeStep3 from "@/components/unsubscribe/UnsubscribeStep3.vue";
import UnsubscribeStep4 from "@/components/unsubscribe/UnsubscribeStep4.vue";

const step = ref(0);

const steps = ref([
  UnsubscribeStep1,
  UnsubscribeStep2,
  UnsubscribeStep3,
  UnsubscribeStep4,
]);


</script>

<template>
  <component :is="steps[step]" @next="step += 1" @previous="step = 0"/>
</template>

<style scoped>
</style>
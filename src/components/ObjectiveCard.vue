<script lang="ts" setup>


interface ObjectiveCardProps {
  title: string;
  subtitle: string;
  succeed: boolean;
  color: string;
}

defineProps<ObjectiveCardProps>();

</script>

<template>
  <div :class="`bg-${color}`" class="flex justify-content-between p-3 border-round-lg">
    <div class="flex flex-column gap-1">
      <div class="text-sm border-gray-600 font-normal">{{ title }}</div>
      <div class="text-lg font-medium">{{ subtitle }}</div>
    </div>
    <div>
      <i v-if="succeed" class="pi pi-check-circle text-green-700" style="font-size: 2em"/>
      <i v-else class="pi pi-clock text-blue-700" style="font-size: 2em"/>
    </div>
  </div>
</template>

<style scoped>

</style>
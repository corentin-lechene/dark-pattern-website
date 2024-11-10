<script lang="ts" setup>

interface SliderBaseProps {
  title?: string;
  viewAll?: boolean;
}

defineProps<SliderBaseProps>();

</script>

<template>
  <div class="flex flex-column pl-4 pb-2">
    <div class="flex justify-content-between align-items-center pr-4 pb-2">
      <div v-if="title" class="text-2xl font-semibold">{{ title }}</div>
      <div v-if="viewAll" class="text-xs cursor-pointer" @click="$router.push({name: 'Products'})">Voir tous</div>
    </div>
    <div class="slider-base flex gap-3 w-full overflow-x-scroll p-0 pr-4">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.slider-base::-webkit-scrollbar {
  display: none;
}
</style>
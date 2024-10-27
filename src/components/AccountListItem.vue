<script lang="ts" setup>

interface AccountListItemProps {
  label: string;
  icon: string;
  disabled?: boolean;
}

defineProps<AccountListItemProps>();

</script>

<template>
  <div class="flex justify-content-between align-items-center p-3">
    <div class="flex align-items-center gap-3">
      <i :class="icon" class="pi text-lg"></i>
      <div class="text-lg">{{ label }}</div>
    </div>
    <i v-if="!disabled" class="pi text-lg pi-chevron-right"></i>
  </div>
</template>

<style scoped>

</style>
<script lang="ts" setup>

import SliderBase from "@/components/SliderBase.vue";
import CategoryCard from "@/components/CategoryCard.vue";

import categories from "@/data/categories.json";
</script>

<template>
  <SliderBase title="Categories">
    <CategoryCard v-for="(category, i) in categories" :key="i" :category="category"/>
  </SliderBase>
</template>

<style scoped>

</style>
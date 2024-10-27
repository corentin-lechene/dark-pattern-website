<script lang="ts" setup>

import {ref} from "vue";

const items = ref([
  {
    title: 'Accueil',
    name: 'Home',
    icon: 'pi-home',
  },
  {
    title: 'Abonnement',
    name: 'Subscription',
    icon: 'pi-id-card',
  },
  {
    title: 'Panier',
    name: 'Cart',
    icon: 'pi-shopping-cart',
  },
  {
    title: 'Compte',
    name: 'Account',
    icon: 'pi-user',
  },
])
</script>

<template>
  <div class="nab-bar-bottom sticky bottom-0 w-full p-3 bg-gray-50 border-top-1 border-gray-300">
    <div class="flex justify-content-evenly">
      <div
          v-for="(item, i) in items"
          :key="i"
          :class="$route.name === item.name ? '' : 'opacity-50'"
          class="flex flex-column gap-1 align-items-center cursor-pointer"
          @click="$router.push({name: item.name})"
      >
        <div>
          <i :class="item.icon" class="pi text-xl"></i>
        </div>
        <div>{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nab-bar-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
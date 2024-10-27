<script lang="ts" setup>

import dayjs from "dayjs/esm/index.js";
import NavBarBottom from "@/components/NavBarBottom.vue";
import HeaderApp from "@/components/HeaderApp.vue";
import {ref} from "vue";

dayjs.locale(localStorage.getItem('language') || 'fr');

const needBackButton = ref(['Product', 'Products', 'MyAccount', 'Payment', 'UnSubscribe',]);

</script>

<template>
  <HeaderApp v-if="$route.name === 'Home'" logo-only/>
  <HeaderApp
      v-else
      :back-btn="needBackButton.includes($route.name)"
      :shop-button="$route.name === 'Cart'"
      :title="$route.name"
  />
  <router-view></router-view>
  <NavBarBottom/>
</template>

<style scoped>

</style>
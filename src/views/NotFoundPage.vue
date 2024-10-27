<template>
  <div class="content flex flex-column align-items-center justify-content-center pb-4 overflow-y-scroll"
       style="min-height: 85%; gap: 0.65em">
    <div class="flex flex-column align-items-center justify-content-center not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <router-link to="/">Go back to Home</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

.not-found h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

.not-found p {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.not-found a {
  font-size: 1.2em;
  color: #42b983;
  text-decoration: none;
}

.not-found a:hover {
  text-decoration: underline;
}
</style>
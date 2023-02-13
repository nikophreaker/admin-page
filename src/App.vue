<script lang="ts">
import AdminLogin from './components/AdminLogin.vue';
import { RouterView, RouterLink } from 'vue-router';
import { defineComponent } from 'vue';
export default defineComponent({

})

</script>

<template>
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

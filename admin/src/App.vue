<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
<script>
import CenteredLayout from './views/layouts/CenteredLayout.vue';
import DefaultLayout from './views/layouts/DefaultLayout.vue';
import login from './views/login.vue';
import { useRouter, useRoute } from 'vue-router';
import app from './services/App.ts';

export default {
  components: {
    DefaultLayout,
    CenteredLayout
  },
  created() {
    const router = useRouter();

    console.log('All routes:', router.getRoutes());
    const route = useRoute();
    console.log('Current route:', route);
    console.log('layout', this.layout);
  },
  computed: {
    layout() {
      return app.layout;
    }
  }
}
</script>

<style scoped>
</style>

<template>
  == {{ layout }}==
  <router-view />
</template>
<!--<template>
  <CenteredLayout>
    <login></login>
  </CenteredLayout>
</template>-->
<!--<template>-->
<!--  <v-layout>-->
<!--    <v-main class="d-flex align-center justify-center" height="300">-->
<!--      <v-container class="fill-height" fluid>-->
<!--        <login></login>-->
<!--      </v-container>-->
<!--    </v-main>-->
<!--  </v-layout>-->
<!--</template>-->

<script>
import CenteredLayout from './views/layouts/CenteredLayout.vue';
import login from './views/login.vue';
import { useRouter, useRoute } from 'vue-router';
import app from './libraries/App.js';

export default {
  created() {
    const router = useRouter();

    console.log('All routes:', router.getRoutes());
    const route = useRoute();
    console.log('Current route:', route);
    console.log('layout', app.layout);
  },
  computed: {
    layout() {
      return app.layout;
    }
  }
  /*setup() {
    const router = useRouter();

    console.log('All routes:', router.getRoutes());
    const route = useRoute();
    console.log('Current route:', route);
    console.log('layout', app.layout);
    return {route};
  },

  mounted() {
    console.log('layout2', app.layout);
  }*/
}
</script>

<style scoped>
</style>

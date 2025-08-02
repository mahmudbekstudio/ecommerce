<template>
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

export default {
  setup() {
    const router = useRouter();

    console.log('All routes:', router.getRoutes());
    const route = useRoute();
    console.log('Current route:', route);
    return {route};
  }
}
</script>

<style scoped>
</style>

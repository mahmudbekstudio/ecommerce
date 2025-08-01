<template>
  <router-view />
  <CenteredLayout>
    <login></login>
  </CenteredLayout>
</template>
<!--<template>-->
<!--  <v-layout>-->
<!--    <v-main class="d-flex align-center justify-center" height="300">-->
<!--      <v-container class="fill-height" fluid>-->
<!--        <login></login>-->
<!--      </v-container>-->
<!--    </v-main>-->
<!--  </v-layout>-->
<!--</template>-->

<script setup lang="ts">
import CenteredLayout from './views/layouts/CenteredLayout.vue'
import login from './views/login.vue'
</script>

<style scoped>
</style>

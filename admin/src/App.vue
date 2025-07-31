<!--<template>-->
<!--  <CenteredLayout>-->
<!--    <v-card>-->
<!--      <v-card-title>Login</v-card-title>-->
<!--      <v-card-text>-->

<!--        <div>-->
<!--          <a href="https://vite.dev" target="_blank">-->
<!--            <img src="#" class="logo" alt="Vite logo" />-->
<!--          </a>-->
<!--          <a href="https://vuejs.org/" target="_blank">-->
<!--            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />-->
<!--          </a>-->
<!--        </div>-->
<!--        <HelloWorld msg="Vite + Vue" />-->

<!--      </v-card-text>-->
<!--    </v-card>-->
<!--  </CenteredLayout>-->
<!--</template>-->
<template>
  <v-layout>
    <v-main class="d-flex align-center justify-center" height="300">
      <v-container class="fill-height" fluid>
        <login></login>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import CenteredLayout from './views/layouts/CenteredLayout.vue'
import login from './views/login.vue'
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

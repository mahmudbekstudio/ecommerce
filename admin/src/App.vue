<template>
  <CenteredLayout>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>

        <div>
          <a href="https://vite.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
          </a>
          <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
          </a>
        </div>
        <HelloWorld msg="Vite + Vue" />

      </v-card-text>
    </v-card>
  </CenteredLayout>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import CenteredLayout from './views/layouts/CenteredLayout.vue'
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

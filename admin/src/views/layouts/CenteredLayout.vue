<template>
  <v-app>
    <v-main>
      <v-container
          class="fill-height"
          fluid
      >
        <v-row align="center" justify="center">
          <v-col>
            <slot /> <!-- Content goes here -->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
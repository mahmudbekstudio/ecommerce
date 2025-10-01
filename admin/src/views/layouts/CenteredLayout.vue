<template>
  <empty-layout>
    <v-main>
      <v-container
          class="fill-height"
          fluid
      >
        <v-row align="center" justify="center">
          <v-col>
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </empty-layout>
</template>
<script lang="ts">
import EmptyLayout from "./EmptyLayout.vue";

export default {
  components: {
    EmptyLayout
  }
}
</script>
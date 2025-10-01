<template>
  <empty-layout>
    <v-app-bar flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Admin</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="rail = !rail" :title="rail ? 'Expand menu' : 'Collapse to rail'">
        <v-icon>mdi-dock-left</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- LEFT DRAWER -->
    <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
    >
      <v-list density="comfortable" nav>
        <v-list-item
            v-for="(item, i) in sideItems"
            :key="i"
            :to="item.to"
        >
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container
          class="py-6"
          fluid
      >
        <slot />
      </v-container>
      <v-container fluid class="pt-0">
        <div>
          <v-footer>
            asdasdasd
          </v-footer>
        </div>
      </v-container>
    </v-main>








  </empty-layout>
</template>
<script lang="ts">
import EmptyLayout from "./EmptyLayout.vue";

export default {
  data () {
    return {
      drawer: true,
      rail: false,
      bottom: 0,
      sideItems: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
        { title: 'Users',     icon: 'mdi-account-group', to: '/users' },
        { title: 'Settings',  icon: 'mdi-cog',           to: '/settings' },
      ],
      bottomItems: [
        { title: 'Home',  icon: 'mdi-home',   to: '/' },
        { title: 'Search',icon: 'mdi-magnify',to: '/search' },
        { title: 'Profile',icon:'mdi-account',to: '/profile' },
      ]
    }
  },
  components: {
    EmptyLayout
  },
  methods: {
    go() {
      //
    }
  }
}
</script>
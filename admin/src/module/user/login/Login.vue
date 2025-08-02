<template>
  <centered-layout>
    <v-card elevation="4" class="mx-auto" style="min-width: 480px;">
      <v-card-title class="text-h6">Login</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleLogin" ref="formRef" v-model="valid">
          <v-text-field
              v-model="email"
              label="Email"
              type="email"
              :rules="[rules.required, rules.email]"
              prepend-inner-icon="mdi-email"
              required
          />
          <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-lock"
              required
          />
          <v-btn
              :disabled="!valid"
              type="submit"
              color="primary"
              block
              class="mt-4"
          >
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </centered-layout>
</template>
<script setup lang="ts">
import CenteredLayout from "../../../views/layouts/CenteredLayout.vue";
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const valid = ref(false)
const formRef = ref()

const rules = {
  required: (v: string) => !!v || 'Field is required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
}

const handleLogin = () => {
  if (!formRef.value?.validate()) return

  // Replace this with real login logic
  console.log('Logging in with:', email.value, password.value)
}
</script>
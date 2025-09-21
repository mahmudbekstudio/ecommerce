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
<script lang="ts">
import http from '../../../services/Http.ts';
import userApi from '../api.ts';
import auth from '../../../services/Auth.ts';
import viewConfig from '../../../configs/view.ts';
export default {
  data () {
    return {
      valid: false,
      email: '',
      password: '',
      rules: {
        required: (v: string) => !!v || 'Field is required',
        email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      }
    }
  },
  methods: {
    async handleLogin () {
      const { valid } = await this.$refs.formRef.validate();
      if (!valid) return;

      try {
        const response = await http
            .route(userApi.login)
            .data(this.email, this.password)
            .send();

        if (response.data.result) {
          auth.login(response.data.token, response.data.user);
          this.$router.push({ name: viewConfig.page.default });
        }
      } catch (e: Error) {
        console.log('error', e.message);
    }
  }
}
/*import CenteredLayout from "../../../views/layouts/CenteredLayout.vue";
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
}*/
</script>
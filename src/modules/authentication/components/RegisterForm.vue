<template>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative">Sign in with</span>
        </div>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation action="/pages/boxedlogin" class="mt-5">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Name</v-label>
        <VTextField v-model="fname" :rules="fnameRules" required></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Email Adddress</v-label>
        <VTextField v-model="email" :rules="emailRules" required></VTextField>
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Password</v-label>
        <VTextField
            v-model="password"
            :counter="10"
            :rules="passwordRules"
            required
            variant="outlined"
            type="password"
            color="primary"
        ></VTextField>
        <v-btn size="large" class="mt-2" color="primary" block submit flat>Sign Up</v-btn>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const valid = ref(true);
const password = ref('');
const email = ref('');
const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const fname = ref('');
const fnameRules = ref([
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length <= 10) || 'Name must be less than 10 characters'
]);
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('admin@local.dev')
const password = ref('password')
const error = ref('')
const loading = ref(false)

const onSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    await router.push('/')
  } catch {
    error.value = 'Giriş başarısız'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-6">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="text-xl font-semibold">{{ $t('login') }}</h1>

        <form class="space-y-4" @submit.prevent="onSubmit">
          <label class="form-control w-full">
            <div class="label"><span class="label-text">{{ $t('email') }}</span></div>
            <input v-model="email" class="input input-bordered w-full" type="email" />
          </label>

          <label class="form-control w-full">
            <div class="label"><span class="label-text">{{ $t('password') }}</span></div>
            <input v-model="password" class="input input-bordered w-full" type="password" />
          </label>

          <div v-if="error" class="alert alert-error">
            <span>{{ error }}</span>
          </div>

          <button class="btn btn-primary w-full" :disabled="loading">
            <span v-if="loading" class="loading loading-spinner"></span>
            <span v-else>{{ $t('login') }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  await router.push('/login')
}
</script>

<template>
  <div class="p-6">
    <div class="navbar bg-base-100 rounded-box shadow">
      <div class="flex-1 px-2">
        <span class="text-lg font-semibold">{{ $t('dashboard') }}</span>
      </div>
      <div class="flex-none">
        <button class="btn btn-ghost" @click="logout">Çıkış</button>
      </div>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-3">
      <div class="stat bg-base-100 rounded-box shadow">
        <div class="stat-title">Orders</div>
        <div class="stat-value">0</div>
      </div>
      <div class="stat bg-base-100 rounded-box shadow">
        <div class="stat-title">Customers</div>
        <div class="stat-value">0</div>
      </div>
      <div class="stat bg-base-100 rounded-box shadow">
        <div class="stat-title">Revenue</div>
        <div class="stat-value">₺0</div>
      </div>
    </div>
  </div>
</template>

import { defineStore } from 'pinia'
import { api } from '../utils/api'

type Tokens = {
  accessToken: string
  refreshToken: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') ?? '',
    refreshToken: localStorage.getItem('refreshToken') ?? ''
  }),
  getters: {
    isAuthenticated: (s) => Boolean(s.accessToken)
  },
  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post<Tokens>('/auth/login', { email, password })
      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
    },
    async logout() {
      const refreshToken = this.refreshToken
      this.accessToken = ''
      this.refreshToken = ''
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken }).catch(() => undefined)
      }
    }
  }
})

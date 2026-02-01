import { createI18n } from 'vue-i18n'

const messages = {
  tr: {
    login: 'Giriş',
    email: 'E-posta',
    password: 'Şifre',
    dashboard: 'Panel'
  },
  en: {
    login: 'Login',
    email: 'Email',
    password: 'Password',
    dashboard: 'Dashboard'
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'tr',
  fallbackLocale: 'en',
  messages
})

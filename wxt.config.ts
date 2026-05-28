import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: 'Stamina',
    description:
      'Level up your focus. Grind sessions, cooldowns, and stamina recovery in your browser.',
    permissions: ['storage', 'alarms', 'notifications', 'offscreen'],
    action: {
      default_title: 'Stamina',
    },
  },
});

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: 'Stamina',
    description: 'A pomodoro timer with styles.',
    permissions: ['storage', 'alarms', 'notifications', 'offscreen'],
    action: {
      default_title: 'Stamina',
    },
  },
});

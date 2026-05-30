import '@/assets/globals.css';
import './overlay.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createShadowRootUi } from 'wxt/utils/content-script-ui/shadow-root';

import { applyHostPin, resolveHostPin } from '@/lib/themes/host-pin';
import { getDisplayThemeDefinition } from '@/lib/themes/registry';
import { DEFAULT_SETTINGS } from '@/lib/pomodoro/constants';

import App from './App.tsx';

export default defineContentScript({
  matches: ['<all_urls>'],
  excludeMatches: [
    '*://chrome.google.com/webstore/*',
    '*://chromewebstore.google.com/*',
  ],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'stamina-gauge',
      position: 'inline',
      anchor: 'body',
      onMount(container, _shadow, shadowHost) {
        const initialTheme = DEFAULT_SETTINGS.displayTheme;
        const initialConfig = DEFAULT_SETTINGS.themeConfig;
        shadowHost.dataset.displayTheme = initialTheme;
        if (initialConfig.kind === 'progressBar') {
          shadowHost.dataset.progressBarPosition = initialConfig.position;
        }
        if (initialConfig.kind === 'skyrim') {
          shadowHost.dataset.skyrimFramePosition = initialConfig.position;
        }
        const def = getDisplayThemeDefinition(initialTheme);
        applyHostPin(
          shadowHost,
          resolveHostPin(def.hostPin, def.getHostPin, initialConfig),
        );

        const appRoot = document.createElement('div');
        container.append(appRoot);

        const root = ReactDOM.createRoot(appRoot);
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
        );
        return root;
      },
      onRemove(root) {
        root?.unmount();
      },
    });

    ui.mount();
  },
});

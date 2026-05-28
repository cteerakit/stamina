const OFFSCREEN_URL = '/offscreen.html';

export async function playCompletionSound(): Promise<void> {
  const existingContexts = await browser.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
  });

  if (existingContexts.length === 0) {
    await browser.offscreen.createDocument({
      url: OFFSCREEN_URL,
      reasons: ['AUDIO_PLAYBACK'],
      justification: 'Play a sound when a pomodoro phase ends',
    });
  }

  await browser.runtime.sendMessage({ type: 'PLAY_SOUND' });
}

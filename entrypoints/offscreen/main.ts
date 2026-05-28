function playBeep(): void {
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = 880;
  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.6);

  oscillator.onended = () => {
    void ctx.close();
  };
}

browser.runtime.onMessage.addListener((message: { type?: string }) => {
  if (message?.type === 'PLAY_SOUND') {
    playBeep();
  }
});

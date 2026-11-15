// Procedural Web Audio API synthesizer for subtle interaction feedback & ambient soundscape.
// Strictly opt-in following user interaction with a persistent mute control.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled = false;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;

  public isEnabled(): boolean {
    return this.enabled;
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleSound(forceState?: boolean): boolean {
    const next = typeof forceState === 'boolean' ? forceState : !this.enabled;
    this.enabled = next;
    if (this.enabled) {
      this.startAmbient();
      this.playChime(520, 0.08);
    } else {
      this.stopAmbient();
    }
    return this.enabled;
  }

  public playClick(): void {
    if (!this.enabled) return;
    this.playChime(660, 0.04);
  }

  public playChapterTransition(chapterIdx: number): void {
    if (!this.enabled) return;
    const baseFreqs = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
    const freq = baseFreqs[chapterIdx % baseFreqs.length] || 330;
    this.playChime(freq, 0.14);
  }

  private playChime(freq: number, duration: number): void {
    const ctx = this.ensureContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.25, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio errors on restricted devices
    }
  }

  private startAmbient(): void {
    const ctx = this.ensureContext();
    if (!ctx || this.ambientOsc) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      gain.gain.setValueAtTime(0.008, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      this.ambientOsc = osc;
      this.ambientGain = gain;
    } catch {
      // Ignore
    }
  }

  private stopAmbient(): void {
    try {
      if (this.ambientOsc) {
        this.ambientOsc.stop();
        this.ambientOsc.disconnect();
        this.ambientOsc = null;
      }
      if (this.ambientGain) {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      }
    } catch {
      // Ignore
    }
  }
}

export const soundEngine = new SoundEngine();

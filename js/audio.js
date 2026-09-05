// Audio Engine using Web Audio API (Synthesized retro sounds)
class SoundFX {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playTone(freq, type, duration, startTime = 0, gainLevel = 0.15) {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

        gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + startTime);
        osc.stop(this.ctx.currentTime + startTime + duration);
    }

    // Windows 7 style Boot Sound
    playBootSound() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const chords = [
            { f: 392.00, t: 0.0, d: 2.5 }, // G4
            { f: 523.25, t: 0.2, d: 2.8 }, // C5
            { f: 659.25, t: 0.4, d: 3.0 }, // E5
            { f: 783.99, t: 0.6, d: 3.5 }, // G5
            { f: 1046.50, t: 0.8, d: 4.0 } // C6
        ];

        chords.forEach(c => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(c.f, now + c.t);
            gain.gain.setValueAtTime(0.001, now + c.t);
            gain.gain.exponentialRampToValueAtTime(0.18, now + c.t + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + c.t + c.d);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + c.t);
            osc.stop(now + c.t + c.d);
        });
    }

    // Windows 11 Modern Chime
    playWin11Boot() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const freqs = [440, 554.37, 659.25, 880];
        freqs.forEach((f, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, now + idx * 0.15);
            gain.gain.setValueAtTime(0.12, now + idx * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 2.0);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.15);
            osc.stop(now + idx * 0.15 + 2.0);
        });
    }

    playClick() {
        this.playTone(800, 'triangle', 0.04, 0, 0.05);
    }

    playOpen() {
        this.playTone(400, 'sine', 0.08, 0, 0.08);
        this.playTone(600, 'sine', 0.1, 0.04, 0.08);
    }

    playNotification() {
        this.playTone(587.33, 'sine', 0.15, 0, 0.15); // D5
        this.playTone(880.00, 'sine', 0.35, 0.12, 0.18); // A5
    }

    playError() {
        this.playTone(150, 'sawtooth', 0.25, 0, 0.25);
        this.playTone(120, 'sawtooth', 0.35, 0.1, 0.25);
    }

    playSuccess() {
        this.playTone(523.25, 'sine', 0.12, 0, 0.15);
        this.playTone(659.25, 'sine', 0.12, 0.08, 0.15);
        this.playTone(783.99, 'sine', 0.15, 0.16, 0.18);
        this.playTone(1046.50, 'sine', 0.35, 0.24, 0.2);
    }

    playClipper() {
        this.playTone(880, 'triangle', 0.08, 0, 0.1);
        this.playTone(1174.66, 'triangle', 0.12, 0.06, 0.12);
        this.playTone(1760, 'sine', 0.18, 0.12, 0.1);
    }

    playKeyboardTap() {
        const f = 200 + Math.random() * 150;
        this.playTone(f, 'square', 0.02, 0, 0.02);
    }

    playVirusAlert() {
        this.playTone(220, 'sawtooth', 0.2, 0, 0.3);
        this.playTone(440, 'sawtooth', 0.2, 0.15, 0.3);
        this.playTone(220, 'sawtooth', 0.2, 0.3, 0.3);
    }
}

window.soundFX = new SoundFX();

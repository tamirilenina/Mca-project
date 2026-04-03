export function playBeep(type = "correct") {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioCtx = new AudioContextClass();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === "correct") {
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(700, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    } else if (type === "wrong") {
      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.18, audioCtx.currentTime);
    } else if (type === "timeout") {
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.16, audioCtx.currentTime);
    }

    oscillator.start();

    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.currentTime + 0.35
    );
    oscillator.stop(audioCtx.currentTime + 0.35);
  } catch (error) {
    console.error("Sound play failed:", error);
  }
}
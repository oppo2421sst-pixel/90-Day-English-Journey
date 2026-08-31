export function playEnglishAudio(
  text: string,
  accent: 'en-US' | 'en-GB' = 'en-US',
  rate: number = 0.9
): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve(false);
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const cleanText = text.replace(/\([^)]*\)/g, '').replace(/\d+$/, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = accent;
      utterance.rate = Math.max(0.6, Math.min(1.2, rate));
      utterance.pitch = 1.0;

      // Try to find a high quality English voice
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(
        (v) => v.lang.startsWith(accent.split('-')[0]) && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel'))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onend = () => resolve(true);
      utterance.onerror = () => resolve(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      resolve(false);
    }
  });
}

const instruments = [
  {
    id: 1,
    name: 'beep',
    type: 'AM',
    settings: {
      harmonicity: 3,
      oscillator: {
        type: 'amsine2',
        modulationType: 'sine',
        harmonicity: 1.01,
      },
      envelope: {
        attack: 6,
        decay: 4,
        sustain: 0.04,
        release: 1.2,
      },
      modulation: {
        volume: 13,
        type: 'amsine2',
        modulationType: 'sine',
        harmonicity: 12,
      },
      modulationEnvelope: {
        attack: 0.006,
        decay: 0.2,
        sustain: 0.2,
        release: 0.4,
      },
    },
  },
  {
    id: 2,
    name: 'boop',
    type: 'FM',
    settings: {
      harmonicity: 2,
      modulationIndex: 2,
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.01,
        decay: 2,
        sustain: 0.1,
        release: 2,
      },
      modulation: {
        type: 'triangle',
      },
      modulationEnvelope: {
        attack: 0.02,
        decay: 0.2,
        sustain: 0,
        release: 0.2,
      },
    },
  },
  {
    id: 3,
    name: 'bass',
    type: 'FM',
    settings: {
      portamento: 0.08,
      oscillator: {
        partials: [1, 3, 2, 0.4],
      },
      filter: {
        Q: 4,
        type: 'lowpass',
        rolloff: -48,
      },
      envelope: {
        attack: 0.04,
        decay: 0.06,
        sustain: 0.4,
        release: 1,
      },
      filterEnvelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.6,
        release: 1.5,
        baseFrequency: 50,
        octaves: 3.4,
      },
    },
  },
  {
    id: 5,
    name: 'racecar',
    type: 'FM',
    settings: {
      harmonicity: 3.01,
      modulationIndex: 14,
      oscillator: {
        type: 'triangle',
      },
      envelope: {
        attack: 0.2,
        decay: 0.3,
        sustain: 0.1,
        release: 1.2,
      },
      modulation: {
        type: 'square',
      },
      modulationEnvelope: {
        attack: 0.01,
        decay: 0.5,
        sustain: 0.2,
        release: 0.1,
      },
    },
  },
  ,
  {
    id: 6,
    name: 'kalimba',
    type: 'FM',
    settings: {
      harmonicity: 8,
      modulationIndex: 2,
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.001,
        decay: 2,
        sustain: 0.1,
        release: 2,
      },
      modulation: {
        type: 'square',
      },
      modulationEnvelope: {
        attack: 0.002,
        decay: 0.2,
        sustain: 0,
        release: 0.2,
      },
    },
  },
]

export default instruments

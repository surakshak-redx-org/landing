export const SITE = {
  name: 'Surakshak',
  tagline: 'Har Kadam, Surakshit',
  taglineHindi: 'हर कदम, सुरक्षित',
  taglineMarathi: 'प्रत्येक पाऊल, सुरक्षित',
  description:
    "Women's safety app for India. Emergency SOS, live location sharing, " +
    'community support, and legal information — in English, Hindi, and Marathi.',
  url: 'https://surakshak.app',
  playStoreUrl: '#', // placeholder until account is ready
  appStoreUrl: '#', // placeholder until account is ready
  githubUrl: 'https://github.com/surakshak-redx-org',
  instagramUrl: '#',
  clubName: 'REDX Club',
  collegeName: 'K.J. Somaiya Institute of Technology',
} as const;

export const COLORS = {
  PRIMARY_RED: '#D4380D',
  SHAKTI_PURPLE: '#722ED1',
  SAFFRON: '#FA8C16',
  FOREST_GREEN: '#389E0D',
} as const;

export const EMERGENCY_NUMBERS = [
  { number: '112', label: 'National Emergency', icon: '🚨' },
  { number: '100', label: 'Police', icon: '👮' },
  { number: '108', label: 'Ambulance', icon: '🚑' },
  { number: '1091', label: 'Women Helpline', icon: '🛡️' },
  { number: '181', label: 'Mahila Helpline', icon: '💛' },
  { number: '1098', label: 'Child Helpline', icon: '🤝' },
] as const;

export const FEATURES = [
  {
    id: 'sos',
    icon: '🆘',
    color: '#D4380D',
    bg: 'bg-red-50',
    title: 'One-Tap SOS',
    subtitle: 'Triple-tap or shake your phone',
    description:
      'Triple-tap the SOS button or shake your phone to instantly alert all your emergency ' +
      'contacts. On Android, SMS is sent silently in the background — no taps, no delays.',
    platform: {
      android: 'Silent background SMS + direct call',
      ios: 'Compose sheet + pre-filled dialer',
    },
  },
  {
    id: 'location',
    icon: '📍',
    color: '#722ED1',
    bg: 'bg-purple-50',
    title: 'Live Location',
    subtitle: 'Share for up to 8 hours',
    description:
      'Share your real-time location with trusted contacts for up to 8 hours. Works in the ' +
      'background. Auto-notifies contacts when you start sharing.',
  },
  {
    id: 'journey',
    icon: '🚶',
    color: '#389E0D',
    bg: 'bg-green-50',
    title: 'Safe Journey',
    subtitle: 'Auto-alert on missed check-in',
    description:
      "Set your destination and arrival time. If you don't check in on time, Surakshak " +
      'automatically alerts your contacts with your last known location.',
  },
  {
    id: 'community',
    icon: '💬',
    color: '#FA8C16',
    bg: 'bg-orange-50',
    title: 'Community',
    subtitle: 'Real-time city-wide safety chat',
    description:
      'Connect with women in your city. Share alerts, help requests, and location warnings ' +
      'in real time. Post anonymously when you need to.',
  },
  {
    id: 'map',
    icon: '🗺️',
    color: '#D4380D',
    bg: 'bg-red-50',
    title: 'Unsafe Area Map',
    subtitle: 'Community-reported danger zones',
    description:
      'See and report unsafe areas on a live map. Orange pins are pending reports, red pins ' +
      'are verified. Upvote or downvote reports to keep the map accurate.',
  },
  {
    id: 'laws',
    icon: '⚖️',
    color: '#722ED1',
    bg: 'bg-purple-50',
    title: 'Know Your Rights',
    subtitle: "10 key women's laws — offline",
    description:
      'Domestic Violence Act, POSH Act, Dowry Prohibition and more — available offline. ' +
      'Plain language. No legal jargon.',
  },
  {
    id: 'evidence',
    icon: '🎙️',
    color: '#389E0D',
    bg: 'bg-green-50',
    title: 'Silent Recording',
    subtitle: 'Evidence you control',
    description:
      'Record audio evidence discreetly. It uploads automatically to your secure account. ' +
      'Share the link with emergency contacts or authorities.',
  },
  {
    id: 'disguise',
    icon: '🔢',
    color: '#595959',
    bg: 'bg-stone-50',
    title: 'Disguise Mode',
    subtitle: 'Looks like a calculator',
    description:
      'Enable disguise mode and Surakshak looks like a plain calculator. Enter your PIN to ' +
      'unlock it. Stay protected without drawing attention.',
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Download & Sign Up',
    description: 'Sign in with your phone number. No email needed. Takes under 2 minutes.',
    color: '#D4380D',
  },
  {
    step: '02',
    title: 'Add Emergency Contacts',
    description:
      "Add family, friends, or colleagues you trust. They'll receive alerts in an emergency.",
    color: '#722ED1',
  },
  {
    step: '03',
    title: 'Choose Your Language',
    description: 'English, Hindi, or Marathi. SMS alerts go out in your chosen language.',
    color: '#FA8C16',
  },
  {
    step: '04',
    title: "You're Protected",
    description: 'Shake, tap, or trigger SOS. Surakshak handles the rest — instantly.',
    color: '#389E0D',
  },
] as const;

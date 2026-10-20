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
    subtitle: 'Help, even when words are hard to find',
    description:
      'Sometimes you need help without having time to explain. Trigger SOS to alert your emergency contacts. On Android, SMS can be sent silently in the background; on iPhone, sending requires a tap.',
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
    subtitle: 'Let someone know where you are',
    description:
      'Heading home, travelling alone, or meeting someone new? Share your real-time location with trusted contacts for up to 8 hours, so the people you choose can follow your journey.',
  },
  {
    id: 'journey',
    icon: '🚶',
    color: '#389E0D',
    bg: 'bg-green-50',
    title: 'Safe Journey',
    subtitle: 'A check-in for the unexpected',
    description:
      'Set your destination and expected arrival time before you leave. If you miss your check-in, Surakshak can alert your contacts with your last known location.',
  },
  {
    id: 'community',
    icon: '💬',
    color: '#FA8C16',
    bg: 'bg-orange-50',
    title: 'Community',
    subtitle: 'Looking out for one another',
    description:
      'Sometimes a local update or a helping hand makes a difference. Connect with women in your city to share safety alerts, help requests, and location warnings, with the option to post anonymously.',
  },
  {
    id: 'map',
    icon: '🗺️',
    color: '#D4380D',
    bg: 'bg-red-50',
    title: 'Unsafe Area Map',
    subtitle: 'Know what others have reported',
    description:
      'Get a better picture of places the community has flagged as unsafe. Explore reports, share your own, and vote on existing reports to help others make more informed decisions.',
  },
  {
    id: 'laws',
    icon: '⚖️',
    color: '#722ED1',
    bg: 'bg-purple-50',
    title: 'Know Your Rights',
    subtitle: 'Know where you stand',
    description:
      'Understanding your rights should not mean decoding complicated legal language. Explore plain-language information about important women’s laws, including the Domestic Violence Act, POSH Act, and Dowry Prohibition Act, even offline.',
  },
  {
    id: 'evidence',
    icon: '🎙️',
    color: '#389E0D',
    bg: 'bg-green-50',
    title: 'Silent Recording',
    subtitle: 'Keep control of your evidence',
    description:
      'When you need to document something, audio recording can help preserve what happened. Record discreetly and have the audio uploaded to your account, then choose whether to share the link with trusted contacts or authorities.',
  },
  {
    id: 'disguise',
    icon: '🔢',
    color: '#595959',
    bg: 'bg-stone-50',
    title: 'Disguise Mode',
    subtitle: 'Privacy when you need it',
    description:
      'There may be times when you want your safety app to be less noticeable. Disguise Mode makes Surakshak look like a calculator, with PIN access to unlock it.',
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

import type { Locale } from './i18n';

/**
 * Every user-facing string on the tracking page. Components never contain copy.
 * Rules: "Surakshak" and "SOS" are never translated, emergency numbers are digits,
 * and wording is gender-neutral (no "her"/"his"). `name` is null when the sender is unnamed.
 */
export interface Messages {
  loading: string;
  languageLabel: string;
  reconnecting: string;
  sharing: (name: string | null) => string;
  lastUpdated: (relative: string) => string;
  updated: (relative: string) => string;
  staleAnnouncement: string;
  lostContactTitle: (name: string | null, time: string) => string;
  lostContactAdvice: string;
  call112: string;
  arrivedTitle: (name: string | null) => string;
  arrivedBody: string;
  endedTitle: string;
  endedBody: string;
  invalidTitle: string;
  invalidBody: string;
  configTitle: string;
  configBody: string;
  recentre: string;
  showDetails: string;
  hideDetails: string;
  battery: (percent: number, charging: boolean) => string;
  speed: (kmh: number) => string;
  eta: (minutes: number, destination: string | null) => string;
  headingTo: string;
  currentPosition: string;
  lastKnownPosition: string;
  accuracy: (meters: number) => string;
  openInMaps: string;
  sharingSince: (time: string) => string;
  sharingEndsBy: (time: string) => string;
  mapUnavailable: string;
  mapRetry: string;
  privacy: string;
  getSurakshak: string;
}

const en: Messages = {
  loading: 'Loading live location',
  languageLabel: 'Language',
  reconnecting: 'Reconnecting…',
  sharing: (name) => `${name ?? 'Your contact'} is sharing their live location`,
  lastUpdated: (relative) => `Last updated ${relative}`,
  updated: (relative) => `Updated ${relative}`,
  staleAnnouncement: 'The location has not updated recently',
  lostContactTitle: (name, time) => `We lost contact with ${name ?? 'your contact'} at ${time}`,
  lostContactAdvice:
    'The map shows their last known position. Try calling them. ' +
    'If you think they may be in danger, call 112.',
  call112: 'Call 112',
  arrivedTitle: (name) => `${name ?? 'Your contact'} has arrived`,
  arrivedBody: 'Sharing has ended because the journey is complete. You can close this page.',
  endedTitle: 'This live location has ended.',
  endedBody: 'The sender stopped sharing, or the sharing time ran out. You can close this page.',
  invalidTitle: 'This link is not valid or has been stopped.',
  invalidBody:
    'Check that you opened the full link from the message. ' +
    'If you need to reach the sender, call them directly.',
  configTitle: 'Live tracking is not available right now.',
  configBody: 'This page is not set up correctly. Please try again later or contact the sender.',
  recentre: 'Re-centre',
  showDetails: 'Show details',
  hideDetails: 'Hide details',
  battery: (percent, charging) =>
    charging ? `Battery ${percent}%, charging` : `Battery ${percent}%`,
  speed: (kmh) => `${kmh} km/h`,
  eta: (minutes, destination) =>
    destination === null ? `About ${minutes} min away` : `About ${minutes} min to ${destination}`,
  headingTo: 'Heading to',
  currentPosition: 'Current position',
  lastKnownPosition: 'Last known position',
  accuracy: (meters) => `Accurate to about ${meters} m`,
  openInMaps: 'Open in Google Maps',
  sharingSince: (time) => `Sharing since ${time}`,
  sharingEndsBy: (time) => `Sharing ends by ${time}`,
  mapUnavailable: 'The map could not load. The details here still update.',
  mapRetry: 'Retry map',
  privacy: 'Only people with this link can see this. The sender can stop sharing at any time.',
  getSurakshak: 'Get Surakshak - Har Kadam, Surakshit',
};

const hi: Messages = {
  loading: 'लाइव लोकेशन लोड हो रही है',
  languageLabel: 'भाषा',
  reconnecting: 'दोबारा जुड़ रहे हैं…',
  sharing: (name) => `${name ?? 'आपका संपर्क'} अपनी लाइव लोकेशन शेयर कर रहे हैं`,
  lastUpdated: (relative) => `आख़िरी अपडेट: ${relative}`,
  updated: (relative) => `अपडेट: ${relative}`,
  staleAnnouncement: 'लोकेशन हाल ही में अपडेट नहीं हुई',
  lostContactTitle: (name, time) =>
    name === null
      ? `आपके संपर्क से ${time} पर संपर्क टूट गया`
      : `${name} से ${time} पर संपर्क टूट गया`,
  lostContactAdvice:
    'नक्शे पर उनकी आख़िरी ज्ञात जगह दिख रही है। उन्हें फ़ोन करके देखें। ' +
    'अगर आपको लगे कि वे ख़तरे में हैं, तो 112 पर कॉल करें।',
  call112: '112 पर कॉल करें',
  arrivedTitle: (name) => `${name ?? 'आपके संपर्क'} का सफ़र पूरा हुआ`,
  arrivedBody: 'सफ़र पूरा होने के कारण शेयरिंग बंद हो गई है। आप यह पेज बंद कर सकते हैं।',
  endedTitle: 'यह लाइव लोकेशन समाप्त हो गई है।',
  endedBody:
    'भेजने वाले ने शेयरिंग बंद कर दी है, या शेयरिंग का समय पूरा हो गया है। ' +
    'आप यह पेज बंद कर सकते हैं।',
  invalidTitle: 'यह लिंक मान्य नहीं है या इसे रोक दिया गया है।',
  invalidBody:
    'जाँच लें कि आपने संदेश से पूरा लिंक खोला है। भेजने वाले से संपर्क करना हो तो उन्हें सीधे फ़ोन करें।',
  configTitle: 'लाइव ट्रैकिंग अभी उपलब्ध नहीं है।',
  configBody: 'यह पेज ठीक से सेट नहीं है। कृपया बाद में कोशिश करें या भेजने वाले से संपर्क करें।',
  recentre: 'बीच में लाएँ',
  showDetails: 'विवरण दिखाएँ',
  hideDetails: 'विवरण छिपाएँ',
  battery: (percent, charging) =>
    charging ? `बैटरी ${percent}%, चार्ज हो रही है` : `बैटरी ${percent}%`,
  speed: (kmh) => `${kmh} किमी/घंटा`,
  eta: (minutes, destination) =>
    destination === null ? `लगभग ${minutes} मिनट दूर` : `${destination} तक लगभग ${minutes} मिनट`,
  headingTo: 'गंतव्य',
  currentPosition: 'मौजूदा जगह',
  lastKnownPosition: 'आख़िरी ज्ञात जगह',
  accuracy: (meters) => `लगभग ${meters} मीटर तक सटीक`,
  openInMaps: 'Google Maps में खोलें',
  sharingSince: (time) => `${time} से शेयरिंग जारी`,
  sharingEndsBy: (time) => `${time} तक शेयरिंग चलेगी`,
  mapUnavailable: 'नक्शा लोड नहीं हो सका। यहाँ दी गई जानकारी फिर भी अपडेट होती रहेगी।',
  mapRetry: 'नक्शा फिर लोड करें',
  privacy: 'इस लिंक वाले लोग ही इसे देख सकते हैं। भेजने वाला किसी भी समय शेयरिंग बंद कर सकता है।',
  getSurakshak: 'Surakshak पाएँ - हर कदम, सुरक्षित',
};

const mr: Messages = {
  loading: 'लाइव्ह लोकेशन लोड होत आहे',
  languageLabel: 'भाषा',
  reconnecting: 'पुन्हा जोडत आहे…',
  sharing: (name) => `${name ?? 'तुमचा संपर्क'} त्यांचे लाइव्ह लोकेशन शेअर करत आहेत`,
  lastUpdated: (relative) => `शेवटचे अपडेट: ${relative}`,
  updated: (relative) => `अपडेट: ${relative}`,
  staleAnnouncement: 'लोकेशन अलीकडे अपडेट झालेले नाही',
  lostContactTitle: (name, time) =>
    name === null
      ? `तुमच्या संपर्काशी ${time} वाजता संपर्क तुटला`
      : `${name} यांच्याशी ${time} वाजता संपर्क तुटला`,
  lostContactAdvice:
    'नकाशावर त्यांचे शेवटचे ज्ञात ठिकाण दिसत आहे. त्यांना फोन करून पाहा. ' +
    'ते धोक्यात असल्याचे वाटल्यास 112 वर कॉल करा.',
  call112: '112 वर कॉल करा',
  arrivedTitle: (name) =>
    name === null ? 'तुमच्या संपर्काचा प्रवास पूर्ण झाला' : `${name} यांचा प्रवास पूर्ण झाला`,
  arrivedBody: 'प्रवास पूर्ण झाल्यामुळे शेअरिंग बंद झाले आहे. तुम्ही हे पेज बंद करू शकता.',
  endedTitle: 'हे लाइव्ह लोकेशन संपले आहे.',
  endedBody:
    'पाठवणाऱ्याने शेअरिंग थांबवले आहे किंवा शेअरिंगची वेळ संपली आहे. तुम्ही हे पेज बंद करू शकता.',
  invalidTitle: 'ही लिंक वैध नाही किंवा थांबवण्यात आली आहे.',
  invalidBody:
    'संदेशातील संपूर्ण लिंक उघडली आहे का ते तपासा. पाठवणाऱ्याशी संपर्क साधायचा असल्यास थेट फोन करा.',
  configTitle: 'लाइव्ह ट्रॅकिंग सध्या उपलब्ध नाही.',
  configBody: 'हे पेज नीट सेट केलेले नाही. कृपया नंतर प्रयत्न करा किंवा पाठवणाऱ्याशी संपर्क साधा.',
  recentre: 'मध्यभागी आणा',
  showDetails: 'तपशील दाखवा',
  hideDetails: 'तपशील लपवा',
  battery: (percent, charging) =>
    charging ? `बॅटरी ${percent}%, चार्ज होत आहे` : `बॅटरी ${percent}%`,
  speed: (kmh) => `${kmh} किमी/तास`,
  eta: (minutes, destination) =>
    destination === null
      ? `सुमारे ${minutes} मिनिटे दूर`
      : `${destination} पर्यंत सुमारे ${minutes} मिनिटे`,
  headingTo: 'गंतव्य',
  currentPosition: 'सध्याचे ठिकाण',
  lastKnownPosition: 'शेवटचे ज्ञात ठिकाण',
  accuracy: (meters) => `सुमारे ${meters} मीटरपर्यंत अचूक`,
  openInMaps: 'Google Maps मध्ये उघडा',
  sharingSince: (time) => `${time} पासून शेअरिंग सुरू`,
  sharingEndsBy: (time) => `${time} पर्यंत शेअरिंग चालेल`,
  mapUnavailable: 'नकाशा लोड होऊ शकला नाही. येथील माहिती तरीही अपडेट होत राहील.',
  mapRetry: 'नकाशा पुन्हा लोड करा',
  privacy: 'फक्त ही लिंक असलेले लोकच हे पाहू शकतात. पाठवणारा कधीही शेअरिंग थांबवू शकतो.',
  getSurakshak: 'Surakshak मिळवा - प्रत्येक पाऊल, सुरक्षित',
};

export const MESSAGES: Record<Locale, Messages> = { en, hi, mr };

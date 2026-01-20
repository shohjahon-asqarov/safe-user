export interface SecurityQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

export interface SecurityLevel {
  level: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  recommendations: string[];
}

export const securityQuestions: SecurityQuestion[] = [
  {
    id: 'passwords',
    question: 'How do you manage your passwords?',
    options: [
      { text: 'I use the same password for most accounts', score: 0 },
      { text: 'I use a few different passwords and try to remember them', score: 1 },
      { text: 'I write them down in a notebook', score: 1 },
      { text: 'I use a password manager with unique passwords for each account', score: 3 },
    ],
  },
  {
    id: 'two-factor',
    question: 'Do you use two-factor authentication (2FA)?',
    options: [
      { text: 'I don\'t know what that is', score: 0 },
      { text: 'No, it seems too complicated', score: 0 },
      { text: 'Yes, on some important accounts', score: 2 },
      { text: 'Yes, on all accounts that support it', score: 3 },
    ],
  },
  {
    id: 'updates',
    question: 'How often do you update your devices and software?',
    options: [
      { text: 'I always click "remind me later"', score: 0 },
      { text: 'Occasionally, when I remember', score: 1 },
      { text: 'Regularly, every few weeks', score: 2 },
      { text: 'Immediately when updates are available', score: 3 },
    ],
  },
  {
    id: 'emails',
    question: 'How do you handle suspicious emails?',
    options: [
      { text: 'I open and click links if they look important', score: 0 },
      { text: 'I sometimes click links if the email looks official', score: 0 },
      { text: 'I\'m cautious but sometimes unsure what to do', score: 1 },
      { text: 'I never click links and verify directly with the source', score: 3 },
    ],
  },
  {
    id: 'public-wifi',
    question: 'How do you use public WiFi?',
    options: [
      { text: 'I connect freely and use it like home WiFi', score: 0 },
      { text: 'I use it but try to avoid banking', score: 1 },
      { text: 'I use a VPN when connecting to public WiFi', score: 3 },
      { text: 'I avoid public WiFi or use mobile data instead', score: 2 },
    ],
  },
  {
    id: 'social-media',
    question: 'What privacy settings do you use on social media?',
    options: [
      { text: 'Everything is public - I have nothing to hide', score: 0 },
      { text: 'Default settings - I haven\'t changed anything', score: 0 },
      { text: 'I\'ve adjusted some settings to limit who sees my posts', score: 2 },
      { text: 'I regularly review and restrict my privacy settings', score: 3 },
    ],
  },
  {
    id: 'backups',
    question: 'Do you back up your important data?',
    options: [
      { text: 'No, I\'ve never thought about it', score: 0 },
      { text: 'Sometimes, when I remember', score: 1 },
      { text: 'Yes, I back up to an external drive occasionally', score: 2 },
      { text: 'Yes, I have automatic backups to cloud and/or external drive', score: 3 },
    ],
  },
  {
    id: 'device-lock',
    question: 'How do you secure your phone?',
    options: [
      { text: 'No lock - it\'s easier to access', score: 0 },
      { text: 'Simple 4-digit PIN', score: 1 },
      { text: '6-digit PIN or pattern', score: 2 },
      { text: 'Biometric (fingerprint/face) plus strong PIN', score: 3 },
    ],
  },
];

export const getSecurityLevel = (score: number): SecurityLevel => {
  const maxScore = securityQuestions.length * 3;
  const percentage = (score / maxScore) * 100;

  if (percentage < 40) {
    return {
      level: 'low',
      title: 'Needs Improvement',
      description: 'Your current security practices leave you vulnerable to common cyber threats. Don\'t worry - with a few simple changes, you can significantly improve your protection.',
      recommendations: [
        'Start using a password manager to create unique passwords',
        'Enable two-factor authentication on your email and banking',
        'Be extremely cautious with links in emails and messages',
        'Update your devices and apps as soon as updates are available',
        'Take our beginner courses to learn the fundamentals',
      ],
    };
  } else if (percentage < 70) {
    return {
      level: 'medium',
      title: 'Getting There',
      description: 'You have some good security habits, but there\'s room for improvement. Focus on the areas where you can strengthen your defenses.',
      recommendations: [
        'Expand two-factor authentication to more accounts',
        'Consider using a VPN for public WiFi',
        'Review your social media privacy settings',
        'Set up automatic backups for important data',
        'Take our intermediate courses to level up',
      ],
    };
  } else {
    return {
      level: 'high',
      title: 'Security Pro',
      description: 'Excellent! You\'re following best practices and taking your digital security seriously. Stay vigilant and keep learning about new threats.',
      recommendations: [
        'Stay updated on the latest security threats',
        'Consider helping friends and family improve their security',
        'Explore our advanced courses for deeper knowledge',
        'Set up a family security code for emergencies',
        'Regularly audit your accounts and remove unused ones',
      ],
    };
  }
};

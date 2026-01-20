export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  modules: number;
  lessons: number;
  image: string;
  topics: string[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  content: string;
  tips: string[];
  order: number;
}

export const courses: Course[] = [
  {
    id: 'password-security',
    title: 'Password Security Fundamentals',
    description: 'Learn how to create strong passwords, use password managers, and protect your accounts from unauthorized access.',
    level: 'beginner',
    duration: '2 hours',
    modules: 3,
    lessons: 9,
    image: '/placeholder.svg',
    topics: ['Password Creation', 'Password Managers', 'Two-Factor Authentication'],
  },
  {
    id: 'phishing-awareness',
    title: 'Phishing Attack Prevention',
    description: 'Identify and avoid phishing emails, fake websites, and social engineering attacks that target your personal information.',
    level: 'beginner',
    duration: '1.5 hours',
    modules: 2,
    lessons: 6,
    image: '/placeholder.svg',
    topics: ['Email Phishing', 'Fake Websites', 'Social Engineering'],
  },
  {
    id: 'online-privacy',
    title: 'Online Privacy Protection',
    description: 'Understand how your data is collected online and learn practical steps to protect your privacy while browsing.',
    level: 'intermediate',
    duration: '3 hours',
    modules: 4,
    lessons: 12,
    image: '/placeholder.svg',
    topics: ['Browser Privacy', 'Social Media', 'Data Protection', 'VPNs'],
  },
  {
    id: 'mobile-security',
    title: 'Mobile Device Security',
    description: 'Secure your smartphone and tablet from malware, theft, and unauthorized access with these essential practices.',
    level: 'intermediate',
    duration: '2 hours',
    modules: 3,
    lessons: 8,
    image: '/placeholder.svg',
    topics: ['App Security', 'Device Lock', 'Public WiFi'],
  },
  {
    id: 'social-media-safety',
    title: 'Social Media Safety',
    description: 'Navigate social media platforms safely, protect your personal information, and recognize online scams.',
    level: 'beginner',
    duration: '1.5 hours',
    modules: 2,
    lessons: 6,
    image: '/placeholder.svg',
    topics: ['Privacy Settings', 'Safe Sharing', 'Scam Recognition'],
  },
  {
    id: 'advanced-threats',
    title: 'Advanced Cyber Threats',
    description: 'Deep dive into ransomware, advanced persistent threats, and sophisticated attack methods targeting individuals.',
    level: 'advanced',
    duration: '4 hours',
    modules: 5,
    lessons: 15,
    image: '/placeholder.svg',
    topics: ['Ransomware', 'APTs', 'Zero-Day Exploits', 'Incident Response'],
  },
];

export const modules: Module[] = [
  // Password Security Course
  { id: 'ps-m1', courseId: 'password-security', title: 'Creating Strong Passwords', description: 'Learn the fundamentals of creating unbreakable passwords', order: 1 },
  { id: 'ps-m2', courseId: 'password-security', title: 'Password Management Tools', description: 'Master the use of password managers', order: 2 },
  { id: 'ps-m3', courseId: 'password-security', title: 'Multi-Factor Authentication', description: 'Add extra layers of security to your accounts', order: 3 },
  
  // Phishing Awareness Course
  { id: 'pa-m1', courseId: 'phishing-awareness', title: 'Recognizing Phishing Emails', description: 'Spot the red flags in suspicious emails', order: 1 },
  { id: 'pa-m2', courseId: 'phishing-awareness', title: 'Safe Browsing Practices', description: 'Navigate the web without falling for scams', order: 2 },
];

export const lessons: Lesson[] = [
  // Password Security - Module 1
  {
    id: 'ps-l1',
    moduleId: 'ps-m1',
    courseId: 'password-security',
    title: 'Why Strong Passwords Matter',
    description: 'Understand the importance of password security in protecting your digital life.',
    duration: '10 min',
    videoUrl: 'https://example.com/video1',
    content: `
# Why Strong Passwords Matter

In today's digital world, passwords are the first line of defense protecting your personal information, financial accounts, and digital identity.

## The Problem with Weak Passwords

Every year, millions of accounts are compromised due to weak passwords. Hackers use sophisticated tools that can:

- **Brute force attacks**: Try millions of password combinations per second
- **Dictionary attacks**: Use common words and phrases
- **Credential stuffing**: Use passwords leaked from other breaches

## Real-World Impact

When your password is compromised, attackers can:
- Access your email and reset passwords on other accounts
- Steal your financial information
- Impersonate you on social media
- Access sensitive work documents

## What Makes a Strong Password?

A strong password should be:
1. At least 12 characters long
2. A mix of uppercase, lowercase, numbers, and symbols
3. Not based on personal information
4. Unique for each account
    `,
    tips: [
      'Never reuse passwords across different accounts',
      'Use a passphrase like "Coffee@Morning7Days!" instead of simple words',
      'Change passwords immediately if you suspect a breach',
    ],
    order: 1,
  },
  {
    id: 'ps-l2',
    moduleId: 'ps-m1',
    courseId: 'password-security',
    title: 'Creating Memorable Strong Passwords',
    description: 'Techniques for creating passwords that are both strong and easy to remember.',
    duration: '15 min',
    videoUrl: 'https://example.com/video2',
    content: `
# Creating Memorable Strong Passwords

The biggest challenge with strong passwords is remembering them. Here are proven techniques to create passwords that are both secure and memorable.

## The Passphrase Method

Instead of a random string, use a phrase:
- Think of a sentence: "I drink 3 cups of coffee every morning!"
- Convert to password: "Id3cocEM!"

## The Substitution Method

Take a memorable phrase and substitute:
- Original: "My dog Buddy was born in 2015"
- Password: "MdBwb@2015!"

## The Story Method

Create a mini-story with symbols:
- "2 cats + 1 dog = chaos!"
- Password: "2c+1d=Chaos!"
    `,
    tips: [
      'Use the first letters of a memorable sentence',
      'Add numbers that mean something to you (but not birthdays)',
      'Include special characters in predictable positions you can remember',
    ],
    order: 2,
  },
  {
    id: 'ps-l3',
    moduleId: 'ps-m2',
    courseId: 'password-security',
    title: 'Introduction to Password Managers',
    description: 'Learn why password managers are essential for modern digital security.',
    duration: '12 min',
    videoUrl: 'https://example.com/video3',
    content: `
# Introduction to Password Managers

Password managers are secure digital vaults that store and manage all your passwords in one place.

## Why Use a Password Manager?

- **Generate strong passwords**: Create unique, complex passwords for every account
- **Store securely**: Encrypted storage protects your credentials
- **Auto-fill**: Quickly log in to websites and apps
- **Sync across devices**: Access your passwords anywhere

## How Password Managers Work

1. You create one master password
2. The manager encrypts all stored passwords
3. Only you can decrypt with your master password
4. Passwords are filled automatically when needed
    `,
    tips: [
      'Choose a reputable password manager like Bitwarden, 1Password, or LastPass',
      'Make your master password extremely strong - it protects everything',
      'Enable two-factor authentication on your password manager',
    ],
    order: 1,
  },
  // Phishing Awareness - Module 1
  {
    id: 'pa-l1',
    moduleId: 'pa-m1',
    courseId: 'phishing-awareness',
    title: 'What is Phishing?',
    description: 'Understand the basics of phishing attacks and how they target victims.',
    duration: '8 min',
    videoUrl: 'https://example.com/video4',
    content: `
# What is Phishing?

Phishing is a type of cyber attack where criminals attempt to trick you into revealing sensitive information by pretending to be a trustworthy entity.

## Types of Phishing

- **Email Phishing**: Fake emails that look like they're from legitimate companies
- **Spear Phishing**: Targeted attacks using personal information about you
- **Smishing**: Phishing via SMS text messages
- **Vishing**: Voice phishing over phone calls

## Common Targets

Phishers typically want:
- Login credentials
- Credit card numbers
- Social Security numbers
- Bank account information
    `,
    tips: [
      'Never click links in unexpected emails - go directly to the website',
      'Check the sender\'s email address carefully for misspellings',
      'Legitimate companies never ask for passwords via email',
    ],
    order: 1,
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getModulesByCourseId = (courseId: string): Module[] => {
  return modules.filter(module => module.courseId === courseId);
};

export const getLessonsByModuleId = (moduleId: string): Lesson[] => {
  return lessons.filter(lesson => lesson.moduleId === moduleId);
};

export const getLessonsByCourseId = (courseId: string): Lesson[] => {
  return lessons.filter(lesson => lesson.courseId === courseId);
};

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find(lesson => lesson.id === id);
};

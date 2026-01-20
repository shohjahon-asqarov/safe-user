export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  passingScore: number; // percentage
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    id: 'security-basics',
    title: 'Cyber Security Basics',
    description: 'Test your knowledge of fundamental cyber security concepts.',
    timeLimit: 10,
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        question: 'What is the minimum recommended length for a strong password?',
        options: ['6 characters', '8 characters', '12 characters', '4 characters'],
        correctAnswer: 2,
        explanation: 'Security experts recommend passwords of at least 12 characters to resist brute force attacks.',
      },
      {
        id: 'q2',
        question: 'Which of the following is a sign of a phishing email?',
        options: [
          'Email from your bank with your full name',
          'Urgent request to verify your account by clicking a link',
          'Newsletter you subscribed to',
          'Email from a known colleague about a meeting',
        ],
        correctAnswer: 1,
        explanation: 'Urgency and requests to click links for "verification" are classic phishing tactics.',
      },
      {
        id: 'q3',
        question: 'What does two-factor authentication (2FA) provide?',
        options: [
          'Two passwords for one account',
          'An extra layer of security beyond just a password',
          'Access to two accounts at once',
          'Two attempts to enter your password',
        ],
        correctAnswer: 1,
        explanation: '2FA adds a second verification step (like a code sent to your phone) beyond your password.',
      },
      {
        id: 'q4',
        question: 'What should you do if you receive an email asking for your password?',
        options: [
          'Reply with your password if it looks official',
          'Click the link and enter your password',
          'Never share your password - legitimate companies never ask for it via email',
          'Forward it to your friends to check',
        ],
        correctAnswer: 2,
        explanation: 'No legitimate organization will ever ask for your password via email. This is always a scam.',
      },
      {
        id: 'q5',
        question: 'Which is the safest way to connect to the internet in a coffee shop?',
        options: [
          'Use the free public WiFi directly',
          'Use a VPN while connected to public WiFi',
          'Ask someone nearby for their hotspot password',
          'Assume the WiFi is safe because the cafe is trustworthy',
        ],
        correctAnswer: 1,
        explanation: 'A VPN encrypts your connection, protecting your data even on unsecured public networks.',
      },
      {
        id: 'q6',
        question: 'What is a password manager?',
        options: [
          'A person who manages your passwords for you',
          'A secure tool that stores and generates strong passwords',
          'A website that checks if your password is strong',
          'An app that shares passwords with your friends',
        ],
        correctAnswer: 1,
        explanation: 'Password managers securely store all your passwords and can generate strong, unique passwords for each account.',
      },
      {
        id: 'q7',
        question: 'Which of these passwords is the strongest?',
        options: [
          'password123',
          'MyDog2020',
          'Tr0ub4dor&3',
          'correct-horse-battery-staple',
        ],
        correctAnswer: 3,
        explanation: 'Long passphrases with random words are very strong because they\'re long and hard to guess, yet memorable.',
      },
      {
        id: 'q8',
        question: 'What should you do before clicking a link in an email?',
        options: [
          'Click it immediately to see where it goes',
          'Hover over it to see the actual URL destination',
          'Forward it to a friend first',
          'Delete all emails with links',
        ],
        correctAnswer: 1,
        explanation: 'Hovering over a link reveals its true destination, helping you spot suspicious URLs before clicking.',
      },
      {
        id: 'q9',
        question: 'How often should you update your software and operating system?',
        options: [
          'Never - updates cause problems',
          'Once a year',
          'As soon as updates are available',
          'Only when something breaks',
        ],
        correctAnswer: 2,
        explanation: 'Updates often contain security patches for newly discovered vulnerabilities. Install them promptly.',
      },
      {
        id: 'q10',
        question: 'What is the best practice for sharing sensitive information?',
        options: [
          'Post it on social media for convenience',
          'Send it via unencrypted email',
          'Use encrypted communication channels',
          'Write it on a sticky note',
        ],
        correctAnswer: 2,
        explanation: 'Encrypted channels ensure only the intended recipient can read sensitive information.',
      },
    ],
  },
];

export const getQuizById = (id: string): Quiz | undefined => {
  return quizzes.find(quiz => quiz.id === id);
};

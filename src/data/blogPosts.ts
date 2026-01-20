export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'alert' | 'tip' | 'news' | 'guide';
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'new-phishing-scam-2024',
    title: 'New Phishing Scam Targeting Bank Customers',
    excerpt: 'A sophisticated phishing campaign is impersonating major banks. Learn how to identify and protect yourself.',
    content: `
# New Phishing Scam Targeting Bank Customers

A new wave of phishing attacks has been detected targeting customers of major banks. These attacks are particularly sophisticated and have already claimed thousands of victims.

## How the Scam Works

1. **Initial Contact**: Victims receive an email or SMS that appears to be from their bank
2. **Urgency Tactics**: The message claims there's a problem with the account that needs immediate attention
3. **Fake Website**: A link leads to a convincing replica of the bank's website
4. **Data Theft**: When victims log in, their credentials are stolen

## Red Flags to Watch For

- Unexpected messages about account problems
- Pressure to act immediately
- Links that don't match the official bank URL
- Requests for sensitive information

## How to Protect Yourself

- Never click links in unexpected messages
- Always go directly to your bank's official website
- Call your bank using the number on your card if unsure
- Enable account alerts for suspicious activity
    `,
    category: 'alert',
    date: '2024-01-15',
    readTime: '4 min',
    image: '/placeholder.svg',
    featured: true,
  },
  {
    id: 'password-manager-guide',
    title: 'Complete Guide to Choosing a Password Manager',
    excerpt: 'Compare the top password managers and find the best one for your needs.',
    content: `
# Complete Guide to Choosing a Password Manager

With dozens of password managers available, choosing the right one can be overwhelming. This guide will help you make an informed decision.

## Top Password Managers Compared

### 1. Bitwarden
- **Pros**: Open source, free tier available, great security
- **Cons**: Interface less polished than competitors
- **Best for**: Privacy-conscious users, budget-friendly option

### 2. 1Password
- **Pros**: Excellent design, family sharing, travel mode
- **Cons**: No free tier
- **Best for**: Families, business users

### 3. LastPass
- **Pros**: User-friendly, browser integration
- **Cons**: Recent security concerns
- **Best for**: Beginners

## Key Features to Consider

1. **Security**: End-to-end encryption is essential
2. **Cross-platform**: Should work on all your devices
3. **Ease of use**: You should actually use it
4. **Price**: Free to $5/month typically
    `,
    category: 'guide',
    date: '2024-01-10',
    readTime: '6 min',
    image: '/placeholder.svg',
  },
  {
    id: 'tax-season-scams',
    title: 'Tax Season Scam Alert: IRS Impersonation Surge',
    excerpt: 'Scammers are ramping up IRS impersonation attacks. Here\'s what you need to know.',
    content: `
# Tax Season Scam Alert: IRS Impersonation Surge

As tax season approaches, cybercriminals are increasing their efforts to impersonate the IRS and steal personal information.

## Common Tax Scam Tactics

- Emails claiming you owe back taxes
- Calls threatening arrest for unpaid taxes
- Fake refund notifications
- Requests for gift card payments

## Remember

The IRS will NEVER:
- Demand immediate payment via gift cards
- Threaten to arrest you over the phone
- Request credit card information via email
- Send unsolicited emails about refunds

## What to Do

If you receive a suspicious IRS communication:
1. Don't respond or click any links
2. Report it to phishing@irs.gov
3. Check irs.gov directly for any legitimate issues
    `,
    category: 'alert',
    date: '2024-01-08',
    readTime: '3 min',
    image: '/placeholder.svg',
    featured: true,
  },
  {
    id: 'wifi-security-tips',
    title: '5 Essential Tips for Secure Public WiFi Use',
    excerpt: 'Stay safe when connecting to coffee shop, airport, and hotel WiFi networks.',
    content: `
# 5 Essential Tips for Secure Public WiFi Use

Public WiFi is convenient but comes with significant security risks. Here's how to protect yourself.

## 1. Use a VPN

A Virtual Private Network encrypts all your internet traffic, making it unreadable to hackers on the same network.

## 2. Verify the Network

Confirm the exact network name with staff. Hackers often create fake networks with similar names.

## 3. Avoid Sensitive Activities

Don't access banking or enter passwords when possible on public WiFi.

## 4. Enable Firewall

Your device's firewall adds an extra layer of protection against unwanted connections.

## 5. Forget the Network

After using public WiFi, remove it from your saved networks to prevent automatic reconnection.
    `,
    category: 'tip',
    date: '2024-01-05',
    readTime: '4 min',
    image: '/placeholder.svg',
  },
  {
    id: 'ai-voice-scams',
    title: 'AI Voice Cloning: The New Frontier of Phone Scams',
    excerpt: 'Criminals are using AI to clone voices of family members. Learn how to protect yourself.',
    content: `
# AI Voice Cloning: The New Frontier of Phone Scams

Artificial intelligence can now clone someone's voice with just a few seconds of audio. Scammers are using this technology to impersonate your loved ones.

## How It Works

1. Scammers find audio of your family member (social media, voicemail)
2. AI creates a convincing voice clone
3. You receive a call that sounds exactly like your relative
4. They claim an emergency and need money immediately

## Protection Strategies

- Establish a family code word for emergencies
- Always call back on a known number
- Ask questions only the real person would know
- Be suspicious of requests for wire transfers or gift cards

## Warning Signs

- Unusual payment requests
- Pressure to act immediately
- Request for secrecy
- Call from unknown number
    `,
    category: 'news',
    date: '2024-01-03',
    readTime: '5 min',
    image: '/placeholder.svg',
    featured: true,
  },
  {
    id: 'update-devices',
    title: 'Why Software Updates Are Your Best Security Defense',
    excerpt: 'Those annoying update notifications could be protecting you from hackers.',
    content: `
# Why Software Updates Are Your Best Security Defense

It's tempting to click "remind me later" on software updates, but this habit could leave you vulnerable to attacks.

## What Updates Actually Do

- Patch known security vulnerabilities
- Fix bugs that could be exploited
- Improve performance and stability
- Add new security features

## The Risk of Outdated Software

Hackers specifically target known vulnerabilities in old software because:
- The exploits are publicly documented
- Many users delay updates
- Automated tools can scan for vulnerable systems

## Best Practices

1. Enable automatic updates when possible
2. Update as soon as patches are released
3. Don't forget about apps, not just the OS
4. Replace unsupported software
    `,
    category: 'tip',
    date: '2024-01-01',
    readTime: '3 min',
    image: '/placeholder.svg',
  },
];

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostsByCategory = (category: BlogPost['category']): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

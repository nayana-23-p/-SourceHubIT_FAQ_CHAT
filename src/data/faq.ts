import { FAQ } from '../types';

export const faqData: FAQ[] = [
  {
    id: '1',
    question: 'What are your business hours?',
    answer: 'Our business hours are Monday to Friday, 9:00 AM to 6:00 PM EST. We\'re closed on weekends and major holidays.',
    category: 'General',
    keywords: ['hours', 'time', 'open', 'closed', 'schedule', 'business']
  },
  {
    id: '2',
    question: 'How can I contact customer support?',
    answer: 'You can reach our customer support team via email at support@company.com, phone at 1-800-123-4567, or through our live chat feature available 24/7.',
    category: 'Support',
    keywords: ['contact', 'support', 'help', 'phone', 'email', 'chat']
  },
  {
    id: '3',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all items. Products must be in original condition with tags attached. Return shipping is free for defective items.',
    category: 'Returns',
    keywords: ['return', 'refund', 'exchange', 'policy', 'money back', 'defective']
  },
  {
    id: '4',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. International orders may take 7-14 business days.',
    category: 'Shipping',
    keywords: ['shipping', 'delivery', 'fast', 'express', 'international', 'time']
  },
  {
    id: '5',
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. Some restrictions may apply.',
    category: 'Shipping',
    keywords: ['international', 'worldwide', 'global', 'countries', 'overseas']
  },
  {
    id: '6',
    question: 'How do I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account on our website.',
    category: 'Orders',
    keywords: ['track', 'tracking', 'order', 'status', 'shipment', 'delivery']
  },
  {
    id: '7',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers.',
    category: 'Payment',
    keywords: ['payment', 'credit card', 'paypal', 'apple pay', 'google pay', 'bank']
  },
  {
    id: '8',
    question: 'Is my personal information secure?',
    answer: 'Absolutely! We use industry-standard SSL encryption and never store your payment information. Your data is protected with bank-level security.',
    category: 'Security',
    keywords: ['security', 'safe', 'secure', 'privacy', 'data', 'ssl', 'encryption']
  },
  {
    id: '9',
    question: 'Can I modify or cancel my order?',
    answer: 'You can modify or cancel your order within 1 hour of placing it. After that, please contact customer support for assistance.',
    category: 'Orders',
    keywords: ['modify', 'cancel', 'change', 'order', 'edit', 'update']
  },
  {
    id: '10',
    question: 'Do you have a mobile app?',
    answer: 'Yes! Our mobile app is available for both iOS and Android. Download it from the App Store or Google Play Store for a better shopping experience.',
    category: 'Technology',
    keywords: ['mobile', 'app', 'ios', 'android', 'download', 'phone']
  },
  {
    id: '11',
    question: 'How do I create an account?',
    answer: 'Click the "Sign Up" button in the top right corner, enter your email and create a password. You can also sign up using your Google or Facebook account.',
    category: 'Account',
    keywords: ['account', 'sign up', 'register', 'create', 'login', 'password']
  },
  {
    id: '12',
    question: 'What if I forgot my password?',
    answer: 'Click "Forgot Password" on the login page and enter your email. We\'ll send you a reset link to create a new password.',
    category: 'Account',
    keywords: ['password', 'forgot', 'reset', 'login', 'access', 'recover']
  }
];

export const categories = Array.from(new Set(faqData.map(faq => faq.category)));
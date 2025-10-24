"use client"

import { useEffect } from 'react';

/**
 * Developer Console Message
 * Displays a professional message in browser console
 */
export default function DevConsoleMessage() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Console styling
    const styles = {
      title: 'color: #e11d48; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);',
      subtitle: 'color: #64748b; font-size: 14px; font-weight: normal;',
      info: 'color: #0ea5e9; font-size: 12px;',
      tech: 'color: #10b981; font-size: 11px;',
      warning: 'color: #f59e0b; font-size: 12px; font-weight: bold;',
      link: 'color: #8b5cf6; font-size: 12px;',
    };

    console.clear();
    console.log('%c🌟 DEECEE HAIR', styles.title);
    console.log('%cPremium Hair Extensions E-Commerce Platform', styles.subtitle);
    console.log('\n');

    console.log('%c💻 Developer Information', styles.info);
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.subtitle);
    console.log('%cBuilt with ❤️ by: Deepak', styles.info);
    console.log('%cGitHub: https://github.com/Deepak5310', styles.link);
    console.log('%cLinkedIn: https://www.linkedin.com/in/deepak-dev5310', styles.link);
    console.log('\n');

    console.log('%c🚀 Tech Stack', styles.info);
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.subtitle);
    console.log('%c• Next.js 15 (App Router)', styles.tech);
    console.log('%c• React 19', styles.tech);
    console.log('%c• TypeScript', styles.tech);
    console.log('%c• Tailwind CSS 4', styles.tech);
    console.log('%c• Firebase (Auth & Firestore)', styles.tech);
    console.log('%c• PhonePe Payment Gateway', styles.tech);
    console.log('%c• SendGrid Email Service', styles.tech);
    console.log('\n');

    console.log('%c✨ Features', styles.info);
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.subtitle);
    console.log('%c✓ Dual Authentication (User + Admin)', styles.tech);
    console.log('%c✓ UPI Payment Integration', styles.tech);
    console.log('%c✓ Real-time Order Management', styles.tech);
    console.log('%c✓ Wishlist & Cart System', styles.tech);
    console.log('%c✓ Admin Dashboard', styles.tech);
    console.log('%c✓ Email Notifications', styles.tech);
    console.log('\n');

    console.log('%c⚠️ Security Notice', styles.warning);
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.subtitle);
    console.log('%cThis site uses Firebase Authentication and encrypted payments.', styles.info);
    console.log('%cNever share your credentials or payment information.', styles.info);
    console.log('\n');

    console.log('%c📧 Contact Developer', styles.info);
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.subtitle);
    console.log('%cInterested in similar projects?', styles.info);
    console.log('%cFeel free to reach out on GitHub or LinkedIn!', styles.info);
    console.log('\n');

    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.subtitle);
    console.log('\n');

    // Easter egg
    console.log(
      '%cLooking for developers? 👀',
      'color: #e11d48; font-size: 16px; font-weight: bold; background: #fff1f2; padding: 8px 12px; border-radius: 4px; border: 2px solid #e11d48;'
    );
    console.log(
      '%cI\'m available for freelance projects!',
      'color: #0ea5e9; font-size: 14px; font-weight: bold;'
    );
  }, []);

  return null; // This component doesn't render anything
}

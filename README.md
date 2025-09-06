# Anonyread

A React-based blogging platform with client-side encryption that ensures your content remains private and secure. Write posts that only you can decrypt with your private key.
Features

    🔒 End-to-End Encryption: All content is encrypted locally before storage
    🗝️ Key Management: Secure generation and export of cryptographic keys
    📱 Modern UI: Clean, responsive interface built with Tailwind CSS
    🔐 Zero-Knowledge Architecture: Your private keys never leave your device
    💾 Local Storage: Posts are stored locally in your browser

How It Works

- Write your content in the secure editor
- The system generates a unique cryptographic key pair for your post
- Your content is encrypted with your public key before storage
- Your private key is displayed for you to save securely
- Only someone with your private key can decrypt and read your content

Tech Stack

1. React.js
2. Web Crypto API for encryption
3. Tailwind CSS for styling
4. Supabase for data persistence

Security Notice

    This project is for educational purposes. Always consult security professionals before using encryption software for sensitive communications.
    This response is AI-generated, for reference only.
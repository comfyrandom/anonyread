import { useState } from 'react';

// Service for cryptographic operations using Web Crypto API
export const useCrypto = () => {
    const [keyPair, setKeyPair] = useState(null);

    // Generate ECDH key pair (much shorter than RSA)
    const generateKeyPair = async () => {
        try {
            const keyPair = await window.crypto.subtle.generateKey(
                {
                    name: "ECDH",
                    namedCurve: "P-256", // Much shorter keys (256 bits vs 2048 bits)
                },
                true,
                ["deriveKey", "deriveBits"]
            );

            setKeyPair(keyPair);
            return keyPair;
        } catch (error) {
            console.error("Key generation error:", error);
            throw error;
        }
    };

    // Export public key as base64 string (much shorter than RSA)
    const exportPublicKey = async (keyPair) => {
        try {
            const publicKey = await window.crypto.subtle.exportKey("raw", keyPair.publicKey);
            return arrayBufferToBase64(publicKey);
        } catch (error) {
            console.error("Public key export error:", error);
            throw error;
        }
    };

    // Export private key as base64 string
    const exportPrivateKey = async (keyPair) => {
        try {
            const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
            return arrayBufferToBase64(privateKey);
        } catch (error) {
            console.error("Private key export error:", error);
            throw error;
        }
    };

    // Import private key from base64 string
    const importPrivateKey = async (base64Key) => {
        try {
            const binaryKey = base64ToArrayBuffer(base64Key);
            return await window.crypto.subtle.importKey(
                "pkcs8",
                binaryKey,
                {
                    name: "ECDH",
                    namedCurve: "P-256",
                },
                true,
                ["deriveKey", "deriveBits"]
            );
        } catch (error) {
            console.error("Private key import error:", error);
            throw error;
        }
    };

    // Import public key from base64 string
    const importPublicKey = async (base64Key) => {
        try {
            const binaryKey = base64ToArrayBuffer(base64Key);
            return await window.crypto.subtle.importKey(
                "raw",
                binaryKey,
                {
                    name: "ECDH",
                    namedCurve: "P-256",
                },
                true,
                []
            );
        } catch (error) {
            console.error("Public key import error:", error);
            throw error;
        }
    };

    // Encrypt content using public key (ECDH + AES-GCM)
    const encryptContent = async (content, publicKeyBase64) => {
        try {
            // Generate ephemeral key pair for ECDH
            const ephemeralKeyPair = await window.crypto.subtle.generateKey(
                {
                    name: "ECDH",
                    namedCurve: "P-256",
                },
                true,
                ["deriveKey"]
            );

            // Import recipient's public key
            const recipientPublicKey = await importPublicKey(publicKeyBase64);

            // Derive shared secret using ECDH
            const sharedSecret = await window.crypto.subtle.deriveKey(
                {
                    name: "ECDH",
                    public: recipientPublicKey,
                },
                ephemeralKeyPair.privateKey,
                {
                    name: "AES-GCM",
                    length: 256,
                },
                true,
                ["encrypt"]
            );

            // Generate IV
            const iv = window.crypto.getRandomValues(new Uint8Array(12));

            // Convert content to Uint8Array
            const encoder = new TextEncoder();
            const data = encoder.encode(content);

            // Encrypt with AES-GCM
            const encrypted = await window.crypto.subtle.encrypt(
                {
                    name: "AES-GCM",
                    iv: iv,
                },
                sharedSecret,
                data
            );

            // Export ephemeral public key
            const ephemeralPublicKey = await window.crypto.subtle.exportKey(
                "raw",
                ephemeralKeyPair.publicKey
            );

            // Combine IV, ephemeral public key, and encrypted data
            const result = {
                iv: arrayBufferToBase64(iv),
                ephemeralPublicKey: arrayBufferToBase64(ephemeralPublicKey),
                encryptedData: arrayBufferToBase64(encrypted)
            };

            return btoa(JSON.stringify(result));
        } catch (error) {
            console.error("Encryption error:", error);
            throw error;
        }
    };

    // Decrypt content using private key
    const decryptContent = async (encryptedContentBase64, privateKey) => {
        try {
            // Parse the encrypted content
            const encryptedData = JSON.parse(atob(encryptedContentBase64));

            // Import ephemeral public key
            const ephemeralPublicKey = await importPublicKey(encryptedData.ephemeralPublicKey);

            // Derive shared secret using ECDH
            const sharedSecret = await window.crypto.subtle.deriveKey(
                {
                    name: "ECDH",
                    public: ephemeralPublicKey,
                },
                privateKey,
                {
                    name: "AES-GCM",
                    length: 256,
                },
                true,
                ["decrypt"]
            );

            // Convert IV and encrypted data from base64
            const iv = base64ToArrayBuffer(encryptedData.iv);
            const encrypted = base64ToArrayBuffer(encryptedData.encryptedData);

            // Decrypt with AES-GCM
            const decrypted = await window.crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: iv,
                },
                sharedSecret,
                encrypted
            );

            // Convert decrypted data to string
            const decoder = new TextDecoder();
            return decoder.decode(decrypted);
        } catch (error) {
            console.error("Decryption error:", error);
            throw error;
        }
    };

    // Helper functions
    const arrayBufferToBase64 = (buffer) => {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    const base64ToArrayBuffer = (base64) => {
        const binaryString = window.atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };

    return {
        generateKeyPair,
        exportPublicKey,
        exportPrivateKey,
        importPrivateKey,
        importPublicKey,
        encryptContent,
        decryptContent,
        keyPair
    };
};
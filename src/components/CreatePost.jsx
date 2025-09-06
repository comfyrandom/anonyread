import React, { useState, useEffect } from 'react';
import { useCrypto } from '../services/cryptoService';
import { storageService } from '../services/storageService';
import KeyDisplayModal from './KeyDisplayModal';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [privateKey, setPrivateKey] = useState(null);
    const [postId, setPostId] = useState(null);
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [message, setMessage] = useState('');
    const { generateKeyPair, exportPublicKey, exportPrivateKey, encryptContent } = useCrypto();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsGenerating(true);
        setMessage('');

        try {
            // Generate key pair
            const keyPair = await generateKeyPair();

            // Export keys
            const publicKey = await exportPublicKey(keyPair);
            const privateKey = await exportPrivateKey(keyPair);

            // Encrypt content
            const encryptedContent = await encryptContent(content, publicKey);

            // Use existing postId if editing, otherwise generate a new one
            const finalPostId = Date.now().toString();

            // Save to storage
            const success = storageService.savePost(finalPostId, encryptedContent, publicKey);

            if (success) {
                setPrivateKey(privateKey);
                setShowKeyModal(true);
                setPostId(finalPostId);
                setMessage('Post created successfully! Please save your private key.');
            } else {
                setMessage('Failed to save post. Please try again.');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            setMessage('An error occurred while creating the post. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif font-bold text-slate-800 mb-3">
                        {'Create New Encrypted Post'}
                    </h1>
                    <p className="text-slate-600 font-light">
                        {'Write securely with end-to-end encryption'}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-2 font-serif">
                                Your Story
                            </label>
                            <div className="relative">
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows="12"
                                    className="w-full px-5 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none font-serif text-slate-700 leading-relaxed"
                                    placeholder="Pour your thoughts onto the page..."
                                />
                                <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                                    {content.length} characters
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="text-sm text-slate-500">
                                Your writing is encrypted before saving
                            </div>
                            <button
                                type="submit"
                                disabled={isGenerating}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${isGenerating
                                    ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                                }`}
                            >
                                {isGenerating ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {'Encrypting...'}
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                                        </svg>
                                        {'Create Encrypted Post'}
                                    </span>
                                )}
                            </button>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-lg ${message.includes('error') || message.includes('Failed') || message.includes('not found')
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}
                            >
                                <div className="flex items-start">
                                    {message.includes('error') || message.includes('Failed') || message.includes('not found') ? (
                                        <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    )}
                                    <span>{message}</span>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>Your private key is never stored on our servers. Keep it safe to access your encrypted content.</p>
                </div>
            </div>

            {showKeyModal && (
                <KeyDisplayModal
                    postId={postId}
                    privateKey={privateKey}
                    onClose={() => setShowKeyModal(false)}
                />
            )}
        </div>
    );
};

export default CreatePost;
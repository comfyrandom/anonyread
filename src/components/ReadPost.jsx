import React, { useState, useEffect } from 'react';
import { useCrypto } from '../services/cryptoService';
import { storageService } from '../services/storageService';
import { useParams } from 'react-router-dom';

const ReadPost = () => {
    const { id: urlPostId } = useParams(); // Get post ID from URL
    const [postId, setPostId] = useState(urlPostId || '');
    const [privateKey, setPrivateKey] = useState('');
    const [decryptedContent, setDecryptedContent] = useState('');
    const [isDecrypting, setIsDecrypting] = useState(false);
    const [message, setMessage] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);
    const { importPrivateKey, decryptContent } = useCrypto();

    // Check if we have a cached key and try to auto-decrypt
    useEffect(() => {
        if (urlPostId) {
            setPostId(urlPostId);
        }
    }, [urlPostId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!postId.trim() || !privateKey.trim()) {
            setMessage('Please provide both post ID and private key');
            return;
        }

        setIsDecrypting(true);
        setMessage('');

        try {
            // Load encrypted post
            const post = await storageService.loadPost(postId);

            if (!post) {
                setMessage('Post not found with the provided ID');
                return;
            }

            // Import private key
            const importedPrivateKey = await importPrivateKey(privateKey);

            // Decrypt content
            const content = await decryptContent(post.content, importedPrivateKey);

            setDecryptedContent(content);
            setMessage('Post decrypted successfully!');

            // Cache the key for future use
        } catch (error) {
            console.error('Error decrypting post:', error);
            setMessage('Failed to decrypt post. Please check your private key and try again.');
        } finally {
            setIsDecrypting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif font-bold text-slate-800 mb-3">Read Encrypted Post</h1>
                    <p className="text-slate-600 font-light">Access your private writings with your key</p>
                </div>

                {!decryptedContent && <div
                    className={`bg-white rounded-2xl shadow-lg p-8 border border-slate-200 mb-8 transition-all duration-300 ${isMinimized ? 'max-h-32 overflow-hidden' : ''}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-serif font-semibold text-slate-800">Decrypt Post</h2>
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="text-slate-500 hover:text-slate-700 transition-colors"
                        >
                            {isMinimized ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M19 9l-7 7-7-7"></path>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M5 15l7-7 7 7"></path>
                                </svg>
                            )}
                        </button>
                    </div>

                    {!isMinimized && (
                        <>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="postId"
                                           className="block text-sm font-medium text-slate-700 mb-2 font-serif">
                                        Post ID
                                    </label>
                                    <input
                                        type="text"
                                        id="postId"
                                        value={postId}
                                        onChange={(e) => setPostId(e.target.value)}
                                        className="w-full px-5 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 font-mono"
                                        placeholder="Enter the post ID"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="privateKey"
                                           className="block text-sm font-medium text-slate-700 mb-2 font-serif">
                                        Private Key
                                    </label>
                                    <textarea
                                        id="privateKey"
                                        value={privateKey}
                                        onChange={(e) => setPrivateKey(e.target.value)}
                                        rows="4"
                                        className="w-full px-5 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 font-mono text-sm"
                                        placeholder="Paste your private key here"
                                    />
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <button
                                        type="submit"
                                        disabled={isDecrypting}
                                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${isDecrypting
                                            ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                                        }`}
                                    >
                                        {isDecrypting ? (
                                            <span className="flex items-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                                            stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor"
                                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Decrypting...
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                                                </svg>
                                                Decrypt Post
                                            </span>
                                        )}
                                    </button>
                                </div>

                                {message && (
                                    <div
                                        className={`p-4 rounded-lg ${message.includes('Failed') || message.includes('not found')
                                            ? 'bg-red-50 text-red-700 border border-red-200'
                                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}
                                    >
                                        <div className="flex items-start">
                                            {message.includes('Failed') || message.includes('not found') ? (
                                                <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none"
                                                     stroke="currentColor" viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none"
                                                     stroke="currentColor" viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            )}
                                            <span>{message}</span>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </>
                    )}
                </div>}

                {decryptedContent && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                        <div
                            className="prose max-w-none font-serif text-slate-700 leading-relaxed indent-6 space-y-2 text-lg"
                            dangerouslySetInnerHTML={{ __html: decryptedContent }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReadPost;
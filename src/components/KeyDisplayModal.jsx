import React, { useState } from 'react';

const KeyDisplayModal = ({ postId, privateKey, onClose }) => {
    const [showCopiedNotification, setShowCopiedNotification] = useState(false);
    const [isKeyRevealed, setIsKeyRevealed] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(privateKey);
        setShowCopiedNotification(true);
        setTimeout(() => setShowCopiedNotification(false), 2000);
    };

    // Construct the read URL with hash routing
    const readUrl = `${window.location.origin}${window.location.pathname}#/read/${postId}`;

    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            {/* Copy Notification */}
            {showCopiedNotification && (
                <div className="fixed top-4 right-4 bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center animate-fade-in-out z-50">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Private key copied to clipboard!</span>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white relative">
                    <div className="absolute top-4 right-4 bg-white/20 p-1.5 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold">
                        Save Your Private Key
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">Keep this key safe to access your content later</p>
                </div>

                <div className="p-6">
                    {/* Warning Alert */}
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-amber-700">
                                    <strong>This is your only chance to save your private key.</strong> Without it, you won't be able to decrypt your post later.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Post Link */}
                    {postId && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Post Link
                            </label>
                            <div className="flex items-center bg-slate-100 rounded-lg p-3">
                                <a
                                    href={readUrl}
                                    className="font-mono text-xs text-indigo-600 hover:text-indigo-800 truncate flex-1 underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Open post link"
                                >
                                    {readUrl}
                                </a>
                                <button
                                    onClick={() => navigator.clipboard.writeText(readUrl)}
                                    className="text-slate-500 hover:text-indigo-600 transition-colors duration-200 ml-2 p-1.5 rounded-md hover:bg-slate-200"
                                    title="Copy Post Link"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Private Key */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-slate-700">
                                Your Private Key
                            </label>
                            <button
                                onClick={() => setIsKeyRevealed(!isKeyRevealed)}
                                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center"
                            >
                                {isKeyRevealed ? (
                                    <>
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                                        </svg>
                                        Hide
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                        Reveal
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="relative bg-slate-100 rounded-lg p-4 border border-slate-200">
                            {!isKeyRevealed ? (
                                <div className="flex items-center justify-center h-32">
                                    <button
                                        onClick={() => setIsKeyRevealed(true)}
                                        className="text-slate-500 hover:text-indigo-600 flex flex-col items-center"
                                    >
                                        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                        <span className="text-sm">Click to reveal private key</span>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <textarea
                                        readOnly
                                        value={privateKey}
                                        className="w-full h-32 p-3 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm resize-none"
                                    />
                                    <div className="absolute bottom-3 right-3 text-xs text-slate-500 bg-white/80 px-2 py-1 rounded">
                                        {privateKey.length} characters
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleCopy}
                            disabled={!isKeyRevealed}
                            className={`flex items-center justify-center px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium flex-1 ${
                                isKeyRevealed
                                    ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                            </svg>
                            Copy Key
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-sm hover:shadow-md text-sm font-medium flex-1"
                        >
                            I've Saved My Key
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeyDisplayModal;
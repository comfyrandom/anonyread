import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="flex-shrink-0 flex items-center"
                        >
                            <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                            </svg>
                            <span className="ml-2 text-xl font-serif font-bold text-slate-800 hidden sm:block">Anonyread</span>
                        </Link>

                        <div className="hidden md:ml-8 md:flex md:space-x-4">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === '/'
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'}`}
                            >
                                Create Post
                            </Link>
                            <Link
                                to="/read"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === '/read'
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'}`}
                            >
                                Read Posts
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-indigo-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-200"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-100">
                        <Link
                            to="/"
                            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${location.pathname === '/'
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Create Post
                        </Link>
                        <Link
                            to="/read"
                            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${location.pathname === '/read'
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Read Posts
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
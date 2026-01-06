
import React, { useState, useEffect } from 'react';
import { UserData, ThemeMode } from './types';
import { DEFAULT_USER_DATA } from './constants';
import Header from './components/Header';
import CardPreview from './components/CardPreview';
import Editor from './components/Editor';
import { downloadVCard } from './utils/vCard';
import { 
  ArrowDownTrayIcon, 
  ShareIcon,
  PhoneIcon,
  EnvelopeIcon,
  SunIcon,
  MoonIcon,
  IdentificationIcon
} from '@heroicons/react/24/solid';

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData>(DEFAULT_USER_DATA);
  const [theme, setTheme] = useState<ThemeMode>(ThemeMode.LIGHT);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT);
    document.documentElement.classList.toggle('dark');
  };

  const handleDownloadImage = () => {
    // In a real production app, we would use html-to-image here.
    // For this implementation, we simulate the logic.
    alert("In a production environment, this would generate a high-resolution PNG of your card using html-to-image.");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${userData.fullName}'s Digital Visiting Card`,
        text: `Check out ${userData.fullName}'s digital profile!`,
        url: window.location.href,
      });
    } else {
      alert(`Link copied: ${window.location.href}`);
    }
  };

  const isDark = theme === ThemeMode.DARK;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Header Bar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? (isDark ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800' : 'bg-white/80 backdrop-blur-md border-b border-slate-200') : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center card-shadow">
              <IdentificationIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">GeminiCard<span className="text-blue-600">Pro</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-slate-900 text-yellow-400 border border-slate-800' : 'bg-white text-slate-600 border border-slate-200 shadow-sm'}`}
            >
              {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Professional Identity</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Modern, AI-enhanced digital visiting cards designed for the next generation of professionals. 
            Share your story with a single click.
          </p>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="flex md:hidden bg-slate-200 dark:bg-slate-800 p-1 rounded-2xl mb-8">
          <button 
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'editor' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
          >
            Edit Profile
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}
          >
            Live Preview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Editor Column */}
          <div className={`lg:col-span-7 ${activeTab === 'editor' ? 'block' : 'hidden md:block'}`}>
            <Editor userData={userData} setUserData={setUserData} theme={theme} />
          </div>

          {/* Preview Column */}
          <div className={`lg:col-span-5 sticky top-32 ${activeTab === 'preview' ? 'block' : 'hidden md:block'}`}>
            <div className="flex flex-col gap-8">
              <CardPreview user={userData} theme={theme} />
              
              {/* Quick Actions Card */}
              <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Action Hub</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => downloadVCard(userData)}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all card-shadow"
                  >
                    <ArrowDownTrayIcon className="w-6 h-6 mb-2" />
                    <span className="text-xs font-bold">Save Contact</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                  >
                    <ShareIcon className="w-6 h-6 mb-2 text-indigo-500" />
                    <span className="text-xs font-bold">Share Link</span>
                  </button>
                  <button 
                    onClick={handleDownloadImage}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                  >
                    <IdentificationIcon className="w-6 h-6 mb-2 text-emerald-500" />
                    <span className="text-xs font-bold">Export Image</span>
                  </button>
                  <a 
                    href={`tel:${userData.phone}`}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                  >
                    <PhoneIcon className="w-6 h-6 mb-2 text-rose-500" />
                    <span className="text-xs font-bold">One-Tap Call</span>
                  </a>
                </div>
              </div>

              {/* QR Code Sharing Card */}
              <div className={`p-8 rounded-3xl border flex flex-col items-center text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                <div className={`p-4 rounded-2xl mb-4 ${isDark ? 'bg-white' : 'bg-slate-50'}`}>
                  {/* Simplified QR Code placeholder */}
                  <div className="w-32 h-32 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://gemini-e-card.example.com')] bg-contain"></div>
                </div>
                <h4 className="text-sm font-bold mb-1">Scan to Visit</h4>
                <p className="text-xs text-slate-500">Your unique identity in a QR code</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className={`mt-20 py-12 text-center border-t transition-colors ${isDark ? 'bg-slate-950 border-slate-900 text-slate-500' : 'bg-white border-slate-100 text-slate-400'}`}>
        <p className="text-sm">© 2024 GeminiCard Pro. Powered by Google Gemini AI.</p>
        <p className="text-xs mt-2">Designed for elite networking.</p>
      </footer>
    </div>
  );
};

export default App;

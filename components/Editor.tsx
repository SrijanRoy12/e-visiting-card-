
import React, { useState } from 'react';
import { UserData, ThemeMode } from '../types';
import { generateProfessionalTagline, suggestColorTheme } from '../services/geminiService';
import { SparklesIcon, SwatchIcon } from '@heroicons/react/24/solid';

interface EditorProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  theme: ThemeMode;
}

const Editor: React.FC<EditorProps> = ({ userData, setUserData, theme }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const isDark = theme === ThemeMode.DARK;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('socials.')) {
      const socialKey = name.split('.')[1];
      setUserData(prev => ({
        ...prev,
        socials: { ...prev.socials, [socialKey]: value }
      }));
    } else {
      setUserData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAITagline = async () => {
    setIsGenerating(true);
    const tagline = await generateProfessionalTagline(userData.fullName, userData.designation, userData.company);
    setUserData(prev => ({ ...prev, tagline }));
    setIsGenerating(false);
  };

  const handleAITheme = async () => {
    setIsGenerating(true);
    const themeColor = await suggestColorTheme(userData.designation);
    setUserData(prev => ({ ...prev, themeColor }));
    setIsGenerating(false);
  };

  const inputClass = `w-full px-4 py-2.5 rounded-xl border text-sm transition-all outline-none focus:ring-2 ${
    isDark 
      ? 'bg-slate-800 border-slate-700 text-white focus:ring-blue-500/50 focus:border-blue-500' 
      : 'bg-white border-slate-200 text-slate-900 focus:ring-blue-500/20 focus:border-blue-500'
  }`;

  const labelClass = `block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`;

  return (
    <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>Personalize Card</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleAITheme}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition-all disabled:opacity-50"
          >
            <SwatchIcon className="w-3.5 h-3.5" />
            Theme AI
          </button>
          <button 
            onClick={handleAITagline}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all disabled:opacity-50"
          >
            <SparklesIcon className="w-3.5 h-3.5" />
            Tagline AI
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Full Name</label>
            <input name="fullName" value={userData.fullName} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Designation</label>
            <input name="designation" value={userData.designation} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Company</label>
            <input name="company" value={userData.company} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Theme Color</label>
            <div className="flex items-center gap-3">
              <input type="color" name="themeColor" value={userData.themeColor} onChange={handleChange} className="w-12 h-10 rounded-lg cursor-pointer bg-transparent border-none" />
              <input name="themeColor" value={userData.themeColor} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>Professional Tagline</label>
          <textarea 
            name="tagline" 
            value={userData.tagline} 
            onChange={handleChange} 
            rows={2} 
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Email Address</label>
            <input type="email" name="email" value={userData.email} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input type="tel" name="phone" value={userData.phone} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <h3 className={`text-sm font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Social Profiles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['linkedin', 'github', 'twitter', 'instagram', 'website'].map(key => (
              <div key={key}>
                <label className={labelClass}>{key}</label>
                <input 
                  name={`socials.${key}`} 
                  value={userData.socials[key as keyof typeof userData.socials] || ''} 
                  onChange={handleChange} 
                  placeholder={`yourname.${key === 'website' ? 'com' : key}`}
                  className={inputClass} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;

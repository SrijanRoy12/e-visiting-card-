
import React from 'react';
import { UserData, ThemeMode } from '../types';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  GlobeAltIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

interface CardPreviewProps {
  user: UserData;
  theme: ThemeMode;
}

const CardPreview: React.FC<CardPreviewProps> = ({ user, theme }) => {
  const isDark = theme === ThemeMode.DARK;

  return (
    <div 
      id="v-card-element"
      className={`relative w-full max-w-sm mx-auto overflow-hidden rounded-3xl transition-all duration-500 card-shadow border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
    >
      {/* Dynamic Background Banner */}
      <div 
        className="h-32 w-full transition-colors duration-500" 
        style={{ backgroundColor: user.themeColor, opacity: 0.15 }}
      ></div>

      <div className="px-8 pb-8 -mt-16">
        {/* Profile Image */}
        <div className="relative inline-block">
          <div 
            className="w-32 h-32 rounded-2xl overflow-hidden border-4 card-shadow"
            style={{ borderColor: isDark ? '#1e293b' : '#ffffff' }}
          >
            <img 
              src={user.profileImage} 
              alt={user.fullName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div 
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center"
            style={{ backgroundColor: user.themeColor }}
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6">
          <h1 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {user.fullName || 'Full Name'}
          </h1>
          <p 
            className="text-sm font-semibold uppercase tracking-wider mt-1"
            style={{ color: user.themeColor }}
          >
            {user.designation || 'Designation'} @ {user.company || 'Company'}
          </p>
          <p className={`text-sm mt-3 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {user.tagline}
          </p>
        </div>

        {/* Contact Links */}
        <div className="mt-8 space-y-4">
          <a 
            href={`tel:${user.phone}`}
            className={`flex items-center group space-x-4 p-3 rounded-xl transition-all ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}
          >
            <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'} group-hover:scale-110 transition-transform`}>
              <PhoneIcon className="w-5 h-5" style={{ color: user.themeColor }} />
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {user.phone || 'Add Phone'}
            </span>
          </a>

          <a 
            href={`mailto:${user.email}`}
            className={`flex items-center group space-x-4 p-3 rounded-xl transition-all ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}
          >
            <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'} group-hover:scale-110 transition-transform`}>
              <EnvelopeIcon className="w-5 h-5" style={{ color: user.themeColor }} />
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {user.email || 'Add Email'}
            </span>
          </a>

          {user.socials.website && (
            <a 
              href={`https://${user.socials.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center group space-x-4 p-3 rounded-xl transition-all ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}
            >
              <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'} group-hover:scale-110 transition-transform`}>
                <GlobeAltIcon className="w-5 h-5" style={{ color: user.themeColor }} />
              </div>
              <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {user.socials.website}
              </span>
            </a>
          )}
        </div>

        {/* Social Icons Grid */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-center space-x-6">
          {Object.entries(user.socials).map(([key, value]) => (
            value && key !== 'website' && (
              <a 
                key={key}
                href={`https://${value}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-transform hover:-translate-y-1 ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
              >
                <span className="capitalize text-xs font-bold">{key.slice(0, 2)}</span>
              </a>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardPreview;

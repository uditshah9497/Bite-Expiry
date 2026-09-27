import React from 'react';
import { ASSETS } from '../data/mockData';

interface HeaderProps {
  currentTab: string;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onOpenProfile }) => {
  const getSubTitle = () => {
    switch (currentTab) {
      case 'ai-snap':
        return 'Ai Snap';
      case 'pantry':
        return 'Pantry';
      case 'recipes':
        return 'Rescue Recipes';
      case 'impact':
        return 'Impact Tracker';
      default:
        return 'Pantry';
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#fff8f5]/85 backdrop-blur-xl border-b border-[#eae1da]/70 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto h-16 px-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            alt="BiteExpiry Brand Logo"
            className="h-8 w-auto object-contain"
            src={ASSETS.LOGO}
            onError={(e) => {
              // Graceful SVG fallback if network restricts hotlink
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent && !parent.querySelector('.logo-fallback')) {
                const fallback = document.createElement('div');
                fallback.className = 'logo-fallback w-8 h-8 rounded-lg bg-[#00652c] text-white flex items-center justify-center font-bold text-sm';
                fallback.innerText = 'BE';
                parent.prepend(fallback);
              }
            }}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-[18px] text-[#00652c] font-bold tracking-tight">
                BiteExpiry
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#d9e9b9] text-[#5b6943] text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00652c] animate-pulse"></span>
                Pantry Alive
              </span>
            </div>
            <span className="text-[10px] text-[#3f493f] font-semibold tracking-wide">
              {getSubTitle()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenProfile}
            aria-label="Profile and settings"
            className="w-10 h-10 flex items-center justify-center rounded-full transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00652c]/30"
          >
            <img
              alt="User profile"
              className="w-8 h-8 rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-2 ring-[#d9e9b9]"
              src={ASSETS.AVATAR}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
              }}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

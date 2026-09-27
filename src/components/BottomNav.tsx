import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  urgentCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange, urgentCount = 0 }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-[#fff8f5]/92 backdrop-blur-xl border-t border-[#eae1da]/70 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-20 px-3 relative">
        {/* Pantry Tab */}
        <button
          onClick={() => onTabChange('pantry')}
          aria-current={currentTab === 'pantry' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] gap-0.5 transition-colors relative ${
            currentTab === 'pantry'
              ? 'text-[#00652c] font-bold'
              : 'text-[#3f493f] hover:text-[#00652c]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentTab === 'pantry' ? "'FILL' 1" : "'FILL' 0" }}
          >
            kitchen
          </span>
          <span className="text-[11px] font-semibold">Pantry</span>
          {urgentCount > 0 && currentTab !== 'pantry' && (
            <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
          )}
        </button>

        {/* Center Floating AI Snap Tab */}
        <button
          onClick={() => onTabChange('ai-snap')}
          aria-current={currentTab === 'ai-snap' ? 'page' : undefined}
          className="relative -top-4 flex flex-col items-center justify-center min-h-[48px] group focus:outline-none"
        >
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 ${
              currentTab === 'ai-snap'
                ? 'bg-[#00652c] text-white shadow-[0_12px_28px_rgba(0,101,44,0.42)] ring-4 ring-[#95f8a7]/40'
                : 'bg-[#15803d] text-white shadow-[0_8px_20px_rgba(21,128,61,0.3)] group-hover:bg-[#00652c]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              document_scanner
            </span>
          </div>
          <span
            className={`text-[11px] font-bold mt-1 transition-colors ${
              currentTab === 'ai-snap' ? 'text-[#00652c]' : 'text-[#3f493f]'
            }`}
          >
            AI Snap
          </span>
        </button>

        {/* Recipes Tab */}
        <button
          onClick={() => onTabChange('recipes')}
          aria-current={currentTab === 'recipes' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] gap-0.5 transition-colors ${
            currentTab === 'recipes'
              ? 'text-[#00652c] font-bold'
              : 'text-[#3f493f] hover:text-[#00652c]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentTab === 'recipes' ? "'FILL' 1" : "'FILL' 0" }}
          >
            skillet
          </span>
          <span className="text-[11px] font-semibold">Recipes</span>
        </button>

        {/* Impact Tab */}
        <button
          onClick={() => onTabChange('impact')}
          aria-current={currentTab === 'impact' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] gap-0.5 transition-colors ${
            currentTab === 'impact'
              ? 'text-[#00652c] font-bold'
              : 'text-[#3f493f] hover:text-[#00652c]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentTab === 'impact' ? "'FILL' 1" : "'FILL' 0" }}
          >
            eco
          </span>
          <span className="text-[11px] font-semibold">Impact</span>
        </button>
      </div>
    </nav>
  );
};

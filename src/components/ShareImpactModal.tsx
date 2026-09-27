import React from 'react';
import { ImpactStats } from '../types';
import { ASSETS } from '../data/mockData';

interface ShareImpactModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: ImpactStats;
}

export const ShareImpactModal: React.FC<ShareImpactModalProps> = ({
  isOpen,
  onClose,
  stats
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-[#eae1da] flex flex-col">
        {/* Certificate / Green Card Preview */}
        <div className="relative p-6 bg-gradient-to-br from-[#00652c] via-[#15803d] to-[#141f02] text-white flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <img src={ASSETS.LOGO} alt="BiteExpiry" className="h-6 brightness-200" />
            <span className="text-sm font-extrabold tracking-tight">BiteExpiry</span>
          </div>

          <span className="text-[10px] uppercase tracking-widest text-[#95f8a7] font-bold">
            Monthly Zero-Waste Impact Card
          </span>

          <div className="my-4 relative">
            <div className="w-24 h-24 rounded-full border-4 border-[#95f8a7] flex flex-col items-center justify-center bg-white/10 backdrop-blur-md">
              <span className="text-3xl font-extrabold leading-none">{stats.vitalityScore}</span>
              <span className="text-[9px] uppercase tracking-wider text-[#95f8a7] font-bold">
                Vitality
              </span>
            </div>
          </div>

          <h3 className="text-base font-bold">Level 5 Eco Master</h3>
          <p className="text-xs text-white/80 mt-1 max-w-xs">
            Zero spoilage maintained for {stats.streakDays} consecutive days!
          </p>

          <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-[9px] text-[#95f8a7] uppercase font-bold">Rescued</p>
              <p className="text-xs font-extrabold">{stats.rescuedLbs} lbs</p>
            </div>
            <div>
              <p className="text-[9px] text-[#95f8a7] uppercase font-bold">Saved</p>
              <p className="text-xs font-extrabold">${stats.dollarsSaved.toFixed(0)}</p>
            </div>
            <div>
              <p className="text-[9px] text-[#95f8a7] uppercase font-bold">CO₂ Offset</p>
              <p className="text-xs font-extrabold">{stats.co2OffsetKg} kg</p>
            </div>
          </div>
        </div>

        {/* Modal actions */}
        <div className="p-4 bg-[#fff8f5] flex items-center gap-2.5">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: 'My BiteExpiry Green Impact Card',
                    text: `I scored ${stats.vitalityScore}/100 on Kitchen Vitality and saved $${stats.dollarsSaved.toFixed(2)} this month with BiteExpiry!`
                  })
                  .catch(() => {});
              }
              onClose();
            }}
            className="flex-1 py-2.5 rounded-full bg-[#00652c] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#15803d]"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>Share to Stories / Friends</span>
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f6ece6] text-[#1f1b17] flex items-center justify-center hover:bg-[#eae1da]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

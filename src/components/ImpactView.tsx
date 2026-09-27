import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { KitchenTrophy, ImpactStats } from '../types';

interface ImpactViewProps {
  stats: ImpactStats;
  trophies: KitchenTrophy[];
  onOpenShareModal: () => void;
  onIncrementFreezeProgress: () => void;
}

export const ImpactView: React.FC<ImpactViewProps> = ({
  stats,
  trophies,
  onOpenShareModal,
  onIncrementFreezeProgress
}) => {
  const [copyToast, setCopyToast] = useState(false);

  const handleShareClick = () => {
    // Copy summary text to clipboard
    const shareText = `🌱 My BiteExpiry Kitchen Vitality: ${stats.vitalityScore}/100!\nI saved $${stats.dollarsSaved.toFixed(2)}, offset ${stats.co2OffsetKg}kg CO₂, and rescued ${stats.rescuedLbs} lbs of food from the landfill this month.\nCook smarter with #BiteExpiry!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 3000);
    onOpenShareModal();
  };

  return (
    <div className="flex flex-col w-full px-5 pb-24 gap-5">
      {/* Toast */}
      {copyToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#00652c] text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span>Impact card copied to clipboard! Ready to share.</span>
        </div>
      )}

      {/* Gamified Scorecard Bento */}
      <div className="relative overflow-hidden rounded-2xl bg-[#f6ece6] p-5 shadow-sm border border-[#eae1da]/80">
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#d9e9b9]/40 blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-[#55633d] uppercase tracking-wider font-bold">
              Kitchen Vitality Index
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-[36px] text-[#00652c] font-extrabold leading-none tracking-tight">
                {stats.vitalityScore}
              </span>
              <span className="text-xs text-[#3f493f] font-medium">/ 100</span>
            </div>
            <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-[#d9e9b9] text-[#5b6943] w-max">
              <span
                className="material-symbols-outlined text-[15px] text-[#00652c]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                military_tech
              </span>
              <span className="text-[10px] font-bold">Level 5 • Eco Master</span>
            </div>
          </div>

          {/* Emerald Radial Progress Ring */}
          <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-[#eae1da]"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
              ></circle>
              <circle
                className="text-[#15803d]"
                cx="50"
                cy="50"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - stats.vitalityScore / 100)}
                strokeLinecap="round"
                strokeWidth="8"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span
                className="material-symbols-outlined text-[#00652c] text-[28px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                spa
              </span>
            </div>
          </div>
        </div>

        {/* Monthly Core Stats Mosaic */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#eae1da]/70">
          <div className="flex flex-col p-2.5 rounded-xl bg-white shadow-xs border border-[#eae1da]/60">
            <div className="flex items-center gap-1 text-[#00652c] mb-1">
              <span className="material-symbols-outlined text-[15px]">savings</span>
              <span className="text-[10px] font-bold">Wallet</span>
            </div>
            <span className="text-base font-extrabold text-[#1f1b17] leading-tight">
              ${stats.dollarsSaved.toFixed(2)}
            </span>
            <span className="text-[9px] text-[#00652c] font-semibold mt-0.5">+ $34.20 vs mo</span>
          </div>

          <div className="flex flex-col p-2.5 rounded-xl bg-white shadow-xs border border-[#eae1da]/60">
            <div className="flex items-center gap-1 text-[#7b4d00] mb-1">
              <span className="material-symbols-outlined text-[15px]">co2</span>
              <span className="text-[10px] font-bold">Offset</span>
            </div>
            <span className="text-base font-extrabold text-[#1f1b17] leading-tight">
              {stats.co2OffsetKg} kg
            </span>
            <span className="text-[9px] text-[#3f493f] mt-0.5">≈ 42 mi drove</span>
          </div>

          <div className="flex flex-col p-2.5 rounded-xl bg-white shadow-xs border border-[#eae1da]/60">
            <div className="flex items-center gap-1 text-[#55633d] mb-1">
              <span className="material-symbols-outlined text-[15px]">scale</span>
              <span className="text-[10px] font-bold">Rescued</span>
            </div>
            <span className="text-base font-extrabold text-[#1f1b17] leading-tight">
              {stats.rescuedLbs} lbs
            </span>
            <span className="text-[9px] text-[#3f493f] mt-0.5">Zero landfill</span>
          </div>
        </div>
      </div>

      {/* Weekly Streak Banner */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#d9e9b9] text-[#5b6943] shadow-xs border border-[#bdcc9e]/60">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#7b4d00] shadow-xs shrink-0">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#141f02]">
              {stats.streakDays}-Day Zero-Spoilage Streak!
            </span>
            <span className="text-[11px] text-[#5b6943]">
              Your crisper hasn't lost an onion in 2 weeks.
            </span>
          </div>
        </div>
        <span className="text-base font-extrabold text-[#00652c] ml-2">×2 XP</span>
      </div>

      {/* Category Breakdown & Food Visuals */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00652c] text-[20px]">pie_chart</span>
            <h2 className="text-[17px] font-bold text-[#1f1b17]">Rescued Categories</h2>
          </div>
          <span className="text-[11px] text-[#3f493f]">Last 30 Days</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#fcf2eb] shadow-xs border border-[#eae1da]/70 flex flex-col gap-3">
          {/* Visual Ratio Bars */}
          <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-[#eae1da]">
            <div
              className="bg-[#15803d] h-full transition-all duration-500"
              style={{ width: `${stats.categoryDistribution.produce}%` }}
              title={`Produce ${stats.categoryDistribution.produce}%`}
            ></div>
            <div
              className="bg-[#55633d] h-full transition-all duration-500"
              style={{ width: `${stats.categoryDistribution.dairy}%` }}
              title={`Dairy ${stats.categoryDistribution.dairy}%`}
            ></div>
            <div
              className="bg-[#ffb95f] h-full transition-all duration-500"
              style={{ width: `${stats.categoryDistribution.bakery}%` }}
              title={`Bakery ${stats.categoryDistribution.bakery}%`}
            ></div>
            <div
              className="bg-[#9c6300] h-full transition-all duration-500"
              style={{ width: `${stats.categoryDistribution.pantry}%` }}
              title={`Meat & Pantry ${stats.categoryDistribution.pantry}%`}
            ></div>
          </div>

          {/* Segment Details Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#15803d] flex-shrink-0"></span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#1f1b17] truncate">Fresh Produce</span>
                <span className="text-[10px] text-[#3f493f]">
                  {stats.categoryDistribution.produce}% • 6.8 lbs
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#55633d] flex-shrink-0"></span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#1f1b17] truncate">Dairy &amp; Eggs</span>
                <span className="text-[10px] text-[#3f493f]">
                  {stats.categoryDistribution.dairy}% • 3.7 lbs
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f] flex-shrink-0"></span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#1f1b17] truncate">Bakery &amp; Grains</span>
                <span className="text-[10px] text-[#3f493f]">
                  {stats.categoryDistribution.bakery}% • 2.3 lbs
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9c6300] flex-shrink-0"></span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#1f1b17] truncate">Pantry &amp; Proteins</span>
                <span className="text-[10px] text-[#3f493f]">
                  {stats.categoryDistribution.pantry}% • 1.4 lbs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Hero Mosaic: Pantry in Action */}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative h-28 rounded-2xl overflow-hidden shadow-xs border border-[#eae1da]/70">
          <img
            className="w-full h-full object-cover"
            src={ASSETS.VEGGIE_SAVER_MVP}
            alt="Veggie Saver MVP"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#342f2b]/85 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-[11px] font-bold text-white">Veggie Saver MVP</span>
          </div>
        </div>

        <div className="relative h-28 rounded-2xl overflow-hidden shadow-xs border border-[#eae1da]/70">
          <img
            className="w-full h-full object-cover"
            src={ASSETS.SAVED_BAKERY_LOAVES}
            alt="Saved Bakery Loaves"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#342f2b]/85 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-[11px] font-bold text-white">Saved Bakery Loaves</span>
          </div>
        </div>
      </div>

      {/* Gamified Eco Badges / Achievements */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[#00652c] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              military_tech
            </span>
            <h2 className="text-[17px] font-bold text-[#1f1b17]">Kitchen Trophies</h2>
          </div>
          <span className="text-xs font-bold text-[#00652c]">
            {trophies.filter((t) => t.isUnlocked).length} Unlocked
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {trophies.map((trophy) => (
            <div
              key={trophy.id}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${
                trophy.isUnlocked
                  ? 'bg-white border-[#eae1da]/80 shadow-xs'
                  : 'bg-[#fcf2eb] border-[#eae1da]/60'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-[22px] ${
                  trophy.isUnlocked
                    ? trophy.id === 'trophy-penny'
                      ? 'bg-[#ffddb8] text-[#7b4d00]'
                      : 'bg-[#d9e9b9] text-[#00652c]'
                    : 'bg-[#eae1da] text-[#6f7a6e]'
                }`}
              >
                {trophy.badgeEmoji || (
                  <span className="material-symbols-outlined text-[20px]">{trophy.icon}</span>
                )}
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1f1b17]">{trophy.title}</span>
                  {trophy.isUnlocked ? (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#d9e9b9] text-[#5b6943] text-[9px] font-bold">
                      Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#3f493f] font-bold">
                      {trophy.progressCurrent} / {trophy.progressTotal}
                    </span>
                  )}
                </div>

                {!trophy.isUnlocked && trophy.progressTotal && (
                  <div className="w-full h-1.5 rounded-full bg-[#eae1da] overflow-hidden my-1.5">
                    <div
                      className="bg-[#15803d] h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${((trophy.progressCurrent || 0) / trophy.progressTotal) * 100}%`
                      }}
                    ></div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#3f493f] truncate">{trophy.description}</span>
                  {!trophy.isUnlocked && (
                    <button
                      onClick={onIncrementFreezeProgress}
                      className="px-2 py-0.5 rounded-md bg-[#00652c] text-white text-[9px] font-bold hover:bg-[#15803d] active:scale-95"
                    >
                      + Log 1
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Impact Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#342f2b] text-white p-4 shadow-md flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#15803d] text-white flex items-center justify-center shrink-0">
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            public
          </span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] text-[#95f8a7] uppercase tracking-wider font-bold">
            Global Kitchen Coalition
          </span>
          <p className="text-xs font-semibold mt-0.5 text-white/95">
            Together, BiteExpiry home cooks saved{' '}
            <span className="text-[#95f8a7] font-bold">
              {stats.communityWeeklyLbs.toLocaleString()} lbs
            </span>{' '}
            of food this week!
          </p>
        </div>
      </div>

      {/* Share Action Button */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          onClick={handleShareClick}
          className="w-full h-12 rounded-full bg-[#00652c] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.98] hover:bg-[#15803d]"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">share</span>
          <span>Share My Monthly Green Impact Card</span>
        </button>
      </div>
    </div>
  );
};

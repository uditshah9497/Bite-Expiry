import React, { useState, useMemo } from 'react';
import { PantryItem } from '../types';

interface PantryViewProps {
  items: PantryItem[];
  onMarkEaten: (id: string, itemName: string, value: number) => void;
  onCookRecipe: (recipeId: string) => void;
  onOpenAddModal: () => void;
}

export const PantryView: React.FC<PantryViewProps> = ({
  items,
  onMarkEaten,
  onCookRecipe,
  onOpenAddModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showAllSafe, setShowAllSafe] = useState(false);
  const [showChefSuggestion, setShowChefSuggestion] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [voiceToast, setVoiceToast] = useState<string | null>(null);

  // Compute urgent and safe subsets
  const urgentItems = useMemo(
    () => items.filter((item) => item.status === 'urgent' && item.isUrgent),
    [items]
  );

  const safeItems = useMemo(
    () => items.filter((item) => item.status === 'fresh' && !item.isUrgent),
    [items]
  );

  const totalUrgentValue = useMemo(
    () => urgentItems.reduce((acc, curr) => acc + curr.estimatedValue, 0),
    [urgentItems]
  );

  // Filter items by search & category
  const filteredUrgent = useMemo(() => {
    return urgentItems.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;
      if (activeCategory === 'All') return true;
      if (activeCategory === 'Urgent') return true;
      return item.category === activeCategory;
    });
  }, [urgentItems, searchQuery, activeCategory]);

  const filteredSafe = useMemo(() => {
    if (activeCategory === 'Urgent') return [];
    return safeItems.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;
      if (activeCategory === 'All') return true;
      return item.category === activeCategory;
    });
  }, [safeItems, searchQuery, activeCategory]);

  // Voice recognition simulation or Web Speech API
  const handleVoiceInput = () => {
    // Check for web speech api
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        setIsListening(true);
        recognition.onstart = () => {
          setVoiceToast('Listening... Say "Spinach", "Yogurt", or "Strawberries"');
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
          setVoiceToast(`Found: "${transcript}"`);
          setIsListening(false);
          setTimeout(() => setVoiceToast(null), 2500);
        };

        recognition.onerror = () => {
          setIsListening(false);
          fallbackVoice();
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch {
        fallbackVoice();
      }
    } else {
      fallbackVoice();
    }
  };

  const fallbackVoice = () => {
    setIsListening(true);
    setVoiceToast('Listening...');
    setTimeout(() => {
      const sampleQueries = ['spinach', 'yogurt', 'milk', 'strawberries'];
      const pick = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setSearchQuery(pick);
      setIsListening(false);
      setVoiceToast(`Recognized voice: "${pick}"`);
      setTimeout(() => setVoiceToast(null), 2500);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full px-5 pb-24 gap-5">
      {/* Voice feedback toast */}
      {voiceToast && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#1f1b17] text-white text-xs font-semibold shadow-lg flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-sm text-[#95f8a7]">
            {isListening ? 'mic' : 'check_circle'}
          </span>
          <span>{voiceToast}</span>
        </div>
      )}

      {/* Micro-Stat Metrics Carousel / Bento Row */}
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-5 px-5 no-scrollbar">
        {/* Urgent Metric Card */}
        <div className="flex-shrink-0 w-64 p-4 rounded-2xl bg-[#ffdad6] text-[#93000a] shadow-sm flex flex-col justify-between border border-[#ffdad6]">
          <div className="flex items-center justify-between mb-1">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#ba1a1a] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
              Expiring &lt;48h
            </span>
            <span className="material-symbols-outlined text-[20px] text-[#ba1a1a]">
              hourglass_bottom
            </span>
          </div>
          <div>
            <div className="text-[32px] font-extrabold leading-tight tracking-tight">
              {urgentItems.length} items
            </div>
            <p className="text-[12px] text-[#93000a]/80 font-medium">
              ${totalUrgentValue.toFixed(2)} rescue value at risk
            </p>
          </div>
          <div className="w-full bg-[#eae1da]/60 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div
              className="bg-[#ba1a1a] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, urgentItems.length * 25)}%` }}
            ></div>
          </div>
        </div>

        {/* Fresh Metric Card */}
        <div className="flex-shrink-0 w-52 p-4 rounded-2xl bg-[#fcf2eb] text-[#1f1b17] shadow-sm flex flex-col justify-between border border-[#eae1da]/60">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-wider text-[#55633d] font-bold">
              Fresh & Safe
            </span>
            <span
              className="material-symbols-outlined text-[20px] text-[#00652c]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              eco
            </span>
          </div>
          <div>
            <div className="text-[32px] font-extrabold leading-tight tracking-tight text-[#00652c]">
              {safeItems.length} items
            </div>
            <p className="text-[12px] text-[#3f493f]">Optimal storage zone</p>
          </div>
          <div className="flex items-center gap-1 text-[#00652c] text-[10px] font-bold mt-2.5">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            <span>Peak culinary quality</span>
          </div>
        </div>

        {/* Health Score Card */}
        <div className="flex-shrink-0 w-52 p-4 rounded-2xl bg-[#d9e9b9] text-[#5b6943] shadow-sm flex flex-col justify-between border border-[#bdcc9e]/50">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#141f02]">
              Pantry Health
            </span>
            <span className="material-symbols-outlined text-[20px] text-[#00652c]">
              monitor_heart
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[32px] font-extrabold leading-tight tracking-tight text-[#141f02]">
              88%
            </span>
            <span className="text-[11px] font-bold text-[#00652c]">+4% vs last week</span>
          </div>
          <div className="w-full bg-[#eae1da]/70 rounded-full h-1.5 mt-2.5 overflow-hidden">
            <div className="bg-[#00652c] h-full rounded-full w-[88%]"></div>
          </div>
        </div>
      </div>

      {/* Smart Search & Voice Logging Bar */}
      <div className="flex items-center gap-2.5">
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white shadow-sm border border-[#eae1da]/70 focus-within:border-[#00652c]/50 transition-colors">
          <span className="material-symbols-outlined text-[#6f7a6e] text-[20px]">search</span>
          <input
            className="bg-transparent w-full text-sm text-[#1f1b17] placeholder:text-[#6f7a6e] focus:outline-none"
            placeholder="Find herbs, yogurt, produce..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#6f7a6e] hover:text-[#1f1b17] p-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
          <button
            onClick={handleVoiceInput}
            aria-label="Voice input"
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
              isListening
                ? 'bg-[#ba1a1a] text-white animate-pulse'
                : 'bg-[#f6ece6] text-[#00652c] hover:bg-[#d9e9b9]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">mic</span>
          </button>
        </div>

        <button
          onClick={onOpenAddModal}
          aria-label="Add item manually"
          className="w-11 h-11 rounded-full bg-[#00652c] text-white shadow-sm flex items-center justify-center hover:bg-[#15803d] transition-transform active:scale-95 shrink-0"
          title="Add New Item"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
      </div>

      {/* Filter Pills Category Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-5 px-5 py-0.5">
        {[
          { key: 'All', label: 'All', count: items.length },
          { key: 'Urgent', label: 'Urgent', count: urgentItems.length, hasDot: true },
          { key: 'Produce', label: 'Produce', count: items.filter((i) => i.category === 'Produce').length },
          { key: 'Dairy & Deli', label: 'Dairy & Deli', count: items.filter((i) => i.category === 'Dairy & Deli').length },
          { key: 'Pantry Staples', label: 'Pantry Staples', count: items.filter((i) => i.category === 'Pantry Staples').length }
        ].map((chip) => {
          const isSelected = activeCategory === chip.key;
          return (
            <button
              key={chip.key}
              onClick={() => setActiveCategory(chip.key)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs whitespace-nowrap transition-all active:scale-95 ${
                isSelected
                  ? 'bg-[#00652c] text-white shadow-sm'
                  : 'bg-white text-[#1f1b17] border border-[#eae1da]/70 hover:bg-[#f6ece6]'
              }`}
            >
              {chip.hasDot && (
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? 'bg-white' : 'bg-[#ba1a1a]'
                  }`}
                ></span>
              )}
              <span>{chip.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isSelected
                    ? 'bg-[#15803d] text-white'
                    : 'bg-[#f0e6e0] text-[#3f493f]'
                }`}
              >
                {chip.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* AI Rescue Recipe Prompt Shortcut Box */}
      {showChefSuggestion && urgentItems.length > 0 && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#9c6300] via-[#7b4d00] to-[#1f1b17] text-white p-4 shadow-md transition-all">
          <div className="relative z-10 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffddb8] text-[#2a1700] text-[10px] font-bold tracking-wide">
                <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
                Zero-Waste Chef Suggestion
              </span>
              <span className="text-[#ffddb8] text-[11px] font-semibold">Ready in 20 min</span>
            </div>
            <p className="text-[17px] font-bold tracking-tight mt-0.5 leading-snug">
              Creamy Spinach &amp; Garlic Pasta
            </p>
            <p className="text-[12px] text-[#ffddb8]/90 leading-relaxed">
              Rescues your expiring{' '}
              <span className="font-bold underline decoration-[#ffddb8]">Greek Yogurt</span> &amp;{' '}
              <span className="font-bold underline decoration-[#ffddb8]">Baby Spinach</span> before
              tomorrow!
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => onCookRecipe('recipe-pasta')}
                className="flex-1 py-2 px-4 rounded-full bg-white text-[#7b4d00] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform hover:bg-[#fff8f5]"
              >
                <span className="material-symbols-outlined text-[16px]">restaurant_menu</span>
                Cook This Now
              </button>
              <button
                onClick={() => setShowChefSuggestion(false)}
                aria-label="Dismiss smart tip"
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          </div>
          {/* Soft Decorative Kitchen Herb Pattern (SVG) */}
          <svg
            className="absolute right-0 bottom-0 w-32 h-32 opacity-15 pointer-events-none -mr-3 -mb-3 text-white"
            fill="currentColor"
            viewBox="0 0 200 200"
          >
            <path d="M42.7,106.3C40.3,77.7,60.8,51.8,89.5,47.3c28.6-4.5,56,12.8,63.5,40.8c7.5,28-8.2,56.9-36.4,66.5 C88.4,164.3,58.7,149.2,42.7,106.3z M117.2,143.6c20.7-7,32.2-28.3,26.7-48.9c-5.5-20.6-25.7-33.3-46.7-30 c-21.1,3.3-36.1,22.3-34.4,43.3C64.5,129,86.3,140.1,117.2,143.6z"></path>
          </svg>
        </div>
      )}

      {/* SECTION: URGENT ATTENTION (Eat First) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                priority_high
              </span>
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#1f1b17] leading-tight">
                Urgent Attention
              </h2>
              <p className="text-[11px] text-[#3f493f]">Items needing quick culinary rescue</p>
            </div>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-bold">
            {urgentItems.length} Items
          </span>
        </div>

        {/* Zero-waste state if urgent is empty */}
        {urgentItems.length === 0 && (
          <div className="flex flex-col items-center justify-center p-6 bg-[#d9e9b9] text-[#141f02] rounded-2xl text-center gap-2.5 border border-[#bdcc9e]">
            <div className="w-12 h-12 rounded-full bg-[#00652c] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[26px]">thumb_up</span>
            </div>
            <h3 className="text-[17px] font-bold">Zero Waste Achieved!</h3>
            <p className="text-xs max-w-xs text-[#5b6943]">
              All immediate expiry alerts have been safely eaten or prepared into delicious meals.
            </p>
            <button
              onClick={onOpenAddModal}
              className="mt-1 px-4 py-2 rounded-full bg-[#00652c] text-white text-xs font-bold shadow-sm hover:bg-[#15803d]"
            >
              + Log New Groceries
            </button>
          </div>
        )}

        {/* Urgent Cards List */}
        <div className="flex flex-col gap-3">
          {filteredUrgent.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white p-3.5 shadow-sm border border-[#eae1da]/70 flex flex-col gap-2.5 transition-all hover:shadow-md"
            >
              <div className="flex gap-3 items-start">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#f6ece6]">
                  {item.imageUrl ? (
                    <img
                      className="w-full h-full object-cover"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#00652c]">
                      <span className="material-symbols-outlined text-[24px]">
                        {item.iconName || 'fastfood'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-sm font-bold text-[#1f1b17] truncate">{item.name}</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold flex-shrink-0 animate-pulse">
                      <span className="material-symbols-outlined text-[11px]">alarm</span>
                      {item.expiryDisplay}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#3f493f] flex items-center gap-1.5 mt-0.5">
                    <span className="material-symbols-outlined text-[14px] text-[#6f7a6e]">
                      kitchen
                    </span>
                    {item.location} • {item.quantity}
                  </p>

                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs font-bold text-[#55633d]">
                      ${item.estimatedValue.toFixed(2)} value
                    </span>
                    {item.ripenessPercent && (
                      <span className="text-[10px] text-[#ba1a1a] font-bold">
                        Ripeness {item.ripenessPercent}%
                      </span>
                    )}
                    {item.freshnessPercent !== undefined && (
                      <span className="text-[10px] text-[#7b4d00] font-bold">
                        {item.freshnessPercent}% safe buffer
                      </span>
                    )}
                  </div>

                  {item.freshnessPercent !== undefined && (
                    <div className="w-full bg-[#f0e6e0] rounded-full h-1.5 mt-1.5 overflow-hidden">
                      <div
                        className="bg-[#7b4d00] h-full rounded-full"
                        style={{ width: `${item.freshnessPercent}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Smart Tip if present */}
              {item.smartTip && (
                <div className="p-2 rounded-xl bg-[#fcf2eb] text-[#1f1b17] flex items-center gap-2 border border-[#eae1da]/50">
                  <span className="material-symbols-outlined text-[#00652c] text-[16px] shrink-0">
                    lightbulb
                  </span>
                  <span className="text-[11px] leading-tight text-[#3f493f]">
                    {item.smartTip}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-0.5 flex items-center gap-2">
                <button
                  onClick={() => onCookRecipe('recipe-pasta')}
                  className="flex-1 py-1.5 px-3 rounded-full bg-[#d9e9b9] text-[#5b6943] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#bdcc9e] transition-transform active:scale-95"
                >
                  <span className="material-symbols-outlined text-[15px]">skillet</span>
                  Cook Recipe
                </button>
                <button
                  onClick={() => onMarkEaten(item.id, item.name, item.estimatedValue)}
                  className="px-4 py-1.5 rounded-full bg-[#f6ece6] text-[#1f1b17] text-xs font-semibold flex items-center gap-1 hover:bg-[#00652c] hover:text-white transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  Eaten
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: FRESH & SAFE (Guaranteed safe for 3+ days) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#d9e9b9] flex items-center justify-center text-[#00652c]">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                eco
              </span>
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#1f1b17] leading-tight">
                Fresh &amp; Safe
              </h2>
              <p className="text-[11px] text-[#3f493f]">Guaranteed safe for 3+ days</p>
            </div>
          </div>
          <button
            onClick={() => setShowAllSafe(!showAllSafe)}
            className="flex items-center gap-1 text-xs text-[#00652c] font-bold hover:underline"
          >
            <span>{showAllSafe ? 'Show Less' : `Show All (${safeItems.length})`}</span>
            <span
              className={`material-symbols-outlined text-[16px] transition-transform ${
                showAllSafe ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>
        </div>

        {/* Fresh Items List */}
        <div className="flex flex-col gap-2">
          {(showAllSafe ? filteredSafe : filteredSafe.slice(0, 3)).map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-white shadow-xs border border-[#eae1da]/70 flex items-center justify-between hover:bg-[#fcf2eb]/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#f6ece6] flex items-center justify-center text-[#00652c] font-bold shrink-0">
                  <span className="material-symbols-outlined text-[22px]">
                    {item.iconName || 'lunch_dining'}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1f1b17]">{item.name}</h4>
                  <p className="text-[10px] text-[#3f493f]">
                    {item.location} • {item.openedState || item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d9e9b9] text-[#5b6943] text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[11px]">verified</span>
                  {item.expiryDisplay}
                </span>
                <span className="text-[10px] text-[#6f7a6e] mt-0.5">
                  ${item.estimatedValue.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

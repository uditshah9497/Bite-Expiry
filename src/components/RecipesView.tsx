import React, { useState, useMemo } from 'react';
import { ASSETS } from '../data/mockData';
import { Recipe } from '../types';

interface RecipesViewProps {
  recipes: Recipe[];
  onStartGuidedCook: (recipe: Recipe) => void;
}

export const RecipesView: React.FC<RecipesViewProps> = ({ recipes, onStartGuidedCook }) => {
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<string[]>(['Under 20 Mins']);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customRecipeToast, setCustomRecipeToast] = useState<string | null>(null);
  const [dynamicRecipes, setDynamicRecipes] = useState<Recipe[]>(recipes);

  const toggleFilter = (tag: string) => {
    setActiveDietaryFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredRecipes = useMemo(() => {
    if (activeDietaryFilters.length === 0) return dynamicRecipes;
    return dynamicRecipes.filter((r) =>
      activeDietaryFilters.every((tag) => r.dietaryTags.includes(tag))
    );
  }, [dynamicRecipes, activeDietaryFilters]);

  // Top featured recipe (usually pasta or first match)
  const featuredRecipe = filteredRecipes[0] || dynamicRecipes[0];
  const otherRecipes = dynamicRecipes.filter((r) => r.id !== featuredRecipe?.id);

  const handleCustomGenerate = () => {
    const query = customPrompt.trim() || 'Half onion and chicken broth';
    setIsGenerating(true);
    setCustomRecipeToast(`AI Chef: Harmonizing ${query} with your expiring Greek yogurt & baby spinach...`);

    setTimeout(() => {
      setIsGenerating(false);
      const newCustomRecipe: Recipe = {
        id: `custom-${Date.now()}`,
        title: `Savory Zero-Waste Pan-Risotto with Wilted Greens & ${query.split(' ')[0] || 'Broth'}`,
        tag: 'AI Chef Custom Special',
        cookTimeMins: 16,
        difficulty: 'One-Skillet',
        calories: 420,
        pantryMatchPercent: 95,
        savedDollars: 6.90,
        imageUrl: ASSETS.PASTA_HERO,
        urgentIngredientsUsed: ['Greek Yogurt', 'Baby Spinach'],
        zeroWasteSmartSwap: `Incorporated ${query} directly as the aromatic base without throwing away unused ends.`,
        dietaryTags: ['Under 20 Mins', 'One-Pan', 'Vegetarian'],
        allIngredients: [
          { name: 'Baby Spinach', amount: '100g', isExpiring: true, onHand: true },
          { name: 'Greek Yogurt', amount: '3 tbsp', isExpiring: true, onHand: true },
          { name: query, amount: 'Fresh pantry leftover', onHand: true },
          { name: 'Rice or grains', amount: '1 cup cooked', onHand: true },
          { name: 'Garlic & butter', amount: '1 tbsp', onHand: true }
        ],
        steps: [
          {
            stepNumber: 1,
            instruction: `Sauté your ${query} with 1 tbsp butter in a skillet for 2 minutes until aromatic and tender.`,
            durationSeconds: 120
          },
          {
            stepNumber: 2,
            instruction: 'Add cooked grains and fold in baby spinach leaves until gently wilted.',
            durationSeconds: 180
          },
          {
            stepNumber: 3,
            instruction: 'Turn off burner, swirl in Greek yogurt for silkiness, season with black pepper, and serve hot.',
            durationSeconds: 60
          }
        ]
      };

      setDynamicRecipes((prev) => [newCustomRecipe, ...prev]);
      setCustomRecipeToast(`✨ Fresh recipe created: "${newCustomRecipe.title}"!`);
      setCustomPrompt('');
      setTimeout(() => setCustomRecipeToast(null), 4000);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full px-5 pb-24 gap-4">
      {/* Header Banner & AI Mascot Welcome */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#f0e6e0] via-[#f6ece6] to-[#fcf2eb] p-4 shadow-sm border border-[#eae1da]/80">
        <div className="flex items-start justify-between relative z-10">
          <div className="flex-1 pr-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d9e9b9] text-[#5b6943] text-[10px] font-bold mb-2 shadow-xs">
              <span
                className="material-symbols-outlined text-[15px] text-[#00652c]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              AI Kitchen Brain Active
            </div>
            <h1 className="text-[22px] font-extrabold text-[#1f1b17] tracking-tight flex items-center gap-1.5 leading-snug">
              Zero-Waste Chef <span className="text-xl">👨‍🍳</span>
            </h1>
            <p className="text-xs text-[#3f493f] mt-1 leading-relaxed">
              Turning expiring items into fresh, vibrant dinners in 15–20 minutes.
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#00652c]/10 flex items-center justify-center shrink-0 shadow-inner">
            <span className="material-symbols-outlined text-[#00652c] text-[26px]">
              skillet
            </span>
          </div>
        </div>
        {/* Ambient organic wave glow */}
        <div className="absolute -right-6 -bottom-8 w-28 h-28 rounded-full bg-[#95f8a7]/20 blur-2xl pointer-events-none"></div>
      </div>

      {/* Highlighted Urgent Bundle Box */}
      <div className="relative rounded-2xl bg-white p-4 shadow-sm border border-[#eae1da]/80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ba1a1a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ba1a1a]"></span>
            </span>
            <span className="text-[11px] font-bold text-[#ba1a1a] tracking-wide uppercase">
              Urgent Pantry Rescue Bundle
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-bold">
            Expires &lt;24h
          </span>
        </div>
        <p className="text-xs font-bold text-[#1f1b17]">
          Greek Yogurt <span className="text-[#3f493f] font-normal">•</span> Baby Spinach{' '}
          <span className="text-[#3f493f] font-normal">•</span> Artisanal Sourdough
        </p>

        {/* Mini Visual Strip of ingredients */}
        <div className="grid grid-cols-3 gap-2 mt-2.5 bg-[#fcf2eb] rounded-xl p-2 border border-[#eae1da]/50">
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-[#eae1da] overflow-hidden shrink-0">
              <img
                className="w-full h-full object-cover"
                src={ASSETS.GREEK_YOGURT}
                alt="Greek Yogurt"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-[#1f1b17] truncate">Greek Yogurt</p>
              <p className="text-[9px] text-[#ba1a1a] font-bold truncate">18h left</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-[#eae1da] overflow-hidden shrink-0">
              <img
                className="w-full h-full object-cover"
                src={ASSETS.BABY_SPINACH}
                alt="Baby Spinach"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-[#1f1b17] truncate">Baby Spinach</p>
              <p className="text-[9px] text-[#ba1a1a] font-bold truncate">12h left</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-[#eae1da] overflow-hidden shrink-0">
              <img
                className="w-full h-full object-cover"
                src={ASSETS.SOURDOUGH}
                alt="Sourdough"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-[#1f1b17] truncate">Sourdough</p>
              <p className="text-[9px] text-[#ba1a1a] font-bold truncate">22h left</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dietary Filter Tags (Horizontal Scrollable) */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar -mx-5 px-5">
        {[
          { label: 'Under 20 Mins', icon: 'bolt' },
          { label: 'High Protein', icon: 'fitness_center' },
          { label: 'Vegetarian', icon: 'eco' },
          { label: 'Kid Friendly', icon: 'sentiment_satisfied' },
          { label: 'One-Pan', icon: 'soup_kitchen' }
        ].map((f) => {
          const isSelected = activeDietaryFilters.includes(f.label);
          return (
            <button
              key={f.label}
              onClick={() => toggleFilter(f.label)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap active:scale-95 transition-all ${
                isSelected
                  ? 'bg-[#00652c] text-white shadow-sm'
                  : 'bg-[#eae1da] text-[#3f493f] hover:bg-[#d9e9b9]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{f.icon}</span>
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* Featured AI Generated Recipe Card */}
      {featuredRecipe && (
        <div className="rounded-2xl bg-white overflow-hidden shadow-md border border-[#eae1da]/80 transition-all hover:shadow-lg">
          {/* Image Header with Floating Badges */}
          <div className="relative h-48 w-full bg-[#eae1da]">
            <img
              className="w-full h-full object-cover"
              src={featuredRecipe.imageUrl}
              alt={featuredRecipe.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#342f2b]/85 via-[#342f2b]/25 to-transparent"></div>

            {/* Top badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] text-[#00652c] font-bold shadow-sm">
                <span className="material-symbols-outlined text-[13px]">stars</span>
                {featuredRecipe.pantryMatchPercent}% Pantry Match
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00652c] text-white text-[10px] font-bold shadow-sm">
                <span className="material-symbols-outlined text-[13px]">savings</span>
                +${featuredRecipe.savedDollars.toFixed(2)} saved
              </span>
            </div>

            {/* Over-image title metadata */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="px-2 py-0.5 rounded bg-[#15803d] text-white text-[9px] font-bold uppercase tracking-wider">
                {featuredRecipe.tag}
              </span>
              <h2 className="text-[17px] font-bold mt-1 leading-snug drop-shadow-sm text-white">
                {featuredRecipe.title}
              </h2>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-4 space-y-3">
            {/* Quick Specs */}
            <div className="flex items-center justify-between text-xs py-1.5 bg-[#fcf2eb] rounded-xl px-3 border border-[#eae1da]/50 font-semibold">
              <div className="flex items-center gap-1 text-[#1f1b17]">
                <span className="material-symbols-outlined text-[17px] text-[#00652c]">
                  schedule
                </span>
                <span>{featuredRecipe.cookTimeMins} min cook</span>
              </div>
              <div className="flex items-center gap-1 text-[#1f1b17]">
                <span className="material-symbols-outlined text-[17px] text-[#55633d]">
                  tune
                </span>
                <span>{featuredRecipe.difficulty}</span>
              </div>
              <div className="flex items-center gap-1 text-[#1f1b17]">
                <span className="material-symbols-outlined text-[17px] text-[#7b4d00]">
                  local_fire_department
                </span>
                <span>{featuredRecipe.calories} kcal</span>
              </div>
            </div>

            {/* Missing item smart swap pill box */}
            {featuredRecipe.zeroWasteSmartSwap && (
              <div className="rounded-xl bg-[#ffddb8]/45 p-2.5 flex items-start gap-2 border border-[#ffddb8]">
                <span
                  className="material-symbols-outlined text-[#7b4d00] text-[18px] shrink-0 mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  swap_horizontal_circle
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] text-[#2a1700] font-bold uppercase tracking-wide">
                    Zero-Waste Smart Swap
                  </p>
                  <p className="text-[11px] text-[#1f1b17] mt-0.5 leading-relaxed">
                    {featuredRecipe.zeroWasteSmartSwap}
                  </p>
                </div>
              </div>
            )}

            {/* Guided Cook Action Button */}
            <button
              onClick={() => onStartGuidedCook(featuredRecipe)}
              className="w-full h-12 rounded-full bg-[#00652c] hover:bg-[#15803d] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(21,128,61,0.28)] active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">play_circle</span>
              Start Guided Cook Mode
            </button>
          </div>
        </div>
      )}

      {/* Interactive Custom Recipe Prompt Input Bar */}
      <div className="rounded-2xl bg-[#f6ece6] p-4 shadow-xs border border-[#eae1da]/80">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[#00652c] text-[20px]">psychology</span>
          <h3 className="text-xs font-bold text-[#1f1b17]">Ask AI Chef for Custom Rescue</h3>
        </div>
        <div className="relative flex items-center">
          <input
            className="w-full h-11 pl-4 pr-20 rounded-full bg-white text-xs text-[#1f1b17] placeholder:text-[#3f493f]/70 focus:outline-none border border-[#eae1da] shadow-inner focus:border-[#00652c]"
            placeholder="e.g., I also have half an onion and chicken broth..."
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCustomGenerate();
            }}
          />
          <button
            onClick={handleCustomGenerate}
            disabled={isGenerating}
            className="absolute right-1 px-3.5 h-9 rounded-full bg-[#00652c] hover:bg-[#15803d] text-white text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform shadow-xs"
          >
            <span>{isGenerating ? 'Mixing...' : 'Mix'}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {customRecipeToast && (
          <div className="mt-2 text-[#00652c] text-[11px] font-semibold flex items-center gap-1.5 animate-pulse">
            <span className="material-symbols-outlined text-[15px]">auto_fix_high</span>
            <span>{customRecipeToast}</span>
          </div>
        )}
      </div>

      {/* More Quick Rescue Inspirations */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-[#1f1b17]">Other Zero-Waste Options</h3>
          <span className="text-xs text-[#3f493f]">{otherRecipes.length} tailored recipes</span>
        </div>

        {otherRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => onStartGuidedCook(recipe)}
            className="rounded-2xl bg-white p-2.5 flex gap-3 shadow-xs border border-[#eae1da]/70 hover:shadow-md transition-shadow active:scale-[0.99] cursor-pointer"
          >
            <div className="w-24 h-24 rounded-xl bg-[#eae1da] overflow-hidden shrink-0 relative">
              <img className="w-full h-full object-cover" src={recipe.imageUrl} alt={recipe.title} />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-[#342f2b]/80 text-white text-[9px] font-bold">
                {recipe.cookTimeMins}m
              </span>
            </div>

            <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#d9e9b9] text-[#5b6943] font-bold truncate">
                    {recipe.tag}
                  </span>
                  <span className="text-[11px] text-[#00652c] font-bold whitespace-nowrap">
                    +${recipe.savedDollars.toFixed(2)} saved
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#1f1b17] mt-1 leading-snug line-clamp-1">
                  {recipe.title}
                </h4>
                <p className="text-[10px] text-[#3f493f] mt-0.5 line-clamp-1">
                  Rescues {recipe.urgentIngredientsUsed.join(', ')}
                </p>
              </div>

              <div className="flex items-center gap-2.5 text-[#3f493f] text-[10px] font-semibold pt-1">
                <span className="flex items-center gap-0.5 text-[#00652c]">
                  <span className="material-symbols-outlined text-[13px]">task_alt</span>
                  {recipe.allIngredients.filter((i) => i.onHand).length} items on-hand
                </span>
                <span>•</span>
                <span>{recipe.dietaryTags[0] || 'Chef Curated'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Community Waste Impact Delight Banner */}
      <div className="rounded-2xl bg-[#d9e9b9] p-4 text-[#5b6943] flex items-center justify-between shadow-xs border border-[#bdcc9e]/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00652c] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">eco</span>
          </div>
          <div>
            <p className="text-xs font-bold text-[#141f02]">Zero Food Left Behind</p>
            <p className="text-[11px] text-[#5b6943]">
              You have prevented 4.2 kg of food waste this week!
            </p>
          </div>
        </div>
        <span className="text-[22px] font-extrabold text-[#00652c] leading-tight">94%</span>
      </div>
    </div>
  );
};

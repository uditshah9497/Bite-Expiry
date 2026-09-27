import { useState, useEffect } from 'react';
import { TabType, PantryItem, Recipe, KitchenTrophy, ImpactStats } from './types';
import {
  INITIAL_PANTRY_ITEMS,
  INITIAL_RECIPES,
  INITIAL_IMPACT_STATS,
  INITIAL_TROPHIES
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { PantryView } from './components/PantryView';
import { AiSnapView } from './components/AiSnapView';
import { RecipesView } from './components/RecipesView';
import { ImpactView } from './components/ImpactView';
import { GuidedCookModal } from './components/GuidedCookModal';
import { AddItemModal } from './components/AddItemModal';
import { EditDatesModal } from './components/EditDatesModal';
import { ProfileModal } from './components/ProfileModal';
import { ShareImpactModal } from './components/ShareImpactModal';

interface EditDatesState {
  isOpen: boolean;
  items: Array<{
    id: string;
    name: string;
    quantity: string;
    category: 'Dairy & Deli' | 'Produce' | 'Bakery & Grains' | 'Pantry Staples';
    location: string;
    estimatedValue: number;
    expiryDisplay: string;
    expiryDate: string;
  }>;
  onUpdate: (updated: Array<{
    id: string;
    name: string;
    quantity: string;
    category: 'Dairy & Deli' | 'Produce' | 'Bakery & Grains' | 'Pantry Staples';
    location: string;
    estimatedValue: number;
    expiryDisplay: string;
    expiryDate: string;
  }>) => void;
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('pantry');

  // Pantry items state with localStorage persistence
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(() => {
    try {
      const saved = localStorage.getItem('bite_expiry_items_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PANTRY_ITEMS;
  });

  // Recipes state
  const [recipes] = useState<Recipe[]>(INITIAL_RECIPES);

  // Impact stats state
  const [impactStats, setImpactStats] = useState<ImpactStats>(() => {
    try {
      const saved = localStorage.getItem('bite_expiry_stats_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_IMPACT_STATS;
  });

  // Trophies state
  const [trophies, setTrophies] = useState<KitchenTrophy[]>(() => {
    try {
      const saved = localStorage.getItem('bite_expiry_trophies_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_TROPHIES;
  });

  // Modals state
  const [activeRecipeForCooking, setActiveRecipeForCooking] = useState<Recipe | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [editDatesState, setEditDatesState] = useState<EditDatesState>({
    isOpen: false,
    items: [],
    onUpdate: () => {}
  });

  // Celebration Banner Toast
  const [bannerToast, setBannerToast] = useState<string | null>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bite_expiry_items_v2', JSON.stringify(pantryItems));
    } catch {
      // ignore
    }
  }, [pantryItems]);

  useEffect(() => {
    try {
      localStorage.setItem('bite_expiry_stats_v2', JSON.stringify(impactStats));
    } catch {
      // ignore
    }
  }, [impactStats]);

  useEffect(() => {
    try {
      localStorage.setItem('bite_expiry_trophies_v2', JSON.stringify(trophies));
    } catch {
      // ignore
    }
  }, [trophies]);

  // Mark item eaten/consumed
  const handleMarkEaten = (id: string, itemName: string, value: number) => {
    setPantryItems((prev) => prev.filter((item) => item.id !== id));

    setImpactStats((prev) => ({
      ...prev,
      dollarsSaved: prev.dollarsSaved + value,
      rescuedLbs: Number((prev.rescuedLbs + 0.8).toFixed(1)),
      co2OffsetKg: Number((prev.co2OffsetKg + 0.9).toFixed(1)),
      vitalityScore: Math.min(100, prev.vitalityScore + 1)
    }));

    setBannerToast(`🎉 Rescued ${itemName}! +$${value.toFixed(2)} added to zero-waste savings.`);
    setTimeout(() => setBannerToast(null), 3500);
  };

  // Start guided cook
  const handleStartCook = (recipe: Recipe) => {
    setActiveRecipeForCooking(recipe);
  };

  // Finish cooking
  const handleFinishCook = (recipe: Recipe) => {
    // Remove expiring ingredients used in recipe from urgent items
    setPantryItems((prev) =>
      prev.filter(
        (item) => !recipe.urgentIngredientsUsed.some((name) => item.name.includes(name))
      )
    );

    setImpactStats((prev) => ({
      ...prev,
      dollarsSaved: prev.dollarsSaved + recipe.savedDollars,
      rescuedLbs: Number((prev.rescuedLbs + 1.6).toFixed(1)),
      co2OffsetKg: Number((prev.co2OffsetKg + 1.8).toFixed(1)),
      vitalityScore: Math.min(100, prev.vitalityScore + 2)
    }));

    // Unlock Leftover Magician trophy if not unlocked
    setTrophies((prev) =>
      prev.map((t) => (t.id === 'trophy-magician' ? { ...t, isUnlocked: true } : t))
    );

    setActiveRecipeForCooking(null);
    setBannerToast(`👨‍🍳 Delicious Zero-Waste Meal prepared! Saved $${recipe.savedDollars.toFixed(2)}!`);
    setTimeout(() => setBannerToast(null), 4000);
  };

  // Save scanned items to pantry
  const handleSaveToPantry = (newItems: PantryItem[]) => {
    setPantryItems((prev) => [...newItems, ...prev]);
    setImpactStats((prev) => ({
      ...prev,
      vitalityScore: Math.min(100, prev.vitalityScore + 1)
    }));
  };

  // Increment freezer progress for trophy
  const handleIncrementFreeze = () => {
    setTrophies((prev) =>
      prev.map((t) => {
        if (t.id !== 'trophy-freeze') return t;
        const current = (t.progressCurrent || 7) + 1;
        const total = t.progressTotal || 10;
        const unlocked = current >= total;
        return {
          ...t,
          progressCurrent: current,
          isUnlocked: unlocked
        };
      })
    );
    setBannerToast('❄️ Perishable item frozen safely! Preserved for up to 3 months.');
    setTimeout(() => setBannerToast(null), 3000);
  };

  // Reset to initial demo data
  const handleResetData = () => {
    setPantryItems(INITIAL_PANTRY_ITEMS);
    setImpactStats(INITIAL_IMPACT_STATS);
    setTrophies(INITIAL_TROPHIES);
    localStorage.removeItem('bite_expiry_items_v2');
    localStorage.removeItem('bite_expiry_stats_v2');
    localStorage.removeItem('bite_expiry_trophies_v2');
    setBannerToast('Demo pantry and metrics restored.');
    setTimeout(() => setBannerToast(null), 3000);
  };

  // Open edit dates modal
  const handleOpenEditDates = (
    items: EditDatesState['items'],
    onUpdate: EditDatesState['onUpdate']
  ) => {
    setEditDatesState({
      isOpen: true,
      items,
      onUpdate
    });
  };

  const urgentCount = pantryItems.filter((i) => i.isUrgent && i.status === 'urgent').length;

  return (
    <div className="min-h-screen bg-[#fcf2eb]/60 text-[#1f1b17] flex justify-center selection:bg-[#d9e9b9]">
      {/* Mobile Shell Frame with desktop elevation */}
      <div className="w-full max-w-md min-h-screen bg-[#fff8f5] shadow-[0_0_50px_rgba(0,0,0,0.08)] flex flex-col relative border-x border-[#eae1da]/50">
        {/* Universal Top Header */}
        <Header currentTab={currentTab} onOpenProfile={() => setIsProfileModalOpen(true)} />

        {/* Floating Global Banner Toast */}
        {bannerToast && (
          <div className="fixed top-18 z-50 left-1/2 -translate-x-1/2 max-w-[90vw] px-4 py-2.5 rounded-full bg-[#1f1b17] text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
            <span className="material-symbols-outlined text-[16px] text-[#95f8a7]">
              eco
            </span>
            <span className="truncate">{bannerToast}</span>
          </div>
        )}

        {/* Main Body View */}
        <main className="flex-1 w-full pt-16 flex flex-col">
          {currentTab === 'pantry' && (
            <div className="pt-4">
              <PantryView
                items={pantryItems}
                onMarkEaten={handleMarkEaten}
                onCookRecipe={(recipeId) => {
                  const r = recipes.find((x) => x.id === recipeId) || recipes[0];
                  handleStartCook(r);
                }}
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />
            </div>
          )}

          {currentTab === 'ai-snap' && (
            <div className="pt-0">
              <AiSnapView
                onSaveToPantry={handleSaveToPantry}
                onOpenManualAdd={() => setIsAddModalOpen(true)}
                onOpenEditDates={handleOpenEditDates}
                onNavigateToRecipes={() => setCurrentTab('recipes')}
              />
            </div>
          )}

          {currentTab === 'recipes' && (
            <div className="pt-4">
              <RecipesView recipes={recipes} onStartGuidedCook={handleStartCook} />
            </div>
          )}

          {currentTab === 'impact' && (
            <div className="pt-4">
              <ImpactView
                stats={impactStats}
                trophies={trophies}
                onOpenShareModal={() => setIsShareModalOpen(true)}
                onIncrementFreezeProgress={handleIncrementFreeze}
              />
            </div>
          )}
        </main>

        {/* Docked Universal Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          urgentCount={urgentCount}
        />

        {/* Guided Cook Modal */}
        <GuidedCookModal
          recipe={activeRecipeForCooking}
          onClose={() => setActiveRecipeForCooking(null)}
          onFinishCook={handleFinishCook}
        />

        {/* Add Item Manually Modal */}
        <AddItemModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddItem={(newItem) => {
            setPantryItems((prev) => [newItem, ...prev]);
            setBannerToast(`Added "${newItem.name}" to ${newItem.location}!`);
            setTimeout(() => setBannerToast(null), 3000);
          }}
        />

        {/* Edit Expiry Dates Modal */}
        <EditDatesModal
          isOpen={editDatesState.isOpen}
          items={editDatesState.items}
          onClose={() => setEditDatesState((prev) => ({ ...prev, isOpen: false }))}
          onSave={(updated) => {
            editDatesState.onUpdate(updated);
            setBannerToast('Updated predicted expiration dates!');
            setTimeout(() => setBannerToast(null), 3000);
          }}
        />

        {/* Profile & Kitchen Settings Modal */}
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onResetData={handleResetData}
        />

        {/* Share Impact Card Modal */}
        <ShareImpactModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          stats={impactStats}
        />
      </div>
    </div>
  );
}

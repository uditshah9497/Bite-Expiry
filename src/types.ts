export type TabType = 'pantry' | 'ai-snap' | 'recipes' | 'impact';

export type CategoryType = 'Produce' | 'Dairy & Deli' | 'Bakery & Grains' | 'Pantry Staples' | 'Meat & Seafood';

export interface PantryItem {
  id: string;
  name: string;
  category: CategoryType;
  location: string;
  quantity: string;
  estimatedValue: number;
  expiryDate: string; // ISO date string
  expiryDisplay: string;
  isUrgent: boolean;
  freshnessPercent?: number;
  ripenessPercent?: number;
  imageUrl?: string;
  iconName?: string;
  status: 'fresh' | 'urgent' | 'eaten' | 'frozen';
  smartTip?: string;
  openedState?: string;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  durationSeconds?: number;
  proTip?: string;
}

export interface Recipe {
  id: string;
  title: string;
  tag: string;
  cookTimeMins: number;
  difficulty: string;
  calories: number;
  pantryMatchPercent: number;
  savedDollars: number;
  imageUrl: string;
  urgentIngredientsUsed: string[];
  allIngredients: { name: string; amount: string; isExpiring?: boolean; onHand: boolean }[];
  zeroWasteSmartSwap?: string;
  steps: RecipeStep[];
  dietaryTags: string[];
}

export interface KitchenTrophy {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  progressCurrent?: number;
  progressTotal?: number;
  badgeEmoji?: string;
}

export interface ImpactStats {
  vitalityScore: number;
  dollarsSaved: number;
  co2OffsetKg: number;
  rescuedLbs: number;
  streakDays: number;
  zeroWastePercent: number;
  communityWeeklyLbs: number;
  categoryDistribution: {
    produce: number;
    dairy: number;
    bakery: number;
    pantry: number;
  };
}

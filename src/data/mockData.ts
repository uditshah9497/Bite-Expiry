import { PantryItem, Recipe, KitchenTrophy, ImpactStats } from '../types';

export const ASSETS = {
  LOGO: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMxpIbvUiukwjjCvMEG_WaoK9Q4nmg6tj8ZoLj1xMZBauQVzOzL6-YcrdWhAQTwXPCoKPTUQR6d-DUg9fFiiU-3SK8q8o25vX_x_sQuArkGgF5KtXvDcmhf9m8KTR6wf6cOltDpsMO8uqShXJTV4enyBXco_f43-dz3IqoMFmP5DQPGd3XKZn2LRgMmlihckkKgF8ae6EjDHtb2CNWyS2ZU0A0pKTGNvSXS-uTFdDFUd0o9Ql_TGsT',
  AVATAR: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnkfVwovKEGGRksevgvjWAb1NWgySy5yiW-rAojvTR0FhZpELGBiSdqClp8Wco2Q6-Ck-w3Qvk-b9zZgjDMzxLrSoaLc1aFKGQ73dYzCxGPH9go9MYMoGUhw-tpcayFKuJgKbMIYOSLNNdBNPAPm9g_m0BrPVW54V4ZLTky9LUb-G8FDWUAS-vXS0fJAsactsZyCZPI7wEWooyGtz_a7NoDTNPy_ryYTYTyPywBzONTrIhnx2fCm4e',
  FRIDGE_BG: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDggFoPcGN5wOfZpJnUvXirgG3asVmjz55D3OgtILwn-VlwNHfGM2Nw9ODfq9dQihJf7JOmkyN2yPGPk-FU65vr6tW5a7ekmFNmqUu7saiufrOBYxWdvshqg4iC3TB5BWzXFVtxDpe9IY6ptAdszIKpujBmx7ED_D6kOr_bzKfCRX7mbQZA1Cm7u_q0mHgVPQAICAA5okVp1O9EYzhAvDobT6vny2S4ezXxKLcOpP5EjHkZ6n-8C66',
  GREEK_YOGURT: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1UCEGqRjgTAMoVWbaI2N01H6iHbJWN_DPCYbr8fKGvX9XOZMlIetdHjCkP325pvFPcQWDfr6IZw8LSnY0UohzfaY2NATSs2Sik4pmVx4nQrklcbSfeG6RIesqWn8uy7Q4QOGCZ7jUaq23gO_hDvxSsL7bxbL5SAM_VVLkpzksYMRcQJEkt9MT68IYDRz2ZXRjq0X0FOt5nlvVJbBJCMb2M9Yl6_vxeoTOyPX76TDqtAp_iKX1g04N',
  BABY_SPINACH: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA41qlCTohsV7SCF3ULnVimrXbhsr_QVg9zqJA8MWTkt0IilDfJnU2gfWjuWIEdpX66ORQazASnMAkw3TgG_fzXcuuLiDIg2YPMc2zPBG05b0wD6ibkIi5YeR8u9MU0SDlajObNYnC76KRCwjqR5TGvwN-G2QxDAZl9ZDI4vNhahbjX5n3iZcAXndXGGtUUoH7sc9SKLoiN9vLmc_ghFcpcC5KesABlCXghb8Sv_Ab2ji7DJQ9yzqub',
  SOURDOUGH: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFK_5sLJ1knJNTzVtzWyRtjdUs7wg-DUirFdRvqqOXPHHK7gxsINfo70YWr8A-z4IXyVWsFFId0EB8BFaKX5zq79MQS02Pcd8kfIchrW0GDJ2pfvPwdcPiYUr3ZoSor7oXVI7jYp0xgD4lMmymwTmk61EQ29HT519qsY5pz42Wg8CINRyEgXaVPRFvp3L7VR8yBwfQIynpRRK0P-tcFV55Ku23UP4ED8O5NnrFsJTn7pam8EXSvuFZ',
  STRAWBERRIES: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaDGHvV_LPmKuBoz01vqg4sP5uNDV-LN1Ozpad1lcPCmYoDagmJAWEw9FOZS7SuHNWra-nqzX_rwf8D2H4LGV99futsUCFxFXFcaUezEr9-Lm99rZEpxg-o9TLrP-j1iGs8ebfdA078MJcREF4_gfqg3nlt6GyOzBkxOkCQ8W9DyBVWTzPXkVbnh_gWoIqlWsFAUzCtCtljj21dIKk8M0Wb31yu57ixqicSLHthRU13bAeuNlfZB0H',
  PASTA_HERO: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-vwtaOAjMarK2pCQ0Gt7x5140lAutejUNx4_xswRR2AeHx0kMOw-HNxGknR6IbcLA5U9G2-aI9kspG_SUxkqn6ftE1Xdi4Ln0HRjA1fRvBkhemBrhG_iK6ZMbKzZxep1fBpqZOtHpLGijOscIU46psB_BMAvJt0ur5oFVGZ8Dg4_0zyCNIxQhmuUCCJqL2vxma0-3-dhon7uwYD18ZnNOihZfhVkOtBmmFpcMfnGJEqrCPpr1bFH5',
  FRENCH_TOAST: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb2uzdjOvHvYZeL2VLopPPIdSzwFgnumQopsOLmc5arK8QTxUv0XuQNsD-icePmc64VYdz_PJ7HgWm9WdZ2gNax-WnDyRJwvFgwNqYWC3Xwieqcx5L-RDOIbDFOtmTAS-w9SWY0HQwhqH9IpdwYfSHZMMYTmsEZUhS5TmswGH4f5t5BQOLh1KCTSY766GWTKd_T8y4ya79k45dv6TO-JM57_UzDc9WoQx_IWxiGHhHpp1KqxSauVKl',
  FRITTATA: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7rosigatzr_YYj0pgsqqeeaCXaFzBHPNkcycC9ljDfMyh41JJSjON3qxhv63b6HLwulAyn59Ss0soqs3Gcu_rOlZ8tLvw4Ib368qvK8ieNdVKnJ3TSbWZ7gioDFtIPcfVLqu4M4V9icLfj9cMrkfqHHAdto3Ie50ar42OIuk9PHTAADYaSGDEwJ52I0wu7eM3hwWeGiHuIT3WsK2KOwqBm8L2UHtKb2FXVuuk2E-fLcMI9Oxd0Q8_ ',
  MINESTRONE: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFuF3i0UWIWxVNrLlbRCAbRgsig6FmiH_RHV6XRHQ4fX24ATfoabOjZKiwyQHBScOMcGAfNn5FAbSRqmDLL3w5dIWp9OvHidjJPVV5jMScDAc3bnzEQTTZ8nMD6TTEbAGZbQEyKC4tjipbtyJyLhyjTWN5gV74WRo_Q_LFmNua_pYy10MHBWgIkyvv6vxpIqpcTZrihyY8sNBztSd6Ube9TkDUx3diPbV9CG0aDKqJrLTQ88LDAgX9',
  VEGGIE_SAVER_MVP: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUAwetBt0KsO7HX5oj7GVxGgC_-JmKvf2oh12ftbT7p0SKGBCcDDpm8DuI4wLhYlyFsWm647-crpNIcMexTWM8p2C5zp1B1eVcNzDUUR4sFQhl_Sjpp2z2aQPeVAzSb3q-TofS-7uBXhKgMNQdxwp3GiaoYZC1n8Th4QaaZaMyDFEmRWYuRExeasMXDLhJ3BKLy4Hlmy4nBkaw6JuX846t4EzDwLgOzKNG02uPFWdCcrXCNPxRbMYq',
  SAVED_BAKERY_LOAVES: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFzyZ9PwhegFkKqPoBDwt9AbR8hXcVcqmMyvXmu27art20ewtGxh439Pql3ZQBDCfF1vjhMbgW-OxIBlmh99GoI4B4AGcfXPaezxiO7L59RlpoOLEdPbH-Xi_t8_pvCDmnipmjR4DBIb5PsHjm4UYwFhAGtxsE1Pn8psABYjIGvgQcX0Rat1499PzoPMSZI4fbhVxlKAOGfP1VMkqUufNhyBU5trp5vsWQP_AsgnROynXjlC9WsjNS'
};

export const INITIAL_PANTRY_ITEMS: PantryItem[] = [
  {
    id: 'item-1',
    name: 'Organic Greek Yogurt',
    category: 'Dairy & Deli',
    location: 'Middle Shelf',
    quantity: '500g',
    estimatedValue: 4.20,
    expiryDate: '2026-09-27T16:00:00Z',
    expiryDisplay: '18 hrs left',
    isUrgent: true,
    ripenessPercent: 92,
    imageUrl: ASSETS.GREEK_YOGURT,
    status: 'urgent',
    smartTip: 'Perfect base for pasta sauce or high-protein morning bowl.'
  },
  {
    id: 'item-2',
    name: 'Baby Spinach',
    category: 'Produce',
    location: 'Crisper Drawer',
    quantity: '200g',
    estimatedValue: 3.10,
    expiryDate: '2026-09-27T23:59:59Z',
    expiryDisplay: 'Tomorrow',
    isUrgent: true,
    freshnessPercent: 15,
    imageUrl: ASSETS.BABY_SPINACH,
    status: 'urgent',
    smartTip: 'Wilt into skillet with garlic or flash-blend into morning smoothie.'
  },
  {
    id: 'item-3',
    name: 'Sourdough Loaf',
    category: 'Bakery & Grains',
    location: 'Counter Basket',
    quantity: '650g',
    estimatedValue: 4.50,
    expiryDate: '2026-09-28T23:59:59Z',
    expiryDisplay: '2 days left',
    isUrgent: true,
    imageUrl: ASSETS.SOURDOUGH,
    status: 'urgent',
    smartTip: 'Freeze slices in airtight bag or bake into garlic croutons!'
  },
  {
    id: 'item-4',
    name: 'Fresh Strawberries',
    category: 'Produce',
    location: 'Fridge Door',
    quantity: '250g',
    estimatedValue: 3.80,
    expiryDate: '2026-09-26T23:59:59Z',
    expiryDisplay: 'Tonight!',
    isUrgent: true,
    imageUrl: ASSETS.STRAWBERRIES,
    status: 'urgent',
    smartTip: 'Blend into high-protein yogurt bowl or French toast topping.'
  },
  {
    id: 'item-5',
    name: 'Cheddar Cheese Block',
    category: 'Dairy & Deli',
    location: 'Dairy Drawer',
    quantity: '250g',
    estimatedValue: 3.90,
    expiryDate: '2026-10-02T23:59:59Z',
    expiryDisplay: '6 days left',
    isUrgent: false,
    freshnessPercent: 100,
    iconName: 'lunch_dining',
    status: 'fresh',
    openedState: 'Sealed'
  },
  {
    id: 'item-6',
    name: 'Almond Milk Unsweetened',
    category: 'Dairy & Deli',
    location: 'Side Shelf',
    quantity: '1 Liter',
    estimatedValue: 2.75,
    expiryDate: '2026-10-04T23:59:59Z',
    expiryDisplay: '8 days left',
    isUrgent: false,
    freshnessPercent: 100,
    iconName: 'local_cafe',
    status: 'fresh',
    openedState: 'Unopened'
  },
  {
    id: 'item-7',
    name: 'Free-Range Organic Eggs',
    category: 'Dairy & Deli',
    location: 'Egg Rack',
    quantity: '10 pcs',
    estimatedValue: 4.80,
    expiryDate: '2026-10-08T23:59:59Z',
    expiryDisplay: '12 days left',
    isUrgent: false,
    freshnessPercent: 100,
    iconName: 'egg',
    status: 'fresh',
    openedState: 'Farm fresh'
  },
  {
    id: 'item-8',
    name: 'Red Bell Peppers',
    category: 'Produce',
    location: 'Crisper Drawer',
    quantity: '3 pcs',
    estimatedValue: 3.50,
    expiryDate: '2026-10-01T23:59:59Z',
    expiryDisplay: '5 days left',
    isUrgent: false,
    freshnessPercent: 72,
    iconName: 'eco',
    status: 'fresh',
    openedState: 'Firm & Crisp'
  },
  {
    id: 'item-9',
    name: 'Whole Milk (1 gal)',
    category: 'Dairy & Deli',
    location: 'Top Shelf',
    quantity: '1 gal',
    estimatedValue: 4.10,
    expiryDate: '2026-10-02T23:59:59Z',
    expiryDisplay: '6 days left',
    isUrgent: false,
    freshnessPercent: 98,
    iconName: 'water_drop',
    status: 'fresh',
    openedState: 'Chilled'
  },
  {
    id: 'item-10',
    name: 'Feta Block 200g',
    category: 'Dairy & Deli',
    location: 'Dairy Drawer',
    quantity: '200g',
    estimatedValue: 3.60,
    expiryDate: '2026-10-10T23:59:59Z',
    expiryDisplay: '14 days left',
    isUrgent: false,
    freshnessPercent: 91,
    iconName: 'takeout_dining',
    status: 'fresh',
    openedState: 'Sealed Pack'
  },
  {
    id: 'item-11',
    name: 'Baby Carrots',
    category: 'Produce',
    location: 'Crisper Drawer',
    quantity: '1 lb',
    estimatedValue: 1.99,
    expiryDate: '2026-10-04T23:59:59Z',
    expiryDisplay: '8 days left',
    isUrgent: false,
    freshnessPercent: 88,
    iconName: 'nutrition',
    status: 'fresh',
    openedState: 'Sealed Bag'
  },
  {
    id: 'item-12',
    name: 'Garlic Bulbs',
    category: 'Pantry Staples',
    location: 'Pantry Shelf',
    quantity: '3 heads',
    estimatedValue: 1.50,
    expiryDate: '2026-10-25T23:59:59Z',
    expiryDisplay: '29 days left',
    isUrgent: false,
    iconName: 'flare',
    status: 'fresh',
    openedState: 'Dry Storage'
  },
  {
    id: 'item-13',
    name: 'Organic Fusilli Pasta',
    category: 'Pantry Staples',
    location: 'Pantry Shelf',
    quantity: '500g',
    estimatedValue: 2.20,
    expiryDate: '2027-04-10T23:59:59Z',
    expiryDisplay: '6 mos left',
    isUrgent: false,
    iconName: 'grain',
    status: 'fresh',
    openedState: 'Dry Storage'
  }
];

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'recipe-pasta',
    title: 'Creamy Garlic & Spinach Pasta with Toasted Sourdough Crumbs',
    tag: 'Top Match for Tonight',
    cookTimeMins: 15,
    difficulty: 'Easy Prep',
    calories: 480,
    pantryMatchPercent: 92,
    savedDollars: 7.30,
    imageUrl: ASSETS.PASTA_HERO,
    urgentIngredientsUsed: ['Greek Yogurt', 'Baby Spinach', 'Sourdough Loaf'],
    zeroWasteSmartSwap: 'Missing heavy cream? Substituted with your expiring Greek yogurt + splash of warm pasta water!',
    dietaryTags: ['Under 20 Mins', 'High Protein', 'Vegetarian', 'One-Pan'],
    allIngredients: [
      { name: 'Organic Greek Yogurt', amount: '150g', isExpiring: true, onHand: true },
      { name: 'Baby Spinach', amount: '120g', isExpiring: true, onHand: true },
      { name: 'Sourdough Slice', amount: '1 thick slice (crumbled)', isExpiring: true, onHand: true },
      { name: 'Pasta (Fusilli or Penne)', amount: '200g', onHand: true },
      { name: 'Garlic cloves', amount: '2 cloves, minced', onHand: true },
      { name: 'Olive oil & Black Pepper', amount: '1 tbsp + pinch', onHand: true }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Boil salted water in a pot and cook pasta until al dente (approx. 9 mins). Reserve 1/2 cup of starchy pasta water before draining.',
        durationSeconds: 540,
        proTip: 'The starchy cooking water is the secret emulsion agent that keeps yogurt silky without curdling.'
      },
      {
        stepNumber: 2,
        instruction: 'In a hot skillet with 1 tsp olive oil, toast the sourdough breadcrumbs with a pinch of sea salt and pepper for 2–3 minutes until crunchy and golden. Set aside.',
        durationSeconds: 180,
        proTip: 'Toasting stale bread unlocks a nutty aroma and creates a parmesan-like textural crunch.'
      },
      {
        stepNumber: 3,
        instruction: 'In the same warm skillet, sauté minced garlic for 30 seconds, then toss in the entire bowl of baby spinach until vibrant and gently wilted (about 60 seconds).',
        durationSeconds: 90
      },
      {
        stepNumber: 4,
        instruction: 'Turn off the heat! Stir in the Greek yogurt and 3 tablespoons of warm pasta water until creamy. Toss with warm pasta, top with crunchy sourdough crumbs, and serve immediately.',
        durationSeconds: 120,
        proTip: 'Never boil Greek yogurt directly over high heat—turn off burner and let residual warmth gently create the velvety sauce.'
      }
    ]
  },
  {
    id: 'recipe-french-toast',
    title: 'Crispy Sourdough Strawberry French Toast Bites',
    tag: 'Breakfast Rescue',
    cookTimeMins: 10,
    difficulty: 'Super Fast',
    calories: 360,
    pantryMatchPercent: 96,
    savedDollars: 5.80,
    imageUrl: ASSETS.FRENCH_TOAST,
    urgentIngredientsUsed: ['Fresh Strawberries', 'Sourdough Loaf'],
    zeroWasteSmartSwap: 'Use slightly stale sourdough cubes to absorb the egg custard without becoming soggy.',
    dietaryTags: ['Under 20 Mins', 'Vegetarian', 'Sweet Treat'],
    allIngredients: [
      { name: 'Fresh Strawberries', amount: '150g, sliced', isExpiring: true, onHand: true },
      { name: 'Sourdough Loaf', amount: '3 thick slices cubed', isExpiring: true, onHand: true },
      { name: 'Free-range Eggs', amount: '2 whole eggs', onHand: true },
      { name: 'Almond Milk', amount: '3 tbsp', onHand: true },
      { name: 'Cinnamon & honey', amount: '1/2 tsp each', onHand: true }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Whisk eggs, almond milk, and ground cinnamon in a shallow dish.',
        durationSeconds: 60
      },
      {
        stepNumber: 2,
        instruction: 'Toss sourdough cubes into the egg mixture until lightly coated on all sides.',
        durationSeconds: 90
      },
      {
        stepNumber: 3,
        instruction: 'Pan sear in a buttered skillet over medium heat for 4 minutes until each side is caramelized and crisp.',
        durationSeconds: 240
      },
      {
        stepNumber: 4,
        instruction: 'Top with sliced ripe strawberries, a drizzle of honey, and serve hot.',
        durationSeconds: 60
      }
    ]
  },
  {
    id: 'recipe-frittata',
    title: 'Golden Vegetable Frittata',
    tag: 'Skillet Wonder',
    cookTimeMins: 18,
    difficulty: 'Easy Prep',
    calories: 410,
    pantryMatchPercent: 90,
    savedDollars: 6.40,
    imageUrl: ASSETS.FRITTATA,
    urgentIngredientsUsed: ['Baby Spinach', 'Red Bell Peppers'],
    zeroWasteSmartSwap: 'Feta or cheddar ends melt into savory pockets of umami throughout the fluffy egg base.',
    dietaryTags: ['Under 20 Mins', 'High Protein', 'Vegetarian', 'One-Pan'],
    allIngredients: [
      { name: 'Baby Spinach', amount: '80g', isExpiring: true, onHand: true },
      { name: 'Red Bell Peppers', amount: '1 diced', onHand: true },
      { name: 'Free-range Organic Eggs', amount: '5 eggs', onHand: true },
      { name: 'Feta or Cheddar Cheese', amount: '60g crumbled', onHand: true },
      { name: 'Olive oil', amount: '1 tbsp', onHand: true }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Sauté diced bell peppers in an oven-safe skillet with olive oil for 3 minutes until tender.',
        durationSeconds: 180
      },
      {
        stepNumber: 2,
        instruction: 'Add spinach leaves and stir until wilted (1 min).',
        durationSeconds: 60
      },
      {
        stepNumber: 3,
        instruction: 'Pour in beaten eggs seasoned with salt and pepper. Scatter cheese on top.',
        durationSeconds: 90
      },
      {
        stepNumber: 4,
        instruction: 'Cook on low heat covered for 8–10 minutes until center is puffed and set. Slice into wedges.',
        durationSeconds: 600
      }
    ]
  },
  {
    id: 'recipe-minestrone',
    title: 'Quick Fridge-Clearout Minestrone',
    tag: 'Pantry Clearout',
    cookTimeMins: 20,
    difficulty: 'Beginner',
    calories: 320,
    pantryMatchPercent: 88,
    savedDollars: 4.50,
    imageUrl: ASSETS.MINESTRONE,
    urgentIngredientsUsed: ['Baby Spinach', 'Baby Carrots'],
    zeroWasteSmartSwap: 'Throw in parmesan rinds or vegetable scrap broth to build incredible depth of flavor.',
    dietaryTags: ['Vegetarian', 'One-Pan', 'Pantry Staples'],
    allIngredients: [
      { name: 'Baby Carrots & Spinach', amount: '1 cup mixed', isExpiring: true, onHand: true },
      { name: 'Diced canned tomatoes', amount: '1 can (400g)', onHand: true },
      { name: 'Pasta ends or beans', amount: '1/2 cup', onHand: true },
      { name: 'Vegetable broth', amount: '3 cups', onHand: true },
      { name: 'Italian herbs & garlic', amount: '1 tsp', onHand: true }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Sauté carrots and aromatics in olive oil in a Dutch oven for 3 minutes.',
        durationSeconds: 180
      },
      {
        stepNumber: 2,
        instruction: 'Add canned tomatoes, broth, and pasta ends. Bring to a boil.',
        durationSeconds: 300
      },
      {
        stepNumber: 3,
        instruction: 'Simmer on medium heat for 10 minutes until pasta and carrots are tender.',
        durationSeconds: 600
      },
      {
        stepNumber: 4,
        instruction: 'Fold in spinach right at the end and ladle into bowls.',
        durationSeconds: 120
      }
    ]
  }
];

export const INITIAL_TROPHIES: KitchenTrophy[] = [
  {
    id: 'trophy-crisper',
    title: 'Crisper Champion',
    description: 'Rescued 10 crisp vegetables before spoiling',
    icon: 'emoji_events',
    isUnlocked: true,
    badgeEmoji: '🏆'
  },
  {
    id: 'trophy-penny',
    title: 'Penny Pincher',
    description: 'Prevented >$100 in discarded grocery waste',
    icon: 'paid',
    isUnlocked: true,
    badgeEmoji: '💰'
  },
  {
    id: 'trophy-magician',
    title: 'Leftover Magician',
    description: 'Cooked 5 AI pantry rescue recipes',
    icon: 'auto_awesome',
    isUnlocked: true,
    badgeEmoji: '✨'
  },
  {
    id: 'trophy-freeze',
    title: 'Master Freezen',
    description: 'Freeze 3 more perishable items',
    icon: 'ac_unit',
    isUnlocked: false,
    progressCurrent: 7,
    progressTotal: 10
  }
];

export const INITIAL_IMPACT_STATS: ImpactStats = {
  vitalityScore: 94,
  dollarsSaved: 142.80,
  co2OffsetKg: 18.4,
  rescuedLbs: 14.2,
  streakDays: 14,
  zeroWastePercent: 94,
  communityWeeklyLbs: 42000,
  categoryDistribution: {
    produce: 48,
    dairy: 26,
    bakery: 16,
    pantry: 10
  }
};

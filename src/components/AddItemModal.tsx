import React, { useState } from 'react';
import { PantryItem, CategoryType } from '../types';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: PantryItem) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAddItem }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [category, setCategory] = useState<CategoryType>('Produce');
  const [location, setLocation] = useState('Crisper Drawer');
  const [quantity, setQuantity] = useState('1 pack');
  const [estimatedValue, setEstimatedValue] = useState('3.50');
  const [expiryDays, setExpiryDays] = useState('5');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const days = parseInt(expiryDays, 10) || 5;
    const isUrgent = days <= 2;
    const expiryDate = new Date(Date.now() + days * 86400000).toISOString();

    const newItem: PantryItem = {
      id: `item-${Date.now()}`,
      name: name.trim(),
      category,
      location,
      quantity: quantity.trim() || '1 item',
      estimatedValue: parseFloat(estimatedValue) || 3.00,
      expiryDate,
      expiryDisplay: days === 0 ? 'Tonight!' : days === 1 ? 'Tomorrow' : `${days} days left`,
      isUrgent,
      freshnessPercent: Math.max(10, Math.min(100, Math.round((days / 10) * 100))),
      status: isUrgent ? 'urgent' : 'fresh',
      iconName: category === 'Dairy & Deli' ? 'local_cafe' : category === 'Produce' ? 'eco' : 'inventory_2',
      openedState: 'Recently Added'
    };

    onAddItem(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#eae1da]">
        <div className="p-4 border-b border-[#eae1da] flex items-center justify-between bg-[#fff8f5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#d9e9b9] text-[#00652c] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1f1b17]">Log New Pantry Item</h3>
              <p className="text-[10px] text-[#3f493f]">Auto-syncs with smart expiry prediction</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6ece6] hover:bg-[#eae1da] flex items-center justify-center text-[#1f1b17]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1f1b17] mb-1">Item Name</label>
            <input
              type="text"
              required
              placeholder="e.g., Avocados, Oat Milk, Sourdough"
              className="w-full h-11 px-3 rounded-xl border border-[#eae1da] bg-[#fcf2eb] text-sm text-[#1f1b17] focus:outline-none focus:border-[#00652c]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1f1b17] mb-1">Category</label>
              <select
                className="w-full h-10 px-2 rounded-xl border border-[#eae1da] bg-[#fcf2eb] text-xs font-semibold text-[#1f1b17] focus:outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
              >
                <option value="Produce">Produce</option>
                <option value="Dairy & Deli">Dairy & Deli</option>
                <option value="Bakery & Grains">Bakery & Grains</option>
                <option value="Pantry Staples">Pantry Staples</option>
                <option value="Meat & Seafood">Meat & Seafood</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1f1b17] mb-1">Storage Shelf</label>
              <select
                className="w-full h-10 px-2 rounded-xl border border-[#eae1da] bg-[#fcf2eb] text-xs font-semibold text-[#1f1b17] focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="Crisper Drawer">Crisper Drawer</option>
                <option value="Middle Shelf">Middle Shelf</option>
                <option value="Top Shelf">Top Shelf</option>
                <option value="Fridge Door">Fridge Door</option>
                <option value="Dairy Drawer">Dairy Drawer</option>
                <option value="Counter Basket">Counter Basket</option>
                <option value="Pantry Shelf">Pantry Shelf</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1f1b17] mb-1">Quantity</label>
              <input
                type="text"
                placeholder="e.g. 500g"
                className="w-full h-10 px-2.5 rounded-xl border border-[#eae1da] bg-[#fcf2eb] text-xs text-[#1f1b17] focus:outline-none"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1f1b17] mb-1">Est. Value ($)</label>
              <input
                type="number"
                step="0.10"
                className="w-full h-10 px-2.5 rounded-xl border border-[#eae1da] bg-[#fcf2eb] text-xs text-[#1f1b17] focus:outline-none"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1f1b17] mb-1">Expires In (Days)</label>
              <input
                type="number"
                min="0"
                max="60"
                className="w-full h-10 px-2.5 rounded-xl border border-[#eae1da] bg-[#fcf2eb] text-xs text-[#1f1b17] focus:outline-none"
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 rounded-full bg-[#00652c] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#15803d] shadow-sm transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">check</span>
              <span>Save Item to Pantry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

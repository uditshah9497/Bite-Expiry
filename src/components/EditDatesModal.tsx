import React, { useState } from 'react';

interface DetectedChip {
  id: string;
  name: string;
  quantity: string;
  category: 'Dairy & Deli' | 'Produce' | 'Bakery & Grains' | 'Pantry Staples';
  location: string;
  estimatedValue: number;
  expiryDisplay: string;
  expiryDate: string;
}

interface EditDatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: DetectedChip[];
  onSave: (updated: DetectedChip[]) => void;
}

export const EditDatesModal: React.FC<EditDatesModalProps> = ({
  isOpen,
  onClose,
  items,
  onSave
}) => {
  if (!isOpen) return null;

  const [editableItems, setEditableItems] = useState<DetectedChip[]>([...items]);

  const handleExpiryChange = (id: string, newDaysStr: string) => {
    const days = parseInt(newDaysStr, 10) || 3;
    setEditableItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          expiryDisplay: `${days}d left`,
          expiryDate: new Date(Date.now() + days * 86400000).toISOString()
        };
      })
    );
  };

  const handleSave = () => {
    onSave(editableItems);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#eae1da]">
        <div className="p-4 border-b border-[#eae1da] flex items-center justify-between bg-[#fff8f5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#d9e9b9] text-[#00652c] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1f1b17]">Edit Predicted Expiries</h3>
              <p className="text-[10px] text-[#3f493f]">Fine-tune shelf life for auto-tagged items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6ece6] hover:bg-[#eae1da] flex items-center justify-center text-[#1f1b17]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
          {editableItems.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-[#fcf2eb] border border-[#eae1da] flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-bold text-[#1f1b17]">{item.name}</p>
                <p className="text-[10px] text-[#3f493f]">
                  {item.quantity} • {item.location}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="1"
                  max="45"
                  className="w-16 h-8 px-2 rounded-lg bg-white border border-[#eae1da] text-xs font-bold text-center text-[#1f1b17]"
                  defaultValue={parseInt(item.expiryDisplay, 10) || 5}
                  onChange={(e) => handleExpiryChange(item.id, e.target.value)}
                />
                <span className="text-xs text-[#3f493f] font-semibold">days</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#eae1da] bg-[#fff8f5]">
          <button
            onClick={handleSave}
            className="w-full h-11 rounded-full bg-[#00652c] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#15803d]"
          >
            <span className="material-symbols-outlined text-[16px]">check</span>
            <span>Apply Expiry Dates</span>
          </button>
        </div>
      </div>
    </div>
  );
};

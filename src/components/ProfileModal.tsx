import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetData: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onResetData }) => {
  if (!isOpen) return null;

  const [dietary, setDietary] = useState<Record<string, boolean>>({
    Vegetarian: true,
    'Dairy Friendly': true,
    'Nut Free': false,
    'Gluten Conscious': false
  });
  const [householdSize, setHouseholdSize] = useState('2 people');
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#eae1da]">
        <div className="p-4 border-b border-[#eae1da] flex items-center justify-between bg-[#fff8f5]">
          <div className="flex items-center gap-2">
            <img
              src={ASSETS.AVATAR}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#d9e9b9]"
            />
            <div>
              <h3 className="text-sm font-bold text-[#1f1b17]">Chef Alex Morales</h3>
              <p className="text-[10px] text-[#00652c] font-semibold">Pantry Alive • Level 5 Eco Master</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6ece6] hover:bg-[#eae1da] flex items-center justify-center text-[#1f1b17]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Household Size */}
          <div>
            <label className="block text-xs font-bold text-[#1f1b17] mb-1">Household Size</label>
            <div className="grid grid-cols-3 gap-2">
              {['1 person', '2 people', 'Family 4+'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setHouseholdSize(size)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                    householdSize === size
                      ? 'bg-[#00652c] text-white border-[#00652c]'
                      : 'bg-[#fcf2eb] text-[#1f1b17] border-[#eae1da]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Preferences */}
          <div>
            <label className="block text-xs font-bold text-[#1f1b17] mb-1">
              Dietary Recipe Filters
            </label>
            <div className="space-y-2">
              {Object.keys(dietary).map((diet) => (
                <div
                  key={diet}
                  onClick={() => setDietary((prev) => ({ ...prev, [diet]: !prev[diet] }))}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#fcf2eb] border border-[#eae1da] cursor-pointer hover:bg-[#f6ece6]"
                >
                  <span className="text-xs font-semibold text-[#1f1b17]">{diet}</span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center ${
                      dietary[diet] ? 'bg-[#00652c] text-white' : 'border border-[#6f7a6e]'
                    }`}
                  >
                    {dietary[diet] && (
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification toggles */}
          <div className="p-3 rounded-2xl bg-[#f6ece6] border border-[#eae1da] flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#1f1b17]">Daily Smart Rescue Alerts</p>
              <p className="text-[10px] text-[#3f493f]">Notify 24h before produce spoils</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                notifications ? 'bg-[#00652c]' : 'bg-[#eae1da]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Reset Demo Data button */}
          <div className="pt-2">
            <button
              onClick={() => {
                onResetData();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl border border-[#ba1a1a]/30 text-[#ba1a1a] hover:bg-[#ffdad6]/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Reset Demo Pantry &amp; Rescues</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

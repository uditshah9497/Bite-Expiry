import React, { useState, useRef, useEffect } from 'react';
import { ASSETS } from '../data/mockData';
import { PantryItem } from '../types';

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

interface AiSnapViewProps {
  onSaveToPantry: (newItems: PantryItem[]) => void;
  onOpenManualAdd: () => void;
  onOpenEditDates: (items: DetectedChip[], onUpdate: (updated: DetectedChip[]) => void) => void;
  onNavigateToRecipes: () => void;
}

export const AiSnapView: React.FC<AiSnapViewProps> = ({
  onSaveToPantry,
  onOpenManualAdd,
  onOpenEditDates,
  onNavigateToRecipes
}) => {
  const [flashActive, setFlashActive] = useState(false);
  const [visionMode, setVisionMode] = useState<'Fridge Cam' | 'Barcode' | 'Receipt'>('Fridge Cam');
  const [isScanning, setIsScanning] = useState(false);
  const [useLiveCamera, setUseLiveCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);
  const [arOverlaysVisible, setArOverlaysVisible] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Scanned item chips currently in drawer
  const [detectedChips, setDetectedChips] = useState<DetectedChip[]>([
    {
      id: 'snap-1',
      name: 'Organic Whole Milk',
      quantity: '1 gal',
      category: 'Dairy & Deli',
      location: 'Top Shelf',
      estimatedValue: 4.29,
      expiryDisplay: '6d left',
      expiryDate: '2026-10-02T23:59:59Z'
    },
    {
      id: 'snap-2',
      name: 'Red Bell Peppers',
      quantity: '×3',
      category: 'Produce',
      location: 'Crisper Drawer',
      estimatedValue: 3.49,
      expiryDisplay: '5d left',
      expiryDate: '2026-10-01T23:59:59Z'
    },
    {
      id: 'snap-3',
      name: 'Feta Cheese',
      quantity: '200g',
      category: 'Dairy & Deli',
      location: 'Dairy Drawer',
      estimatedValue: 3.79,
      expiryDisplay: '14d left',
      expiryDate: '2026-10-10T23:59:59Z'
    },
    {
      id: 'snap-4',
      name: 'Baby Carrots',
      quantity: '1 lb',
      category: 'Produce',
      location: 'Crisper Drawer',
      estimatedValue: 1.99,
      expiryDisplay: '8d left',
      expiryDate: '2026-10-04T23:59:59Z'
    }
  ]);

  // Clean up live stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleLiveCamera = async () => {
    if (useLiveCamera) {
      // Switch back to photo mode
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      setUseLiveCamera(false);
      setCameraError(null);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setUseLiveCamera(true);
        setCameraError(null);
      } catch (err) {
        console.error('Camera access error:', err);
        setCameraError('Camera permission not available. Using neural fridge backdrop.');
        setTimeout(() => setCameraError(null), 3000);
      }
    }
  };

  const handleShutter = () => {
    setIsScanning(true);
    // Play subtle synthetic camera shutter chime
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch {
      // AudioContext optional
    }

    setTimeout(() => {
      setIsScanning(false);
      // Ensure chips are present
      if (detectedChips.length === 0) {
        handleRescan();
      }
    }, 700);
  };

  const handleRemoveChip = (id: string) => {
    setDetectedChips((prev) => prev.filter((c) => c.id !== id));
  };

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setDetectedChips([
        {
          id: 'snap-1',
          name: 'Organic Whole Milk',
          quantity: '1 gal',
          category: 'Dairy & Deli',
          location: 'Top Shelf',
          estimatedValue: 4.29,
          expiryDisplay: '6d left',
          expiryDate: '2026-10-02T23:59:59Z'
        },
        {
          id: 'snap-2',
          name: 'Red Bell Peppers',
          quantity: '×3',
          category: 'Produce',
          location: 'Crisper Drawer',
          estimatedValue: 3.49,
          expiryDisplay: '5d left',
          expiryDate: '2026-10-01T23:59:59Z'
        },
        {
          id: 'snap-3',
          name: 'Feta Cheese',
          quantity: '200g',
          category: 'Dairy & Deli',
          location: 'Dairy Drawer',
          estimatedValue: 3.79,
          expiryDisplay: '14d left',
          expiryDate: '2026-10-10T23:59:59Z'
        },
        {
          id: 'snap-4',
          name: 'Baby Carrots',
          quantity: '1 lb',
          category: 'Produce',
          location: 'Crisper Drawer',
          estimatedValue: 1.99,
          expiryDisplay: '8d left',
          expiryDate: '2026-10-04T23:59:59Z'
        }
      ]);
      setIsScanning(false);
    }, 600);
  };

  const handleSaveToPantry = () => {
    if (detectedChips.length === 0) return;

    const newPantryItems: PantryItem[] = detectedChips.map((chip, idx) => ({
      id: `saved-${Date.now()}-${idx}`,
      name: chip.name,
      category: chip.category,
      location: chip.location,
      quantity: chip.quantity,
      estimatedValue: chip.estimatedValue,
      expiryDate: chip.expiryDate,
      expiryDisplay: chip.expiryDisplay,
      isUrgent: false,
      freshnessPercent: 95,
      status: 'fresh',
      iconName: chip.category === 'Dairy & Deli' ? 'local_cafe' : 'eco',
      openedState: 'Recently Scanned'
    }));

    onSaveToPantry(newPantryItems);
    setSaveSuccessToast(true);

    setTimeout(() => {
      setSaveSuccessToast(false);
      onNavigateToRecipes();
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Toast Notification */}
      {saveSuccessToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#00652c] text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>4 Scanned Items Saved to Pantry! Generating Recipes...</span>
        </div>
      )}

      {cameraError && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#ba1a1a] text-white text-xs font-medium shadow-md">
          {cameraError}
        </div>
      )}

      {/* Viewfinder Stage */}
      <div className="relative w-full overflow-hidden bg-[#342f2b] shadow-xl rounded-b-[2rem]">
        {/* Viewfinder Mock / Live Viewport */}
        <div
          className="relative w-full h-[430px] bg-cover bg-center flex flex-col justify-between p-5 select-none overflow-hidden"
          style={{
            backgroundImage: useLiveCamera ? 'none' : `url('${ASSETS.FRIDGE_BG}')`
          }}
        >
          {/* Live Webcam if toggled */}
          {useLiveCamera && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Flashlight Beam Overlay */}
          {flashActive && (
            <div className="absolute inset-0 bg-white/20 pointer-events-none z-15 backdrop-brightness-125 transition-all"></div>
          )}

          {/* Scanning Flash overlay when shutter clicked */}
          {isScanning && (
            <div className="absolute inset-0 bg-white/70 pointer-events-none z-30 transition-opacity duration-150 animate-pulse"></div>
          )}

          {/* Deep HUD Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#342f2b]/80 via-transparent to-[#342f2b]/90 pointer-events-none"></div>

          {/* Live Neural Scanline Effect */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#95f8a7] to-transparent opacity-75 shadow-[0_0_12px_#95f8a7] pointer-events-none animate-[bounce_4s_infinite]"></div>

          {/* Top Scanner Controls & Mode Toggle */}
          <div className="relative z-20 flex flex-col gap-3 w-full">
            {/* Utility Top Icons: Flash, Flip, AR Switch */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setFlashActive(!flashActive)}
                className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all active:scale-90 shadow-md ${
                  flashActive
                    ? 'bg-[#ffddb8] text-[#7b4d00] ring-2 ring-[#ffb95f]'
                    : 'bg-[#342f2b]/60 text-white'
                }`}
                title="Toggle Torch/Flash"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {flashActive ? 'flash_on' : 'flash_off'}
                </span>
              </button>

              {/* Neural Processing Pill Indicator */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#342f2b]/75 backdrop-blur-md shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#95f8a7] animate-ping"></span>
                <span className="text-[10px] text-[#95f8a7] font-bold uppercase tracking-wider">
                  Vision Engine 4.2
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleLiveCamera}
                  className="w-10 h-10 rounded-full bg-[#342f2b]/60 backdrop-blur-md text-white flex items-center justify-center transition-transform active:scale-90 shadow-md"
                  title={useLiveCamera ? 'Switch to Preset Fridge Image' : 'Open Device Camera'}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    flip_camera_ios
                  </span>
                </button>
                <button
                  onClick={() => setArOverlaysVisible(!arOverlaysVisible)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-md ${
                    arOverlaysVisible
                      ? 'bg-[#15803d] text-white'
                      : 'bg-[#342f2b]/60 text-white/60'
                  }`}
                  title="Toggle AR Bounding Boxes"
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    view_in_ar
                  </span>
                </button>
              </div>
            </div>

            {/* Vision Modes Switcher */}
            <div className="flex items-center justify-center">
              <div className="inline-flex p-1 rounded-full bg-[#342f2b]/80 backdrop-blur-xl shadow-lg border border-white/10">
                {(['Fridge Cam', 'Barcode', 'Receipt'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setVisionMode(mode)}
                    className={`px-3.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all ${
                      visionMode === mode
                        ? 'bg-[#00652c] text-white shadow-sm'
                        : 'text-white/80 hover:text-white'
                    }`}
                    type="button"
                  >
                    {mode === 'Fridge Cam' && (
                      <span className="material-symbols-outlined text-[13px]">view_in_ar</span>
                    )}
                    {mode === 'Barcode' && (
                      <span className="material-symbols-outlined text-[13px]">barcode_scanner</span>
                    )}
                    {mode === 'Receipt' && (
                      <span className="material-symbols-outlined text-[13px]">receipt_long</span>
                    )}
                    <span>{mode}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AR HUD Reticles & Bounding Boxes in Viewport */}
          {arOverlaysVisible && (
            <div className="relative z-15 w-full h-full flex flex-col justify-center">
              {/* Target Box 1: Milk (Green Fresh AR) */}
              <div className="absolute left-1 top-20 w-44 rounded-xl p-2 bg-[#342f2b]/80 backdrop-blur-md shadow-[0_0_20px_rgba(21,128,61,0.4)] border border-[#95f8a7]/40 animate-fade-in">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="px-1.5 py-0.2 rounded bg-[#00652c] text-white text-[9px] font-bold">
                    98% Match
                  </span>
                  <span className="material-symbols-outlined text-[#95f8a7] text-[15px]">
                    verified
                  </span>
                </div>
                <p className="text-xs text-white font-bold leading-tight">Whole Milk (1 gal)</p>
                <div className="flex items-center gap-1 mt-0.5 text-[#95f8a7] text-[10px] font-semibold">
                  <span className="material-symbols-outlined text-[12px]">calendar_clock</span>
                  <span>Exp: Mar 28 (6d left)</span>
                </div>
              </div>

              {/* Target Box 2: Bell Peppers (Yellow Ripeness Metric) */}
              <div className="absolute right-1 top-12 w-44 rounded-xl p-2 bg-[#342f2b]/80 backdrop-blur-md shadow-[0_0_20px_rgba(255,185,95,0.3)] border border-[#ffb95f]/40 animate-fade-in">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="px-1.5 py-0.2 rounded bg-[#9c6300] text-white text-[9px] font-bold">
                    94% Match
                  </span>
                  <span className="text-[10px] text-[#ffddb8] font-bold">Qty: 3</span>
                </div>
                <p className="text-xs text-white font-bold leading-tight">Bell Peppers</p>
                <div className="flex items-center gap-1 mt-0.5 text-[#ffddb8] text-[10px] font-semibold">
                  <span className="material-symbols-outlined text-[12px]">eco</span>
                  <span>Crispness: 72%</span>
                </div>
              </div>

              {/* Target Box 3: Feta Cheese (Cyan/Subtle AR Card) */}
              <div className="absolute left-6 bottom-3 w-40 rounded-xl p-2 bg-[#342f2b]/80 backdrop-blur-md shadow-[0_0_18px_rgba(149,248,167,0.3)] border border-[#95f8a7]/30 animate-fade-in">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="px-1.5 py-0.2 rounded bg-[#55633d] text-white text-[9px] font-bold">
                    91% Match
                  </span>
                  <span className="material-symbols-outlined text-[#d9e9b9] text-[15px]">
                    auto_awesome
                  </span>
                </div>
                <p className="text-xs text-white font-bold leading-tight">Feta Block 200g</p>
                <p className="text-white/80 text-[10px] mt-0.5">Sealed Pack</p>
              </div>
            </div>
          )}

          {/* Shutter & Quick Status Strip */}
          <div className="relative z-20 flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5 text-white/90 text-[10px] font-semibold bg-[#342f2b]/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
              <span className="material-symbols-outlined text-[#95f8a7] text-[15px]">
                crop_free
              </span>
              <span>Hold steady • {detectedChips.length} locked</span>
            </div>

            {/* Shutter Button Trigger */}
            <button
              onClick={handleShutter}
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center p-1 shadow-lg transition-transform active:scale-90 focus:outline-none"
              type="button"
              title="Capture Frame"
            >
              <div className="w-full h-full rounded-full bg-[#00652c] hover:bg-[#15803d] flex items-center justify-center shadow-inner transition-colors">
                <span className="material-symbols-outlined text-white text-[24px]">
                  camera
                </span>
              </div>
            </button>

            <button
              onClick={handleRescan}
              className="w-10 h-10 rounded-full bg-[#342f2b]/60 backdrop-blur-md text-white flex items-center justify-center transition-transform active:scale-90 shadow-md"
              title="Rescan Items"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Recognition Drawer Sheet */}
      <div className="px-5 -mt-3 flex flex-col gap-4 z-20">
        {/* Main Drawer Card */}
        <div className="bg-white rounded-3xl p-5 shadow-xl border border-[#eae1da]/80 flex flex-col gap-4">
          {/* Sheet Header & Recognition Counter */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#d9e9b9] text-[#5b6943] flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <div>
                <h2 className="text-[17px] font-bold text-[#1f1b17] leading-tight">
                  Detected {detectedChips.length} Pantry Items
                </h2>
                <p className="text-[11px] text-[#3f493f]">
                  Tap any tag to adjust quantity or shelf
                </p>
              </div>
            </div>
            <button
              onClick={handleRescan}
              className="text-[#00652c] text-xs font-bold flex items-center gap-0.5 hover:underline py-1"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">refresh</span>
              Rescan
            </button>
          </div>

          {/* Scanned Item Multi-Chips Flow */}
          <div className="flex flex-wrap gap-2">
            {detectedChips.map((chip) => (
              <div
                key={chip.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fcf2eb] text-[#1f1b17] border border-[#eae1da]/70 transition-colors hover:bg-[#f6ece6]"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    chip.category === 'Produce'
                      ? 'bg-[#15803d]'
                      : chip.category === 'Dairy & Deli'
                      ? 'bg-[#55633d]'
                      : 'bg-[#9c6300]'
                  }`}
                ></span>
                <span className="text-xs font-bold">{chip.name}</span>
                <span className="text-[#3f493f] text-[10px] font-semibold">{chip.quantity}</span>
                <button
                  onClick={() => handleRemoveChip(chip.id)}
                  className="text-[#3f493f] hover:text-[#ba1a1a] flex items-center ml-0.5 p-0.5"
                  title="Remove item"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            ))}

            {detectedChips.length === 0 && (
              <p className="text-xs text-[#6f7a6e] italic py-2">
                No items detected in current snapshot. Tap Rescan or point the camera at your pantry.
              </p>
            )}
          </div>

          {/* Micro-Details Preview Strip */}
          <div className="p-3 rounded-2xl bg-[#fcf2eb] flex items-center justify-between border border-[#eae1da]/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#00652c] shadow-xs">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              </div>
              <div>
                <p className="text-[10px] text-[#3f493f]">Predicted Smart Expiries</p>
                <p className="text-xs text-[#1f1b17] font-bold">Mar 26 – Apr 04 auto-tagged</p>
              </div>
            </div>
            <button
              onClick={() => onOpenEditDates(detectedChips, setDetectedChips)}
              className="text-[11px] text-[#00652c] font-bold px-2.5 py-1 rounded-lg bg-white border border-[#eae1da]/70 hover:bg-[#f6ece6] transition-colors"
              type="button"
            >
              Edit Dates
            </button>
          </div>

          {/* Action Stack */}
          <div className="flex flex-col gap-2.5 pt-1">
            <button
              onClick={handleSaveToPantry}
              disabled={detectedChips.length === 0}
              className={`w-full h-12 rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98] ${
                detectedChips.length > 0
                  ? 'bg-[#00652c] text-white shadow-[#00652c]/20 hover:bg-[#15803d]'
                  : 'bg-[#eae1da] text-[#6f7a6e] cursor-not-allowed'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              <span>Save to Pantry &amp; Generate Recipes</span>
            </button>

            <button
              onClick={onOpenManualAdd}
              className="w-full py-2.5 rounded-full bg-[#d9e9b9] text-[#5b6943] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors hover:bg-[#bdcc9e]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Scan Missed Something? Add Manually</span>
            </button>
          </div>
        </div>

        {/* Friendly Delight Tip Box */}
        <div className="px-4 py-3 rounded-2xl bg-[#f6ece6] flex items-start gap-2.5 border border-[#eae1da]/70">
          <span className="material-symbols-outlined text-[#55633d] text-[20px] shrink-0 mt-0.5">
            tips_and_updates
          </span>
          <p className="text-xs text-[#3f493f] leading-relaxed">
            <strong className="font-bold text-[#1f1b17]">Pro tip:</strong> Keep your fridge well-lit
            for optimal multi-item label reading and barcode capture without glare.
          </p>
        </div>
      </div>
    </div>
  );
};

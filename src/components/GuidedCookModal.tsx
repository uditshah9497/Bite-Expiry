import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';

interface GuidedCookModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onFinishCook: (recipe: Recipe) => void;
}

export const GuidedCookModal: React.FC<GuidedCookModalProps> = ({
  recipe,
  onClose,
  onFinishCook
}) => {
  if (!recipe) return null;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'steps' | 'ingredients'>('steps');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentStep = recipe.steps[currentStepIndex] || recipe.steps[0];
  const totalSteps = recipe.steps.length;

  // Initialize timer when step changes
  useEffect(() => {
    if (currentStep?.durationSeconds) {
      setTimerSeconds(currentStep.durationSeconds);
      setIsTimerRunning(false);
    } else {
      setTimerSeconds(0);
      setIsTimerRunning(false);
    }
  }, [currentStepIndex, currentStep]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            // Play alarm beep
            try {
              const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
              const osc = audioCtx.createOscillator();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(600, audioCtx.currentTime);
              osc.connect(audioCtx.destination);
              osc.start();
              osc.stop(audioCtx.currentTime + 0.3);
            } catch {
              // fallback
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  // Voice read step instruction
  const handleSpeakInstruction = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(
        `Step ${currentStep.stepNumber}. ${currentStep.instruction}`
      );
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleIngredient = (name: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-[#eae1da]">
        {/* Header */}
        <div className="p-4 border-b border-[#eae1da] flex items-center justify-between bg-[#fff8f5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#d9e9b9] text-[#00652c] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">skillet</span>
            </div>
            <div>
              <p className="text-[10px] text-[#55633d] uppercase font-bold tracking-wider">
                Guided Cook Mode
              </p>
              <h3 className="text-sm font-bold text-[#1f1b17] truncate max-w-[240px]">
                {recipe.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6ece6] hover:bg-[#eae1da] flex items-center justify-center text-[#1f1b17]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab switch: Steps vs Ingredients */}
        <div className="flex border-b border-[#eae1da] bg-[#fcf2eb]">
          <button
            onClick={() => setActiveTab('steps')}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'steps'
                ? 'border-[#00652c] text-[#00652c] bg-white'
                : 'border-transparent text-[#3f493f]'
            }`}
          >
            Cooking Steps ({currentStepIndex + 1}/{totalSteps})
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors ${
              activeTab === 'ingredients'
                ? 'border-[#00652c] text-[#00652c] bg-white'
                : 'border-transparent text-[#3f493f]'
            }`}
          >
            Pantry Ingredients ({recipe.allIngredients.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'steps' ? (
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="w-full bg-[#eae1da] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#00652c] h-full transition-all duration-300"
                  style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                ></div>
              </div>

              {/* Step Card */}
              <div className="bg-[#fcf2eb] rounded-2xl p-4 border border-[#eae1da]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00652c] text-white text-[10px] font-bold">
                    Step {currentStep.stepNumber} of {totalSteps}
                  </span>

                  <button
                    onClick={handleSpeakInstruction}
                    className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${
                      isSpeaking ? 'bg-[#ba1a1a] text-white animate-pulse' : 'bg-white text-[#00652c]'
                    }`}
                    title="Hands-free kitchen voice reader"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {isSpeaking ? 'volume_off' : 'volume_up'}
                    </span>
                    <span>{isSpeaking ? 'Stop Voice' : 'Read Aloud'}</span>
                  </button>
                </div>

                <p className="text-sm font-semibold text-[#1f1b17] leading-relaxed mt-2">
                  {currentStep.instruction}
                </p>

                {currentStep.proTip && (
                  <div className="mt-3 p-2.5 rounded-xl bg-[#ffddb8]/40 border border-[#ffddb8] flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#7b4d00] text-[16px] shrink-0 mt-0.5">
                      tips_and_updates
                    </span>
                    <p className="text-[11px] text-[#2a1700] leading-snug">
                      <strong className="font-bold">Pro-Tip:</strong> {currentStep.proTip}
                    </p>
                  </div>
                )}
              </div>

              {/* Kitchen Timer if step has duration */}
              {currentStep.durationSeconds && (
                <div className="rounded-2xl bg-white p-3.5 border border-[#eae1da] flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#f6ece6] flex items-center justify-center text-[#00652c]">
                      <span className="material-symbols-outlined text-[20px]">timer</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#3f493f]">Kitchen Step Timer</p>
                      <p className="text-xl font-extrabold text-[#1f1b17] font-mono tabular-nums">
                        {formatTimer(timerSeconds)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                        isTimerRunning
                          ? 'bg-[#ba1a1a] text-white'
                          : 'bg-[#00652c] text-white hover:bg-[#15803d]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        {isTimerRunning ? 'pause' : 'play_arrow'}
                      </span>
                      <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds(currentStep.durationSeconds || 0);
                      }}
                      className="w-8 h-8 rounded-full bg-[#f6ece6] text-[#3f493f] flex items-center justify-center hover:bg-[#eae1da]"
                      title="Reset Timer"
                    >
                      <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-[#3f493f]">
                Check off items as you gather them from your fridge and shelves:
              </p>
              {recipe.allIngredients.map((ing) => {
                const isChecked = !!checkedIngredients[ing.name];
                return (
                  <div
                    key={ing.name}
                    onClick={() => toggleIngredient(ing.name)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-[#d9e9b9]/40 border-[#bdcc9e]'
                        : 'bg-white border-[#eae1da] hover:bg-[#fcf2eb]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-[#00652c] text-white' : 'border border-[#6f7a6e]'
                        }`}
                      >
                        {isChecked && (
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        )}
                      </div>
                      <span
                        className={`text-xs font-semibold ${
                          isChecked ? 'line-through text-[#6f7a6e]' : 'text-[#1f1b17]'
                        }`}
                      >
                        {ing.name}
                      </span>
                      {ing.isExpiring && (
                        <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#ba1a1a] text-[9px] font-bold">
                          Expiring!
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#55633d] font-bold">{ing.amount}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-[#eae1da] bg-[#fff8f5] flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentStepIndex === 0}
            className={`px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-1 border border-[#eae1da] ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-[#eae1da]'
                : 'bg-white text-[#1f1b17] hover:bg-[#f6ece6]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back</span>
          </button>

          {currentStepIndex < totalSteps - 1 ? (
            <button
              onClick={() => setCurrentStepIndex((prev) => prev + 1)}
              className="flex-1 py-2.5 rounded-full bg-[#00652c] text-white text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#15803d] shadow-sm active:scale-95"
            >
              <span>Next Step</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={() => onFinishCook(recipe)}
              className="flex-1 py-2.5 rounded-full bg-[#15803d] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md hover:bg-[#00652c] active:scale-95 animate-pulse"
            >
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>I Finished Cooking! (+${recipe.savedDollars.toFixed(2)} Saved)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";

const GiftScratchCard = () => {
    const { settings } = useContext(ShopContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isScracked, setIsScracked] = useState(false);
    const [copied, setCopied] = useState(false);

    if (!settings || !settings.promoEnabled || !settings.promoText) {
        return null;
    }

    // Try to extract coupon code from settings.promoText (e.g. Code: FESTIVE15)
    const extractCouponCode = (text) => {
        const match = text.match(/code:\s*(\w+)/i) || text.match(/code\s+(\w+)/i);
        return match ? match[1].toUpperCase() : "ANKITA10";
    };

    const couponCode = extractCouponCode(settings.promoText);

    const handleCopy = () => {
        navigator.clipboard.writeText(couponCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            {/* Floating Pulse Golden Gift Button */}
            <div className="fixed bottom-6 right-6 z-40 group">
                <div className="absolute inset-0 bg-yellow-500 rounded-full blur-md opacity-70 group-hover:opacity-100 animate-ping duration-1000"></div>
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 text-gray-950 p-4 rounded-full shadow-2xl flex items-center justify-center border border-yellow-300 hover:scale-110 active:scale-95 transition duration-300 cursor-pointer"
                    title="Unlock Ankita's Gift!"
                >
                    <span className="text-xl sm:text-2xl animate-bounce">🎁</span>
                    {/* Tooltip */}
                    <span className="absolute right-14 bg-gray-950 text-amber-200 text-[10px] font-bold py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap border border-yellow-500/20 shadow-lg pointer-events-none font-sans">
                        ✨ Open Ankita's Blessing!
                    </span>
                </button>
            </div>

            {/* Premium Card Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex justify-center items-center z-50 p-4">
                    <div className="bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border border-yellow-500/30 p-5 sm:p-8 rounded-3xl shadow-2xl w-full max-w-[340px] sm:max-w-sm relative text-center overflow-hidden animate-scale-up">
                        {/* Sparkle background effects */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        {/* Close button */}
                        <button
                            onClick={() => { setIsOpen(false); setIsScracked(false); }}
                            className="absolute top-4 right-4 text-stone-400 hover:text-white text-lg transition cursor-pointer"
                        >
                            ✕
                        </button>

                        <div className="mb-4">
                            <span className="text-3xl sm:text-4xl">👑</span>
                            <h3 className="font-serif text-base sm:text-lg font-bold text-amber-400 mt-2 tracking-wide uppercase">HandCrafted Blessing</h3>
                            <p className="text-stone-400 text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold mt-0.5">Exquisite Artistry by Ankita</p>
                        </div>

                        {/* Scratch Card Box */}
                        <div className="bg-stone-950 border border-yellow-500/10 p-4 sm:p-5 rounded-2xl relative overflow-hidden min-h-[150px] flex flex-col justify-center items-center shadow-inner">
                            {!isScracked ? (
                                <div 
                                    onClick={() => setIsScracked(true)}
                                    className="absolute inset-1 bg-gradient-to-br from-yellow-600 via-amber-500 to-yellow-700 rounded-xl cursor-pointer flex flex-col justify-center items-center p-3 sm:p-4 text-center shadow-lg transition duration-500 hover:brightness-110 active:scale-98 select-none"
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50"></div>
                                    <span className="text-2xl sm:text-3xl animate-pulse">✨</span>
                                    <p className="text-gray-950 font-bold uppercase tracking-widest text-[10px] sm:text-xs mt-2 font-serif">Tap to scratch & unlock</p>
                                    <p className="text-gray-950/70 text-[8px] sm:text-[9px] font-semibold tracking-wider mt-1 uppercase">Special Festive Offer</p>
                                </div>
                            ) : (
                                <div className="text-center p-2 animate-fade-in w-full">
                                    {/* Particle Sparkle Emulation */}
                                    <div className="text-xl sm:text-2xl mb-1 animate-bounce">🎊</div>
                                    <p className="text-stone-300 text-[11px] sm:text-xs font-serif leading-relaxed italic mb-3">
                                        "{settings.promoText}"
                                    </p>
                                    <div className="bg-yellow-500/10 border border-dashed border-yellow-500/30 py-1.5 px-3 rounded-xl flex justify-between items-center w-full max-w-[260px] mx-auto gap-2">
                                        <span className="font-mono text-xs sm:text-sm font-bold text-yellow-500 uppercase tracking-widest truncate">{couponCode}</span>
                                        <button
                                            onClick={handleCopy}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-950 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1.5 rounded-lg shadow transition whitespace-nowrap"
                                        >
                                            {copied ? "Copied! ✓" : "Copy Code"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="text-[8px] sm:text-[9px] text-stone-500 mt-4 leading-relaxed font-sans uppercase tracking-wider">
                            *Handmade with love. Apply coupon at checkout to claim premium discount.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default GiftScratchCard;

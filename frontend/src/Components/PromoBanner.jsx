import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const PromoBanner = () => {
    const { settings } = useContext(ShopContext);

    if (!settings || !settings.promoEnabled || !settings.promoText) {
        return null;
    }

    // Curated rich color themes
    const themes = {
        gold: "bg-linear-to-r from-amber-600 via-yellow-500 to-amber-700 text-gray-950",
        red: "bg-linear-to-r from-red-800 via-rose-700 to-red-900 text-white",
        maroon: "bg-linear-to-r from-amber-950 via-red-950 to-amber-950 text-amber-200 border-b border-amber-500/10",
        black: "bg-linear-to-r from-stone-900 via-stone-950 to-stone-900 text-amber-400 border-b border-amber-500/10"
    };

    const currentTheme = themes[settings.promoTheme] || themes.gold;

    return (
        <div className={`w-full py-2 px-4 text-center text-[10px] sm:text-xs font-semibold tracking-wider shadow-sm relative overflow-hidden transition-all duration-300 ${currentTheme}`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white/10 to-transparent opacity-40 animate-pulse pointer-events-none"></div>
            <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 relative z-10">
                <span className="inline-block truncate leading-relaxed font-sans">{settings.promoText}</span>
            </div>
        </div>
    );
};

export default PromoBanner;

import React from "react";

interface AdBannerProps {
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className }) => {
  return (
    <div
      className={`
        w-[208px] h-[140px] rounded-lg overflow-hidden bg-gray-200
        flex items-center justify-center text-gray-500 text-sm
        ${className || ""}
      `}
    >
      <img
        src="/images/ad.png"
        alt="Реклама"
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          target.parentElement!.innerHTML = `
            <div class="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-gray-100">
              <div class="text-lg font-semibold text-gray-700">Рекламный баннер</div>
              <div class="text-sm text-gray-500 text-center mt-2">208×140px</div>
              <div class="text-xs text-gray-400 mt-1">Здесь может быть ваша реклама</div>
            </div>
          `;
        }}
      />
    </div>
  );
};

export default AdBanner;

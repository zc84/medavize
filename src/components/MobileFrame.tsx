import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 sm:p-8">
      {/* iPhone Device Frame */}
      <div className="relative">
        {/* Outer frame - iPhone body */}
        <div 
          className="relative w-[375px] h-[812px] rounded-[50px] bg-gray-900 p-3 shadow-2xl"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Power button */}
          <div className="absolute -right-1 top-[180px] w-1 h-[60px] bg-gray-800 rounded-r-sm" />
          
          {/* Volume buttons */}
          <div className="absolute -left-1 top-[140px] w-1 h-[30px] bg-gray-800 rounded-l-sm" />
          <div className="absolute -left-1 top-[190px] w-1 h-[60px] bg-gray-800 rounded-l-sm" />
          
          {/* Silent switch */}
          <div className="absolute -left-1 top-[100px] w-1 h-[20px] bg-gray-800 rounded-l-sm" />

          {/* Inner bezel */}
          <div className="relative w-full h-full rounded-[40px] bg-black overflow-hidden">
            {/* Notch / Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50">
              <div 
                className="w-[120px] h-[35px] bg-black rounded-full flex items-center justify-center"
                style={{
                  boxShadow: 'inset 0 0 4px rgba(255,255,255,0.1)',
                }}
              >
                {/* Camera dot */}
                <div className="w-3 h-3 rounded-full bg-gray-800 ml-8 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-900/30 to-transparent" />
                </div>
              </div>
            </div>

            {/* Screen content */}
            <div className="w-full h-full bg-[#f4f8fb] overflow-hidden relative">
              {/* Status bar area */}
              <div className="h-12 w-full flex items-end justify-between px-6 pb-1 text-xs font-semibold text-gray-900 z-40 relative">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  {/* Signal bars */}
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                    <rect x="0" y="8" width="3" height="4" rx="0.5" />
                    <rect x="4" y="5" width="3" height="7" rx="0.5" />
                    <rect x="8" y="2" width="3" height="10" rx="0.5" />
                    <rect x="12" y="0" width="3" height="12" rx="0.5" />
                  </svg>
                  {/* WiFi */}
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor">
                    <path d="M7 0L0 8h2l5-6 5 6h2L7 0z" />
                    <path d="M7 4L3 9h8L7 4z" />
                  </svg>
                  {/* Battery */}
                  <div className="flex items-center gap-0.5">
                    <div className="w-[22px] h-[11px] border border-gray-900 rounded-sm flex items-center px-[1px]">
                      <div className="w-[18px] h-[7px] bg-gray-900 rounded-sm" />
                    </div>
                    <div className="w-[1px] h-[5px] bg-gray-900 rounded-r-sm" />
                  </div>
                </div>
              </div>

              {/* App content */}
              <div className="h-[calc(100%-48px)] overflow-y-auto overflow-x-hidden">
                {children}
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-gray-900 rounded-full z-50" />
            </div>
          </div>
        </div>

        {/* Reflection/glare effect */}
        <div 
          className="absolute top-0 left-0 right-0 h-[300px] rounded-t-[50px] pointer-events-none z-10"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)',
          }}
        />
      </div>
    </div>
  );
}

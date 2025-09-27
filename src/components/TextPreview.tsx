import React from 'react';
import type { TextPreviewProps } from '../types';
import { parseFiveMText } from '../utils/textParser';
import { FIVEM_COLORS } from '../utils/fivemColors';

const TextPreview: React.FC<TextPreviewProps> = ({ text }) => {
  const parsedElements = parseFiveMText(text);

  return (
    <div className="flex-1 h-full bg-slate-800 rounded-md border border-slate-600 p-2 sm:p-4 overflow-y-auto">
      {parsedElements.length > 0 ? (
        <div className="text-sm sm:text-base leading-relaxed break-words">
          {parsedElements}
        </div>
      ) : (
        <div className="text-center p-4 sm:p-8">
          <p className="text-slate-400 italic mb-4 sm:mb-6 text-sm sm:text-base">
            Your formatted text will appear here...
          </p>
          <div className="text-left max-w-xs sm:max-w-md mx-auto">
            <h3 className="text-slate-200 font-semibold mb-3 sm:mb-4 text-center text-sm sm:text-base">
              Quick Reference:
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <code className="bg-slate-700 px-1 rounded text-[10px] sm:text-xs flex-shrink-0 text-white">~r~</code> 
                <span style={{ color: FIVEM_COLORS.r }}>Red text</span>
              </li>
              <li className="flex items-center gap-2">
                <code className="bg-slate-700 px-1 rounded text-[10px] sm:text-xs flex-shrink-0 text-white">~g~</code> 
                <span style={{ color: FIVEM_COLORS.g }}>Green text</span>
              </li>
              <li className="flex items-center gap-2">
                <code className="bg-slate-700 px-1 rounded text-[10px] sm:text-xs flex-shrink-0 text-white">~b~</code> 
                <span style={{ color: FIVEM_COLORS.b }}>Blue text</span>
              </li>
              <li className="flex items-center gap-2">
                <code className="bg-slate-700 px-1 rounded text-[10px] sm:text-xs flex-shrink-0 text-white">~y~</code> 
                <span style={{ color: FIVEM_COLORS.y }}>Yellow text</span>
              </li>
              <li className="flex items-center gap-2">
                <code className="bg-slate-700 px-1 rounded text-[10px] sm:text-xs flex-shrink-0 text-white">~h~</code> 
                <span className="font-bold text-white">Bold text</span>
              </li>
              <li className="flex items-center gap-2">
                <code className="bg-slate-700 px-1 rounded text-[10px] sm:text-xs flex-shrink-0 text-white">~n~</code> 
                <span className="text-white">Line break</span>
              </li>
              <li className="flex items-center gap-2">
                <code className="bg-slate-700 px-1 rounded text-[10px] sm:text-xs flex-shrink-0 text-white">~s~</code> 
                <span style={{ color: FIVEM_COLORS.s }}>Reset color</span>
              </li>
              <li className="flex items-center gap-2">
                <code className="bg-slate-700 px-1 rounded text-[10px] sm:text-xs flex-shrink-0 text-white">~ws~</code> 
                <span style={{ color: FIVEM_COLORS.y }}>★ Wanted star</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextPreview;
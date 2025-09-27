import React from 'react';
import type { TextPreviewProps } from '../types';
import { parseFiveMText } from '../utils/textParser';
import { FIVEM_COLORS } from '../utils/fivemColors';

const TextPreview: React.FC<TextPreviewProps> = ({ text }) => {
  // Always parse with dark theme colors since preview should simulate game environment
  const parsedElements = parseFiveMText(text, true);

  return (
    <div 
      className="flex-1 h-full rounded-md border p-2 sm:p-4 overflow-y-auto"
      style={{ 
        backgroundColor: '#1a1a1a',
        borderColor: '#374151',
        color: '#ffffff'
      }}
    >
      {parsedElements.length > 0 ? (
        <div className="text-sm sm:text-base leading-relaxed break-words">
          {parsedElements}
        </div>
      ) : (
        <div className="text-center p-4 sm:p-8">
          <p className="italic mb-4 sm:mb-6 text-sm sm:text-base" style={{ color: '#9ca3af' }}>
            Your formatted text will appear here...
          </p>
          <div className="text-left max-w-xs sm:max-w-md mx-auto">
            <h3 className="font-semibold mb-3 sm:mb-4 text-center text-sm sm:text-base" style={{ color: '#ffffff' }}>
              Quick Reference:
            </h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <code 
                  className="px-1 rounded text-[10px] sm:text-xs flex-shrink-0"
                  style={{ 
                    backgroundColor: '#374151',
                    border: '1px solid #4b5563',
                    color: '#ffffff'
                  }}
                >
                  ~r~
                </code> 
                <span style={{ color: FIVEM_COLORS.r }}>Red text</span>
              </li>
              <li className="flex items-center gap-2">
                <code 
                  className="px-1 rounded text-[10px] sm:text-xs flex-shrink-0"
                  style={{ 
                    backgroundColor: '#374151',
                    border: '1px solid #4b5563',
                    color: '#ffffff'
                  }}
                >
                  ~g~
                </code> 
                <span style={{ color: FIVEM_COLORS.g }}>Green text</span>
              </li>
              <li className="flex items-center gap-2">
                <code 
                  className="px-1 rounded text-[10px] sm:text-xs flex-shrink-0"
                  style={{ 
                    backgroundColor: '#374151',
                    border: '1px solid #4b5563',
                    color: '#ffffff'
                  }}
                >
                  ~b~
                </code> 
                <span style={{ color: FIVEM_COLORS.b }}>Blue text</span>
              </li>
              <li className="flex items-center gap-2">
                <code 
                  className="px-1 rounded text-[10px] sm:text-xs flex-shrink-0"
                  style={{ 
                    backgroundColor: '#374151',
                    border: '1px solid #4b5563',
                    color: '#ffffff'
                  }}
                >
                  ~y~
                </code> 
                <span style={{ color: FIVEM_COLORS.y }}>Yellow text</span>
              </li>
              <li className="flex items-center gap-2">
                <code 
                  className="px-1 rounded text-[10px] sm:text-xs flex-shrink-0"
                  style={{ 
                    backgroundColor: '#374151',
                    border: '1px solid #4b5563',
                    color: '#ffffff'
                  }}
                >
                  ~h~
                </code> 
                <span className="font-bold" style={{ color: '#ffffff' }}>Bold text</span>
              </li>
              <li className="flex items-center gap-2">
                <code 
                  className="px-1 rounded text-[10px] sm:text-xs flex-shrink-0"
                  style={{ 
                    backgroundColor: '#374151',
                    border: '1px solid #4b5563',
                    color: '#ffffff'
                  }}
                >
                  ~n~
                </code> 
                <span style={{ color: '#ffffff' }}>Line break</span>
              </li>
              <li className="flex items-center gap-2">
                <code 
                  className="px-1 rounded text-[10px] sm:text-xs flex-shrink-0"
                  style={{ 
                    backgroundColor: '#374151',
                    border: '1px solid #4b5563',
                    color: '#ffffff'
                  }}
                >
                  ~s~
                </code> 
                <span style={{ color: '#ffffff' }}>Reset color</span>
              </li>
              <li className="flex items-center gap-2">
                <code 
                  className="px-1 rounded text-[10px] sm:text-xs flex-shrink-0"
                  style={{ 
                    backgroundColor: '#374151',
                    border: '1px solid #4b5563',
                    color: '#ffffff'
                  }}
                >
                  ~ws~
                </code> 
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
import React from 'react';
import type { TextElement, ParseResult, FormatSuggestion } from '../types';
import { 
  FIVEM_COLORS, 
  VISUAL_FORMATS, 
  SPECIAL_FORMATS, 
  HUD_COLORS, 
  INPUT_MAPPINGS, 
  PAD_MAPPINGS,
  FORMATTING_SHORTCUTS
} from './fivemColors';

// Parse FiveM text and return React elements
export function parseFiveMText(text: string): React.ReactElement[] {
  if (!text) return [];
  
  const elements: React.ReactElement[] = [];
  let currentIndex = 0;
  let currentColor = '#ffffff';
  let isBold = false;
  let isItalic = false;
  let elementKey = 0;
  
  // Stack to track nested formatting
  const formatStack: string[] = [];
  
  // Regular expression to match FiveM formatting codes
  const formatRegex = /~([^~]+)~/g;
  let match;
  
  while ((match = formatRegex.exec(text)) !== null) {
    const beforeText = text.slice(currentIndex, match.index);
    const formatCode = match[1].toLowerCase();
    const fullMatch = match[0];
    
    // Add text before the format code
    if (beforeText) {
      elements.push(createTextElement(beforeText, currentColor, isBold, isItalic, elementKey++));
    }
    
    // Process the format code
    const result = processFormatCode(formatCode, currentColor, isBold, isItalic, formatStack);
    
    if (result.element) {
      elements.push(result.element);
      elementKey++;
    }
    
    // Update current formatting state
    currentColor = result.color || currentColor;
    isBold = result.bold !== undefined ? result.bold : isBold;
    isItalic = result.italic !== undefined ? result.italic : isItalic;
    
    currentIndex = match.index + fullMatch.length;
  }
  
  // Add remaining text
  const remainingText = text.slice(currentIndex);
  if (remainingText) {
    elements.push(createTextElement(remainingText, currentColor, isBold, isItalic, elementKey++));
  }
  
  return elements;
}

// Create a text element with current formatting
function createTextElement(
  text: string, 
  color: string, 
  bold: boolean, 
  italic: boolean, 
  key: number
): React.ReactElement {
  const style: React.CSSProperties = {
    color: color,
    fontWeight: bold ? 'bold' : 'normal',
    fontStyle: italic ? 'italic' : 'normal',
  };
  
  // Handle line breaks
  const lines = text.split('\n');
  if (lines.length === 1) {
    return <span key={key} style={style}>{text}</span>;
  }
  
  return (
    <span key={key} style={style}>
      {lines.map((line: string, index: number) => (
        <React.Fragment key={`${key}-${index}`}>
          {line}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </span>
  );
}

// Process individual format codes
function processFormatCode(
  code: string, 
  currentColor: string, 
  isBold: boolean, 
  isItalic: boolean, 
  _formatStack: string[]
): ParseResult {
  const result: ParseResult = {
    color: currentColor,
    bold: isBold,
    italic: isItalic,
  };
  
  // Handle basic color codes
  if (FIVEM_COLORS[code]) {
    result.color = FIVEM_COLORS[code];
    return result;
  }
  
  // Handle visual formatting
  switch (code) {
    case 'n':
      result.element = <br key={Math.random()} />;
      break;
      
    case 'h':
    case 'bold':
      result.bold = !isBold; // Toggle bold
      break;
      
    case 'italic':
      result.italic = !isItalic; // Toggle italic
      break;
      
    case 'ws':
    case 'wanted_star':
      result.element = <span key={Math.random()} className="fivem-wanted-star">★</span>;
      break;
      
    case 'nrt':
      result.element = <div key={Math.random()} style={{ marginTop: '0.5em' }} />;
      break;
      
    case 'ex_r*':
      result.element = <span key={Math.random()} style={{ color: '#f39c12', fontWeight: 'bold' }}>R*</span>;
      break;
      
    default:
      // Handle special patterns
      result.element = handleSpecialPatterns(code);
      break;
  }
  
  return result;
}

// Handle special formatting patterns
function handleSpecialPatterns(code: string): React.ReactElement | null {
  const upperCode = code.toUpperCase();
  
  // Condensed text pattern
  const condensedMatch = code.match(/^<c>(.*?)<\/c>$/i);
  if (condensedMatch) {
    return (
      <span 
        key={Math.random()} 
        style={{ letterSpacing: '-0.5px', fontWeight: '600' }}
      >
        {condensedMatch[1]}
      </span>
    );
  }
  
  // HUD Color patterns
  const hudColorMatch = upperCode.match(/^HUD_COLOUR_([A-Z_]+)$/);
  if (hudColorMatch && HUD_COLORS[hudColorMatch[1]]) {
    // This should change the color, but we'll handle it in the main parser
    return null;
  }
  
  const hudColorShortMatch = upperCode.match(/^HC_([A-Z_0-9]+)$/);
  if (hudColorShortMatch) {
    const colorName = hudColorShortMatch[1];
    if (HUD_COLORS[colorName]) {
      return null; // Color change handled in main parser
    }
    // Handle numeric index
    const numMatch = colorName.match(/^\d+$/);
    if (numMatch) {
      return null; // Numeric color index
    }
  }
  
  // Input mappings
  const inputMatch = upperCode.match(/^INPUT_([A-Z_]+)$/);
  if (inputMatch && INPUT_MAPPINGS[inputMatch[1]]) {
    return (
      <span 
        key={Math.random()} 
        style={{ 
          backgroundColor: '#2c3e50', 
          color: '#ecf0f1', 
          padding: '2px 6px', 
          borderRadius: '3px',
          fontSize: '0.85em',
          fontFamily: 'monospace'
        }}
      >
        {INPUT_MAPPINGS[inputMatch[1]]}
      </span>
    );
  }
  
  // Gamepad button mappings
  const padMatch = upperCode.match(/^PAD_([A-Z_]+)$/);
  if (padMatch && PAD_MAPPINGS[padMatch[1]]) {
    return (
      <span 
        key={Math.random()} 
        style={{ 
          backgroundColor: '#8e44ad', 
          color: '#ffffff', 
          padding: '2px 6px', 
          borderRadius: '3px',
          fontSize: '0.85em'
        }}
      >
        {PAD_MAPPINGS[padMatch[1]]}
      </span>
    );
  }
  
  // BLIP mappings
  const blipMatch = upperCode.match(/^BLIP_([A-Z_]+)$/);
  if (blipMatch) {
    return (
      <span 
        key={Math.random()} 
        style={{ 
          backgroundColor: '#f39c12', 
          color: '#ffffff', 
          padding: '2px 6px', 
          borderRadius: '3px',
          fontSize: '0.85em'
        }}
      >
        📍 {blipMatch[1]}
      </span>
    );
  }
  
  // Placeholder patterns (~a~, ~1~, etc.)
  const placeholderMatch = code.match(/^([a1])(_\d+)?$/);
  if (placeholderMatch) {
    const type = placeholderMatch[1];
    const index = placeholderMatch[2] ? placeholderMatch[2].slice(1) : '';
    return (
      <span 
        key={Math.random()} 
        style={{ 
          backgroundColor: '#e74c3c', 
          color: '#ffffff', 
          padding: '2px 6px', 
          borderRadius: '3px',
          fontSize: '0.85em',
          fontStyle: 'italic'
        }}
      >
        {type === 'a' ? '[TEXT' : '[NUMBER'}{index ? `_${index}` : ''}]
      </span>
    );
  }
  
  // Special buttons
  if (upperCode === 'ACCEPT') {
    return (
      <span key={Math.random()} style={{ color: '#2ecc71', fontWeight: 'bold' }}>
        ✓ Accept
      </span>
    );
  }
  
  if (upperCode === 'CANCEL') {
    return (
      <span key={Math.random()} style={{ color: '#e74c3c', fontWeight: 'bold' }}>
        ✗ Cancel
      </span>
    );
  }
  
  // Unknown format code - show as-is with warning color
  return (
    <span 
      key={Math.random()} 
      style={{ 
        backgroundColor: '#e67e22', 
        color: '#ffffff', 
        padding: '1px 4px', 
        borderRadius: '2px',
        fontSize: '0.8em'
      }}
      title={`Unknown format code: ~${code}~`}
    >
      ~{code}~
    </span>
  );
}

// Utility function to get syntax highlighting for the editor
export function getSyntaxHighlighting(text: string): string {
  if (!text) return text;
  
  // This is a simplified version for syntax highlighting in the editor
  // Replace format codes with colored versions
  return text.replace(/~([^~]+)~/g, (match: string, code: string) => {
    const lowerCode = code.toLowerCase();
    if (FIVEM_COLORS[lowerCode] || VISUAL_FORMATS[lowerCode]) {
      return match; // Keep as-is, will be styled by CSS
    }
    return match;
  });
}

// Get format code suggestions for autocomplete
export function getFormatSuggestions(input: string): FormatSuggestion[] {
  const suggestions: FormatSuggestion[] = [];
  const lowerInput = input.toLowerCase();
  
  // Use FORMATTING_SHORTCUTS instead of manually building suggestions
  FORMATTING_SHORTCUTS.forEach(shortcut => {
    if (shortcut.code.toLowerCase().includes(lowerInput) ||
        shortcut.label.toLowerCase().includes(lowerInput)) {
      suggestions.push({
        code: shortcut.code,
        description: shortcut.description,
        type: shortcut.category === 'colors' ? 'color' : 
              shortcut.category === 'inputs' || shortcut.category === 'gamepad' ? 'input' :
              shortcut.category === 'formatting' ? 'format' : 'special'
      });
    }
  });
  
  return suggestions.slice(0, 10); // Limit to 10 suggestions
}
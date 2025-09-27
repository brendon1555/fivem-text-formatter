import React, { useState, useRef, useCallback } from 'react';
import type { TextEditorProps, FormattingShortcut, CategoryType } from '../types';
import { FORMATTING_SHORTCUTS, FIVEM_COLORS } from '../utils/fivemColors';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Helper function to get button color styling
const getButtonColorStyle = (shortcut: FormattingShortcut) => {
  // Check if this is a color shortcut by looking at the code
  const colorCode = shortcut.code.replace(/[~]/g, ''); // Remove ~ characters
  const color = FIVEM_COLORS[colorCode];
  
  if (color && shortcut.category === 'colors') {
    return {
      backgroundColor: color,
      borderColor: color,
      color: color === '#ffffff' || color === '#f1c40f' ? '#000000' : '#ffffff',
    };
  }
  
  return {};
};

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<FormattingShortcut[]>([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('colors');
  const [showAllButtons, setShowAllButtons] = useState(false);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursor = e.target.selectionStart;
    
    onChange(newValue);
    setCursorPosition(cursor);
    
    // Simple autocomplete logic
    const beforeCursor = newValue.slice(0, cursor);
    const match = beforeCursor.match(/~([^~]*)$/);
    
    if (match && match[1].length > 0) {
      // Show suggestions when typing format codes
      const input = match[1].toLowerCase();
      const filteredSuggestions = FORMATTING_SHORTCUTS.filter(shortcut =>
        shortcut.code.toLowerCase().includes(input) ||
        shortcut.label.toLowerCase().includes(input)
      );
      
      if (filteredSuggestions.length > 0) {
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  }, [onChange]);

  const insertFormatCode = useCallback((code: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const beforeSelection = value.slice(0, start);
    const afterSelection = value.slice(end);

    // Handle special wrapping codes like <C></C>
    if (code.includes('><') && start !== end) {
      const selectedText = value.slice(start, end);
      const [openTag, closeTag] = code.split('><');
      const fullOpenTag = openTag + '>';
      const fullCloseTag = '<' + closeTag;
      const newValue = beforeSelection + fullOpenTag + selectedText + fullCloseTag + afterSelection;
      onChange(newValue);
      
      setTimeout(() => {
        textarea.setSelectionRange(
          start + fullOpenTag.length + selectedText.length + fullCloseTag.length,
          start + fullOpenTag.length + selectedText.length + fullCloseTag.length
        );
        textarea.focus();
      }, 0);
      return;
    }

    // If text is selected, wrap it with the format code (for toggle codes)
    if (start !== end && (code.includes('~h~') || code.includes('~italic~') || code.includes('~r~') || code.includes('~g~') || code.includes('~b~') || code.includes('~y~'))) {
      const selectedText = value.slice(start, end);
      const resetCode = code.includes('~h~') || code.includes('~italic~') ? code : '~s~';
      const newValue = beforeSelection + code + selectedText + resetCode + afterSelection;
      onChange(newValue);
      
      // Position cursor after the closing tag
      setTimeout(() => {
        textarea.setSelectionRange(
          start + code.length + selectedText.length + resetCode.length,
          start + code.length + selectedText.length + resetCode.length
        );
        textarea.focus();
      }, 0);
    } else {
      // Just insert the format code
      const newValue = beforeSelection + code + afterSelection;
      onChange(newValue);
      
      // Position cursor after the format code
      setTimeout(() => {
        textarea.setSelectionRange(start + code.length, start + code.length);
        textarea.focus();
      }, 0);
    }
  }, [value, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Tab key for autocomplete
    if (e.key === 'Tab' && showSuggestions && suggestions.length > 0) {
      e.preventDefault();
      const suggestion = suggestions[0];
      
      // Replace the partial format code with the suggestion
      const beforeCursor = value.slice(0, cursorPosition);
      const afterCursor = value.slice(cursorPosition);
      const match = beforeCursor.match(/~([^~]*)$/);
      
        if (match && match.index !== undefined) {
          const newValue = beforeCursor.slice(0, match.index) + suggestion.code + afterCursor;
          onChange(newValue);
          
          setTimeout(() => {
            const newPosition = match.index! + suggestion.code.length;
            textareaRef.current?.setSelectionRange(newPosition, newPosition);
          }, 0);
        }      setShowSuggestions(false);
    }
    
    // Handle Escape to close suggestions
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  }, [showSuggestions, suggestions, value, onChange, cursorPosition]);

  // Group shortcuts by category
  const groupedShortcuts = FORMATTING_SHORTCUTS.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<CategoryType, FormattingShortcut[]>);

  const categories = Object.keys(groupedShortcuts) as CategoryType[];
  const categoryLabels: Record<CategoryType, string> = {
    colors: 'Colors',
    formatting: 'Text Format',
    special: 'Special',
    inputs: 'Keyboard',
    gamepad: 'Controller',
    placeholders: 'Placeholders',
    hud: 'HUD Colors'
  };

  return (
    <div className="flex flex-col h-full gap-2 sm:gap-4">
      <Tabs value={showAllButtons ? 'all' : activeCategory} onValueChange={(value) => {
        if (value === 'all') {
          setShowAllButtons(true);
        } else {
          setShowAllButtons(false);
          setActiveCategory(value as CategoryType);
        }
      }}>
        <TabsList className="grid grid-cols-4 sm:grid-cols-8 w-full h-auto p-1">
          {categories.map(category => (
            <TabsTrigger 
              key={category} 
              value={category} 
              className="text-[10px] sm:text-xs px-1 sm:px-3 py-1 sm:py-2 h-auto"
            >
              <span className="hidden sm:inline">{categoryLabels[category]}</span>
              <span className="sm:hidden">
                {category === 'colors' ? 'Color' :
                 category === 'formatting' ? 'Format' :
                 category === 'special' ? 'Special' :
                 category === 'inputs' ? 'Keys' :
                 category === 'gamepad' ? 'Pad' :
                 category === 'placeholders' ? 'Place' :
                 category === 'hud' ? 'HUD' : category}
              </span>
            </TabsTrigger>
          ))}
          <TabsTrigger value="all" className="text-[10px] sm:text-xs px-1 sm:px-3 py-1 sm:py-2 h-auto">
            All
          </TabsTrigger>
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-2 sm:mt-4">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {groupedShortcuts[category]?.map((shortcut) => (
                <Button
                  key={shortcut.code}
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormatCode(shortcut.code)}
                  title={shortcut.description}
                  className="text-[10px] sm:text-xs h-6 sm:h-8 px-2 sm:px-3"
                  style={getButtonColorStyle(shortcut)}
                >
                  {shortcut.label}
                </Button>
              ))}
            </div>
          </TabsContent>
        ))}
        
        <TabsContent value="all" className="mt-2 sm:mt-4">
          <div className="space-y-2 sm:space-y-4 max-h-32 sm:max-h-48 overflow-y-auto">
            {categories.map(category => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <Badge variant="secondary" className="text-[10px] sm:text-xs px-1 sm:px-2">
                    {categoryLabels[category]}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {groupedShortcuts[category].map((shortcut) => (
                    <Button
                      key={shortcut.code}
                      variant="outline"
                      size="sm"
                      onClick={() => insertFormatCode(shortcut.code)}
                      title={shortcut.description}
                      className="text-[10px] sm:text-xs h-6 sm:h-8 px-2 sm:px-3"
                      style={getButtonColorStyle(shortcut)}
                    >
                      {shortcut.label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="relative flex-1">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your FiveM text with formatting codes...

Examples:
~r~This text is red~s~ and this is normal
~h~Bold text~h~
Press ~INPUT_CONTEXT~ to interact
~n~This is on a new line

Use toolbar buttons or type ~ to see format codes!"
          spellCheck={false}
          className="font-mono text-xs sm:text-sm resize-none h-full min-h-[200px] sm:min-h-[300px]"
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-600 rounded-md max-h-32 sm:max-h-48 overflow-y-auto z-50 shadow-lg">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 sm:p-3 cursor-pointer hover:bg-slate-700 border-b border-slate-600 last:border-b-0"
                onClick={() => {
                  insertFormatCode(suggestion.code);
                  setShowSuggestions(false);
                }}
              >
                <div className="font-mono font-semibold text-xs sm:text-sm">
                  {suggestion.code}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 mt-1">
                  {suggestion.description}
                </div>
              </div>
            ))}
            <div className="px-2 sm:px-3 py-1 sm:py-2 text-[10px] sm:text-xs text-slate-400 bg-slate-900 border-t border-slate-600">
              <span className="hidden sm:inline">Press Tab to use first suggestion, Esc to close</span>
              <span className="sm:hidden">Tab: use, Esc: close</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextEditor;
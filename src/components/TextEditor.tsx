import React, { useState, useRef, useCallback } from 'react';
import type { TextEditorProps, FormattingShortcut, CategoryType } from '../types';
import { FORMATTING_SHORTCUTS } from '../utils/fivemColors';

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
    <div className="editor-container">
      <div className="toolbar-container">
        <div className="toolbar-header">
          <div className="toolbar-categories">
            {categories.map(category => (
              <button
                key={category}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                title={`Show ${categoryLabels[category]} formatting options`}
              >
                {categoryLabels[category]}
              </button>
            ))}
            <button
              className={`category-button ${showAllButtons ? 'active' : ''}`}
              onClick={() => setShowAllButtons(!showAllButtons)}
              title="Toggle all categories"
            >
              {showAllButtons ? 'Collapse' : 'All'}
            </button>
          </div>
        </div>
        
        <div className="toolbar-buttons">
          {showAllButtons ? (
            // Show all categories
            categories.map(category => (
              <div key={category} className="toolbar-section">
                <div className="section-label">{categoryLabels[category]}</div>
                <div className="toolbar">
                  {groupedShortcuts[category].map((shortcut) => (
                    <button
                      key={shortcut.code}
                      className="toolbar-button"
                      onClick={() => insertFormatCode(shortcut.code)}
                      title={shortcut.description}
                    >
                      {shortcut.label}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Show only active category
            <div className="toolbar">
              {groupedShortcuts[activeCategory]?.map((shortcut) => (
                <button
                  key={shortcut.code}
                  className="toolbar-button"
                  onClick={() => insertFormatCode(shortcut.code)}
                  title={shortcut.description}
                >
                  {shortcut.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
        <div className="editor-wrapper" style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <textarea
          ref={textareaRef}
          className="editor-textarea"
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
        />        {showSuggestions && suggestions.length > 0 && (
          <div 
            className="suggestions-dropdown"
            style={{
              position: 'absolute',
              top: '100%',
              left: '10px',
              right: '10px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 1000,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderBottom: index < suggestions.length - 1 ? '1px solid var(--border-color)' : 'none'
                }}
                onClick={() => {
                  insertFormatCode(suggestion.code);
                  setShowSuggestions(false);
                }}
              >
                <strong>{suggestion.code}</strong>
                <br />
                <small style={{ color: 'var(--text-secondary)' }}>
                  {suggestion.description}
                </small>
              </div>
            ))}
            <div 
              style={{
                padding: '4px 12px',
                fontSize: '0.8em',
                color: 'var(--text-secondary)',
                borderTop: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              Press Tab to use first suggestion, Esc to close
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextEditor;
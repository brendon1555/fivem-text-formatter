// Type definitions for FiveM Text Formatter

export interface FormattingShortcut {
  label: string;
  code: string;
  description: string;
  category: 'colors' | 'formatting' | 'special' | 'inputs' | 'gamepad' | 'placeholders' | 'hud';
}

export interface ExampleText {
  name: string;
  text: string;
}

export interface FormatSuggestion {
  code: string;
  description: string;
  type: 'color' | 'format' | 'input' | 'special';
}

export interface ParseResult {
  color?: string;
  bold?: boolean;
  italic?: boolean;
  element?: React.ReactElement | null;
}

export type ColorCode = 
  | 'r' | 'g' | 'b' | 'y' | 'w' | 's' | 'o' | 'p' | 'q' 
  | 'f' | 'c' | 't' | 'm' | 'l' | 'd' | 'u' | 'v';

export type VisualFormatCode = 
  | 'n' | 'h' | 'bold' | 'italic' | 'ws' | 'wanted_star' | 'nrt';

export type CategoryType = 
  | 'colors' | 'formatting' | 'special' | 'inputs' 
  | 'gamepad' | 'placeholders' | 'hud';

export interface CategoryLabels {
  [key: string]: string;
}

export interface ColorMapping {
  [key: string]: string;
}

export interface InputMapping {
  [key: string]: string;
}

export interface HUDColorMapping {
  [key: string]: string;
}

export interface SpecialFormatPatterns {
  condensed: RegExp;
  hudColor: RegExp;
  hudColorShort: RegExp;
  hudColorIndex: RegExp;
  blip: RegExp;
  input: RegExp;
  inputGroup: RegExp;
  padButton: RegExp;
  placeholder: RegExp;
  exRockstar: RegExp;
}

// Component Props Types
export interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export interface TextPreviewProps {
  text: string;
}

export interface AppState {
  text: string;
  selectedExample: string;
}

// Parser function types
export type TextElement = React.ReactElement<any, any>;

export interface ParsedTextResult {
  elements: TextElement[];
}

// Event handler types
export type TextChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type KeyDownHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
export type ButtonClickHandler = () => void;
export type SelectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => void;
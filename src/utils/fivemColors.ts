import type { 
  ColorMapping, 
  InputMapping, 
  HUDColorMapping, 
  SpecialFormatPatterns, 
  FormattingShortcut 
} from '../types';

// FiveM Color Mapping based on GTA V HUD Colors
export const FIVEM_COLORS: ColorMapping = {
  // Basic colors
  'r': '#e74c3c',     // HUD_COLOUR_RED - Red for enemies
  'g': '#2ecc71',     // HUD_COLOUR_GREEN - Green for pickups/objectives
  'b': '#3498db',     // HUD_COLOUR_BLUE - Blue for friendly
  'y': '#f1c40f',     // HUD_COLOUR_YELLOW - Yellow for destinations
  'w': '#ffffff',     // HUD_COLOUR_WHITE - White/default
  's': '#ffffff',     // Reset to default color
  
  // Extended colors
  'o': '#e67e22',     // HUD_COLOUR_ORANGE - Orange team color
  'p': '#9b59b6',     // HUD_COLOUR_PURPLE - Purple team color
  'q': '#e91e63',     // HUD_COLOUR_PINK - Pink for Arena War
  'f': '#27ae60',     // HUD_COLOUR_FRIENDLY - Alternate friendly color
  'c': '#95a5a6',     // HUD_COLOUR_MENU_GREY - De-emphasized text
  't': '#95a5a6',     // HUD_COLOUR_MENU_GREY - Foreign language text
  'm': '#7f8c8d',     // HUD_COLOUR_MID_GREY_MP - Medium gray
  'l': '#2c3e50',     // HUD_COLOUR_BLACK - Black
  'd': '#2980b9',     // HUD_COLOUR_BLUEDARK - Dark blue for team objectives
  'u': '#8e44ad',     // HUD_COLOUR_SCRIPT_VARIABLE_2 - Script variable 2
  'v': '#16a085',     // HUD_COLOUR_SCRIPT_VARIABLE - Script variable
};

// Visual formatting codes
export const VISUAL_FORMATS: Record<string, string> = {
  'n': 'line-break',
  'h': 'bold',
  'bold': 'bold',
  'italic': 'italic',
  'ws': 'wanted-star',
  'wanted_star': 'wanted-star',
  'nrt': 'no-return-top',
};

// Special format patterns
export const SPECIAL_FORMATS: SpecialFormatPatterns = {
  condensed: /^<C>(.*?)<\/C>$/,
  hudColor: /^~HUD_COLOUR_([A-Z_]+)~$/,
  hudColorShort: /^~HC_([A-Z_0-9]+)~$/,
  hudColorIndex: /^~HC_(\d+)~$/,
  blip: /^~BLIP_([A-Z_]+)~$/,
  input: /^~INPUT_([A-Z_]+)~$/,
  inputGroup: /^~INPUTGROUP_([A-Z_]+)~$/,
  padButton: /^~PAD_([A-Z_]+)~$/,
  placeholder: /^~([a1])(_\d+)?~$/,
  exRockstar: /^~EX_R\*~$/,
};

// Extended HUD color names to hex mapping
export const HUD_COLORS: HUDColorMapping = {
  'WHITE': '#ffffff',
  'BLACK': '#000000',
  'RED': '#e74c3c',
  'GREEN': '#2ecc71',
  'BLUE': '#3498db',
  'YELLOW': '#f1c40f',
  'ORANGE': '#e67e22',
  'PURPLE': '#9b59b6',
  'PINK': '#e91e63',
  'FRIENDLY': '#27ae60',
  'MENU_GREY': '#95a5a6',
  'MID_GREY_MP': '#7f8c8d',
  'BLUEDARK': '#2980b9',
  'SCRIPT_VARIABLE': '#16a085',
  'SCRIPT_VARIABLE_2': '#8e44ad',
  'FREEMODE': '#f39c12',
  'NET_PLAYER1': '#ff6b6b',
  'NET_PLAYER2': '#4ecdc4',
  'NET_PLAYER3': '#45b7d1',
  'NET_PLAYER4': '#f9ca24',
  'NET_PLAYER5': '#f0932b',
  'NET_PLAYER6': '#eb4d4b',
  'NET_PLAYER7': '#6c5ce7',
  'NET_PLAYER8': '#a29bfe',
};

// Input button mappings for display
export const INPUT_MAPPINGS: InputMapping = {
  'CONTEXT': '[E]',
  'ATTACK': '[LMB]',
  'AIM': '[RMB]',
  'JUMP': '[Space]',
  'SPRINT': '[Shift]',
  'DUCK': '[Ctrl]',
  'RELOAD': '[R]',
  'PHONE': '[UP]',
  'CHARACTER_WHEEL': '[Alt]',
  'MULTIPLAYER_INFO': '[Z]',
  'VEH_MOVE_LR': '[A/D]',
  'VEH_MOVE_UD': '[W/S]',
  'VEH_ACCELERATE': '[W]',
  'VEH_BRAKE': '[S]',
  'VEH_HORN': '[E]',
  'VEH_HANDBRAKE': '[Space]',
  'VEH_EXIT': '[F]',
  'ENTER': '[F]',
  'PICKUP': '[E]',
  'DROP_WEAPON': '[F9]',
  'SELECT_WEAPON': '[Tab]',
  'NEXT_WEAPON': '[ScrollUp]',
  'PREV_WEAPON': '[ScrollDown]',
  'MELEE_ATTACK_LIGHT': '[R]',
  'MELEE_ATTACK_HEAVY': '[O]',
  'COVER': '[Q]',
  'MOVE_LR': '[A/D]',
  'MOVE_UD': '[W/S]',
};

// Gamepad button mappings
export const PAD_MAPPINGS: InputMapping = {
  'A': '🎮 A',
  'B': '🎮 B',
  'X': '🎮 X',
  'Y': '🎮 Y',
  'UP': '🎮 ↑',
  'DOWN': '🎮 ↓',
  'LEFT': '🎮 ←',
  'RIGHT': '🎮 →',
  'START': '🎮 Start',
  'BACK': '🎮 Back',
  'LB': '🎮 LB',
  'LT': '🎮 LT',
  'RB': '🎮 RB',
  'RT': '🎮 RT',
  'DPAD_UP': '🎮 D-Pad ↑',
  'DPAD_DOWN': '🎮 D-Pad ↓',
  'DPAD_LEFT': '🎮 D-Pad ←',
  'DPAD_RIGHT': '🎮 D-Pad →',
  'LSTICK_UP': '🎮 L-Stick ↑',
  'LSTICK_DOWN': '🎮 L-Stick ↓',
  'LSTICK_LEFT': '🎮 L-Stick ←',
  'LSTICK_RIGHT': '🎮 L-Stick →',
  'RSTICK_UP': '🎮 R-Stick ↑',
  'RSTICK_DOWN': '🎮 R-Stick ↓',
  'RSTICK_LEFT': '🎮 R-Stick ←',
  'RSTICK_RIGHT': '🎮 R-Stick →',
  'ACCEPT': '🎮 Accept',
  'CANCEL': '🎮 Cancel',
};

// Common formatting shortcuts for toolbar
export const FORMATTING_SHORTCUTS: FormattingShortcut[] = [
  // Basic Colors
  { label: 'Red', code: '~r~', description: 'Red text (enemies)', category: 'colors' },
  { label: 'Green', code: '~g~', description: 'Green text (objectives)', category: 'colors' },
  { label: 'Blue', code: '~b~', description: 'Blue text (friendly)', category: 'colors' },
  { label: 'Yellow', code: '~y~', description: 'Yellow text (destinations)', category: 'colors' },
  { label: 'White', code: '~w~', description: 'White text', category: 'colors' },
  { label: 'Orange', code: '~o~', description: 'Orange text (team color)', category: 'colors' },
  { label: 'Purple', code: '~p~', description: 'Purple text (team color)', category: 'colors' },
  { label: 'Pink', code: '~q~', description: 'Pink text (Arena War)', category: 'colors' },
  { label: 'Grey', code: '~c~', description: 'Grey text (de-emphasized)', category: 'colors' },
  { label: 'Black', code: '~l~', description: 'Black text', category: 'colors' },
  { label: 'Dark Blue', code: '~d~', description: 'Dark blue text (team objectives)', category: 'colors' },
  { label: 'Friendly', code: '~f~', description: 'Friendly green text', category: 'colors' },
  { label: 'Reset', code: '~s~', description: 'Reset to default color', category: 'colors' },
  
  // Text Formatting
  { label: 'Bold', code: '~h~', description: 'Bold text toggle', category: 'formatting' },
  { label: 'Italic', code: '~italic~', description: 'Italic text toggle', category: 'formatting' },
  { label: 'Line Break', code: '~n~', description: 'New line', category: 'formatting' },
  { label: 'No Return Top', code: '~nrt~', description: 'Add padding before text', category: 'formatting' },
  { label: 'Condensed', code: '<C></C>', description: 'Condensed text (wrap selection)', category: 'formatting' },
  
  // Special Elements
  { label: 'Wanted Star', code: '~ws~', description: 'Wanted star symbol ★', category: 'special' },
  { label: 'Rockstar Logo', code: '~EX_R*~', description: 'Rockstar logo', category: 'special' },
  
  // Common Inputs
  { label: 'Context Key', code: '~INPUT_CONTEXT~', description: 'Context interaction key [E]', category: 'inputs' },
  { label: 'Attack Key', code: '~INPUT_ATTACK~', description: 'Attack key [LMB]', category: 'inputs' },
  { label: 'Aim Key', code: '~INPUT_AIM~', description: 'Aim key [RMB]', category: 'inputs' },
  { label: 'Jump Key', code: '~INPUT_JUMP~', description: 'Jump key [Space]', category: 'inputs' },
  { label: 'Sprint Key', code: '~INPUT_SPRINT~', description: 'Sprint key [Shift]', category: 'inputs' },
  { label: 'Reload Key', code: '~INPUT_RELOAD~', description: 'Reload key [R]', category: 'inputs' },
  { label: 'Horn Key', code: '~INPUT_VEH_HORN~', description: 'Vehicle horn [E]', category: 'inputs' },
  { label: 'Handbrake', code: '~INPUT_VEH_HANDBRAKE~', description: 'Vehicle handbrake [Space]', category: 'inputs' },
  
  // Gamepad Buttons
  { label: 'Pad A', code: '~PAD_A~', description: 'Gamepad A button', category: 'gamepad' },
  { label: 'Pad B', code: '~PAD_B~', description: 'Gamepad B button', category: 'gamepad' },
  { label: 'Pad X', code: '~PAD_X~', description: 'Gamepad X button', category: 'gamepad' },
  { label: 'Pad Y', code: '~PAD_Y~', description: 'Gamepad Y button', category: 'gamepad' },
  { label: 'Accept', code: '~ACCEPT~', description: 'Accept prompt button', category: 'gamepad' },
  { label: 'Cancel', code: '~CANCEL~', description: 'Cancel prompt button', category: 'gamepad' },
  
  // Placeholders
  { label: 'Text Placeholder', code: '~a~', description: 'Text component placeholder', category: 'placeholders' },
  { label: 'Number Placeholder', code: '~1~', description: 'Number component placeholder', category: 'placeholders' },
  
  // HUD Colors
  { label: 'HUD Freemode', code: '~HUD_COLOUR_FREEMODE~', description: 'Freemode HUD color', category: 'hud' },
  { label: 'HUD Script Var', code: '~v~', description: 'Script variable color', category: 'hud' },
  { label: 'HUD Script Var 2', code: '~u~', description: 'Script variable 2 color', category: 'hud' },
];
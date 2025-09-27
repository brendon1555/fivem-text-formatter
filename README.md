# FiveM Text Formatter

A modern, real-time text editor and preview tool for FiveM text formatting codes. Built with React, TypeScript, and Vite, this application helps FiveM developers and server owners create properly formatted text with visual feedback.

## 🚀 Features

- **Real-time Preview**: See your formatted text instantly as you type
- **Comprehensive Format Support**: Full support for FiveM/Rockstar text formatting codes
- **Smart Editor**: Syntax highlighting and autocomplete for formatting codes
- **Toolbar Shortcuts**: Quick access buttons for common formatting codes
- **Example Templates**: Pre-built examples for common use cases
- **Copy/Clipboard Support**: Easy copying of formatted text
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Supports system theme preferences
- **Accessibility**: High contrast and reduced motion support

## 🎨 Supported Formatting Codes

### Color Codes
- `~r~` - Red text (for enemies)
- `~g~` - Green text (for objectives/pickups)
- `~b~` - Blue text (for friendly characters)
- `~y~` - Yellow text (for destinations)
- `~w~` - White text
- `~o~` - Orange text
- `~p~` - Purple text
- `~q~` - Pink text
- `~s~` - Reset to default color

### Visual Formatting
- `~h~` - Bold text (toggle)
- `~bold~` - Bold text (alias)
- `~italic~` - Italic text (toggle)
- `~n~` - Line break
- `~ws~` or `~wanted_star~` - Wanted star symbol ★
- `<C>text</C>` - Condensed text

### Input Controls
- `~INPUT_CONTEXT~` - Shows context key (E)
- `~INPUT_ATTACK~` - Shows attack key (LMB)
- `~PAD_A~` - Shows gamepad A button
- `~ACCEPT~` - Shows accept prompt
- `~CANCEL~` - Shows cancel prompt

### Advanced Features
- `~HUD_COLOUR_[NAME]~` - Named HUD colors
- `~HC_[NAME/NUMBER]~` - HUD color shortcuts
- `~BLIP_[NAME]~` - Map blip references
- `~a~`, `~1~` - Text/number placeholders

## 🛠 Installation & Usage

### Prerequisites
- Node.js 16+ and npm
- TypeScript 5.0+ (included in dev dependencies)

### Quick Start
1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser

### Building for Production
```bash
npm run build
```

## 📖 Usage Examples

### Basic Mission Text
```
Go to ~y~Los Santos International Airport~s~
Press ~INPUT_CONTEXT~ to enter the ~b~vehicle~s~
```

### Warning Message
```
~ws~~ws~~ws~ ~r~WANTED LEVEL 3~s~ ~ws~~ws~~ws~
The ~r~police~s~ are searching for you!
```

### Help Instructions
```
~h~Controls:~h~
Press ~INPUT_AIM~ to aim
Hold ~INPUT_ATTACK~ to fire
Use ~INPUTGROUP_VEH_MOVE_ALL~ to move
```

## 🏗 Project Structure

```
src/
├── components/
│   ├── TextEditor.tsx      # Main text editor with toolbar
│   └── TextPreview.tsx     # Real-time preview component
├── utils/
│   ├── fivemColors.ts      # Color mappings and constants
│   └── textParser.tsx      # FiveM text parsing engine
├── types/
│   └── index.ts           # TypeScript type definitions
├── App.tsx                # Main application component
├── main.tsx              # React entry point
└── index.css             # Global styles and themes
```

## 🎯 Key Features Explained

### Smart Text Parser
The application includes a sophisticated parser that:
- Handles nested formatting codes
- Maintains formatting state across text sections
- Supports all official FiveM formatting codes
- Provides fallbacks for unknown codes

### Interactive Editor
- Toolbar with common formatting shortcuts
- Autocomplete suggestions while typing
- Tab completion for format codes
- Text selection wrapping with format codes

### Real-time Preview
- Instant visual feedback
- Accurate color representation
- Proper line break handling
- Input control visualization


## 📝 Contributing

Feel free to submit issues and enhancement requests! This tool was built to help the FiveM community create better formatted text.

## 📚 Resources

- [Official FiveM Text Formatting Documentation](https://docs.fivem.net/docs/game-references/text-formatting/)
- [FiveM Forums](https://forum.cfx.re/)
- [FiveM Native Reference](https://docs.fivem.net/natives/)

## ⚖️ License

MIT License - feel free to use this in your projects!

---

Built with ❤️ for the FiveM community
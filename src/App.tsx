import React, { useState, useCallback } from 'react';
import type { ExampleText } from './types';
import TextEditor from './components/TextEditor';
import TextPreview from './components/TextPreview';
import { ThemeToggle } from './components/ThemeToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const EXAMPLE_TEXTS: ExampleText[] = [
  {
    name: 'Basic Colors',
    text: 'Kill all the ~r~enemies~s~ and collect the ~g~objective~s~!\nThen return to ~b~base~s~ for your reward.'
  },
  {
    name: 'Mission Text',
    text: 'Go to ~y~Los Santos International Airport~s~~n~Press ~INPUT_CONTEXT~ to enter the ~b~vehicle~s~~n~~h~Time remaining: ~1~ seconds~h~'
  },
  {
    name: 'Warning Message',
    text: '~ws~~ws~~ws~ ~r~WANTED LEVEL 3~s~ ~ws~~ws~~ws~~n~The ~r~police~s~ are searching for you!'
  },
  {
    name: 'Control Instructions',
    text: '~h~Controls:~h~~n~Press ~INPUT_AIM~ to aim your weapon~n~Hold ~INPUT_ATTACK~ to fire~n~Press ~INPUT_RELOAD~ to reload~n~Use ~INPUT_SPRINT~ to run faster'
  },
  {
    name: 'Vehicle Controls',
    text: '~h~Vehicle Controls:~h~~n~Press ~INPUT_VEH_HORN~ to honk~n~Hold ~INPUT_VEH_HANDBRAKE~ to brake~n~Use movement keys to drive around'
  },
  {
    name: 'Gamepad Instructions',
    text: '~h~Controller:~h~~n~Press ~PAD_A~ to accept~n~Press ~PAD_B~ to cancel~n~Use ~PAD_X~ to interact~n~Press ~PAD_Y~ for menu'
  },
  {
    name: 'Advanced Formatting',
    text: '~h~Welcome to~h~ ~b~FiveM~s~~n~~italic~This is italic text~italic~~n~Normal text with ~r~red~s~ and ~g~green~s~ colors~n~<C>Condensed gamer tag</C>'
  },
  {
    name: 'Team Colors',
    text: '~o~Orange Team~s~ vs ~p~Purple Team~s~~n~Current score: ~o~Team 1: ~1~~s~ - ~p~Team 2: ~1~~s~~n~Press ~ACCEPT~ to continue or ~CANCEL~ to quit'
  },
  {
    name: 'HUD & Special',
    text: '~HUD_COLOUR_FREEMODE~Freemode Player~s~~n~Script variables: ~v~Variable 1~s~ and ~u~Variable 2~s~~n~Made by ~EX_R*~ Games'
  },
  {
    name: 'Color Showcase',
    text: '~r~Red~s~ | ~g~Green~s~ | ~b~Blue~s~ | ~y~Yellow~s~ | ~o~Orange~s~ | ~p~Purple~s~ | ~q~Pink~s~~n~~f~Friendly~s~ | ~d~Dark Blue~s~ | ~c~Grey~s~ | ~l~Black~s~ | ~w~White~s~'
  }
];

function App() {
  const [text, setText] = useState('Welcome to the ~b~FiveM~s~ Text Formatter!~n~~n~Try typing some ~r~colored~s~ ~g~text~s~ with ~h~formatting~h~ codes.');
  const [selectedExample, setSelectedExample] = useState('');

  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const loadExample = useCallback((exampleText: string) => {
    setText(exampleText);
    setSelectedExample('');
  }, []);

  const copyToClipboard = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        // Could show a toast notification here
        console.log('Text copied to clipboard');
      });
    }
  }, [text]);

  const clearText = useCallback(() => {
    setText('');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <header className="bg-card border-b border-border p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground">FiveM Text Formatter</h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1">Real-time editor and preview for FiveM text formatting codes</p>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 p-2 sm:p-4 gap-2 sm:gap-4">
        <Card className="flex-1 flex flex-col min-h-[50vh] lg:min-h-0">
          <CardHeader className="pb-2 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <CardTitle className="text-base sm:text-lg">Editor</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <Select value={selectedExample} onValueChange={(value) => {
                  if (value) {
                    const example = EXAMPLE_TEXTS.find(ex => ex.name === value);
                    if (example) {
                      loadExample(example.text);
                    }
                  }
                }}>
                  <SelectTrigger className="w-full sm:w-40 text-xs sm:text-sm">
                    <SelectValue placeholder="Load Example..." />
                  </SelectTrigger>
                  <SelectContent>
                    {EXAMPLE_TEXTS.map(example => (
                      <SelectItem key={example.name} value={example.name}>
                        {example.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={copyToClipboard}
                    title="Copy text to clipboard"
                    className="flex-1 sm:flex-none text-xs sm:text-sm"
                  >
                    Copy
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearText}
                    title="Clear all text"
                    className="flex-1 sm:flex-none text-xs sm:text-sm"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            <TextEditor value={text} onChange={handleTextChange} />
          </CardContent>
        </Card>
        
        <Card className="flex-1 flex flex-col min-h-[50vh] lg:min-h-0">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 flex flex-col">
            <TextPreview text={text} />
          </CardContent>
        </Card>
      </div>
      
      <Separator />
      <footer className="p-3 sm:p-4 bg-card border-t border-border text-center text-xs sm:text-sm text-muted-foreground">
        <p className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
          <span>Built with ❤️ by <a href='https://www.brendonlees.me' target="_blank" className="hover:text-purple-500 underline">Brendon</a></span>
          <span className="hidden sm:inline">&nbsp;•</span>
          <a 
            href="https://docs.fivem.net/docs/game-references/text-formatting/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors sm:ml-1"
          >
            View Official Documentation
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
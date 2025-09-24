import React, { useState, useCallback } from 'react';
import type { ExampleText } from './types';
import TextEditor from './components/TextEditor';
import TextPreview from './components/TextPreview';

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
    <div className="app">
      <header className="header">
        <h1>FiveM Text Formatter</h1>
        <p>Real-time editor and preview for FiveM text formatting codes</p>
      </header>
      
      <div className="main-content">
        <div className="editor-section">
          <div className="section-header">
            <span>Editor</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <select
                value={selectedExample}
                onChange={(e) => {
                  if (e.target.value) {
                    const example = EXAMPLE_TEXTS.find(ex => ex.name === e.target.value);
                    if (example) {
                      loadExample(example.text);
                    }
                  }
                }}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}
              >
                <option value="">Load Example...</option>
                {EXAMPLE_TEXTS.map(example => (
                  <option key={example.name} value={example.name}>
                    {example.name}
                  </option>
                ))}
              </select>
              <button 
                className="toolbar-button"
                onClick={copyToClipboard}
                title="Copy text to clipboard"
                style={{ fontSize: '0.8rem', padding: '4px 8px' }}
              >
                Copy
              </button>
              <button 
                className="toolbar-button"
                onClick={clearText}
                title="Clear all text"
                style={{ fontSize: '0.8rem', padding: '4px 8px' }}
              >
                Clear
              </button>
            </div>
          </div>
          <TextEditor value={text} onChange={handleTextChange} />
        </div>
        
        <div className="preview-section">
          <div className="section-header">
            Preview
          </div>
          <TextPreview text={text} />
        </div>
      </div>
      
      <footer style={{ 
        padding: '1rem 2rem', 
        backgroundColor: 'var(--bg-secondary)', 
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)'
      }}>
        <p>
          Built for FiveM developers • 
          <a 
            href="https://docs.fivem.net/docs/game-references/text-formatting/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--accent-color)', marginLeft: '5px' }}
          >
            View Official Documentation
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
import React from 'react';
import type { TextPreviewProps } from '../types';
import { parseFiveMText } from '../utils/textParser';

const TextPreview: React.FC<TextPreviewProps> = ({ text }) => {
  const parsedElements = parseFiveMText(text);

  return (
    <div className="preview-container">
      {parsedElements.length > 0 ? (
        <div className="preview-content">
          {parsedElements}
        </div>
      ) : (
        <div className="preview-placeholder">
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            Your formatted text will appear here...
          </p>
          <div style={{ marginTop: '20px', fontSize: '0.9em', color: 'var(--text-secondary)' }}>
            <h3 style={{ marginBottom: '10px', color: 'var(--text-primary)' }}>
              Quick Reference:
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><strong>~r~</strong> - <span style={{ color: '#e74c3c' }}>Red text</span></li>
              <li><strong>~g~</strong> - <span style={{ color: '#2ecc71' }}>Green text</span></li>
              <li><strong>~b~</strong> - <span style={{ color: '#3498db' }}>Blue text</span></li>
              <li><strong>~y~</strong> - <span style={{ color: '#f1c40f' }}>Yellow text</span></li>
              <li><strong>~h~</strong> - <span style={{ fontWeight: 'bold' }}>Bold text (toggle)</span></li>
              <li><strong>~italic~</strong> - <span style={{ fontStyle: 'italic' }}>Italic text (toggle)</span></li>
              <li><strong>~n~</strong> - Line break</li>
              <li><strong>~s~</strong> - Reset to default color</li>
              <li><strong>~ws~</strong> - <span style={{ color: '#f1c40f' }}>★</span> Wanted star</li>
              <li><strong>~INPUT_CONTEXT~</strong> - <span style={{ backgroundColor: '#2c3e50', padding: '2px 4px', borderRadius: '2px' }}>[E]</span> Input button</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextPreview;
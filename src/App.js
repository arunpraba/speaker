import React, { useState, useEffect } from 'react';
import './style.css';

function splitSentences(text) {
  const sentenceRegex = /[.!?]+|\n/g;
  const bulletPointRegex = /•/g;
  return text
    .split(sentenceRegex)
    .map((sentence) => sentence.replace(bulletPointRegex, '').trim())
    .filter((sentence) => sentence.length > 0);
}

export default function App() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [text, setText] = useState(
    `• Relative elements position themselves in relation to their normal position in the document flow.\n• Fixed elements position relative to the browser viewport, staying put even when the page scrolls.\n• Absolute elements position in relation to their closest positioned ancestor.\n• Static elements, the default, follow the document flow, ignoring ‘top’, ‘bottom’, ‘left’, ‘right’ values treated as offsets.\n• Relative, absolute and fixed remove elements from the flow, overlaying others, allowing precise positioning, while static follows the flow.`
  );

  const speak = (value, index) => {
    if (isSpeaking && speakingIndex === index) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingIndex(null);
    } else {
      const utterance = new SpeechSynthesisUtterance(value);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setSpeakingIndex(index);
    }
  };

  useEffect(() => {
    window.speechSynthesis.pause = () => {
      setIsSpeaking(false);
      setSpeakingIndex(null);
    };
  }, []);

  return (
    <div className="wrapper">
      <textarea
        onChange={(e) => {
          setText(e.target.value);
        }}
        style={{ width: '100%' }}
        rows="3"
      />
      <ul>
        {splitSentences(text).map((value, index) => {
          return (
            <li key={index}>
              {value}
              <button
                onClick={() => {
                  speak(value, index);
                }}
                style={{ marginLeft: '10px' }}
              >
                {isSpeaking && speakingIndex === index ? 'pause' : 'speak'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

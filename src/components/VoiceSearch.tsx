import React, { useState, useEffect } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff } from 'lucide-react';

interface VoiceSearchProps {
  onResult: (text: string) => void;
  className?: string;
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ onResult, className = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition({
    commands: []
  });

  useEffect(() => {
    if (!listening && transcript) {
      onResult(transcript);
      resetTranscript();
      setIsListening(false);
    }
  }, [listening, transcript, onResult, resetTranscript]);

  if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
    return null;
  }

  const toggleListening = () => {
    if (!isListening) {
      resetTranscript();
      SpeechRecognition.startListening({ 
        continuous: false,
        language: 'en-US'
      });
      setIsListening(true);
    } else {
      SpeechRecognition.stopListening();
      setIsListening(false);
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative ${className}`}
      aria-label={isListening ? "Stop voice search" : "Start voice search"}
    >
      {isListening ? (
        <>
          <MicOff className="w-5 h-5 text-red-500" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </>
      ) : (
        <Mic className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
};
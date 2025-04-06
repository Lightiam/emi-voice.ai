import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface VoiceAssistantProps {
  onCommand: (command: string) => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [commandBuffer, setCommandBuffer] = useState('');
  const lastProcessTimeRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const processCommand = useCallback((text: string) => {
    const now = Date.now();
    const timeSinceLastProcess = now - lastProcessTimeRef.current;
    
    // Clear any existing timeout
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Only process if more than 2 seconds have passed since last processing
    if (timeSinceLastProcess > 2000) {
      const command = text.toLowerCase().trim();
      
      // Only process if command is different from the buffer
      if (command !== commandBuffer && command.length > 0) {
        setCommandBuffer(command);
        onCommand(command);
        lastProcessTimeRef.current = now;
        speak("I'll help you find what you're looking for.");
      }
    }
  }, [onCommand, speak, commandBuffer]);

  useEffect(() => {
    if (transcript) {
      // Use setTimeout with window explicitly
      timeoutRef.current = window.setTimeout(() => {
        processCommand(transcript);
      }, 1000);
    }

    // Cleanup timeout on unmount or when transcript changes
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [transcript, processCommand]);

  useEffect(() => {
    if (!listening && isListening) {
      setIsListening(false);
    }
  }, [listening, isListening]);

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const toggleListening = () => {
    if (!isListening) {
      resetTranscript();
      setCommandBuffer('');
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
      speak("I'm listening. How can I help you?");
    } else {
      SpeechRecognition.stopListening();
      setIsListening(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2">
      {transcript && (
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
          <p className="text-gray-700">{transcript}</p>
        </div>
      )}
      <div className="flex gap-2">
        <button
          onClick={toggleListening}
          className="p-4 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-colors duration-200"
          aria-label={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>
        {isSpeaking && (
          <button
            className="p-4 rounded-full bg-blue-500 text-white shadow-lg"
            aria-label="Speaking"
          >
            <Volume2 className="w-6 h-6 animate-pulse" />
          </button>
        )}
      </div>
    </div>
  );
};
export interface VoiceCommand {
  type: 'search' | 'help' | 'navigate' | 'unknown';
  payload?: string;
}

export interface VoiceResponse {
  text: string;
  action?: () => void;
}
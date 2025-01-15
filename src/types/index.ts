export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatHistory {
  messages: Message[];
}

export interface MCPClientConfig {
  servers: string[];
  retryAttempts?: number;
  timeout?: number;
  apiUrl?: string;
}
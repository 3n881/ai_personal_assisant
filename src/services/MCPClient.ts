import { MCPClientConfig } from '../types';

export class MCPClient {
  private apiUrl: string;

  constructor(config: MCPClientConfig) {
    this.apiUrl = config.apiUrl || import.meta.env.VITE_API_URL || 'http://localhost:3000';
  }

  async connect(): Promise<void> {
    // Just verify the API is accessible
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('API not available');
      }
    } catch (error) {
      console.error('Failed to connect to API:', error);
      throw error;
    }
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(`${this.apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}

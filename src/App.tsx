import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { MCPClient } from './services/MCPClient';

// Initialize MCP Client (we'll add actual server URLs later)
const mcpClient = new MCPClient({
  servers: []  // Empty for now since we're not using WebSocket yet
});

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnecting, setIsConnecting] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeClient = async () => {
      try {
        await mcpClient.connect();
        setIsConnecting(false);
      } catch (error) {
        console.error('Failed to initialize:', error);
      }
    };

    initializeClient();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Get AI response
      const response = await mcpClient.sendMessage(content);
      
      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      // In a production app, we'd want to show a proper error message to the user
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="max-w-3xl mx-auto w-full">
        <ChatInput 
          onSendMessage={handleSendMessage}
          disabled={isConnecting}
        />
      </footer>
    </div>
  );
}

export default App;
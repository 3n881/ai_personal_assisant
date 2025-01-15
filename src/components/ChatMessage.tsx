import React from 'react';
import { Message } from '../types';
import { UserCircle2, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-4 p-4 ${isUser ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="flex-shrink-0">
        {isUser ? (
          <UserCircle2 className="w-6 h-6 text-gray-600" />
        ) : (
          <Bot className="w-6 h-6 text-blue-600" />
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm text-gray-900">
          {isUser ? 'You' : 'AI Assistant'}
        </div>
        <div className="mt-1 text-gray-700">
          {message.content}
        </div>
      </div>
      <div className="text-xs text-gray-400">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}
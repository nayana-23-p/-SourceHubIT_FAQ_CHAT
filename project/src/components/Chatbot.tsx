import React, { useState, useRef, useEffect } from 'react';
import { Message } from './Message';
import { TypingIndicator } from './TypingIndicator';
import { CategorySelector } from './CategorySelector';
import { FAQMatcher } from '../utils/matcher';
import { Message as MessageType } from '../types';
import { Send, MessageCircle, RefreshCw } from 'lucide-react';

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const matcher = new FAQMatcher();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: MessageType = {
      id: '1',
      text: 'Hi! I\'m your FAQ assistant. Ask me anything about our services, or browse the categories below to get started.',
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        'What are your business hours?',
        'How can I contact support?',
        'What is your return policy?'
      ]
    };
    setMessages([welcomeMessage]);
  }, []);

  const simulateTyping = (callback: () => void, delay: number = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const addMessage = (text: string, isUser: boolean, suggestions?: string[]) => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
      suggestions
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || currentInput.trim();
    if (!messageText) return;

    // Hide categories after first user message
    setShowCategories(false);

    // Add user message
    addMessage(messageText, true);
    setCurrentInput('');

    // Find best match
    const match = matcher.findBestMatch(messageText);

    simulateTyping(() => {
      if (match && match.score > 30) {
        // High confidence match
        const suggestions = matcher.findSimilarQuestions(messageText, 3)
          .filter(faq => faq.id !== match.faq.id)
          .slice(0, 2)
          .map(faq => faq.question);
        
        addMessage(match.faq.answer, false, suggestions);
      } else if (match) {
        // Low confidence match
        const similarQuestions = matcher.findSimilarQuestions(messageText, 4);
        const response = `I think you might be asking about "${match.faq.question}". Here's what I know:\n\n${match.faq.answer}\n\nWas this helpful? If not, you might be looking for one of these:`;
        const suggestions = similarQuestions
          .filter(faq => faq.id !== match.faq.id)
          .slice(0, 3)
          .map(faq => faq.question);
        
        addMessage(response, false, suggestions);
      } else {
        // No good match found
        const randomSuggestions = matcher.getRandomSuggestions(3);
        const response = "I'm sorry, I couldn't find an exact answer to your question. Here are some popular questions that might help:";
        addMessage(response, false, randomSuggestions.map(faq => faq.question));
      }
    });
  };

  const handleCategorySelect = (category: string) => {
    setShowCategories(false);
    addMessage(`Show me questions about ${category}`, true);

    const categoryFAQs = matcher.getFAQsByCategory(category);
    
    simulateTyping(() => {
      const response = `Here are the most common questions about ${category}:`;
      const suggestions = categoryFAQs.slice(0, 4).map(faq => faq.question);
      addMessage(response, false, suggestions);
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowCategories(true);
    
    // Re-add welcome message
    setTimeout(() => {
      const welcomeMessage: MessageType = {
        id: Date.now().toString(),
        text: 'Hi! I\'m your FAQ assistant. Ask me anything about our services, or browse the categories below to get started.',
        isUser: false,
        timestamp: new Date(),
        suggestions: [
          'What are your business hours?',
          'How can I contact support?',
          'What is your return policy?'
        ]
      };
      setMessages([welcomeMessage]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">FAQ Assistant</h2>
            <p className="text-sm text-gray-600">Always here to help</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          title="Clear chat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showCategories && <CategorySelector onCategorySelect={handleCategorySelect} />}
        
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            onSuggestionClick={handleSendMessage}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!currentInput.trim() || isTyping}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
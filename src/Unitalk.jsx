import React, { useState, useRef, useEffect } from 'react';
import { Send, Globe, Volume2, Copy, ThumbsUp, ThumbsDown, Mic, Settings, Languages, Sparkles } from 'lucide-react';

const Unitalk = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "नमस्ते! मैं Unitalk हूं। मैं किसी भी भाषा में आपकी मदद कर सकता हूं। आप किस भाषा में बात करना चाहेंगे?",
      sender: 'bot',
      language: 'hi',
      timestamp: new Date().toLocaleTimeString(),
      translated: "Hello! I'm Unitalk. I can help you in any language. Which language would you like to chat in?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const messagesEndRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [isLanguageDetecting, setIsLanguageDetecting] = useState(false);

  // Language detection function (you can integrate with Google Translate API)
  const detectLanguage = async (text) => {
    setIsLanguageDetecting(true);
    try {
      // Replace with actual API call
      // const response = await fetch('/api/detect-language', {
      //   method: 'POST',
      //   body: JSON.stringify({ text })
      // });
      
      // Simulate detection for demo
      await new Promise(resolve => setTimeout(resolve, 500));
      const detected = 'auto-detected'; // This would be the actual detected language
      setDetectedLanguage(detected);
      return detected;
    } catch (error) {
      console.error('Language detection failed:', error);
      return selectedLanguage;
    } finally {
      setIsLanguageDetecting(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Detect language of user input
    const detectedLang = await detectLanguage(inputText);

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      language: detectedLang || selectedLanguage,
      detectedLanguage: detectedLang !== selectedLanguage ? detectedLang : null,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // API call to your backend
    try {
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     message: inputText,
      //     detectedLanguage: detectedLang,
      //     preferredLanguage: selectedLanguage,
      //     conversationId: 'unique-id'
      //   })
      // });
      // const data = await response.json();

      // Simulate bot response with dynamic language support
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: `I understand your message in ${detectedLang || selectedLanguage}! I can respond in any language you prefer.`,
          sender: 'bot',
          language: selectedLanguage,
          originalLanguage: detectedLang,
          timestamp: new Date().toLocaleTimeString(),
          translated: detectedLang !== selectedLanguage ? "Translation available" : undefined
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 2000);
    } catch (error) {
      console.error('Chat API failed:', error);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Sidebar */}
      <div className="w-80 bg-white/80 backdrop-blur-lg border-r border-indigo-100 p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Unitalk</h1>
            <p className="text-sm text-gray-500">Language Agnostic AI</p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Languages className="w-4 h-4" />
            Select Language
          </label>
          <select 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span className="font-medium text-gray-900">Multi-Language</span>
            </div>
            <p className="text-sm text-gray-600">Communicate in 8+ languages</p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-900">Voice Support</span>
            </div>
            <p className="text-sm text-gray-600">Text-to-speech in native languages</p>
          </div>

          <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span className="font-medium text-gray-900">Smart Translation</span>
            </div>
            <p className="text-sm text-gray-600">Real-time language detection</p>
          </div>
        </div>

        {/* Settings */}
        <div className="mt-auto">
          <button className="w-full p-3 text-left hover:bg-gray-50 rounded-xl transition-all duration-200 flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700">Settings</span>
          </button>
          
          <div className="mt-4 p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white text-center">
            <p className="text-sm font-medium">SIH 2025 - PS1104</p>
            <p className="text-xs opacity-80">Language Agnostic Chatbot</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white/40 backdrop-blur-sm">
        {/* Top Bar */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-gray-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Unitalk Assistant</h2>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Online • Ready to help in any language
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowTranslation(!showTranslation)}
              className={`p-2 rounded-lg transition-all duration-200 ${showTranslation ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Globe className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`p-4 rounded-2xl ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white ml-4' 
                    : 'bg-white shadow-lg border border-gray-100 mr-4'
                }`}>
                  <p className="text-sm mb-2">{message.text}</p>
                  
                  {showTranslation && message.translated && message.sender === 'bot' && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Translation:</p>
                      <p className="text-sm text-gray-600">{message.translated}</p>
                    </div>
                  )}
                  
                  <div className={`flex items-center justify-between mt-3 ${
                    message.sender === 'user' ? 'text-indigo-100' : 'text-gray-400'
                  }`}>
                    <span className="text-xs">{message.timestamp}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">
                        {languages.find(l => l.code === message.language)?.flag}
                      </span>
                      {message.sender === 'bot' && (
                        <div className="flex gap-1">
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <Copy className="w-3 h-3" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <Volume2 className="w-3 h-3" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <ThumbsUp className="w-3 h-3" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <ThumbsDown className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white shadow-lg border border-gray-100 rounded-2xl p-4 mr-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-gray-500">Unitalk is typing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100">
          <div className="flex items-end gap-3 max-w-4xl mx-auto">
            <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200">
              <Mic className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Type a message in ${languages.find(l => l.code === selectedLanguage)?.name}...`}
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white/70 backdrop-blur-sm"
                rows="1"
                style={{minHeight: '56px', maxHeight: '120px'}}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  {languages.find(l => l.code === selectedLanguage)?.flag}
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-3 text-xs text-gray-400">
            <p>Unitalk can communicate in multiple languages • SIH 2025 Project</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unitalk;
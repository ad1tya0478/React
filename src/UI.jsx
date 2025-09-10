import React, { useState, useRef, useEffect } from 'react';
import { Send, Globe, Volume2, Copy, ThumbsUp, ThumbsDown, Mic, Settings, Languages, Sparkles } from 'lucide-react';
import './UI.css';  

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

  useEffect(() => { scrollToBottom(); }, [messages]);

  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [isLanguageDetecting, setIsLanguageDetecting] = useState(false);

  const detectLanguage = async (text) => {
    setIsLanguageDetecting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setDetectedLanguage('auto-detected');
    setIsLanguageDetecting(false);
    return 'auto-detected';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
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
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="unitalk-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Sparkles className="icon-white" />
          </div>
          <div>
            <h1>Unitalk</h1>
            <p>Language Agnostic AI</p>
          </div>
        </div>

        <div className="language-selector">
          <label>
            <Languages className="icon-gray" /> Select Language
          </label>
          <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
            {languages.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
          </select>
        </div>

        <div className="features">
          <div className="feature multi-lang">
            <Globe className="icon-colored" /> Multi-Language
            <p>Communicate in 8+ languages</p>
          </div>
          <div className="feature voice">
            <Volume2 className="icon-colored" /> Voice Support
            <p>Text-to-speech in native languages</p>
          </div>
          <div className="feature smart-translation">
            <Sparkles className="icon-colored" /> Smart Translation
            <p>Real-time language detection</p>
          </div>
        </div>

        <div className="sidebar-footer">
          <button><Settings className="icon-gray" /> Settings</button>
          <div className="project-info">
            <p>SIH 2025 - PS1104</p>
            <p>Language Agnostic Chatbot</p>
          </div>
        </div>
      </div>

      <div className="chat-area">
        <div className="chat-topbar">
          <div className="assistant-info">
            <div className="status-indicator"></div>
            <div>
              <h2>Unitalk Assistant</h2>
              <p><div className="online-dot"></div> Online • Ready to help in any language</p>
            </div>
          </div>
          <div className="chat-buttons">
            <button onClick={() => setShowTranslation(!showTranslation)}><Globe /></button>
            <button><Volume2 /></button>
          </div>
        </div>

        <div className="messages-area">
          {messages.map(message => (
            <div key={message.id} className={`message-row ${message.sender}`}>
              <div className={`message-bubble ${message.sender}`}>
                <p>{message.text}</p>
                {showTranslation && message.translated && message.sender === 'bot' && (
                  <div className="translation">
                    <p>Translation:</p>
                    <p>{message.translated}</p>
                  </div>
                )}
                <div className="message-meta">
                  <span>{message.timestamp}</span>
                  <div className="message-actions">
                    <span>{languages.find(l => l.code === message.language)?.flag}</span>
                    {message.sender === 'bot' && (
                      <div className="action-buttons">
                        <Copy /> <Volume2 /> <ThumbsUp /> <ThumbsDown />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && <div className="typing-indicator">Unitalk is typing...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <button><Mic /></button>
          <textarea value={inputText} onChange={e => setInputText(e.target.value)} onKeyPress={handleKeyPress} placeholder={`Type a message in ${languages.find(l => l.code === selectedLanguage)?.name}...`} />
          <button onClick={handleSendMessage} disabled={!inputText.trim()}><Send /></button>
        </div>
      </div>
    </div>
  );
};

export default Unitalk;

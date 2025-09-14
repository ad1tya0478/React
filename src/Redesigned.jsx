import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Paperclip, Plus, MessageCircle, Moon, Sun, Globe, X, Menu, User, Hash } from 'lucide-react';

const AIChatbot = ({ onClose }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isRecording, setIsRecording] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentChatId, setCurrentChatId] = useState('chat-1');
  const [chatHistory, setChatHistory] = useState({
    'chat-1': {
      id: 'chat-1',
      title: 'General Queries',
      messages: [
        { id: 1, type: 'bot', content: 'Hello! I am your AI Linguistic Assistant. How can I help you today?', timestamp: new Date() },
      ]
    }
  });
  
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Student info (replace with actual data from props/context)
  const studentInfo = {
    name: 'John Doe',
    rollNumber: 'CS21B001'
  };

  // Language options with Indian languages
  const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    hi: { name: 'हिंदी', flag: '🇮🇳' },
    te: { name: 'తెలుగు', flag: '🇮🇳' },
    ta: { name: 'தமிழ்', flag: '🇮🇳' },
    bn: { name: 'বাংলা', flag: '🇮🇳' },
    gu: { name: 'ગુજરાતી', flag: '🇮🇳' }
  };

  // Example test cases for different languages
  const exampleQueries = {
    en: [
      "Explain quantum physics",
      "What is machine learning?",
      "Help me with calculus"
    ],
    hi: [
      "भौतिक विज्ञान समझाएं",
      "मशीन लर्निंग क्या है?",
      "गणित में मदद करें"
    ],
    te: [
      "భౌతిక శాస్త్రం వివరించండి",
      "మెషిన్ లర్నింగ్ అంటే ఏమిటి?",
      "గణితంలో సహాయం చేయండి"
    ],
    ta: [
      "இயற்பியல் விளக்கவும்",
      "இயந்திர கற்றல் என்றால் என்ன?",
      "கணிதத்தில் உதவி செய்யுங்கள்"
    ],
    bn: [
      "পদার্থবিজ্ঞান ব্যাখ্যা করুন",
      "মেশিন লার্নিং কি?",
      "গণিতে সাহায্য করুন"
    ],
    gu: [
      "ભૌતિકશાસ્ત્ર સમજાવો",
      "મશીન લર્નિંગ શું છે?",
      "ગણિતમાં મદદ કરો"
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const sendMessage = async (message = currentMessage) => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      language: selectedLanguage
    };

    setChatHistory(prev => ({
      ...prev,
      [currentChatId]: {
        ...prev[currentChatId],
        messages: [...prev[currentChatId].messages, newMessage]
      }
    }));

    setCurrentMessage('');

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: `I understand you asked: "${message}" in ${languages[selectedLanguage].name}. This is where I would process your request through the AI pipeline.`,
        timestamp: new Date()
      };

      setChatHistory(prev => ({
        ...prev,
        [currentChatId]: {
          ...prev[currentChatId],
          messages: [...prev[currentChatId].messages, botResponse]
        }
      }));
    }, 1000);
  };

  const startNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChat = {
      id: newChatId,
      title: 'New Chat',
      messages: [
        { id: 1, type: 'bot', content: 'Hello! I am your AI Linguistic Assistant. How can I help you today?', timestamp: new Date() }
      ]
    };

    setChatHistory(prev => ({ ...prev, [newChatId]: newChat }));
    setCurrentChatId(newChatId);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File uploaded:', file.name);
      // You can add file processing logic here
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Add voice recording logic here
    console.log(isRecording ? 'Stopped recording' : 'Started recording');
  };

  const handleExampleQuery = (query) => {
    setCurrentMessage(query);
    sendMessage(query);
  };

  const currentChat = chatHistory[currentChatId];
  const currentExamples = exampleQueries[selectedLanguage] || exampleQueries.en;

  // if (!isOpen) {
  //   return (
  //     <div className="fixed bottom-6 right-6 z-50">
  //       <button
  //         onClick={() => setIsOpen(true)}
  //         className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
  //       >
  //         <MessageCircle size={24} />
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className={`fixed inset-0 z-50 flex ${darkMode ? 'dark' : ''}`}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Main Container */}
      <div className={`relative m-auto w-full max-w-6xl h-full max-h-[90vh] flex rounded-lg overflow-hidden shadow-2xl ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        } border-r transition-all duration-300 overflow-hidden`}>
          <div className="p-4 space-y-4">
            {/* Student Info */}
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-sm`}>
              <div className="flex items-center space-x-2 text-sm">
                <User size={16} className="text-blue-500" />
                <span className="font-medium">{studentInfo.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                <Hash size={14} />
                <span>{studentInfo.rollNumber}</span>
              </div>
            </div>

            {/* New Chat Button */}
            <button
              onClick={startNewChat}
              className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'
              } shadow-sm`}
            >
              <Plus size={16} />
              <span>New Chat</span>
            </button>

            {/* Chat History */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Chat History</h3>
              {Object.values(chatHistory).map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setCurrentChatId(chat.id)}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    currentChatId === chat.id
                      ? (darkMode ? 'bg-blue-600' : 'bg-blue-100')
                      : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200')
                  }`}
                >
                  <div className="truncate text-sm">{chat.title}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {chat.messages.length} messages
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b ${
            darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <Menu size={20} />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h2 className="font-semibold">AI Linguistic Assistant</h2>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={`p-2 rounded-lg border ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                } text-sm`}
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentChat?.messages.length === 1 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">Welcome to AI Linguistic Assistant</h3>
                <p className="text-gray-500 mb-6">Try asking in your preferred language</p>
                
                {/* Example Queries */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Example queries in {languages[selectedLanguage].name}:</p>
                  {currentExamples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleQuery(example)}
                      className={`block mx-auto px-4 py-2 text-sm rounded-full transition-colors ${
                        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentChat?.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : (darkMode ? 'bg-gray-700' : 'bg-gray-100')
                  }`}
                >
                  {message.content}
                  {message.language && message.language !== 'en' && (
                    <div className="text-xs opacity-70 mt-1">
                      {languages[message.language]?.flag} {languages[message.language]?.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-2">
              {/* File Upload */}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <Paperclip size={20} />
              </button>

              {/* Message Input */}
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={`Type your message in ${languages[selectedLanguage].name}...`}
                className={`flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              />

              {/* Voice Input */}
              <button
                className={`p-2 rounded-lg transition-colors ${(darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')
                }`}
              >
                <Mic size = {20}/>
              </button>

              {/* Send Button */}
              <button
                onClick={() => sendMessage()}
                disabled={!currentMessage.trim()}
                className={`p-2 rounded-lg transition-colors ${
                  currentMessage.trim()
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : (darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400')
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
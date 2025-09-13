// Unitalk.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Globe, Volume2, Copy, ThumbsUp, ThumbsDown, Mic, Settings, Languages,
  Sparkles, Menu, X, ChevronLeft, ChevronRight, Paperclip, Image, FileText,
  Sun, Moon, Plus, Trash2
} from 'lucide-react';
import LanguageSelect from "./assets/LanguageSelect";

const Unitalk = () => {
  // --- Chat sessions state ---
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const currentSession = sessions.find(s => s.id === currentSessionId);
  const messages = currentSession?.messages || [];
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // --- Theme state ---
  const [isDarkMode, setIsDarkMode] = useState(true);

  // --- File attachment state ---
  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // --- Input focus state (for transitions) ---
  const [inputFocused, setInputFocused] = useState(false);

  // --- Languages list (sample) ---
  const languages = [
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
  { code: 'bg', name: 'Bulgarian', flag: '🇧🇬' },
  { code: 'ca', name: 'Catalan', flag: '🇦🇩' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', flag: '🇹🇼' },
  { code: 'hr', name: 'Croatian', flag: '🇭🇷' },
  { code: 'cs', name: 'Czech', flag: '🇨🇿' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'et', name: 'Estonian', flag: '🇪🇪' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'el', name: 'Greek', flag: '🇬🇷' },
  { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'hu', name: 'Hungarian', flag: '🇭🇺' },
  { code: 'is', name: 'Icelandic', flag: '🇮🇸' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'lv', name: 'Latvian', flag: '🇱🇻' },
  { code: 'lt', name: 'Lithuanian', flag: '🇱🇹' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾' },
  { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴' },
  { code: 'fa', name: 'Persian', flag: '🇮🇷' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'sk', name: 'Slovak', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenian', flag: '🇸🇮' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'uk', name: 'Ukrainian', flag: '🇺🇦' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'zu', name: 'Zulu', flag: '🇿🇦' },
];


  // --- Theme classes derived ---
  const themeClasses = {
    bodyBg: isDarkMode ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200',
    sidebarBg: isDarkMode ? 'bg-gray-900/90 text-white' : 'bg-white/90 text-gray-900',
    panelBg: isDarkMode ? 'bg-gray-800/80 text-white' : 'bg-white/90 text-gray-900',
    inputBg: isDarkMode ? 'bg-gray-800/60' : 'bg-white',
    inputBorder: isDarkMode ? 'border-gray-700' : 'border-gray-300',
    inputArea: isDarkMode ? 'bg-gray-900/80' : 'bg-white/90',
    inputAreaBorder: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textTertiary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    hoverBg: isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
  };

  // --- Scrolling ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => { scrollToBottom(); }, [messages, isTyping, attachedFiles]);

  // --- Load and persist sessions ---
  useEffect(() => {
    try {
      const stored = localStorage.getItem('unitalk_sessions_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed);
          setCurrentSessionId(parsed[0].id);
          return;
        }
      }
      const newId = Date.now().toString();
      const initial = [{ id: newId, title: 'New chat', messages: [], createdAt: Date.now(), updatedAt: Date.now() }];
      setSessions(initial);
      setCurrentSessionId(newId);
    } catch (e) {
      console.error('Failed to load sessions', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('unitalk_sessions_v1', JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to persist sessions', e);
    }
  }, [sessions]);

  const createNewSession = () => {
    const newId = Date.now().toString();
    const newSession = { id: newId, title: 'New chat', messages: [], createdAt: Date.now(), updatedAt: Date.now() };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
  };

  const deleteSession = (e, id) => {
    e.stopPropagation();
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== id);
      if (filtered.length === 0) {
        const newId = Date.now().toString();
        const newSession = { id: newId, title: 'New chat', messages: [], createdAt: Date.now(), updatedAt: Date.now() };
        setCurrentSessionId(newId);
        return [newSession];
      }
      if (id === currentSessionId) {
        setCurrentSessionId(filtered[0].id);
      }
      return filtered;
    });
  };

  const generateTitleFromText = (text) => {
    const cleaned = (text || '').replace(/\s+/g, ' ').trim();
    if (!cleaned) return 'New chat';
    if (cleaned.length <= 30) return cleaned;
    const slice = cleaned.slice(0, 30);
    const lastSpace = slice.lastIndexOf(' ');
    const trimmed = lastSpace > 10 ? slice.slice(0, lastSpace) : slice;
    return trimmed + '…';
  };

  // --- Simple/mock language detection (keeps original) ---
  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [isLanguageDetecting, setIsLanguageDetecting] = useState(false);
  const detectLanguage = async (text) => {
    setIsLanguageDetecting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 250));
      const mockDetection = {
        'hello': 'en', 'hola': 'es', 'bonjour': 'fr', 'guten': 'de',
        'नमस्ते': 'hi', 'こんにちは': 'ja', '안녕하세요': 'ko', 'مرحبا': 'ar',
        'привет': 'ru', 'ciao': 'it', 'olá': 'pt', '你好': 'zh'
      };
      const detectedLang = Object.keys(mockDetection).find(key => text.toLowerCase().includes(key.toLowerCase()));
      const detected = detectedLang ? mockDetection[detectedLang] : selectedLanguage;
      setDetectedLanguage(detected);
      return detected;
    } catch (err) {
      console.error(err);
      return selectedLanguage;
    } finally {
      setIsLanguageDetecting(false);
    }
  };

  // --- Send message flow ---
  const handleSendMessage = async () => {
    if (!inputText.trim() && attachedFiles.length === 0) return;

    const detectedLang = inputText.trim() ? await detectLanguage(inputText) : selectedLanguage;

    const newUserMsg = {
      id: Date.now(),
      text: inputText || (attachedFiles.length ? `Sent ${attachedFiles.length} file(s)` : ''),
      sender: 'user',
      language: detectedLang,
      detectedLanguage: detectedLang !== selectedLanguage ? detectedLang : null,
      timestamp: new Date().toLocaleTimeString(),
      files: attachedFiles.map(f => ({ id: f.id, name: f.name, type: f.type, url: f.url }))
    };

    setSessions(prev => prev.map(s => {
      if (s.id !== currentSessionId) return s;
      const shouldTitle = !s.title || s.title === 'New chat';
      return {
        ...s,
        title: shouldTitle ? generateTitleFromText(newUserMsg.text) : s.title,
        messages: [...s.messages, newUserMsg],
        updatedAt: Date.now()
      };
    }));
    setInputText('');
    setAttachedFiles([]); // clear after sending
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responses = {
        'en': "I detected English! I can help you in any language.",
        'hi': "मैंने हिंदी पहचानी! मैं किसी भी भाषा में मदद कर सकता हूं।",
        'es': "¡Detecté español! Puedo ayudarte en cualquier idioma.",
        'fr': "J'ai détecté le français ! Je peux vous aider dans n'importe quelle langue.",
        'de': "Ich habe Deutsch erkannt! Ich kann dir in jeder Sprache helfen.",
        'ja': "日本語を検出しました！どの言語でもお手伝いできます。",
        'ko': "한국어를 감지했습니다! 어떤 언어로든 도와드릴 수 있습니다。",
        'ar': "لقد اكتشفت العربية! يمكنني مساعدتك بأي لغة."
      };

      const botMessage = {
        id: Date.now() + 1,
        text: responses[detectedLang] || responses.en,
        sender: 'bot',
        language: detectedLang,
        timestamp: new Date().toLocaleTimeString(),
        translated: detectedLang !== 'en' ? responses.en : undefined
      };
      setSessions(prev => prev.map(s => {
        if (s.id !== currentSessionId) return s;
        return { ...s, messages: [...s.messages, botMessage], updatedAt: Date.now() };
      }));
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // --- File handling helpers ---
  const handleFileAttachment = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newFiles = files.map((file, idx) => ({
      id: `${Date.now()}_${idx}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      raw: file
    }));
    setAttachedFiles(prev => [...prev, ...newFiles]);
    // reset input so same file can be selected again if needed
    e.target.value = '';
  };

  const removeFile = (id) => {
    setAttachedFiles(prev => {
      const toRemove = prev.find(f => f.id === id);
      if (toRemove?.url) URL.revokeObjectURL(toRemove.url);
      return prev.filter(f => f.id !== id);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // --- small UI helpers ---
  const toggleTheme = () => setIsDarkMode(v => !v);

  return (
    <div className={`flex h-screen ${themeClasses.bodyBg}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} ${themeClasses.sidebarBg} backdrop-blur-lg border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6 flex flex-col fixed lg:relative z-50 h-full transform transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 bg-indigo-600 hover:bg-indigo-700 rounded-full items-center justify-center transition-colors z-10"
        >
          {sidebarCollapsed ? <ChevronRight className="w-3 h-3 text-white" /> : <ChevronLeft className="w-3 h-3 text-white" />}
        </button>

        {!sidebarCollapsed ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>

            <button
              onClick={createNewSession}
              className={`w-full mb-4 flex items-center gap-2 p-3 rounded-xl transition-colors ${isDarkMode ? 'bg-gray-800/60 hover:bg-gray-800 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
            >
              <Plus className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
              <span>New chat</span>
            </button>

            <div className="flex-1 overflow-y-auto space-y-1 mb-4">
              {[...sessions].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSessionId(s.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    s.id === currentSessionId
                      ? (isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900')
                      : (isDarkMode ? 'hover:bg-gray-800/60 text-gray-300' : 'hover:bg-gray-100 text-gray-700')
                  }`}
                  title={s.title || 'New chat'}
                >
                  <span className="truncate pr-2">{s.title || 'New chat'}</span>
                  <button
                    onClick={(e) => deleteSession(e, s.id)}
                    className={`ml-2 p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                    title="Delete chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </button>
              ))}
            </div>

            <div className="mb-4">
            <p className="flex items-center gap-2 text-gray-300 mb-2">
              🌐 Select Language
            </p>
            <LanguageSelect
              languages={languages}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
          </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-indigo-900/20 to-purple-900/10 rounded-xl border border-indigo-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-indigo-400" />
                  <span className="font-medium text-white">Multi-Language</span>
                </div>
                <p className="text-sm text-gray-400">Communicate in multiple languages</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/10 rounded-xl border border-green-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-4 h-4 text-green-400" />
                  <span className="font-medium text-white">Voice Support</span>
                </div>
                <p className="text-sm text-gray-400">Text-to-speech in native languages</p>
              </div>
            </div>

            {/* Settings row with theme toggle to the right of Settings (requirement) */}
            <div className="mt-auto">
              <div className="flex items-center gap-2">
                <button className="flex-1 p-3 text-left hover:bg-gray-800 rounded-xl transition-all duration-200 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Settings</span>
                </button>

                {/* Theme toggle positioned to the right of Settings */}
                <button
                  onClick={toggleTheme}
                  title="Toggle theme"
                  className="p-3 rounded-xl transition-colors border border-transparent hover:shadow-md flex items-center gap-2"
                >
                  {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
                </button>
              </div>

              <div className="mt-4 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white flex items-center gap-3">
                <img
                  src="/assets/a.jpg"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="%236366F1"/></svg>';
                  }}
                />
                <div className="text-left">
                  <p className="text-sm font-medium">User_Name</p>
                  <p className="text-xs opacity-80">Email_In_Short_here</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col gap-3">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                <Languages className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Bar */}
        <div className={`bg-opacity-80 backdrop-blur-lg border-b p-4 flex items-center justify-between ${isDarkMode ? 'bg-gray-900/80 border-gray-700 text-white' : 'bg-white/80 border-gray-200 text-gray-900'}`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-900 rounded-lg"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="font-semibold text-sm md:text-base">{isDarkMode ? 'Unitalk Assistant' : 'Unitalk Assistant'}</h2>
              <p className="text-xs md:text-sm text-green-400 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="hidden sm:inline">Online • Ready to help in any language</span>
                <span className="sm:hidden">Online</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`p-2 rounded-lg transition-all duration-200 ${showTranslation ? 'bg-indigo-600 text-white' : isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Globe className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-3 md:p-6 space-y-4 md:space-y-6 ${isDarkMode ? '' : ''}`}>
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-2xl ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`p-3 md:p-4 rounded-2xl ${message.sender === 'user' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : `${isDarkMode ? 'bg-gray-800/80 border border-gray-700 text-white' : 'bg-white border border-gray-200 text-gray-900'}`}`}>
                  <p className="text-sm md:text-base mb-2">{message.text}</p>

                  {message.files && message.files.length > 0 && (
                    <div className="mb-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {message.files.map(f => (
                        <div key={f.id} className="flex items-center gap-2 p-2 rounded bg-black/10">
                          {f.type?.startsWith('image/') && f.url ? (
                            <img src={f.url} alt={f.name} className="w-12 h-12 object-cover rounded" />
                          ) : (
                            <FileText className="w-8 h-8" />
                          )}
                          <div className="text-xs">
                            <div className="font-medium truncate max-w-[140px]">{f.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {message.detectedLanguage && message.detectedLanguage !== message.language && (
                    <div className="mb-2 p-2 bg-blue-900/20 rounded-lg border border-blue-500/10">
                      <p className="text-xs text-blue-300 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        Auto-detected: {languages.find(l => l.code === message.detectedLanguage)?.name}
                      </p>
                    </div>
                  )}

                  {showTranslation && message.translated && message.sender === 'bot' && (
                    <div className="mt-3 pt-3 border-t border-gray-600">
                      <p className="text-xs text-gray-400 mb-1">Translation:</p>
                      <p className="text-xs md:text-sm text-gray-300">{message.translated}</p>
                    </div>
                  )}

                  <div className={`flex items-center justify-between mt-3 ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                    <span className="text-xs">{message.timestamp}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{languages.find(l => l.code === message.language)?.flag}</span>
                      {message.sender === 'bot' && (
                        <div className="hidden sm:flex gap-1">
                          <button className={`p-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded transition-colors`}><Copy className="w-3 h-3" /></button>
                          <button className={`p-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded transition-colors`}><Volume2 className="w-3 h-3" /></button>
                          <button className={`p-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded transition-colors`}><ThumbsUp className="w-3 h-3" /></button>
                          <button className={`p-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded transition-colors`}><ThumbsDown className="w-3 h-3" /></button>
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
              <div className={`${isDarkMode ? 'bg-gray-800/80 border border-gray-700' : 'bg-white/90 border border-gray-200'} rounded-2xl p-4 mr-2 md:mr-4`}>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-sm text-gray-400">Unitalk is typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-3 md:p-4 ${themeClasses.inputArea} backdrop-blur-lg border-t ${themeClasses.inputAreaBorder}`}>
          {/* Attached Files Display */}
          {attachedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachedFiles.map((file) => (
                <div key={file.id} className={`flex items-center gap-2 px-3 py-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg text-sm`}>
                  {file.type.startsWith('image/') ? <Image className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  <span className={`${themeClasses.text} max-w-32 truncate`}>{file.name}</span>
                  <span className={`${themeClasses.textTertiary} text-xs`}>({formatFileSize(file.size)})</span>
                  <button onClick={() => removeFile(file.id)} className="ml-1 text-red-500 hover:text-red-600 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 md:gap-3 max-w-4xl mx-auto">
            {/* Mic button (left) */}
            <button className={`flex-shrink-0 p-2 md:p-3 ${themeClasses.textTertiary} ${themeClasses.hoverBg} rounded-xl transition-all duration-200`}>
              <Mic className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Input (middle) - attachment button placed between input and send/mic: user asked "in the middle of text bar and mic button" so we put attach between mic and input */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`flex-shrink-0 p-2 md:p-3 ${themeClasses.textTertiary} ${themeClasses.hoverBg} rounded-xl transition-all duration-200 hover:scale-105`}
              title="Attach files"
            >
              <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx,.txt" onChange={handleFileAttachment} className="hidden" />

            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder={`Type in ${languages.find(l => l.code === selectedLanguage)?.name || 'English'}...`}
                className={`w-full p-3 md:p-4 border ${themeClasses.inputBorder} rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${themeClasses.inputBg} ${themeClasses.text} text-sm md:text-base transition-all duration-300 ${inputFocused ? 'shadow-lg scale-[1.02]' : 'shadow-md'}`}
                rows="1"
                style={{ minHeight: '48px', maxHeight: '140px' }}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <span className={`text-xs ${themeClasses.textTertiary}`}>{languages.find(l => l.code === selectedLanguage)?.flag}</span>
              </div>
            </div>

            {/* Send button (right) */}
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() && attachedFiles.length === 0}
              className={`flex-shrink-0 p-2 md:p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform ${inputText.trim() || attachedFiles.length ? 'shadow-lg' : ''}`}
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
            <p className="text-center">
              <span className="hidden sm:inline">Unitalk can communicate in multiple languages • </span>
              SIH 2025 Project
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unitalk;


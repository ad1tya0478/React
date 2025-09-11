// src/components/LanguageSelect.jsx
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const LanguageSelect = ({ languages, selectedLanguage, setSelectedLanguage }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('touchstart', onDocClick);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('touchstart', onDocClick);
    };
  }, []);

  const current = languages.find(l => l.code === selectedLanguage);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-800/70 backdrop-blur text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="flex items-center gap-2 truncate">
          <span className="text-sm">{current?.flag}</span>
          <span className="truncate">{current?.name || 'Select Language'}</span>
        </span>

        <ChevronDown
          className={`w-5 h-5 transform transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Dropdown (positioned & animated; bounded height + scrollable) */}
      <div
        className={`absolute left-0 right-0 mt-2 z-50 transition-all duration-180 origin-top ${
          open ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-1 scale-95 pointer-events-none'
        }`}
      >
        <ul
          role="listbox"
          className="bg-gray-800/90 backdrop-blur rounded-xl shadow-lg border border-gray-700 overflow-auto max-h-60"
        >
          {languages.map(lang => (
            <li
              key={lang.code}
              role="option"
              onClick={() => { setSelectedLanguage(lang.code); setOpen(false); }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-indigo-600 cursor-pointer transition-colors"
            >
              <span className="w-6 text-sm">{lang.flag}</span>
              <span className="truncate">{lang.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageSelect;

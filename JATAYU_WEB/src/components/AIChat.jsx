import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Brain, User, Loader2, Activity } from 'lucide-react';
import { predictSymptoms } from '../services/apiService';

const AIChat = ({ fullScreen = false }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Hello. I am the AI Health Chat. Describe your symptoms naturally, and I will analyze them.', predictions: null, followup: null }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Call real API service (which falls back if offline)
    const response = await predictSymptoms(userMessage.text, sessionId);
    
    if (response.sessionId) {
      setSessionId(response.sessionId);
    }

    setIsTyping(false);
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      type: 'ai', 
      text: response.text, 
      predictions: response.predictions,
      followup: response.followup
    }]);
  };

  return (
    <div className={`glass-panel flex flex-col h-full border-primary-500/20 ${fullScreen ? 'shadow-[0_0_50px_rgba(14,165,233,0.1)]' : ''}`}>
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500 glow-box">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold">AI Health Chat</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-500">System Online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'user' ? 'bg-accent-500/20 text-accent-500' : 'bg-primary-500/20 text-primary-500'}`}>
                {msg.type === 'user' ? <User className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 ${msg.type === 'user' ? 'bg-accent-500/20 text-white rounded-tr-sm' : 'bg-white/5 border border-white/10 rounded-tl-sm'}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                
                {msg.predictions && msg.predictions.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Prediction Confidence</p>
                    {msg.predictions.map((pred, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-300 font-medium">{pred.condition}</span>
                          <span className="text-gray-400">{pred.confidence}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full ${pred.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${pred.confidence}%` }}
                            transition={{ duration: 1, delay: 0.5 + (idx * 0.2) }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {msg.followup && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm text-primary-400 italic">" {msg.followup} "</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-primary-500/20 text-primary-500 flex items-center justify-center shrink-0">
                <Brain className="w-4 h-4" />
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
               <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />
               <span className="text-xs text-gray-400">Analyzing symptoms...</span>
             </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your symptoms here..."
            className="w-full bg-black/50 border border-white/10 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:border-primary-500/50 text-sm transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-2 rounded-full bg-primary-500 text-white disabled:opacity-50 hover:bg-primary-400 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;

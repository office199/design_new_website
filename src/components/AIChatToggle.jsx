import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { services, doctor } from '../data/content';

// Smart AI response engine based on hospital data
function getAIResponse(message) {
  const msg = message.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|assalam|salam|namaste|good\s*(morning|afternoon|evening))/.test(msg)) {
    return `Hello! 👋 Welcome to **Ashu Laser Vision** — Super Multi Specialty Eye & Retina Hospital.\n\nI'm your AI assistant. I can help you with:\n• Eye services & treatments\n• Doctor information\n• Appointment booking\n• Technology & equipment\n• Location & contact\n\nHow can I help you today?`;
  }

  // Appointment / Booking
  if (/appoint|book|schedule|visit|consult/.test(msg)) {
    return `📅 **Book an Appointment**\n\nYou can reach us directly:\n📞 **Call:** +91 93223 64002\n💬 **WhatsApp:** wa.me/919322364002\n📍 **Visit:** Andheri, Mumbai\n\n⏰ **Timings:** Mon–Sat, 10 AM – 8 PM\n\nWould you like to know about a specific service or doctor?`;
  }

  // Contact / Location / Address / Phone / Timing
  if (/contact|phone|call|address|location|where|reach|direction|map|timing|hour|open|close/.test(msg)) {
    return `📍 **Ashu Laser Vision**\nSuper Multi Specialty Eye & Retina Hospital\n📍 Andheri, Mumbai, India\n\n📞 **Phone:** +91 93223 64002\n💬 **WhatsApp:** wa.me/919322364002\n\n⏰ **Timings:** Monday – Saturday, 10 AM – 8 PM\n\nNeed directions or want to book an appointment?`;
  }

  // Doctor
  if (/doctor|dr\.|shahnawaz|kazi|surgeon|specialist|ophthalmologist/.test(msg)) {
    return `👨‍⚕️ **${doctor.name}**\n${doctor.degrees}\n\n${doctor.role}\n📋 ${doctor.experience}\n\n**About:** ${doctor.bio.slice(0, 200)}...\n\nWant to book a consultation with Dr. Kazi? Call 📞 +91 93223 64002`;
  }

  // Cost / Price / Fees / Charges
  if (/cost|price|fee|charge|how much|rate|expensive|affordable|cheap|budget/.test(msg)) {
    return `💰 **Pricing & Packages**\n\nWe offer transparent, affordable pricing with EMI options available. Costs depend on the specific procedure and lens/technology chosen.\n\n📞 Call **+91 93223 64002** for a personalized quote.\n\nWe accept all major insurance & TPA panels. Would you like details about a specific treatment?`;
  }

  // Services search
  const matchedService = services.find(s => {
    const keywords = [
      s.id,
      s.title.toLowerCase(),
      s.category?.toLowerCase(),
      ...(s.features || []).map(f => f.toLowerCase())
    ];
    return keywords.some(kw => msg.includes(kw) || kw.includes(msg));
  });

  // Keyword-based service matching
  if (!matchedService) {
    if (/cataract|lens|phaco|femto.*cataract|iol|multifocal/.test(msg)) {
      const s = services.find(s => s.id === 'cataract');
      if (s) return formatServiceResponse(s);
    }
    if (/lasik|smile|contoura|refractive|specs|glasses.*remov|asa|prk|icl/.test(msg)) {
      const s = services.find(s => s.id === 'lasik');
      if (s) return formatServiceResponse(s);
    }
    if (/retina|diabetic.*retinopathy|vitrectomy|retinal.*detach|macular|amd|rop/.test(msg)) {
      const s = services.find(s => s.id === 'retina');
      if (s) return formatServiceResponse(s);
    }
    if (/glaucoma|pressure|optic.*nerve|agt|gatt|migs/.test(msg)) {
      const s = services.find(s => s.id === 'glaucoma');
      if (s) return formatServiceResponse(s);
    }
    if (/cornea|keratoconus|cross.*link|c3r|transplant|dry.*eye|pterygium/.test(msg)) {
      const s = services.find(s => s.id === 'cornea');
      if (s) return formatServiceResponse(s);
    }
    if (/child|kid|pediatric|squint|lazy.*eye|amblyopia|myopia.*control/.test(msg)) {
      const s = services.find(s => s.id === 'pediatric');
      if (s) return formatServiceResponse(s);
    }
    if (/oct|scan|imaging|test|diagnos/.test(msg)) {
      const s = services.find(s => s.id === 'optical-coherence-tomography');
      if (s) return formatServiceResponse(s);
    }
    if (/laser/.test(msg)) {
      return `🔬 **Laser Treatments at Ashu Laser Vision**\n\nWe offer multiple advanced laser treatments:\n\n• **Green/Diode Laser** — Diabetic retinopathy, ROP, retinal tear\n• **YAG Laser** — After-cataract membrane\n• **SLT Laser** — Glaucoma pressure lowering\n• **Femto Laser** — Bladeless cataract & LASIK\n\n📞 Call **+91 93223 64002** to book a consultation.`;
    }
  }

  if (matchedService) return formatServiceResponse(matchedService);

  // Services list
  if (/service|treatment|what.*do|what.*offer|available/.test(msg)) {
    const serviceList = services.slice(0, 10).map(s => `• **${s.title}** — ${s.short}`).join('\n');
    return `🏥 **Our Services at Ashu Laser Vision**\n\n${serviceList}\n\n...and more! Ask me about any specific service for details.`;
  }

  // Technology
  if (/technology|machine|equipment|device|pentacam|biometry/.test(msg)) {
    return `🔬 **Advanced Technology at Ashu Laser Vision**\n\n• Pentacam HR — Corneal tomography\n• OCT Angio + OCT RNFL — Retina & glaucoma imaging\n• Micron M7 800Hz — Fastest LASIK laser in Mumbai\n• Femto Laser — Bladeless cataract & LASIK\n• IOL Master 700 — Precision IOL calculation\n• 23/25/27G Vitrectomy — Stitchless retina surgery\n\nVisit our **Technology** page for full details or ask me anything!`;
  }

  // Thanks
  if (/thank|thanks|thx|appreciate/.test(msg)) {
    return `You're welcome! 😊 We're here to help 24/7.\n\nFor immediate assistance:\n📞 **+91 93223 64002**\n💬 **WhatsApp:** wa.me/919322364002\n\nTake care of your eyes! 👁️`;
  }

  // Bye
  if (/bye|goodbye|see you|later/.test(msg)) {
    return `Goodbye! 👋 Take care of your eyes.\n\nRemember, regular eye check-ups are important! Visit **Ashu Laser Vision** anytime.\n\n📞 **+91 93223 64002**`;
  }

  // Emergency
  if (/emergency|urgent|sudden.*vision|flash|floaters|curtain|pain.*eye|injur|trauma|accident/.test(msg)) {
    return `🚨 **Eye Emergency? Act Fast!**\n\nSymptoms like sudden vision loss, flashes, floaters, curtain over vision, or eye injury need **immediate attention**.\n\n📞 **Call NOW: +91 93223 64002**\n\nRetinal detachment needs surgery within 24-48 hours to save vision.\n\nPlease don't delay — contact us immediately!`;
  }

  // Insurance
  if (/insurance|tpa|cashless|panel|mediclaim|coverage/.test(msg)) {
    return `🏥 **Insurance & TPA**\n\nWe accept all major insurance panels and offer cashless treatment options.\n\nFor details on your specific insurance coverage, please call:\n📞 **+91 93223 64002**`;
  }

  // Default
  return `Thank you for your question! 🤖\n\nI can help you with:\n• **Services** — Cataract, LASIK, Retina, Glaucoma, Cornea, Pediatric\n• **Doctor** — Dr. Shahnawaz Kazi's profile\n• **Appointments** — Booking & timings\n• **Technology** — Our advanced equipment\n• **Contact** — Phone, location, directions\n• **Emergency** — Urgent eye care\n\nTry asking about a specific service or type **"appointment"** to book!`;
}

function formatServiceResponse(service) {
  let response = `👁️ **${service.title}**\n\n${service.overview || service.desc}\n`;

  if (service.features?.length) {
    response += `\n**Key Features:**\n${service.features.map(f => `• ${f}`).join('\n')}\n`;
  }

  if (service.benefits?.length) {
    response += `\n**Benefits:**\n${service.benefits.map(b => `✓ ${b}`).join('\n')}\n`;
  }

  if (service.faqs?.length) {
    response += `\n**FAQ:**\n`;
    service.faqs.slice(0, 2).forEach(faq => {
      response += `**Q:** ${faq.q}\n**A:** ${faq.a}\n\n`;
    });
  }

  response += `\n📞 Book consultation: **+91 93223 64002**`;
  return response;
}

// Format markdown-like text to JSX
function FormattedMessage({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <div className="whitespace-pre-line text-[13px] leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
}

export default function AIChatToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! 👋 I'm the **Ashu Laser Vision** AI assistant.\n\nI can help you with eye services, appointments, doctor info, and more.\n\nHow can I help you today?`,
      time: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: trimmed,
      time: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const response = getAIResponse(trimmed);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response,
        time: new Date()
      };
      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: '📅 Book Appointment', query: 'I want to book an appointment' },
    { label: '👁️ Our Services', query: 'What services do you offer?' },
    { label: '👨‍⚕️ About Doctor', query: 'Tell me about the doctor' },
    { label: '📍 Location', query: 'Where are you located?' },
  ];

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-[140px] right-5 z-[55]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#0B4DA2] to-[#00A6CB] shadow-[0_8px_28px_rgba(11,77,162,0.45)] flex items-center justify-center text-white hover:shadow-[0_12px_36px_rgba(11,77,162,0.55)] hover:scale-110 active:scale-95 transition-all duration-300 group"
          whileTap={{ scale: 0.9 }}
          aria-label="Open AI Chat"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={22} strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse animation */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0B4DA2] to-[#00A6CB] animate-ping opacity-20 -z-10"></span>
          )}

          {/* Tooltip */}
          {!isOpen && (
            <span className="absolute right-[68px] top-1/2 -translate-y-1/2 bg-[#0A1931] text-white text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none flex items-center gap-1.5">
              <Sparkles size={12} /> AI Chat Assistant
            </span>
          )}

          {/* Notification dot */}
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">1</span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-[210px] right-5 z-[55] w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-260px)] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-200/60 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#00A6CB] px-4 py-3.5 flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm font-[var(--font-display)] truncate">Ashu Laser Vision</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-white/80 text-[11px]">AI Assistant • Online</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gradient-to-b from-slate-50 to-white" style={{ scrollBehavior: 'smooth' }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0B4DA2] to-[#00A6CB] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-[#0B4DA2] to-[#00A6CB] text-white rounded-br-md'
                        : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-md'
                    }`}
                  >
                    <FormattedMessage text={msg.text} />
                    <div className={`text-[10px] mt-1.5 ${msg.sender === 'user' ? 'text-white/60' : 'text-slate-400'}`}>
                      {formatTime(msg.time)}
                    </div>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={14} className="text-slate-600" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 items-end"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0B4DA2] to-[#00A6CB] flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-slate-100">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick actions (show only at start) */}
              {messages.length <= 1 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => {
                        setInput(action.query);
                        setTimeout(() => {
                          const userMsg = {
                            id: Date.now(),
                            sender: 'user',
                            text: action.query,
                            time: new Date()
                          };
                          setMessages(prev => [...prev, userMsg]);
                          setIsTyping(true);
                          setTimeout(() => {
                            const response = getAIResponse(action.query);
                            const botMsg = {
                              id: Date.now() + 1,
                              sender: 'bot',
                              text: response,
                              time: new Date()
                            };
                            setIsTyping(false);
                            setMessages(prev => [...prev, botMsg]);
                          }, 800);
                        }, 100);
                        setInput('');
                      }}
                      className="text-xs bg-white hover:bg-[#E6F0FF] text-[#0B4DA2] border border-[#0B4DA2]/20 hover:border-[#0B4DA2]/40 rounded-full px-3 py-1.5 transition-all duration-200 font-medium shadow-sm"
                    >
                      {action.label}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="shrink-0 border-t border-slate-100 bg-white px-3 py-3">
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-[#0B4DA2] focus-within:ring-2 focus-within:ring-[#0B4DA2]/10 transition-all duration-200 px-3 py-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your question..."
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none py-2"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0B4DA2] to-[#00A6CB] text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-90 shrink-0"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                Powered by Ashu Laser Vision AI • 📞 +91 93223 64002
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

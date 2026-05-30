import { useState, useRef, useEffect } from "react";
import { Mic, X, Send, Sparkles, FileText, Download, CheckCircle2, Bot } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { sendSaarthiMessage } from "@/lib/api";
import { toast } from "sonner";

export function SaarthiChat({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: `Namaste! I am VidyaSetu Saarthi. I'm here to help you in your role as ${user?.role}. How can I assist you today?` }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    const newMsgs = [...messages, { role: "user", content: text }];
    setMessages(newMsgs);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = newMsgs.map(m => ({ role: m.role, content: m.content }));
      // We exclude the first greeting from memory to save context if it's not strictly necessary,
      // but it's fine to just send them all.
      
      const response = await sendSaarthiMessage(apiMessages, user?.role || "teacher");
      
      let aiText = response.text || "";
      
      // Simulate Workflow Automation checks
      if (aiText.includes("[ACTION: TASK_CREATED]")) {
        toast.success("VidyaSetu automatically created a task for you!");
        aiText = aiText.replace("[ACTION: TASK_CREATED]", "");
      }
      if (aiText.includes("[ACTION: NOTIFIED]")) {
        toast.success("VidyaSetu sent a notification to the relevant staff.");
        aiText = aiText.replace("[ACTION: NOTIFIED]", "");
      }
      if (aiText.includes("[ACTION: SCHEDULED]")) {
        toast.success("VidyaSetu scheduled the follow-up in your calendar.");
        aiText = aiText.replace("[ACTION: SCHEDULED]", "");
      }

      setMessages(prev => [...prev, { role: "assistant", content: aiText.trim() }]);
      
      // Text to Speech for accessibility/voice mode (only if user spoke it, or always? Let's just do if it's short, but maybe skip TTS unless asked to avoid annoying user).

    } catch (err) {
      toast.error("Failed to connect to Saarthi.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListen = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error("Voice recognition not supported in this browser.");
      return;
    }
    
    if (isListening) return; // Prevent multiple instances

    // @ts-ignore
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN'; // Multilingual capable, but we start with Indian English for hackathon

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };

    recognition.onerror = (event: any) => {
      toast.error("Microphone error. Please try again.");
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const renderMessageContent = (content: string) => {
    // Check for Document Generation block
    const docMatch = content.match(/\`\`\`document([\s\S]*?)\`\`\`/);
    if (docMatch) {
      const docContent = docMatch[1].trim();
      const textContent = content.replace(/\`\`\`document[\s\S]*?\`\`\`/, "").trim();
      
      return (
        <div>
          {textContent && <p className="mb-3 whitespace-pre-wrap">{textContent}</p>}
          <div className="bg-background rounded-xl p-4 border border-border/60 shadow-sm mt-2">
            <div className="flex items-center gap-2 text-primary font-semibold mb-2 text-xs uppercase tracking-wide">
              <FileText size={14} /> Generated Document
            </div>
            <div className="text-sm italic opacity-80 border-l-2 border-primary/30 pl-3 mb-3 max-h-32 overflow-y-auto">
              {docContent}
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(docContent);
                toast.success("Document copied to clipboard!");
              }}
              className="bg-primary/10 text-primary w-full py-2 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-primary/20 transition"
            >
              <Download size={14} /> Save Document
            </button>
          </div>
        </div>
      );
    }

    return <p className="whitespace-pre-wrap">{content}</p>;
  };

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-[380px] h-[600px] max-h-[80vh] bg-card border border-border/50 shadow-2xl rounded-3xl overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-8 duration-300">
      {/* Header */}
      <div className="bg-gradient-saffron p-4 text-saffron-foreground flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold">VidyaSetu Saarthi</h3>
            <p className="text-xs opacity-80">AI Educational Assistant</p>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition">
          <X size={16} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/30">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
            )}
            <div className={`p-3 rounded-2xl max-w-[80%] text-sm shadow-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-background border border-border/40 rounded-tl-sm'}`}>
              {renderMessageContent(m.content)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Sparkles size={16} className="animate-pulse" />
            </div>
            <div className="p-4 rounded-2xl bg-background border border-border/40 rounded-tl-sm shadow-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background border-t border-border/50 shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleListen}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition shrink-0 ${isListening ? 'bg-destructive text-destructive-foreground animate-pulse' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
          >
            <Mic size={18} />
          </button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Saarthi..."
              className="w-full bg-secondary/50 border border-border/50 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 ring-primary/30 transition"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 transition"
            >
              <Send size={14} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@mui/material";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Plus, Sparkles, User, Bot } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { handleAxiosError } from "@/app/utils/axiosError";
import Image from "next/image";
import BiswaBangla from "../../../../public/LoginImage/Emblem_of_West_Bengal_(2018-present).svg.png";
import { v4 as uuidv4 } from "uuid";

export default function AIQueryLayout() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const threadIdRef = useRef(uuidv4());

  const suggestedPrompts = [
    "What IT services does PWD provide?",
    "How to raise a technical support ticket?",
    "Network connectivity issues in office",
    "Software installation guidelines",
  ];

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const askAI = async (overrideQuery) => {
    const userMessage = (overrideQuery || query).trim();
    if (!userMessage) return toast.warning("Ask something to AI...");

    // Add user message to history
    const userMsg = {
      id: uuidv4(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setLoading(true);

    try {
      const res = await axios.post("/api/AIagent/ai/ask", {
        query: userMessage,
        threadId: threadIdRef.current,
      });
      const aiMsg = {
        id: uuidv4(),
        role: "ai",
        content: res.data.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      const errMsg = {
        id: uuidv4(),
        role: "error",
        content: generalError || "Something went wrong. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
      toast.error("AI Error: Something went wrong");
    }

    setLoading(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askAI();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setQuery("");
    threadIdRef.current = uuidv4();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSuggestedPrompt = (prompt) => {
    askAI(prompt);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="w-full flex flex-col h-full">
      {/* ── Navbar ── */}
      <div className="bg-[#1B3C53] text-white px-4 sm:px-6 py-3 sm:py-3.5 flex-shrink-0 shadow-md">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            <Image
              src={BiswaBangla}
              alt="PWD Logo"
              className="w-10 h-10 sm:w-10 sm:h-10 rounded-lg object-contain bg-white/10 p-0.5"
            />
            <div className="hidden sm:block">
              <p className="text-[11px] sm:text-xs text-amber-300/90 font-semibold tracking-wide uppercase leading-tight">
                Govt Of West Bengal
              </p>
              <p className="text-[11px] sm:text-xs text-amber-300/90 font-semibold tracking-wide uppercase leading-tight">
                PWD
              </p>
            </div>
            <div className="sm:hidden">
              <p className="text-[10px] text-amber-300/90 font-semibold tracking-wide uppercase leading-tight">
                PWD
              </p>
            </div>
          </div>

          <div className="w-px h-9 bg-white/15 flex-shrink-0" />

          {/* Title */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-300" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold tracking-tight leading-tight truncate">
                IT Division AI Assistant
              </h1>
              <p className="text-[9px] sm:text-[10px] text-blue-200/80 leading-tight truncate">
                PWD-IT Department, West Bengal
              </p>
            </div>
          </div>

          {/* Right side: New Chat + Status */}
          <div className="ml-auto flex items-center gap-3 flex-shrink-0">
            {messages.length > 0 && (
              <button
                onClick={handleNewChat}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-200"
                title="Start new chat"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="text-[10px] sm:text-xs font-medium hidden sm:inline">
                  New Chat
                </span>
              </button>
            )}
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] sm:text-[10px] text-blue-200/80 font-medium hidden sm:inline">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Chat Area ── */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Empty State — Show only when no messages */}
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center min-h-[280px] sm:min-h-[350px] text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#1B3C53]/10 to-[#1B3C53]/5 border border-[#1B3C53]/10 flex items-center justify-center mb-5 sm:mb-6 shadow-sm">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-[#1B3C53]/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
                How can I help you today?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
                Ask me anything about PWD IT services, technical support,
                network issues, or departmental procedures.
              </p>

              {/* Suggested Prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-lg">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedPrompt(prompt)}
                    disabled={loading}
                    className="group flex items-start gap-3 text-left px-4 py-3.5 bg-white border border-slate-200 rounded-xl hover:border-[#1B3C53]/30 hover:shadow-md hover:shadow-[#1B3C53]/5 transition-all duration-200 disabled:opacity-50"
                  >
                    <div className="w-6 h-6 rounded-md bg-[#1B3C53]/5 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#1B3C53]/10 transition-colors">
                      <svg
                        className="w-3.5 h-3.5 text-[#1B3C53]/40 group-hover:text-[#1B3C53]/70 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                        />
                      </svg>
                    </div>
                    <span className="text-[11px] sm:text-xs text-slate-600 group-hover:text-slate-800 leading-relaxed transition-colors">
                      {prompt}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message List */}
          {messages.length > 0 && (
            <div className="space-y-1 sm:space-y-2">
              {/* Date separator for first message */}
              <div className="flex items-center gap-3 my-4 sm:my-6">
                <div className="flex-1 h-px bg-slate-200/80" />
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  Today
                </span>
                <div className="flex-1 h-px bg-slate-200/80" />
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className="py-2 sm:py-3">
                  {msg.role === "user" ? (
                    /* ── User Message ── */
                    <div className="flex justify-end gap-2 sm:gap-3">
                      <div className="flex flex-col items-end max-w-[80%] sm:max-w-[70%]">
                        <div className="bg-[#1B3C53] text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm shadow-[#1B3C53]/10">
                          <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-slate-400 mt-1.5 mr-1">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1B3C53]/10 border border-[#1B3C53]/15 flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1B3C53]/60" />
                      </div>
                    </div>
                  ) : msg.role === "error" ? (
                    /* ── Error Message ── */
                    <div className="flex justify-start gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col max-w-[85%] sm:max-w-[75%]">
                        <div className="bg-red-50 border border-red-200/80 px-4 py-3 rounded-2xl rounded-tl-sm">
                          <p className="text-xs sm:text-sm text-red-700 leading-relaxed">
                            {msg.content}
                          </p>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-slate-400 mt-1.5 ml-1">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* ── AI Message ── */
                    <div className="flex justify-start gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#1B3C53] to-[#245a7d] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm shadow-[#1B3C53]/15">
                        <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                      </div>
                      <div className="flex flex-col max-w-[85%] sm:max-w-[75%]">
                        <div className="bg-white border border-slate-200/80 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl rounded-tl-sm shadow-sm">
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                            {msg.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 ml-1">
                          <span className="text-[9px] sm:text-[10px] text-slate-400">
                            {formatTime(msg.timestamp)}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(msg.content);
                              toast.success("Copied to clipboard");
                            }}
                            className="text-[9px] sm:text-[10px] text-slate-400 hover:text-[#1B3C53] transition-colors flex items-center gap-1"
                            title="Copy response"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                              />
                            </svg>
                            <span className="hidden sm:inline">Copy</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <div className="flex justify-start gap-2 sm:gap-3 py-2 sm:py-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#1B3C53] to-[#245a7d] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm shadow-[#1B3C53]/15">
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                  </div>
                  <div className="bg-white border border-slate-200/80 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span
                          className="w-2 h-2 bg-[#1B3C53]/40 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-[#1B3C53]/40 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-[#1B3C53]/40 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* ── Input Bar ── */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          {/* Quick prompts when chat has started */}
          {messages.length > 0 && !loading && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
              {suggestedPrompts.slice(0, 3).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="flex-shrink-0 text-[10px] sm:text-[11px] px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 hover:bg-[#1B3C53]/10 hover:text-[#1B3C53] border border-slate-200 hover:border-[#1B3C53]/20 transition-all duration-200 whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                placeholder="Ask anything about IT Related..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="h-11 sm:h-12 text-xs sm:text-sm px-4 pr-10 rounded-xl border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#1B3C53]/20 focus:border-[#1B3C53] transition-all shadow-none disabled:opacity-50"
              />
              {!query && !loading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-slate-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </div>
              )}
            </div>
            <Button
              onClick={() => askAI()}
              disabled={loading || !query.trim()}
              variant="contained"
              className="!h-11 !sm:h-12 !rounded-xl !px-4 !sm:px-5 !bg-[#1B3C53] hover:!bg-[#152e42] disabled:!bg-slate-300 !shadow-sm hover:!shadow-md !min-w-0 !text-white transition-all duration-200"
            >
              {loading ? (
                <Loader2 className="!w-4 !h-4 sm:!w-5 sm:!h-5 animate-spin" />
              ) : (
                <Send className="!w-4 !h-4 sm:!w-5 sm:!h-5" />
              )}
            </Button>
          </div>
          <p className="text-[9px] sm:text-[10px] text-slate-400 text-center mt-2 sm:mt-2.5 flex items-center justify-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            AI responses are for assistance only. Verify critical information with the concerned office.
          </p>
        </div>
      </div>
    </div>
  );
}
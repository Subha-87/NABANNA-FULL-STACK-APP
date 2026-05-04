"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@mui/material";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { handleAxiosError } from "@/app/utils/axiosError";
import Image from "next/image";
import BiswaBangla from "../../../../public/LoginImage/Emblem_of_West_Bengal_(2018-present).svg.png";
import { v4 as uuidv4 } from "uuid";

export default function AIQueryLayout() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const threadId = uuidv4()
  //console.log(threadId)

  const askAI = async () => {
    if (!query.trim()) return toast.warning("Ask Something to AI ....");

    setLastQuery(query);
    setLoading(true);

    try {
      const response = await axios.post("/api/AIagent/ai/ask", { query,threadId }); // send user query with threadID //
      setResponse(response.data.message);
    } catch (error) {
      const { generalError } = handleAxiosError(error);
      setResponse(generalError || "Something went wrong.");
      toast.error("AI Error: Somthing Wrong");
    }

    setLoading(false);
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askAI();
    }
  };

  const suggestedPrompts = [
    "What IT services does PWD provide?",
    "How to raise a technical support ticket?",
    "Network connectivity issues in office",
    "Software installation guidelines",
  ];

  return (
    <div className="w-full flex flex-col h-full">
      {/* ── Navbar: Logo + AI Assistant ── */}
      <div className="bg-[#1B3C53] text-white px-4 sm:px-6 py-3 sm:py-3.5 flex-shrink-0 shadow-md">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Logo + Directorate Name */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* ── REPLACE src with your actual logo path ── */}
            <Image
              src={BiswaBangla}
              alt="PWD Logo"
              className="w-25 h-25 sm:w-10 sm:h-10 rounded-lg object-contain bg-white/10 p-0.5"
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

          {/* Divider */}
          <div className="w-px h-9 bg-white/15 flex-shrink-0" />

          {/* AI Assistant Title */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
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

          {/* Online Status — right */}
          <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] text-blue-200/80 font-medium hidden sm:inline">
              Online
            </span>
          </div>
        </div>
      </div>

      {/* ── Chat Area ── */}
      <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Empty State */}
          {!response && !loading && (
            <div className="flex flex-col items-center justify-center min-h-[280px] sm:min-h-[350px] text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1B3C53]/5 border border-[#1B3C53]/10 flex items-center justify-center mb-4 sm:mb-5">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-[#1B3C53]/25"
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
              <h2 className="text-base sm:text-lg font-semibold text-slate-700 mb-1.5">
                How can I help you today?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6 sm:mb-8">
                Ask me anything about PWD IT services, technical support,
                network issues, or departmental procedures.
              </p>

              {/* Suggested Prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full max-w-lg">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(prompt)}
                    className="group flex items-start gap-2.5 text-left px-3.5 sm:px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-[#1B3C53]/30 hover:shadow-sm transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4 text-[#1B3C53]/35 group-hover:text-[#1B3C53] flex-shrink-0 mt-0.5 transition-colors"
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
                    <span className="text-[11px] sm:text-xs text-slate-600 group-hover:text-slate-800 leading-relaxed transition-colors">
                      {prompt}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="space-y-4 sm:space-y-5">
              {lastQuery && (
                <div className="flex justify-end">
                  <div className="max-w-[80%] sm:max-w-[70%] bg-[#1B3C53] text-white px-4 py-3 rounded-2xl rounded-tr-md shadow-sm">
                    <p className="text-xs sm:text-sm leading-relaxed">
                      {lastQuery}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex justify-start">
                <div className="max-w-[80%] sm:max-w-[70%] bg-white border border-slate-200 px-4 py-4 rounded-2xl rounded-tl-md shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span
                        className="w-1.5 h-1.5 bg-[#1B3C53]/40 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-[#1B3C53]/40 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-[#1B3C53]/40 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Response State */}
          {!loading && response && (
            <div className="space-y-4 sm:space-y-5">
              {lastQuery && (
                <div className="flex justify-end">
                  <div className="max-w-[80%] sm:max-w-[70%] bg-[#1B3C53] text-white px-4 py-3 rounded-2xl rounded-tr-md shadow-sm">
                    <p className="text-xs sm:text-sm leading-relaxed">
                      {lastQuery}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex justify-start gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1B3C53] flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                    />
                  </svg>
                </div>
                <div className="max-w-[85%] sm:max-w-[75%] bg-white border border-slate-200 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl rounded-tl-md shadow-sm">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                    {response}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Input Bar ── */}
      <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-1">
              <Input
                placeholder="Ask anything about IT Related..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-11 sm:h-12 text-xs sm:text-base px-4 rounded-xl border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#1B3C53]/20 focus:border-[#1B3C53] transition-all shadow-none"
              />
            </div>
            <Button
              onClick={askAI}
              disabled={loading}
              variant="contained"
              className="!h-11 !sm:h-12 !rounded-xl !px-4 !sm:px-5 !bg-[#1B3C53] hover:!bg-[#152e42] !shadow-sm hover:!shadow-md !min-w-0 !text-white"
            >
              {loading ? (
                <Loader2 className="!w-4 !h-4 sm:!w-5 sm:!h-5 animate-spin" />
              ) : (
                <Send className="!w-4 !h-4 sm:!w-5 sm:!h-5" />
              )}
            </Button>
            {response && (
              <Button
                variant="outlined"
                onClick={() => {
                  setResponse("");
                  setLastQuery("");
                }}
                className="!h-11 !sm:h-12 !rounded-xl !px-3 !sm:px-4 !border-slate-300 !text-slate-500 hover:!border-slate-400 hover:!text-slate-700 !min-w-0 !text-xs !sm:text-sm !font-medium"
              >
                <span className="hidden sm:inline">Clear</span>
                <svg
                  className="sm:hidden !w-4 !h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            )}
          </div>
          <p className="text-[9px] sm:text-[10px] text-slate-400 text-center mt-2 sm:mt-2.5">
            AI responses are generated for assistance. Verify critical
            information with the concerned office.
          </p>
        </div>
      </div>
    </div>
  );
}

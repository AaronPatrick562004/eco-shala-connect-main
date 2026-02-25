import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "@/lib/theme-provider";
import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import Index from "./pages/Index";
import SchoolPortal from "./pages/SchoolPortal";
import ActivityLogger from "./pages/ActivityLogger";
import BEODEOMonitor from "./pages/BEODEOMonitor";
import Recognition from "./pages/Recognition";
import EcoPassports from "./pages/EcoPassports";
import Analytics from "./pages/Analytics";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";

// Import Language type from translations
import { Language } from "./lib/translations";

const queryClient = new QueryClient();

const App = () => {
  const [lang, setLang] = useState<Language>("en");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ThemeProvider defaultTheme="light" storageKey="eco-track-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex min-h-screen bg-background text-foreground">
              <AppSidebar lang={lang} />
              <div className="flex-1 flex flex-col min-w-0">
                <TopBar 
                  lang={lang} 
                  onToggleLang={() => setLang(lang === "en" ? "mr" : "en")}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index lang={lang} searchQuery={searchQuery} />} />
                    <Route path="/school-portal" element={<SchoolPortal lang={lang} />} />
                    <Route path="/activity-logger" element={<ActivityLogger lang={lang} />} />
                    <Route path="/monitor" element={<BEODEOMonitor lang={lang} />} />
                    <Route path="/recognition" element={<Recognition lang={lang} />} />
                    <Route path="/eco-passports" element={<EcoPassports lang={lang} />} />
                    <Route path="/analytics" element={<Analytics lang={lang} />} />
                    <Route path="/community" element={<Community lang={lang} />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
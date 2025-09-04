import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AgentProvider } from "@/components/ai/AgentFramework";
import AIAssistant from "@/components/ai/AIAssistant";
import Dashboard from "./pages/Dashboard";
import DataCatalog from "./pages/DataCatalog";
import DataQuality from "./pages/DataQuality";
import PolicyStudio from "./pages/PolicyStudio";
import SourceCompleteness from "./pages/SourceCompleteness";
import SqlConnector from "./pages/SqlConnector";
import LineageExplorer from "./pages/LineageExplorer";
import Innovation from "./pages/Innovation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AgentProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/catalog" element={<DataCatalog />} />
              <Route path="/lineage" element={<LineageExplorer />} />
              <Route path="/policies" element={<PolicyStudio />} />
              <Route path="/quality" element={<DataQuality />} />
              <Route path="/access" element={<div className="p-6">Access Center - Coming Soon</div>} />
              <Route path="/regulatory" element={<div className="p-6">Regulatory Workspace - Coming Soon</div>} />
              <Route path="/audit" element={<div className="p-6">Audit Evidence Lake - Coming Soon</div>} />
              <Route path="/sources" element={<SourceCompleteness />} />
              <Route path="/sql-connector" element={<SqlConnector />} />
              <Route path="/innovation" element={<Innovation />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AIAssistant />
          </AppLayout>
        </BrowserRouter>
      </AgentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

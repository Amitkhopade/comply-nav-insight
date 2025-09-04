import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import DataCatalog from "./pages/DataCatalog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/catalog" element={<DataCatalog />} />
            <Route path="/lineage" element={<div className="p-6">Lineage Explorer - Coming Soon</div>} />
            <Route path="/policies" element={<div className="p-6">Policy Studio - Coming Soon</div>} />
            <Route path="/quality" element={<div className="p-6">Data Quality Dashboard - Coming Soon</div>} />
            <Route path="/access" element={<div className="p-6">Access Center - Coming Soon</div>} />
            <Route path="/regulatory" element={<div className="p-6">Regulatory Workspace - Coming Soon</div>} />
            <Route path="/audit" element={<div className="p-6">Audit Evidence Lake - Coming Soon</div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

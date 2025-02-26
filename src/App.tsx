
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Charts from "./pages/Charts";
import CreateToken from "./pages/CreateToken";
import SecureContract from "./pages/SecureContract";
import RealTimeTracking from "./pages/RealTimeTracking";
import Deployment from "./pages/Deployment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/create" element={<CreateToken />} />
          <Route path="/secure" element={<SecureContract />} />
          <Route path="/tracking" element={<RealTimeTracking />} />
          <Route path="/deployment" element={<Deployment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Beneficios from "./pages/Beneficios";
import Associacao from "./pages/Associacao";
import Parceiros from "./pages/Parceiros";
import Admin from "./pages/Admin";
import AdminParceiros from "./pages/AdminParceiros";
import AdminNomeacoes from "./pages/AdminNomeacoes";
import AdminRelatorios from "./pages/AdminRelatorios";
import NomearSupervisor from "./pages/NomearSupervisor";
import Login from "./pages/Login";
import Cursos from "./pages/Cursos";
import Ferramentas from "./pages/Ferramentas";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import EFB from "./pages/EFB";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/beneficios" element={<Beneficios />} />
          <Route path="/associacao" element={<Associacao />} />
          <Route path="/parceiros" element={<Parceiros />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/parceiros" element={<AdminParceiros />} />
          <Route path="/admin/nomeacoes" element={<AdminNomeacoes />} />
          <Route path="/admin/relatorios" element={<AdminRelatorios />} />
          <Route path="/admin/nomear-supervisor" element={<NomearSupervisor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/efb" element={<EFB />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos-uso" element={<TermosUso />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

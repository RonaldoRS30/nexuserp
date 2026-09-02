import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { HomePage } from './pages/HomePage';
import { ServiciosPage } from './pages/ServiciosPage';
import { SolucionesPage } from './pages/SolucionesPage';
import { PublicPlansPage } from './pages/PublicPlansPage';
import { NosotrosPage } from './pages/NosotrosPage';
import { ProcesoPage } from './pages/ProcesoPage';
import { ContactoPage } from './pages/ContactoPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { PlansPage } from './pages/admin/PlansPage';
import { PlanFormPage } from './pages/admin/PlanFormPage';
import { ModulesPage } from './pages/admin/ModulesPage';
import { ContactsPage } from './pages/admin/ContactsPage';
import { ContactDetailPage } from './pages/admin/ContactDetailPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { AdminIndexRedirect, ProtectedAdmin } from './components/admin/ProtectedAdmin';

const HASH_REDIRECTS: Record<string, string> = {
  '#inicio': '/',
  '#servicios': '/servicios',
  '#soluciones': '/soluciones',
  '#planes': '/planes',
  '#nosotros': '/',
  '#proceso': '/',
  '#contacto': '/contacto',
  '#modulos': '/soluciones',
  '#a-medida': '/soluciones',
};

function LegacyHashRedirect() {
  const { pathname, hash } = useLocation();
  if (pathname === '/' && HASH_REDIRECTS[hash]) {
    return <Navigate to={HASH_REDIRECTS[hash]} replace />;
  }
  return null;
}

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <LegacyHashRedirect />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="servicios" element={<ServiciosPage />} />
          <Route path="soluciones" element={<SolucionesPage />} />
          <Route path="planes" element={<PublicPlansPage />} />
          <Route path="nosotros" element={<NosotrosPage />} />
          <Route path="proceso" element={<ProcesoPage />} />
          <Route path="contacto" element={<ContactoPage />} />
          <Route path="privacidad" element={<PrivacyPage />} />
          <Route path="terminos" element={<TermsPage />} />
        </Route>
        <Route path="/admin" element={<AdminIndexRedirect />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedAdmin />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/planes" element={<PlansPage />} />
          <Route path="/admin/planes/nuevo" element={<PlanFormPage />} />
          <Route path="/admin/planes/:id" element={<PlanFormPage />} />
          <Route path="/admin/modulos" element={<ModulesPage />} />
          <Route path="/admin/consultas" element={<ContactsPage />} />
          <Route path="/admin/consultas/:id" element={<ContactDetailPage />} />
          <Route path="/admin/configuracion" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

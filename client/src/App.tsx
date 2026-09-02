import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { HomePage } from './pages/HomePage';
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

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacidad" element={<PrivacyPage />} />
          <Route path="/terminos" element={<TermsPage />} />
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

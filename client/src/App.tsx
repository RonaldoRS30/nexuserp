import { Suspense, lazy, useEffect, type ComponentType } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { HomePage } from './pages/HomePage';
import { AdminIndexRedirect, ProtectedAdmin } from './components/admin/ProtectedAdmin';
import { serviceLandingLinks } from './data/serviceLandings';

function lazyPage<K extends string>(load: () => Promise<Record<K, ComponentType<any>>>, name: K) {
  return lazy(() => load().then((module) => ({ default: module[name] })));
}

const ServiciosPage = lazyPage(() => import('./pages/ServiciosPage'), 'ServiciosPage');
const SolucionesPage = lazyPage(() => import('./pages/SolucionesPage'), 'SolucionesPage');
const PublicPlansPage = lazyPage(() => import('./pages/PublicPlansPage'), 'PublicPlansPage');
const ContactoPage = lazyPage(() => import('./pages/ContactoPage'), 'ContactoPage');
const PrivacyPage = lazyPage(() => import('./pages/PrivacyPage'), 'PrivacyPage');
const TermsPage = lazyPage(() => import('./pages/TermsPage'), 'TermsPage');
const ServiceLandingPage = lazyPage(() => import('./pages/ServiceLandingPage'), 'ServiceLandingPage');
const NotFoundPage = lazyPage(() => import('./pages/NotFoundPage'), 'NotFoundPage');
const LoginPage = lazyPage(() => import('./pages/admin/LoginPage'), 'LoginPage');
const DashboardPage = lazyPage(() => import('./pages/admin/DashboardPage'), 'DashboardPage');
const PlansPage = lazyPage(() => import('./pages/admin/PlansPage'), 'PlansPage');
const PlanFormPage = lazyPage(() => import('./pages/admin/PlanFormPage'), 'PlanFormPage');
const ModulesPage = lazyPage(() => import('./pages/admin/ModulesPage'), 'ModulesPage');
const ContactsPage = lazyPage(() => import('./pages/admin/ContactsPage'), 'ContactsPage');
const ContactDetailPage = lazyPage(() => import('./pages/admin/ContactDetailPage'), 'ContactDetailPage');
const SettingsPage = lazyPage(() => import('./pages/admin/SettingsPage'), 'SettingsPage');

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
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="servicios" element={<ServiciosPage />} />
          <Route path="soluciones" element={<SolucionesPage />} />
          <Route path="planes" element={<PublicPlansPage />} />
          <Route path="nosotros" element={<Navigate to="/" replace />} />
          <Route path="proceso" element={<Navigate to="/" replace />} />
          <Route path="contacto" element={<ContactoPage />} />
          <Route path="privacidad" element={<PrivacyPage />} />
          <Route path="terminos" element={<TermsPage />} />
          {serviceLandingLinks.map((link) => (
            <Route key={link.to} path={link.to.slice(1)} element={<ServiceLandingPage path={link.to} />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
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
      </Suspense>
    </BrowserRouter>
  );
}

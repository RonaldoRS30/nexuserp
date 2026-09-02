import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { navLinks } from '../config';
import { useNavDirection } from '../hooks/useNavDirection';
import { prefetchPublicModules } from '../hooks/usePublicModules';
import { prefetchPublicPlans } from '../hooks/usePublicPlans';
import { prefetchSiteSettings } from '../hooks/useSiteSettings';
import { useSectionReveal } from '../hooks/useSectionReveal';

const publicOrder = navLinks.map((link) => link.to);

export function PublicLayout() {
  const location = useLocation();
  const direction = useNavDirection(location.pathname, publicOrder);
  useSectionReveal(location.pathname);

  useEffect(() => {
    prefetchPublicPlans();
    prefetchPublicModules();
    prefetchSiteSettings();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <main className="page-stage flex-1 overflow-x-hidden bg-surface">
        <div key={location.pathname} className="page-sheet" data-dir={direction}>
          <Outlet />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

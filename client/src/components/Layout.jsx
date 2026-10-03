import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ScrollProgress from './ScrollProgress';
import Header from './Header';
import Contact from './Contact';

// Scroll to the #section on the home page, otherwise to the top of the new page.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <ScrollProgress />
      <a href="#main" className="absolute -top-16 left-3 z-50 rounded-lg bg-navy px-4 py-3 text-white focus:top-2">Skip to content</a>
      <Header />
      <main id="main"><Outlet /></main>
      <Contact />
    </>
  );
}

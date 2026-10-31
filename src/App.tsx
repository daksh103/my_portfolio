import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Skills } from './components/Skills';
import { Spotlight } from './components/Spotlight';
import { StackStrip } from './components/StackStrip';
import { Work } from './components/Work';
import { HighlightProvider } from './highlight';

const CommandPalette = lazy(() => import('./components/CommandPalette'));

export default function App() {
  const [palette, setPalette] = useState(false);
  const close = useCallback(() => setPalette(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <HighlightProvider>
      <a className="skip" href="#main">Skip to content</a>
      <Spotlight />
      <div className="shell">
        <Nav onOpenPalette={() => setPalette(true)} />
        <main id="main">
          <div className="hero">
            <Hero />
            <StackStrip />
          </div>
          <Work />
          <Experience />
          <Skills />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
      {palette && (
        <Suspense fallback={null}>
          <CommandPalette onClose={close} />
        </Suspense>
      )}
    </HighlightProvider>
  );
}

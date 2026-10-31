import { About } from './components/About';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Skills } from './components/Skills';
import { Work } from './components/Work';

export default function App() {
  return (
    <div className="page">
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

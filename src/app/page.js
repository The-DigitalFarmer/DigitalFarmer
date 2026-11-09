import Hero from '@/sections/home/Hero';
import Skills from '@/sections/skills/Skills';
import About from '@/sections/about/About';
import Projects from '@/sections/projects/Projects';
import Experience from '@/sections/experience/Experience';
import Contact from '@/sections/contact/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="content-frame">
        <Skills />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </>
  );
}

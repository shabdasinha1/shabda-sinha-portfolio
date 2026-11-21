import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { ThemeProvider } from './context/ThemeProvider';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/sections/hero/Hero';
import { About } from './components/sections/about/About';
import { Experience } from './components/sections/experience/Experience';
import { Projects } from './components/sections/projects/Projects';
import { Skills } from './components/sections/skills/Skills';
import { Education } from './components/sections/education/Education';
import { Contact } from './components/sections/contact/Contact';
import { TechMarquee } from './components/sections/marquee/TechMarquee';

export default function App() {
  return (
    <ThemeProvider>
      {/*
        LazyMotion + `m` components ship only the animation features this site uses
        (no drag/layout engine). `strict` throws if a full `motion.*` component slips in.
        reducedMotion="user" disables transform animations when the OS asks for it.
      */}
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <Layout>
            <Hero />
            <TechMarquee />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Contact />
          </Layout>
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}

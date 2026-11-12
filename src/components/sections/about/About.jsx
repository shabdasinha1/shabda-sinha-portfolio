import { about } from '../../../data/about';
import { Reveal, RevealGroup, RevealItem } from '../../common/Reveal';
import { Section } from '../../common/Section';
import { SectionHeader } from '../../common/SectionHeader';
import { WordReveal } from '../../common/WordReveal';
import { AboutFacts } from './AboutFacts';
import { FocusArea } from './FocusArea';

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeader index={about.index} eyebrow={about.eyebrow} title={about.title} titleId="about-title" />

      {/* Apple-style statement: words light up one by one as the paragraph scrolls up. */}
      <WordReveal
        text={about.lead}
        className="mt-12 max-w-5xl text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.22] font-semibold tracking-[-0.03em] text-fg sm:mt-16"
      />

      <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <RevealGroup className="space-y-5">
          {about.paragraphs.map((paragraph) => (
            <RevealItem key={paragraph.slice(0, 24)} as="p" className="leading-relaxed text-muted sm:text-lg sm:leading-relaxed">
              {paragraph}
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <AboutFacts facts={about.facts} />
        </Reveal>
      </div>

      <RevealGroup as="ul" className="mt-20 grid gap-4 sm:grid-cols-3" aria-label="Focus areas">
        {about.focusAreas.map((area) => (
          <RevealItem as="li" key={area.id}>
            <FocusArea {...area} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

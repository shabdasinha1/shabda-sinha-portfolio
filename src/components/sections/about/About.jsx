import { about } from '../../../data/about';
import { Reveal, RevealGroup, RevealItem } from '../../common/Reveal';
import { Section } from '../../common/Section';
import { SectionHeader } from '../../common/SectionHeader';
import { AboutFacts } from './AboutFacts';
import { FocusArea } from './FocusArea';

export function About() {
  return (
    <Section id="about" labelledBy="about-title">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <SectionHeader
            index={about.index}
            eyebrow={about.eyebrow}
            title={about.title}
            titleId="about-title"
          />

          <RevealGroup className="mt-10 space-y-5">
            <RevealItem as="p" className="text-xl leading-relaxed font-medium tracking-[-0.01em] text-fg sm:text-[1.375rem]">
              {about.lead}
            </RevealItem>
            {about.paragraphs.map((paragraph) => (
              <RevealItem key={paragraph.slice(0, 24)} as="p" className="leading-relaxed text-muted sm:text-[1.0625rem]">
                {paragraph}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="lg:pt-24">
          <AboutFacts facts={about.facts} />
        </Reveal>
      </div>

      <RevealGroup as="ul" className="mt-20 grid gap-10 sm:grid-cols-3 sm:gap-8" aria-label="Focus areas">
        {about.focusAreas.map((area) => (
          <RevealItem as="li" key={area.id}>
            <FocusArea {...area} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

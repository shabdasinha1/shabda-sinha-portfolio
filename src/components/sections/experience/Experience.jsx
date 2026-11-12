import { useRef } from 'react';
import { m, useScroll, useSpring } from 'motion/react';
import { experience } from '../../../data/experience';
import { useMotionEnabled } from '../../../hooks/useMotionEnabled';
import { SCROLL_SPRING } from '../../../utils/motion';
import { Reveal, RevealGroup, RevealItem } from '../../common/Reveal';
import { Section } from '../../common/Section';
import { SectionHeader } from '../../common/SectionHeader';
import { CompanyCard } from './CompanyCard';
import { Recognition } from './Recognition';
import { RoleEntry } from './RoleEntry';

export function Experience() {
  const { roles } = experience;
  const timelineRef = useRef(null);
  const enabled = useMotionEnabled();

  // The timeline fills from top to bottom as you read down through the roles.
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.75', 'end 0.55'] });
  const fill = useSpring(scrollYProgress, SCROLL_SPRING);

  return (
    <Section id="experience" labelledBy="experience-title" tone="muted">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Left column stays in view while the timeline scrolls on desktop. */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeader
            index={experience.index}
            eyebrow={experience.eyebrow}
            title={experience.title}
            titleId="experience-title"
            description={experience.description}
          />
          <Reveal className="mt-10">
            <CompanyCard company={experience.company} metrics={experience.metrics} />
          </Reveal>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline spine: a faint track with a gradient fill driven by scroll. */}
          <span aria-hidden="true" className="absolute top-3 bottom-3 left-[7px] w-px bg-line-strong" />
          <m.span
            aria-hidden="true"
            style={enabled ? { scaleY: fill } : undefined}
            className="absolute top-3 bottom-3 left-[7px] w-px origin-top bg-gradient-to-b from-accent via-[#7c3aed] to-[#db2777] dark:via-[#a78bfa] dark:to-[#f472b6]"
          />
          <RevealGroup as="ol" gap={0.12} aria-label="Roles">
            {roles.map((role, i) => (
              <RevealItem as="li" key={role.id} className="relative pb-14 pl-10 last:pb-0">
                <RoleEntry role={role} isLatest={i === 0} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      <Recognition items={experience.recognition} />
    </Section>
  );
}

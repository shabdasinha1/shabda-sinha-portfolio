import { experience } from '../../../data/experience';
import { Reveal, RevealGroup, RevealItem } from '../../common/Reveal';
import { Section } from '../../common/Section';
import { SectionHeader } from '../../common/SectionHeader';
import { CompanyCard } from './CompanyCard';
import { Recognition } from './Recognition';
import { RoleEntry } from './RoleEntry';

export function Experience() {
  const { roles } = experience;

  return (
    <Section id="experience" labelledBy="experience-title" tone="muted">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Left column stays in view while the timeline scrolls on desktop. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
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

        <div className="relative">
          {/* Timeline spine */}
          <span
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[7px] w-px bg-gradient-to-b from-accent/60 via-line-strong to-transparent"
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

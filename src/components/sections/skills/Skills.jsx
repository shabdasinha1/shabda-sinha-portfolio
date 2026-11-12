import { skillGroups, skillsSection } from '../../../data/skills';
import { Reveal, RevealGroup, RevealItem } from '../../common/Reveal';
import { Section } from '../../common/Section';
import { SectionHeader } from '../../common/SectionHeader';
import { TechList } from '../../common/TechList';
import { SkillGroup } from './SkillGroup';

// Bento layout on large screens: three groups on the first row, two wider ones below.
const SPANS = ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3'];

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title" tone="muted">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          index={skillsSection.index}
          eyebrow={skillsSection.eyebrow}
          title={skillsSection.title}
          titleId="skills-title"
          description={skillsSection.description}
        />
        <Reveal className="flex flex-col gap-3 lg:items-end">
          <p className="eyebrow">Languages</p>
          <TechList items={skillsSection.languages} label="Programming languages" variant="pill" />
        </Reveal>
      </div>

      {/* gap-px over a line-coloured background draws crisp 1px dividers between cells. */}
      <RevealGroup
        as="ul"
        gap={0.07}
        className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line shadow-card sm:grid-cols-2 lg:grid-cols-6"
        aria-label="Skill groups"
      >
        {skillGroups.map((group, i) => (
          <RevealItem
            as="li"
            key={group.id}
            className={`bg-surface ${SPANS[i]} ${i === skillGroups.length - 1 ? 'sm:col-span-2' : ''}`}
          >
            <SkillGroup {...group} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

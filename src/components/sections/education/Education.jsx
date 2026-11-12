import { education } from '../../../data/education';
import { Reveal } from '../../common/Reveal';
import { Section } from '../../common/Section';
import { SectionHeader } from '../../common/SectionHeader';
import { EducationEntry } from './EducationEntry';

export function Education() {
  return (
    <Section id="education" labelledBy="education-title">
      <SectionHeader
        index={education.index}
        eyebrow={education.eyebrow}
        title={education.title}
        titleId="education-title"
      />
      <div className="mt-12 space-y-6">
        {education.entries.map((entry) => (
          <Reveal key={entry.id}>
            <EducationEntry entry={entry} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

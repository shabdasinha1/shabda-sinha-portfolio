import { projects, projectsSection } from '../../../data/projects';
import { Section } from '../../common/Section';
import { SectionHeader } from '../../common/SectionHeader';
import { ProjectShowcase } from './ProjectShowcase';

export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeader
        index={projectsSection.index}
        eyebrow={projectsSection.eyebrow}
        title={projectsSection.title}
        titleId="projects-title"
        description={projectsSection.description}
      />

      <ol className="mt-16 space-y-8 sm:mt-20 sm:space-y-10" aria-label="Featured projects">
        {projects.map((project, i) => (
          <li key={project.id}>
            <ProjectShowcase project={project} number={i + 1} reversed={i % 2 === 1} />
          </li>
        ))}
      </ol>
    </Section>
  );
}

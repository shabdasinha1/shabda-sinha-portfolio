import { ArrowUpRight, Mail } from 'lucide-react';
import { contact } from '../../../data/contact';
import { profile } from '../../../data/profile';
import { socials } from '../../../data/socials';
import { Container } from '../../common/Container';
import { RevealGroup, RevealItem } from '../../common/Reveal';
import { CopyEmailButton } from './CopyEmailButton';
import { ContactLink } from './ContactLink';

const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(contact.emailSubject)}`;
const profileLinks = socials.filter((s) => s.id !== 'email');

/**
 * Closing call to action, drawn as an inverse-colour panel so it reads as
 * the end of the page in both themes. Uses direct email (no form/backend).
 */
export function Contact() {
  const { title } = contact;

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-24 sm:py-32">
      <Container>
        <RevealGroup className="relative overflow-hidden rounded-[2rem] bg-inverse px-6 py-14 text-inverse-fg shadow-float sm:px-14 sm:py-20">
          {/* Soft accent glow, decorative only. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-32 size-[28rem] rounded-full bg-[radial-gradient(circle,var(--glow-a),transparent_65%)]"
          />

          {/* min-w-0 lets grid columns shrink below their content's min width on narrow phones. */}
          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end [&>*]:min-w-0">
            <div>
              <RevealItem as="p" className="flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.14em] uppercase opacity-60">
                <span>{contact.index}</span>
                <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
                {contact.eyebrow}
              </RevealItem>

              <RevealItem as="div">
                <h2
                  id="contact-title"
                  className="mt-5 text-[clamp(2.25rem,5.4vw,4rem)] leading-[1.03] font-semibold tracking-[-0.04em]"
                >
                  {title.lead}{' '}
                  <span className="text-inverse-accent">{title.emphasis}</span>{' '}
                  {title.tail}
                </h2>
              </RevealItem>

              <RevealItem as="p" className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed opacity-75">
                {contact.description}
              </RevealItem>

              <RevealItem as="div" className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={mailtoHref}
                  className="group/btn inline-flex h-12 items-center gap-2.5 rounded-full bg-inverse-fg px-6 text-[0.9375rem] font-medium text-inverse transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <Mail className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  Email me
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </a>
                <CopyEmailButton email={profile.email} />
              </RevealItem>

              <RevealItem as="ul" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm opacity-60" aria-label="Availability">
                {contact.notes.map((note) => (
                  <li key={note} className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-1 rounded-full bg-current" />
                    {note}
                  </li>
                ))}
              </RevealItem>
            </div>

            <RevealItem as="ul" className="space-y-3" aria-label="Profiles">
              {profileLinks.map((link) => (
                <li key={link.id}>
                  <ContactLink {...link} />
                </li>
              ))}
            </RevealItem>
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}

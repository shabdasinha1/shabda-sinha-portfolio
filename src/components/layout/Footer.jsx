import { profile } from '../../data/profile';
import { Container } from '../common/Container';
import { SocialLinks } from '../common/SocialLinks';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-subtle">
          © {year} {profile.name}. Built with React, Tailwind CSS &amp; Motion.
        </p>
        <SocialLinks />
      </Container>
    </footer>
  );
}

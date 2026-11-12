import {
  Bell,
  ChartColumn,
  Cloud,
  CreditCard,
  Database,
  HardDrive,
  LayoutDashboard,
  Lock,
  Monitor,
  Plug,
  Server,
  ShieldCheck,
  Smartphone,
  Store,
  Wrench,
} from 'lucide-react';

/**
 * Maps the plain icon keys used in data files to Lucide components, so content
 * files stay free of React imports.
 */
const ICONS = {
  bell: Bell,
  chart: ChartColumn,
  cloud: Cloud,
  database: Database,
  layout: LayoutDashboard,
  lock: Lock,
  monitor: Monitor,
  payment: CreditCard,
  plug: Plug,
  server: Server,
  shield: ShieldCheck,
  smartphone: Smartphone,
  storage: HardDrive,
  store: Store,
  tools: Wrench,
};

export function Icon({ name, className = 'size-4', strokeWidth = 1.75 }) {
  const Component = ICONS[name];
  if (!Component) return null;
  return <Component aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}

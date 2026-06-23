import { cn } from '@/lib/cn';

interface SectionHeaderProps {
  label: string;
  heading: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ label, heading, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <span className="font-label text-champagne mb-4 block">{label}</span>
      <h2 className="font-heading text-section text-bone">{heading}</h2>
      <span className="text-rose-gold text-sm mt-3 block opacity-70">&#10086;</span>
    </div>
  );
}

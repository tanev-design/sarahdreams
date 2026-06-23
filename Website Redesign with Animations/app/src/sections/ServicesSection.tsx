import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  t: (key: string) => string;
}

const services = ['services.item1', 'services.item2', 'services.item3', 'services.item4', 'services.item5'];

const prices = [
  { key: 'price.bj', price: '95' },
  { key: 'price.quick', price: '115' },
  { key: 'price.30', price: '145' },
  { key: 'price.45', price: '190' },
  { key: 'price.60', price: '240 \u2013 290' },
  { key: 'price.90', price: '380' },
  { key: 'price.120', price: '520' },
];

export function ServicesSection({ t }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;
    if (!section || !leftCard || !rightCard) return;

    const triggers: ScrollTrigger[] = [];

    const leftTl = gsap.fromTo(
      leftCard,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );
    if (leftTl.scrollTrigger) triggers.push(leftTl.scrollTrigger);

    const rightTl = gsap.fromTo(
      rightCard,
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );
    if (rightTl.scrollTrigger) triggers.push(rightTl.scrollTrigger);

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-ink"
      style={{ padding: 'clamp(4rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4rem)' }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12">
          <SectionHeader label={t('services.label')} heading={t('services.title')} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Services Card */}
          <div
            ref={leftCardRef}
            className="bg-charcoal border border-mist rounded-[3px] p-8 md:p-10 transition-all duration-300 hover:border-champagne/25 hover:-translate-y-[3px] hover:shadow-card opacity-0"
          >
            <h3 className="font-heading text-subheading text-champagne pb-4 mb-6 border-b border-mist">
              {t('services.myService')}
            </h3>

            <ul className="space-y-3 mb-8">
              {services.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-3 font-body text-[0.92rem] text-bone/70"
                >
                  <span className="text-champagne text-[0.45rem] mt-2 flex-shrink-0">&#9670;</span>
                  {t(key)}
                </li>
              ))}
            </ul>

            <div
              className="p-4 rounded-r-[3px] font-body text-[0.82rem] text-bone/65"
              style={{
                background: 'rgba(139,21,56,0.08)',
                borderLeft: '2px solid #3d0f1a',
              }}
            >
              <strong className="text-bone/90">{t('services.noteTitle')}</strong>{' '}
              {t('services.noteText')}
            </div>
          </div>

          {/* Prices Card */}
          <div
            ref={rightCardRef}
            className="bg-charcoal border border-mist rounded-[3px] p-8 md:p-10 transition-all duration-300 hover:border-champagne/25 hover:-translate-y-[3px] hover:shadow-card opacity-0"
          >
            <h3 className="font-heading text-subheading text-champagne pb-4 mb-6 border-b border-mist">
              {t('services.prices')}
            </h3>

            <table className="w-full">
              <tbody>
                {prices.map(({ key, price }) => (
                  <tr
                    key={key}
                    className="border-b border-mist/50 transition-colors duration-300 hover:bg-champagne/[0.03]"
                  >
                    <td className="py-3.5 pr-4 font-body text-[0.92rem] text-bone/70">
                      {t(key)}
                    </td>
                    <td className="py-3.5 text-right font-heading text-[1.1rem] text-champagne font-medium whitespace-nowrap">
                      &euro;{price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

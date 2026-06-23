import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  t: (key: string) => string;
}

export function ContactSection({ t }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    const section = sectionRef.current;
    const info = infoRef.current;
    const form = formRef.current;
    if (!section || !info || !form) return;

    const triggers: ScrollTrigger[] = [];

    const infoTl = gsap.fromTo(
      info,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );
    if (infoTl.scrollTrigger) triggers.push(infoTl.scrollTrigger);

    const formTl = gsap.fromTo(
      form,
      { scale: 0.96, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );
    if (formTl.scrollTrigger) triggers.push(formTl.scrollTrigger);

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-obsidian"
      style={{ padding: 'clamp(4rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4rem)' }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12">
          <SectionHeader label={t('contact.label')} heading={t('contact.title')} />
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Info Column */}
          <div ref={infoRef} className="w-full md:w-[45%] opacity-0">
            <p className="font-body text-bone/75 mb-8">{t('contact.intro')}</p>

            <div className="mb-8">
              <h4 className="font-label text-champagne mb-3">{t('contact.locationTitle')}</h4>
              <p className="font-body text-bone font-medium mb-1">Sarah</p>
              <p className="font-body text-bone/70 text-[0.92rem]">
                Frutigenstrasse 64, 3604 Thun, Switzerland
              </p>
              <p className="font-body text-champagne text-[0.85rem] mt-3">
                {t('contact.tempLocation')}
              </p>
            </div>

            <div className="mb-8">
              <h4 className="font-label text-champagne mb-3">{t('contact.phoneTitle')}</h4>
              <p className="font-body text-bone/70 text-[0.92rem]">
                SMS:{' '}
                <a
                  href="tel:+41783027547"
                  className="text-champagne no-underline transition-colors duration-300 hover:text-bone"
                >
                  +41 78 302 75 47
                </a>
              </p>
              <p className="font-body text-bone/70 text-[0.92rem]">
                WhatsApp:{' '}
                <a
                  href="tel:+41782466134"
                  className="text-champagne no-underline transition-colors duration-300 hover:text-bone"
                >
                  +41 78 246 61 34
                </a>
              </p>
            </div>

            <div>
              <h4 className="font-label text-champagne mb-3">{t('contact.hoursTitle')}</h4>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-mist">
                    <td className="py-2 text-mist text-[0.85rem] font-body">
                      {t('hours.today')}
                    </td>
                    <td className="py-2 text-bone/80 text-[0.85rem] font-body text-right">
                      10:00 &ndash; 23:45
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Form Column */}
          <div ref={formRef} className="w-full md:w-[55%] opacity-0">
            <div className="bg-charcoal border border-mist rounded-[3px] p-8 md:p-10">
              <h3 className="font-heading text-subheading text-champagne mb-8">
                {t('form.title')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-label text-mist mb-2 block">{t('form.name')}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-ink border border-mist text-bone px-4 py-3 font-body text-[0.9rem] rounded-[2px] transition-all duration-300 focus:border-champagne focus:outline-none focus:shadow-[0_0_0_2px_rgba(201,169,110,0.1)]"
                  />
                </div>

                <div>
                  <label className="font-label text-mist mb-2 block">{t('form.email')}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-ink border border-mist text-bone px-4 py-3 font-body text-[0.9rem] rounded-[2px] transition-all duration-300 focus:border-champagne focus:outline-none focus:shadow-[0_0_0_2px_rgba(201,169,110,0.1)]"
                  />
                </div>

                <div>
                  <label className="font-label text-mist mb-2 block">{t('form.phone')}</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-ink border border-mist text-bone px-4 py-3 font-body text-[0.9rem] rounded-[2px] transition-all duration-300 focus:border-champagne focus:outline-none focus:shadow-[0_0_0_2px_rgba(201,169,110,0.1)]"
                  />
                </div>

                <div>
                  <label className="font-label text-mist mb-2 block">{t('form.message')}</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-ink border border-mist text-bone px-4 py-3 font-body text-[0.9rem] rounded-[2px] transition-all duration-300 focus:border-champagne focus:outline-none focus:shadow-[0_0_0_2px_rgba(201,169,110,0.1)] min-h-[120px] resize-y"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  {t('form.send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

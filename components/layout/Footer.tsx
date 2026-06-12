"use client";

import { Container } from "@/components/layout/Container";
import { contact } from "@/lib/contact";
import { textLinkClass } from "@/lib/styles/interactive";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const footerLinks = [
  { href: "#about", key: "about" as const },
  { href: "#jfish", key: "jfish" as const },
  { href: "#payments", key: "payments" as const },
  { href: "#stronghold", key: "stronghold" as const },
  // { href: "#gallery", key: "gallery" as const },
  { href: "#visit", key: "visit" as const },
  { href: "#volunteer", key: "volunteer" as const },
];

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-jungle-800/20 bg-jungle-950 text-jungle-200">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-display text-xl font-semibold text-white">
              Jungle Fish
            </p>
            <p className="mt-2 text-sm text-jungle-300">{t.footer.tagline}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-jungle-400">
              {t.footer.sections}
            </p>
            <ul className="mt-4 space-y-2">
              {footerLinks.map(({ href, key }) => (
                <li key={key}>
                  <a
                    href={href}
                    className={`text-sm text-jungle-200 ${textLinkClass}`}
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-jungle-400">
              {t.footer.connect}
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className={`text-sm text-jungle-200 ${textLinkClass}`}
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className={`text-sm text-jungle-200 ${textLinkClass}`}
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm text-jungle-200 ${textLinkClass}`}
                >
                  {t.footer.facebook}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm text-jungle-200 ${textLinkClass}`}
                >
                  {t.footer.instagram}
                </a>
              </li>
              <li>
                <a
                  href={contact.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm text-jungle-200 ${textLinkClass}`}
                >
                  {t.footer.x}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-jungle-800/40 pt-6 text-center text-xs text-jungle-400 sm:text-left">
          © {year} Jungle Fish. {t.footer.rights}
        </div>
      </Container>
    </footer>
  );
}

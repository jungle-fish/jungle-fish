"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useFastScroll } from "@/hooks/useFastScroll";
import { cn } from "@/lib/utils";
import { interactivePress, navLinkClass } from "@/lib/styles/interactive";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const SECTION_IDS = [
  "about",
  "payments",
  "jfish",
  "stronghold",
  "volunteer",
  "visit",
] as const;

const navLinks = [
  { href: "#about", key: "about" as const, sectionId: "about" },
  { href: "#payments", key: "payments" as const, sectionId: "payments" },
  { href: "#jfish", key: "jfish" as const, sectionId: "jfish" },
  { href: "#stronghold", key: "stronghold" as const, sectionId: "stronghold" },
  { href: "#volunteer", key: "volunteer" as const, sectionId: "volunteer" },
];

export function Header() {
  const { t, locale, setLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  useFastScroll();

  useEffect(() => {
    let rafId = 0;
    let lastScrolled = window.scrollY > 24;

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const nextScrolled = window.scrollY > 24;
        if (nextScrolled !== lastScrolled) {
          lastScrolled = nextScrolled;
          setScrolled(nextScrolled);
        }
      });
    };

    setScrolled(lastScrolled);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleLocale = () => setLocale(locale === "en" ? "es" : "en");
  const isVisitActive = activeSection === "visit";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || menuOpen
          ? "border-b border-jungle-900/10 bg-cream/90 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container as="nav" className="flex h-16 items-center justify-between sm:h-18">
        <a
          href="#"
          className={cn(
            interactivePress,
            "font-display text-lg font-semibold tracking-tight transition-colors hover:scale-[1.02]",
            scrolled || menuOpen ? "text-jungle-950" : "text-white",
          )}
        >
          Jungle Fish
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map(({ href, key, sectionId }) => (
            <a
              key={key}
              href={href}
              className={navLinkClass({
                active: activeSection === sectionId,
                scrolled: scrolled || menuOpen,
              })}
            >
              {t.nav[key]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleLocale}
            className={cn(
              interactivePress,
              "rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-wider hover:scale-[1.03]",
              scrolled || menuOpen
                ? "text-jungle-800 hover:bg-jungle-100"
                : "text-jungle-100 hover:bg-white/10",
            )}
            aria-label={`Switch to ${locale === "en" ? "Spanish" : "English"}`}
          >
            {locale === "en" ? "ES" : "EN"}
          </button>

          <Button
            href="#visit"
            variant={scrolled || menuOpen ? "primary" : "outline"}
            size="sm"
            className={cn(
              "hidden sm:inline-flex",
              isVisitActive && scrolled && "ring-2 ring-jungle-500/40",
            )}
          >
            {t.nav.visit}
          </Button>

          <button
            type="button"
            className={cn(
              interactivePress,
              "inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
              scrolled || menuOpen ? "text-jungle-900" : "text-white",
            )}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-full bg-current transition-all",
                  menuOpen ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 block h-0.5 w-full bg-current transition-opacity",
                  menuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-full bg-current transition-all",
                  menuOpen ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div className="border-t border-jungle-900/10 bg-cream/95 backdrop-blur-md lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map(({ href, key, sectionId }) => (
              <a
                key={key}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  navLinkClass({
                    active: activeSection === sectionId,
                    scrolled: true,
                  }),
                  "rounded-lg px-3 py-2.5 hover:bg-jungle-100",
                )}
              >
                {t.nav[key]}
              </a>
            ))}
            <Button
              href="#visit"
              variant="primary"
              size="md"
              className="mt-2"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.visit}
            </Button>
          </Container>
        </div>
      )}
    </motion.header>
  );
}

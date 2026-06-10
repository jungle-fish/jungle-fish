"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const navLinks = [
  { href: "#about", key: "about" as const },
  { href: "#experiences", key: "experiences" as const },
  { href: "#jfish", key: "jfish" as const },
  { href: "#payments", key: "payments" as const },
  { href: "#stronghold", key: "stronghold" as const },
  { href: "#gallery", key: "gallery" as const },
  { href: "#volunteer", key: "volunteer" as const },
];

export function Header() {
  const { t, locale, setLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLocale = () => setLocale(locale === "en" ? "es" : "en");

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
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
            "font-display text-lg font-semibold tracking-tight transition-colors",
            scrolled || menuOpen ? "text-jungle-950" : "text-white",
          )}
        >
          Jungle Fish
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map(({ href, key }) => (
            <a
              key={key}
              href={href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-jungle-600",
                scrolled ? "text-jungle-800" : "text-jungle-100 hover:text-white",
              )}
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
              "rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors",
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
            className="hidden sm:inline-flex"
          >
            {t.nav.visit}
          </Button>

          <button
            type="button"
            className={cn(
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
            {navLinks.map(({ href, key }) => (
              <a
                key={key}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-jungle-800 hover:bg-jungle-100"
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

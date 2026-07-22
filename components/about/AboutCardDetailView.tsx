"use client";

import Image from "next/image";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { getAboutCardBySlug } from "@/lib/about/cards";
import type { AboutCardSlug } from "@/lib/about/cards";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { textLinkClass, interactivePress } from "@/lib/styles/interactive";
import { cn } from "@/lib/utils";

const accentHeroStyles = {
  green: "from-jungle-900/80 via-jungle-800/50 to-jungle-700/30",
  lagoon: "from-jungle-950/80 via-lagoon-700/40 to-lagoon-500/20",
  sand: "from-jungle-950/80 via-earth-600/35 to-sand-200/20",
  earth: "from-jungle-950/80 via-earth-600/45 to-sand-100/15",
};

const accentBadgeStyles = {
  green: "bg-jungle-100 text-jungle-800",
  lagoon: "bg-lagoon-100 text-lagoon-700",
  sand: "bg-sand-200 text-earth-600",
  earth: "bg-sand-100 text-earth-600",
};

const volumesData = {
  en: {
    volumes: [
      {
        number: "Volume I",
        title: "Living with Nature",
        subtitle: "Permaculture and the Wisdom of the Tropical Forest",
        description: "An introduction to permaculture through tropical ecosystems, regenerative design, soil, water, biodiversity and practical ways of growing in relationship with the land.",
        status: "Nearing completion",
        statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200"
      },
      {
        number: "Volume II",
        title: "The Living Pharmacy",
        subtitle: "Medicinal Plants of the Tropical Forest",
        description: "A practical and visual guide to medicinal plants found around Jungle Fish and the wider tropical region, bringing together scientific knowledge, traditional use and accessible cultivation guidance. The plan outlines a guide focused on local species and how to grow them in gardens, yards or pots.",
        status: "In research & development",
        statusColor: "text-amber-600 bg-amber-50 border-amber-200"
      },
      {
        number: "Volume III",
        title: "Aquaculture",
        subtitle: "How to Cultivate and Grow Your Own Water Farm",
        description: "A guide to fish, aquatic plants and interconnected water systems, based on the aquaculture practices being developed and documented at Jungle Fish. The proposed volume connects tilapia, azolla, water circulation and terrestrial permaculture as complementary systems.",
        status: "In research & documentation",
        statusColor: "text-blue-600 bg-blue-50 border-blue-200"
      },
      {
        number: "Volume IV",
        title: "Smoothies, Coffee & Treats",
        subtitle: "Local Ingredients, Global Inspiration",
        description: "A visual collection of drinks, coffee and desserts shaped by tropical ingredients, local food culture and recipes from around the world.",
        status: "In early development",
        statusColor: "text-purple-600 bg-purple-50 border-purple-200"
      },
      {
        number: "Volume V",
        title: "Grandpa & Grandma Recipes",
        subtitle: "Stories from the Generations Passed",
        description: "A living archive of inherited recipes and the personal stories carried with them — preserving family memory, local ingredients and knowledge that has often never been written down. The editorial concept plans to compile recipes through interviews, photography, and fieldwork, respecting the voice of those who inherited them.",
        status: "Field research planned",
        statusColor: "text-rose-600 bg-rose-50 border-rose-200"
      },
      {
        number: "Volume VI",
        title: "The Memory of This Land",
        subtitle: "Indigenous Peoples, Wildlife and the History of the Region",
        description: "A narrative exploration of the people, migrations, oral histories, wildlife and changing relationship between communities and the landscape surrounding Jungle Fish.",
        status: "Concept & research stage",
        statusColor: "text-gray-600 bg-gray-50 border-gray-200"
      }
    ]
  },
  es: {
    volumes: [
      {
        number: "Volumen I",
        title: "Viviendo con la Naturaleza",
        subtitle: "Permacultura y la Sabiduría del Bosque Tropical",
        description: "Una introducción a la permacultura a través de ecosistemas tropicales, diseño regenerativo, suelo, agua, biodiversidad y formas prácticas de cultivar en relación con la tierra.",
        status: "Próximo a completarse",
        statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200"
      },
      {
        number: "Volumen II",
        title: "La Farmacia Viva",
        subtitle: "Plantas Medicinales del Bosque Tropical",
        description: "Una guía práctica y visual de las plantas medicinales que se encuentran alrededor de Jungle Fish y la región tropical en general, que reúne conocimiento científico, uso tradicional y orientación de cultivo accesible. El plan prevé una guía centrada en especies locales y en cómo cultivarlas también en jardines, patios o macetas.",
        status: "En investigación y desarrollo",
        statusColor: "text-amber-600 bg-amber-50 border-amber-200"
      },
      {
        number: "Volumen III",
        title: "Acuacultura",
        subtitle: "Cómo Cultivar y Administrar tu Propia Granja Acuática",
        description: "Una guía de peces, plantas acuáticas y sistemas de agua interconectados, basada en las prácticas de acuacultura que se desarrollan y documentan en Jungle Fish. El volumen propuesto conecta tilapia, azolla, circulación de agua y permacultura terrestre como sistemas complementarios.",
        status: "En investigación y documentación",
        statusColor: "text-blue-600 bg-blue-50 border-blue-200"
      },
      {
        number: "Volumen IV",
        title: "Batidos, Café y Delicias",
        subtitle: "Ingredientes Locales, Inspiración Global",
        description: "Una colección visual de bebidas, café y postres moldeados por ingredientes tropicales, cultura culinaria local y recetas de todo el mundo.",
        status: "En desarrollo temprano",
        statusColor: "text-purple-600 bg-purple-50 border-purple-200"
      },
      {
        number: "Volumen V",
        title: "Recetas de los Abuelos",
        subtitle: "Historias de las Generaciones Pasadas",
        description: "Un archivo vivo de recetas heredadas y las historias personales que conllevan — preservando la memoria familiar, los ingredientes locales y conocimientos que a menudo nunca se han escrito. El concepto editorial plantea recopilar recetas mediante entrevistas, fotografía y trabajo de campo respetando la voz de quienes las heredaron.",
        status: "Investigación de campo planificada",
        statusColor: "text-rose-600 bg-rose-50 border-rose-200"
      },
      {
        number: "Volumen VI",
        title: "La Memoria de esta Tierra",
        subtitle: "Pueblos Indígenas, Vida Silvestre e Historia de la Región",
        description: "Una exploración narrativa de las personas, migraciones, historias orales, vida silvestre y la relación cambiante entre las comunidades y el paisaje que rodea a Jungle Fish.",
        status: "Etapa de concepto e investigación",
        statusColor: "text-gray-600 bg-gray-50 border-gray-200"
      }
    ]
  }
};

type AboutCardDetailViewProps = {
  slug: AboutCardSlug;
};

export function AboutCardDetailView({ slug }: AboutCardDetailViewProps) {
  const { t, locale } = useLanguage();
  const card = getAboutCardBySlug(slug);

  if (!card) {
    return null;
  }

  const copy = t.about.cards[card.key];
  const detail = copy.detail;

  return (
    <>
      <Header />
      <main className="overflow-x-clip bg-cream">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <section className="relative min-h-[42vh] overflow-hidden sm:min-h-[48vh]">
            {card.imageSrc ? (
              <Image
                src={card.imageSrc}
                alt={copy.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            ) : (
              <CldImage
                src={card.cloudinaryId!}
                alt={copy.title}
                fill
                priority
                crop="fill"
                gravity="auto"
                quality="auto"
                format="auto"
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div
              className={cn(
                "absolute inset-0 bg-linear-to-t",
                accentHeroStyles[card.accent],
              )}
            />
            <div className="absolute inset-0 bg-jungle-950/25" />

            <Container className="relative z-10 flex min-h-[42vh] flex-col justify-end pb-10 pt-28 sm:min-h-[48vh] sm:pb-12">
              <Link
                href="/#about"
                className={cn(
                  interactivePress,
                  "mb-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-jungle-100/90 hover:text-white",
                )}
              >
                <span aria-hidden>←</span>
                {t.about.detailBack}
              </Link>

              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-md",
                    accentBadgeStyles[card.accent],
                  )}
                >
                  <Image
                    src={card.iconSrc}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                    aria-hidden
                  />
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-jungle-200">
                    {t.about.eyebrow}
                  </p>
                  <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {copy.title}
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-jungle-100 sm:text-lg">
                    {copy.description}
                  </p>
                </div>
              </div>
            </Container>
          </section>

          <Container className="py-14 sm:py-16 lg:py-20">
            {slug === "book" ? (
              <div className="space-y-16">
                {/* Intro & Progressive Development Note */}
                <FadeIn className="space-y-6">
                  <h2 className="font-display text-2xl font-bold text-emerald-800 sm:text-3xl">
                    {locale === "es" ? "Seis libros arraigados en un paisaje vivo" : "Six books rooted in one living landscape"}
                  </h2>
                  <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
                    {detail.intro}
                  </p>
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 max-w-3xl">
                    <p className="text-sm leading-relaxed text-emerald-950 sm:text-base">
                      {locale === "es" 
                        ? "La colección se está desarrollando progresivamente. El Volumen I, Viviendo con la Naturaleza, está próximo a completarse. Los cinco volúmenes restantes forman parte de la visión editorial a largo plazo y actualmente se encuentran en fase de investigación, planificación o desarrollo temprano."
                        : "The collection is being developed progressively. Volume I, Living with Nature, is nearing completion. The remaining five volumes are part of the long-term editorial vision and are currently in research, planning or early development."
                      }
                    </p>
                  </div>
                </FadeIn>

                {/* Focus on Volume I */}
                <FadeIn className="rounded-2xl border border-jungle-200/80 bg-linear-to-br from-white via-cream to-jungle-100/40 p-8 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-jungle-200/50 pb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        {locale === "es" ? "Volumen I — Próximo a completarse" : "Volume I — Nearing completion"}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-bold text-jungle-950 sm:text-3xl">
                        {locale === "es" ? "Viviendo con la Naturaleza" : "Living with Nature"}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-jungle-800 italic sm:text-base">
                        {locale === "es" ? "Permacultura y la Sabiduría del Bosque Tropical" : "Permaculture and the Wisdom of the Tropical Forest"}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg whitespace-pre-line">
                    {locale === "es"
                      ? "El primer volumen introduce la permacultura a través de los ritmos y relaciones del bosque tropical. Explora el suelo, el agua, la biodiversidad, los sistemas alimentarios y formas prácticas de empezar a trabajar con la naturaleza en lugar de contra ella.\n\nCombinando observación, conocimiento accesible y narrativa visual, el libro conecta los sistemas vivos que se encuentran en Jungle Fish con ideas que también se pueden adaptar a jardines, fincas y espacios domésticos más pequeños."
                      : "The first volume introduces permaculture through the rhythms and relationships of the tropical forest. It explores soil, water, biodiversity, food systems and practical ways of beginning to work with nature rather than against it.\n\nBlending observation, accessible knowledge and visual storytelling, the book connects the living systems found at Jungle Fish with ideas that can also be adapted to gardens, farms and smaller domestic spaces."
                    }
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href="/#visit" size="md">
                      {locale === "es" ? "Explorar Volumen I" : "Explore Volume I"}
                    </Button>
                    <Button href="/#visit" variant="outline" size="md">
                      {locale === "es" ? "Vista previa del libro" : "Preview the book"}
                    </Button>
                    <Button href="/#visit" variant="outline" size="md">
                      {locale === "es" ? "Unirse a la lista de lanzamiento" : "Join the release list"}
                    </Button>
                  </div>
                </FadeIn>

                {/* Editorial Collection Grid */}
                <FadeIn className="space-y-6">
                  <h3 className="font-display text-2xl font-bold text-jungle-950 sm:text-3xl">
                    {locale === "es" ? "Los seis volúmenes" : "The six volumes"}
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {(locale === "es" ? volumesData.es.volumes : volumesData.en.volumes).map((vol) => (
                      <article 
                        key={vol.number} 
                        className="flex h-full flex-col justify-between rounded-2xl border border-jungle-200/80 bg-white p-6 shadow-xs"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 border-b border-jungle-100 pb-3 mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-jungle-800">
                              {vol.number}
                            </span>
                            <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border", vol.statusColor)}>
                              {vol.status}
                            </span>
                          </div>
                          <h4 className="font-display text-lg font-bold text-jungle-950">
                            {vol.title}
                          </h4>
                          <p className="text-xs font-semibold text-emerald-800 italic mt-1">
                            {vol.subtitle}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-muted">
                            {vol.description}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </FadeIn>

                {/* Honest Visit Section */}
                <FadeIn className="rounded-2xl border border-jungle-200/70 bg-jungle-100/40 p-6 sm:p-8">
                  <h3 className="font-display text-lg font-semibold text-jungle-950 sm:text-xl">
                    {locale === "es" ? "De la página al paisaje" : "From the page to the landscape"}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-jungle-800 sm:text-base">
                    {locale === "es" 
                      ? "Los libros se basan en observaciones, prácticas e historias conectadas con Jungle Fish. A medida que la serie se desarrolle, ideas seleccionadas también podrán inspirar futuras caminatas, charlas y experiencias de aprendizaje en la propiedad."
                      : "The books are shaped by observations, practices and stories connected to Jungle Fish. As the series develops, selected ideas may also inspire future walks, talks and learning experiences on the property."
                    }
                  </p>
                </FadeIn>
              </div>
            ) : (
              <>
                <FadeIn>
                  <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
                    {detail.intro}
                  </p>
                </FadeIn>

                <FadeIn delay={0.08} className="mt-10">
                  <h2 className="font-display text-2xl font-semibold text-jungle-950 sm:text-3xl">
                    {t.about.experienceTitle}
                  </h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {detail.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-jungle-200/80 bg-white/80 px-5 py-4 text-sm text-jungle-800 sm:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lagoon-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </>
            )}

            {/* experiences section for other slugs */}
            {slug !== "book" && (
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {detail.experiences.map((experience, index) => (
                  <FadeIn key={experience.title} delay={0.12 + index * 0.06}>
                    <article className="flex h-full flex-col rounded-2xl border border-jungle-200/80 bg-linear-to-br from-white via-cream to-jungle-100/40 p-6 shadow-sm shadow-jungle-900/5">
                      <h3 className="font-display text-lg font-semibold text-jungle-950">
                        {experience.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                        {experience.description}
                      </p>
                    </article>
                  </FadeIn>
                ))}
              </div>
            )}

            {/* visit note section for other slugs */}
            {slug !== "book" && (
              <FadeIn delay={0.28} className="mt-10">
                <div className="rounded-2xl border border-jungle-200/70 bg-jungle-100/40 px-6 py-5 sm:px-8 sm:py-6">
                  <h2 className="font-display text-lg font-semibold text-jungle-950 sm:text-xl">
                    {t.about.visitNoteTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-jungle-800 sm:text-base">
                    {detail.visitNote}
                  </p>
                </div>
              </FadeIn>
            )}

            <FadeIn delay={0.34} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href="/#visit" size="lg">
                {t.about.detailCta}
              </Button>
              <Link
                href="/#about"
                className={cn("text-sm text-jungle-800", textLinkClass)}
              >
                {t.about.detailBack}
              </Link>
            </FadeIn>
          </Container>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}

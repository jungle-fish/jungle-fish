"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

type AboutSectionDecorationsProps = {
  scrollYProgress: MotionValue<number>;
};

const treeSpring = {
  type: "spring" as const,
  stiffness: 88,
  damping: 17,
  mass: 0.95,
};

const creeperSpring = {
  type: "spring" as const,
  stiffness: 72,
  damping: 15,
  mass: 1.05,
  delay: 0.15,
};

export function AboutSectionDecorations({
  scrollYProgress,
}: AboutSectionDecorationsProps) {
  const prefersReducedMotion = useReducedMotion();
  const treeScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [0.94, 1.05, 0.98],
  );
  const treeRotate = useTransform(scrollYProgress, [0, 1], [-1.25, 1.25]);
  const treeInnerY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const creeperScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [0.94, 1.04, 0.98],
  );
  const creeperRotate = useTransform(scrollYProgress, [0, 1], [1.25, -1.25]);

  return (
    <>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden md:block"
        aria-hidden
      >
        <div className="sticky top-20 lg:top-24">
          <motion.div
            className="h-[calc(100dvh-3rem)] origin-top-left lg:h-[calc(100dvh-3.5rem)]"
            style={
              prefersReducedMotion
                ? undefined
                : { scale: treeScale, rotate: treeRotate }
            }
          >
            <motion.div
              className="relative aspect-[240/580] h-full overflow-hidden"
              style={prefersReducedMotion ? undefined : { y: treeInnerY }}
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, x: -80, scale: 0.76, filter: "blur(10px)" }
              }
              whileInView={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
              }
              viewport={{ once: true, amount: 0.15 }}
              transition={treeSpring}
            >
              <Image
                src="/images/image_tree.webp"
                alt=""
                width={480}
                height={580}
                className="absolute right-0 top-0 h-full w-auto max-w-none"
                sizes="(max-width: 1024px) 200px, 320px"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 right-5 z-[1] hidden w-[360px] md:block lg:right-10 xl:right-14"
        aria-hidden
      >
        <div className="sticky top-20 flex justify-end lg:top-24">
          <motion.div
            className="w-full origin-top-right"
            style={
              prefersReducedMotion
                ? undefined
                : { scale: creeperScale, rotate: creeperRotate }
            }
          >
            <motion.div
              className="w-full"
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 0,
                      x: 120,
                      y: -32,
                      scale: 0.76,
                      rotate: 12,
                      filter: "blur(10px)",
                    }
              }
              whileInView={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      rotate: 0,
                      filter: "blur(0px)",
                    }
              }
              viewport={{ once: true, margin: "-8%" }}
              transition={creeperSpring}
            >
              <Image
                src="/images/image_creeper.webp"
                alt=""
                width={360}
                height={540}
                className="h-auto w-full object-contain"
                sizes="(max-width: 1024px) 170px, 360px"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

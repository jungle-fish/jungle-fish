import { cn } from "@/lib/utils";

export const interactivePress =
  "cursor-pointer transition-[color,background-color,transform,box-shadow,opacity] duration-200 active:scale-[0.97]";

export const navLinkBase =
  "relative inline-flex items-center rounded-md px-1 py-1 transition-[color,transform] duration-200 hover:scale-[1.02] active:scale-[0.98]";

export function navLinkClass({
  active,
  scrolled,
}: {
  active: boolean;
  scrolled: boolean;
}) {
  return cn(
    navLinkBase,
    "text-sm font-medium after:absolute after:inset-x-1 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-opacity after:duration-200",
    active ? "after:opacity-100" : "after:opacity-0",
    scrolled || active
      ? cn(
          active ? "font-semibold text-jungle-700" : "text-jungle-800",
          "after:bg-jungle-600 hover:text-jungle-600",
        )
      : cn(
          active ? "font-semibold text-white" : "text-jungle-100",
          "after:bg-white/90 hover:text-white",
        ),
  );
}

export const textLinkClass =
  "cursor-pointer underline-offset-4 transition-[color,opacity,transform] duration-200 hover:underline active:scale-[0.98]";

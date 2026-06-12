import { cn } from "@/lib/utils";
import { interactivePress } from "@/lib/styles/interactive";

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

const variantStyles = {
  primary:
    "bg-jungle-700 text-white hover:bg-jungle-800 hover:shadow-md hover:shadow-jungle-900/15 shadow-sm shadow-jungle-900/10",
  secondary:
    "bg-sand-200 text-jungle-900 hover:bg-sand-100 border border-jungle-900/10 hover:shadow-sm",
  ghost: "bg-transparent text-jungle-800 hover:bg-jungle-100/60",
  outline:
    "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/50",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-6 py-3 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        interactivePress,
        "inline-flex items-center justify-center rounded-full font-medium hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jungle-600",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

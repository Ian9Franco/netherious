import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    // Layout base
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium select-none shrink-0",
    "transition-all duration-200 ease-out active:scale-95",
    "disabled:pointer-events-none disabled:opacity-60",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "text-balance leading-tight max-w-full overflow-hidden",
    // SVG size defaults
    "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[clamp(0.9rem,2.5vw,1.1rem)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/30",
        outline: "border border-input bg-background/60 hover:bg-accent hover:text-accent-foreground backdrop-blur-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
        ghost: "hover:bg-accent/40 hover:text-accent-foreground dark:hover:bg-accent/20",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-0",
        glassy:
          "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/15",
        download:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 hover:shadow-[0_0_20px_rgba(91,155,213,0.6)] transition-shadow",
        copy: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 hover:translate-y-[-2px] transition-transform",
      },
      size: {
        default: "h-[clamp(2.4rem,6vw,2.8rem)] px-[clamp(0.9rem,3vw,1.3rem)] text-[clamp(0.8rem,2vw,0.95rem)]",
        sm: "h-[clamp(2.1rem,5vw,2.4rem)] px-[clamp(0.7rem,2.5vw,1rem)] text-[clamp(0.75rem,1.8vw,0.9rem)]",
        lg: "h-[clamp(2.7rem,7vw,3.2rem)] px-[clamp(1.2rem,3.5vw,1.8rem)] text-[clamp(0.85rem,2vw,1rem)]",
        icon: "size-[clamp(2.4rem,6vw,2.8rem)] p-0",
        "icon-sm": "size-[clamp(2.1rem,5vw,2.4rem)] p-0",
        "icon-lg": "size-[clamp(2.7rem,7vw,3.2rem)] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  type = "button",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return <Comp type={type} data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { Button, buttonVariants }

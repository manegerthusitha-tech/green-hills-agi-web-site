import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, centered = true, className, light = false }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 
        className={cn(
          "font-outfit text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg max-w-2xl",
          centered && "mx-auto",
          light ? "text-white/80" : "text-muted-foreground"
        )}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        "h-1 w-20 bg-primary mt-6 rounded-full",
        centered && "mx-auto"
      )} />
    </div>
  );
}

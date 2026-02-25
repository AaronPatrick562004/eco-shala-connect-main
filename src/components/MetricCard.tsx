import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  variant?: "default" | "green" | "amber" | "red" | "sky";
}

const variantStyles = {
  default: "bg-card",
  green: "bg-eco-green-light",
  amber: "bg-eco-amber-light",
  red: "bg-eco-red-light",
  sky: "bg-eco-sky-light",
};

const iconVariantStyles = {
  default: "bg-muted text-foreground",
  green: "bg-eco-green/10 text-eco-green",
  amber: "bg-eco-amber/15 text-eco-amber",
  red: "bg-eco-red/10 text-eco-red",
  sky: "bg-eco-sky/10 text-eco-sky",
};

const MetricCard = ({ icon: Icon, label, value, change, changeType = "neutral", variant = "default" }: MetricCardProps) => {
  return (
    <div className={cn("rounded-xl p-5 shadow-card border border-border animate-slide-in", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconVariantStyles[variant])}>
          <Icon className="w-5 h-5" />
        </div>
        {change && (
          <span
            className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full",
              changeType === "positive" && "bg-eco-green/10 text-eco-green",
              changeType === "negative" && "bg-eco-red/10 text-eco-red",
              changeType === "neutral" && "bg-muted text-muted-foreground"
            )}
          >
            {change}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
};

export default MetricCard;

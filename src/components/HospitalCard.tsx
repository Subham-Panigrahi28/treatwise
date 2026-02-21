import type { RankedHospital } from "@/data/seed";
import { formatCurrency } from "@/lib/matching";
import { Badge } from "@/components/ui/badge";
import { Building2, IndianRupee, HeartPulse, ShieldCheck, Star } from "lucide-react";

interface HospitalCardProps {
  ranked: RankedHospital;
  rank: number;
  selected?: boolean;
  onSelect?: () => void;
}

export function HospitalCard({ ranked, rank, selected, onSelect }: HospitalCardProps) {
  const { hospital, procedure: hp, score, tags } = ranked;

  return (
    <div
      onClick={onSelect}
      className={`group relative cursor-pointer rounded-xl border-2 bg-card p-5 transition-all duration-200 hover:shadow-card-hover ${
        selected ? "border-primary shadow-card-hover" : "border-border shadow-card"
      } ${rank === 1 ? "ring-2 ring-accent/30" : ""}`}
    >
      {rank === 1 && (
        <div className="absolute -top-3 left-4 flex items-center gap-1 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-accent-foreground">
          <Star className="h-3 w-3" /> Top Recommendation
        </div>
      )}

      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <h3 className="font-display text-lg font-bold text-foreground">{hospital.name}</h3>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{hospital.city}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-display text-2xl font-bold text-primary">{score.toFixed(0)}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <IndianRupee className="h-3 w-3" /> Cost Range
          </div>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {formatCurrency(hp.costMin)} – {formatCurrency(hp.costMax)}
          </p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <HeartPulse className="h-3 w-3" /> Recovery Score
          </div>
          <p className="mt-1 text-sm font-semibold text-foreground">{hp.recoveryQualityScore}/100</p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3 w-3" /> Transparency
          </div>
          <p className="mt-1 text-sm font-semibold text-foreground">{hospital.transparencyScore}/100</p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3 w-3" /> Experience
          </div>
          <p className="mt-1 text-sm font-semibold text-foreground">{hp.experienceLevel}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={tag === "Best Value" ? "default" : "secondary"}
            className={tag === "Best Value" ? "bg-trust text-trust-foreground" : tag === "Fast Recovery" ? "bg-info text-info-foreground" : ""}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

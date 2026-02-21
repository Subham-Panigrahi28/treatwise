interface ConfidenceScoreProps {
  score: number;
  bullets: string[];
}

export function ConfidenceScore({ score, bullets }: ConfidenceScoreProps) {
  const color =
    score >= 80 ? "bg-trust" : score >= 60 ? "bg-warning" : "bg-destructive";
  const label =
    score >= 80 ? "High Confidence" : score >= 60 ? "Moderate Confidence" : "Low Confidence";

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h3 className="mb-4 font-display text-lg font-bold text-foreground">Decision Confidence</h3>

      <div className="mb-2 flex items-end gap-3">
        <span className="font-display text-5xl font-extrabold text-foreground">{score}</span>
        <span className="mb-1 text-lg text-muted-foreground">/ 100</span>
      </div>

      <div className="mb-1 h-3 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color} animate-score-fill`}
          style={{ "--score-width": `${score}%`, width: `${score}%` } as React.CSSProperties}
        />
      </div>
      <p className="mb-5 text-sm font-medium text-muted-foreground">{label}</p>

      <ul className="space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { procedures, hospitals, hospitalProcedures, type RankedHospital, type Procedure, type HospitalProcedure } from "@/data/seed";

export function detectProcedure(text: string): Procedure | null {
  const lower = text.toLowerCase();
  for (const proc of procedures) {
    for (const keyword of proc.keywords) {
      if (lower.includes(keyword)) return proc;
    }
  }
  return null;
}

function costAlignmentScore(hp: HospitalProcedure, proc: Procedure): number {
  const midHospital = (hp.costMin + hp.costMax) / 2;
  const midAvg = (proc.avgCostMin + proc.avgCostMax) / 2;
  const ratio = midHospital / midAvg;
  // Lower cost relative to average = higher score
  if (ratio <= 0.8) return 95;
  if (ratio <= 0.95) return 88;
  if (ratio <= 1.05) return 80;
  if (ratio <= 1.15) return 70;
  return 60;
}

export function rankHospitals(procedureId: string): RankedHospital[] {
  const proc = procedures.find((p) => p.id === procedureId);
  if (!proc) return [];

  const relevantHPs = hospitalProcedures.filter((hp) => hp.procedureId === procedureId);

  const ranked: RankedHospital[] = relevantHPs.map((hp) => {
    const hospital = hospitals.find((h) => h.id === hp.hospitalId)!;
    const costScore = costAlignmentScore(hp, proc);
    const score =
      hospital.specializationScore * 0.35 +
      costScore * 0.25 +
      hospital.transparencyScore * 0.2 +
      hp.recoveryQualityScore * 0.2;

    const tags: string[] = [];
    if (costScore >= 85) tags.push("Best Value");
    if (hp.recoveryQualityScore >= 90) tags.push("Fast Recovery");
    if (hospital.transparencyScore >= 90) tags.push("High Transparency");
    if (hp.experienceLevel === "Very High") tags.push("Most Experienced");

    const explanation = `${hospital.name} scores ${score.toFixed(1)} overall. Specialization: ${hospital.specializationScore}/100, Cost alignment: ${costScore}/100, Transparency: ${hospital.transparencyScore}/100, Recovery quality: ${hp.recoveryQualityScore}/100.`;

    return { hospital, procedure: hp, score, tags, explanation };
  });

  return ranked.sort((a, b) => b.score - a.score);
}

export function generateConfidence(rankings: RankedHospital[]): { score: number; bullets: string[] } {
  if (rankings.length === 0) return { score: 0, bullets: [] };

  const top = rankings[0];
  const second = rankings[1];
  const spread = top.score - (second?.score ?? 0);

  let score = 65;
  if (spread > 5) score += 15;
  else if (spread > 2) score += 8;
  if (top.tags.length >= 3) score += 10;
  if (top.procedure.experienceLevel === "Very High") score += 5;
  if (top.hospital.transparencyScore >= 88) score += 5;
  score = Math.min(score, 98);

  const bullets = [
    `${top.hospital.name} leads with a composite score of ${top.score.toFixed(1)}/100.`,
    spread > 3
      ? `Clear separation of ${spread.toFixed(1)} points from the next option increases confidence.`
      : `Close competition with ${second?.hospital.name} — consider visiting both.`,
    `Cost range ₹${(top.procedure.costMin / 1000).toFixed(0)}K–₹${(top.procedure.costMax / 1000).toFixed(0)}K is ${top.tags.includes("Best Value") ? "among the most competitive" : "within expected range"}.`,
    `Recovery quality rated ${top.procedure.recoveryQualityScore}/100 based on facility infrastructure and post-op care protocols.`,
    `${rankings.length} hospitals compared across 4 weighted dimensions for this recommendation.`,
  ];

  return { score, bullets };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

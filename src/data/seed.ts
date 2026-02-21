// Seed data for TreatWise - Pune hospitals and procedures

export interface Procedure {
  id: string;
  name: string;
  specialty: string;
  city: string;
  avgCostMin: number;
  avgCostMax: number;
  recoveryWeeks: number;
  description: string;
  keywords: string[];
  questions: string[];
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  specializationScore: number;
  transparencyScore: number;
}

export interface HospitalProcedure {
  hospitalId: string;
  procedureId: string;
  costMin: number;
  costMax: number;
  experienceLevel: "High" | "Very High" | "Moderate";
  recoveryQualityScore: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface DecisionFile {
  id: string;
  userId: string;
  procedureId: string;
  confidenceScore: number;
  hospitalRankings: RankedHospital[];
  createdAt: string;
}

export interface PatientInsight {
  procedureId: string;
  ageGroup: string;
  avgCost: number;
  recoveryWeeks: number;
  satisfactionScore: number;
  commonHospitalType: string;
}

export interface Lead {
  id: string;
  userId: string;
  hospitalId: string;
  procedureId: string;
  confidenceScore: number;
  leadStage: "new" | "reviewing" | "contacted" | "converted";
  createdAt: string;
}

export interface RankedHospital {
  hospital: Hospital;
  procedure: HospitalProcedure;
  score: number;
  tags: string[];
  explanation: string;
}

export const procedures: Procedure[] = [
  {
    id: "proc-1",
    name: "Knee Replacement Surgery",
    specialty: "Orthopedics",
    city: "Pune",
    avgCostMin: 250000,
    avgCostMax: 500000,
    recoveryWeeks: 12,
    description: "Total knee replacement (arthroplasty) involves resurfacing a knee damaged by arthritis or injury. Metal and plastic parts are used to cap the ends of the bones that form the knee joint, along with the kneecap.",
    keywords: ["knee", "replacement", "arthroplasty", "joint", "orthopedic", "tkr"],
    questions: [
      "What type of implant do you recommend, and what is its expected lifespan?",
      "How many knee replacements does your surgeon perform annually?",
      "What is the post-operative physiotherapy protocol at your facility?",
      "What are the infection rates for this procedure at your hospital?",
      "Is robotic-assisted surgery available, and does it improve outcomes?",
    ],
  },
  {
    id: "proc-2",
    name: "Cataract Surgery",
    specialty: "Ophthalmology",
    city: "Pune",
    avgCostMin: 25000,
    avgCostMax: 90000,
    recoveryWeeks: 4,
    description: "Cataract surgery removes the clouded natural lens of the eye and replaces it with an artificial intraocular lens (IOL). It is one of the most common and safest surgical procedures performed worldwide.",
    keywords: ["cataract", "eye", "lens", "phaco", "iol", "ophthalmology", "vision"],
    questions: [
      "What type of intraocular lens (IOL) do you recommend for my condition?",
      "Is this a phacoemulsification or manual procedure?",
      "What is the expected visual recovery timeline?",
      "How do you handle complications like posterior capsule opacification?",
      "What are your surgeon's success rates for cataract procedures?",
    ],
  },
  {
    id: "proc-3",
    name: "Angioplasty",
    specialty: "Cardiology",
    city: "Pune",
    avgCostMin: 200000,
    avgCostMax: 450000,
    recoveryWeeks: 6,
    description: "Coronary angioplasty is a procedure used to open clogged heart arteries. A tiny balloon catheter is inserted in a blocked blood vessel to help widen it and improve blood flow to the heart. Often combined with stent placement.",
    keywords: ["angioplasty", "heart", "stent", "cardiac", "coronary", "artery", "cardiology", "ptca"],
    questions: [
      "What type of stent will be used — bare-metal or drug-eluting?",
      "What is the success rate for angioplasty at your hospital?",
      "How long will I need dual antiplatelet therapy after the procedure?",
      "What cardiac rehabilitation program do you offer post-procedure?",
      "What are the chances of re-stenosis, and how do you monitor for it?",
    ],
  },
];

export const hospitals: Hospital[] = [
  { id: "hosp-1", name: "Ruby Hall Clinic", city: "Pune", specializationScore: 92, transparencyScore: 88 },
  { id: "hosp-2", name: "Sahyadri Hospital", city: "Pune", specializationScore: 89, transparencyScore: 85 },
  { id: "hosp-3", name: "Jehangir Hospital", city: "Pune", specializationScore: 90, transparencyScore: 90 },
  { id: "hosp-4", name: "Deenanath Mangeshkar Hospital", city: "Pune", specializationScore: 87, transparencyScore: 92 },
  { id: "hosp-5", name: "Manipal Hospital Pune", city: "Pune", specializationScore: 85, transparencyScore: 83 },
];

export const hospitalProcedures: HospitalProcedure[] = [
  // Knee Replacement
  { hospitalId: "hosp-1", procedureId: "proc-1", costMin: 300000, costMax: 480000, experienceLevel: "Very High", recoveryQualityScore: 90 },
  { hospitalId: "hosp-2", procedureId: "proc-1", costMin: 270000, costMax: 420000, experienceLevel: "High", recoveryQualityScore: 85 },
  { hospitalId: "hosp-3", procedureId: "proc-1", costMin: 320000, costMax: 500000, experienceLevel: "Very High", recoveryQualityScore: 92 },
  { hospitalId: "hosp-4", procedureId: "proc-1", costMin: 250000, costMax: 380000, experienceLevel: "High", recoveryQualityScore: 88 },
  { hospitalId: "hosp-5", procedureId: "proc-1", costMin: 260000, costMax: 400000, experienceLevel: "Moderate", recoveryQualityScore: 80 },
  // Cataract
  { hospitalId: "hosp-1", procedureId: "proc-2", costMin: 35000, costMax: 85000, experienceLevel: "Very High", recoveryQualityScore: 93 },
  { hospitalId: "hosp-2", procedureId: "proc-2", costMin: 28000, costMax: 70000, experienceLevel: "High", recoveryQualityScore: 88 },
  { hospitalId: "hosp-3", procedureId: "proc-2", costMin: 40000, costMax: 90000, experienceLevel: "Very High", recoveryQualityScore: 91 },
  { hospitalId: "hosp-4", procedureId: "proc-2", costMin: 25000, costMax: 65000, experienceLevel: "High", recoveryQualityScore: 86 },
  { hospitalId: "hosp-5", procedureId: "proc-2", costMin: 30000, costMax: 75000, experienceLevel: "Moderate", recoveryQualityScore: 82 },
  // Angioplasty
  { hospitalId: "hosp-1", procedureId: "proc-3", costMin: 220000, costMax: 430000, experienceLevel: "Very High", recoveryQualityScore: 91 },
  { hospitalId: "hosp-2", procedureId: "proc-3", costMin: 200000, costMax: 380000, experienceLevel: "High", recoveryQualityScore: 87 },
  { hospitalId: "hosp-3", procedureId: "proc-3", costMin: 250000, costMax: 450000, experienceLevel: "Very High", recoveryQualityScore: 93 },
  { hospitalId: "hosp-4", procedureId: "proc-3", costMin: 210000, costMax: 370000, experienceLevel: "High", recoveryQualityScore: 85 },
  { hospitalId: "hosp-5", procedureId: "proc-3", costMin: 230000, costMax: 410000, experienceLevel: "Moderate", recoveryQualityScore: 80 },
];

export const patientInsights: PatientInsight[] = [
  // Knee Replacement
  { procedureId: "proc-1", ageGroup: "50-60", avgCost: 350000, recoveryWeeks: 14, satisfactionScore: 82, commonHospitalType: "Multi-specialty" },
  { procedureId: "proc-1", ageGroup: "60-70", avgCost: 380000, recoveryWeeks: 16, satisfactionScore: 78, commonHospitalType: "Orthopedic Center" },
  { procedureId: "proc-1", ageGroup: "40-50", avgCost: 320000, recoveryWeeks: 10, satisfactionScore: 88, commonHospitalType: "Multi-specialty" },
  // Cataract
  { procedureId: "proc-2", ageGroup: "50-60", avgCost: 45000, recoveryWeeks: 3, satisfactionScore: 91, commonHospitalType: "Eye Hospital" },
  { procedureId: "proc-2", ageGroup: "60-70", avgCost: 55000, recoveryWeeks: 4, satisfactionScore: 87, commonHospitalType: "Multi-specialty" },
  { procedureId: "proc-2", ageGroup: "70+", avgCost: 60000, recoveryWeeks: 5, satisfactionScore: 84, commonHospitalType: "Eye Hospital" },
  // Angioplasty
  { procedureId: "proc-3", ageGroup: "50-60", avgCost: 310000, recoveryWeeks: 5, satisfactionScore: 85, commonHospitalType: "Cardiac Center" },
  { procedureId: "proc-3", ageGroup: "60-70", avgCost: 340000, recoveryWeeks: 7, satisfactionScore: 80, commonHospitalType: "Multi-specialty" },
  { procedureId: "proc-3", ageGroup: "40-50", avgCost: 280000, recoveryWeeks: 4, satisfactionScore: 90, commonHospitalType: "Cardiac Center" },
];

export const samplePrescriptionText = `
Patient Name: Rahul Sharma
Date: 15/01/2025
Dr. Anil Patil, MS Ortho
Ruby Hall Clinic, Pune

Diagnosis: Severe Osteoarthritis - Right Knee (Grade IV)
Recommended: Total Knee Replacement Surgery (TKR)

Medications:
- Tab. Aceclofenac 100mg BD
- Cap. Diacerein 50mg BD
- Tab. Calcium + Vitamin D3 OD

Advised: Pre-operative blood work, ECG, chest X-ray
Follow up in 1 week with reports.
`;

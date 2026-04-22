export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  description: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  website: string;
  email?: string;
  hours: string;
  languages: string[];
  statusEligibility: string[];
  services: string[];
  regions: string[];
  urgencySupport: boolean;
}

export type ResourceType =
  | "legal_aid"
  | "settlement"
  | "housing"
  | "mental_health"
  | "employment"
  | "education"
  | "community"
  | "womens_services"
  | "pro_bono";

export type ImmigrationStatus =
  | "refugee_claimant"
  | "protected_person"
  | "permanent_resident"
  | "work_permit"
  | "study_permit"
  | "visitor"
  | "undocumented"
  | "other";

export type BCRegion =
  | "vancouver"
  | "surrey"
  | "burnaby"
  | "richmond"
  | "north_shore"
  | "tri_cities"
  | "fraser_valley"
  | "victoria"
  | "kelowna"
  | "prince_george"
  | "province_wide";

export interface IntakeData {
  situation: string;
  location: BCRegion;
  status: ImmigrationStatus;
  language: string;
  urgency: "immediate" | "this_week" | "this_month" | "general_info";
}

export interface GuidanceResponse {
  situationSummary: string;
  rightsExplained: string;
  recommendedResources: RecommendedResource[];
  nextSteps: string[];
  disclaimer: string;
}

export interface RecommendedResource {
  resourceId: string;
  relevanceReason: string;
  urgencyNote?: string;
}

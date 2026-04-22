import resourcesData from "@/data/resources.json";
import type { Resource, ResourceType, BCRegion } from "./types";

export const resources: Resource[] = resourcesData as Resource[];

export function getResourceById(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}

export function filterResources(filters: {
  type?: ResourceType;
  city?: string;
  language?: string;
  status?: string;
  region?: BCRegion;
}): Resource[] {
  return resources.filter((r) => {
    if (filters.type && r.type !== filters.type) return false;
    if (
      filters.city &&
      !r.city.toLowerCase().includes(filters.city.toLowerCase())
    )
      return false;
    if (
      filters.language &&
      filters.language !== "English" &&
      !r.languages.some((l) =>
        l.toLowerCase().includes(filters.language!.toLowerCase())
      )
    )
      return false;
    if (
      filters.status &&
      filters.status !== "all" &&
      !r.statusEligibility.includes("all") &&
      !r.statusEligibility.includes(filters.status)
    )
      return false;
    if (
      filters.region &&
      filters.region !== "province_wide" &&
      !r.regions.includes(filters.region) &&
      !r.regions.includes("province_wide")
    )
      return false;
    return true;
  });
}

export const resourceTypeLabels: Record<ResourceType, string> = {
  legal_aid: "Legal Aid",
  settlement: "Settlement Services",
  housing: "Housing",
  mental_health: "Mental Health",
  employment: "Employment",
  education: "Education & Language",
  community: "Community Support",
  womens_services: "Women's Services",
  pro_bono: "Pro Bono Legal",
};

export const resourceTypeColors: Record<ResourceType, string> = {
  legal_aid: "bg-teal-100 text-teal-800",
  settlement: "bg-blue-100 text-blue-800",
  housing: "bg-orange-100 text-orange-800",
  mental_health: "bg-purple-100 text-purple-800",
  employment: "bg-green-100 text-green-800",
  education: "bg-yellow-100 text-yellow-800",
  community: "bg-pink-100 text-pink-800",
  womens_services: "bg-rose-100 text-rose-800",
  pro_bono: "bg-indigo-100 text-indigo-800",
};

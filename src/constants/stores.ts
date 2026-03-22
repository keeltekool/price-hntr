import type { StoreId } from "../lib/alkoholiks-sdk";

export interface StoreConfig {
  id: StoreId;
  name: string;
  color: string;
  logoPath: string;
}

export const STORES: Record<StoreId, StoreConfig> = {
  selver: { id: "selver", name: "Selver", color: "#007A3D", logoPath: "/logos/selver.svg" },
  prisma: { id: "prisma", name: "Prisma", color: "#0051A5", logoPath: "/logos/prisma.svg" },
  rimi: { id: "rimi", name: "Rimi", color: "#D52B1E", logoPath: "/logos/rimi.svg" },
  barbora: { id: "barbora", name: "Barbora", color: "#FF6900", logoPath: "/logos/barbora.svg" },
  cityalko: { id: "cityalko", name: "Cityalko", color: "#6B3A2A", logoPath: "/logos/cityalko.svg" },
};

export const STORE_ORDER: StoreId[] = ["selver", "prisma", "rimi", "barbora", "cityalko"];

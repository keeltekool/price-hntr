import { AlkoholiksAPI } from "./alkoholiks-sdk";

const clientId = import.meta.env.VITE_ALK_CLIENT_ID;
const clientSecret = import.meta.env.VITE_ALK_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("Missing VITE_ALK_CLIENT_ID or VITE_ALK_CLIENT_SECRET in .env.local");
}

// Use /api for both dev (Vite proxy) and prod (Vercel rewrites)
export const api = new AlkoholiksAPI({
  clientId: clientId || "",
  clientSecret: clientSecret || "",
  baseUrl: "/api",
});

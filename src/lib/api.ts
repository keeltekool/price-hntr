import { AlkoholiksAPI } from "./alkoholiks-sdk";

const clientId = import.meta.env.VITE_ALK_CLIENT_ID;
const clientSecret = import.meta.env.VITE_ALK_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("Missing VITE_ALK_CLIENT_ID or VITE_ALK_CLIENT_SECRET in .env.local");
}

// In dev, use Vite proxy (/api) to avoid CORS. In prod, hit the API directly.
const baseUrl = import.meta.env.DEV
  ? "/api"
  : "https://alkoholiks-api.vercel.app/api";

export const api = new AlkoholiksAPI({
  clientId: clientId || "",
  clientSecret: clientSecret || "",
  baseUrl,
});

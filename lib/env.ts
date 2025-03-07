import { cleanEnv, str, url } from "npm:envalid";

const envVars = {
  NODE_ENV: "production",
  PLAUSIBLE_SITE_ID: "knotbin.xyz",
  PLAUSIBLE_DOMAIN: "https://plausible.knotbin.xyz",
  PLAUSIBLE_API_KEY: "",
  NEXT_PUBLIC_BSKY_DID: "did:plc:6hbqm2oftpotwuw7gvvrui3i",
  NEXT_PUBLIC_BSKY_PDS: "https://puffball.us-east.host.bsky.network",
};

// Use cleanEnv to validate and parse the environment variables
export const env = cleanEnv(envVars, {
  NODE_ENV: str({
    choices: ["development", "production"],
    default: "production",
    devDefault: "development",
  }),
  PLAUSIBLE_SITE_ID: str({ default: "knotbin.xyz" }),
  PLAUSIBLE_DOMAIN: url({ default: "https://plausible.knotbin.xyz" }),
  PLAUSIBLE_API_KEY: str({ default: "" }),
  NEXT_PUBLIC_BSKY_DID: str({ default: "did:plc:6hbqm2oftpotwuw7gvvrui3i" }),
  NEXT_PUBLIC_BSKY_PDS: url({
    default: "https://puffball.us-east.host.bsky.network",
  }),
});

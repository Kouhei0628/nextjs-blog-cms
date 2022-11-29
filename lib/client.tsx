import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "nextjsblog06",
  apiKey: process.env.API_KEY || "",
});

if (!process.env.API_KEY) {
  throw new Error("Cannot found API_KEY");
}

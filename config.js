const dev = process.env.NODE_ENV !== "production";

export const getServer = dev
  ? "http://localhost:3000"
  : "http://getpillspharmacy.com";

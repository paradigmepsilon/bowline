// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// `site` drives canonical URLs, Open Graph URLs, and sitemap entries.
// Update this to the production domain once it is registered (see README).
export default defineConfig({
  site: "https://www.bowlinefederal.com",
  output: "static",
  trailingSlash: "ignore",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

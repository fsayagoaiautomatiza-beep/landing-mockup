/** @type {import('tailwindcss').Config} */
export default {
  // En Tailwind v4, solo necesitamos especificar el content
  // La configuración del tema se hace en CSS usando @theme
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
};

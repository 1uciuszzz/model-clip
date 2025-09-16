import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/model-clip/",
  plugins: [react()],
  server: {
    host: true,
    port: 3030,
    open: true,
  },
  assetsInclude: ["./src/assets/**/*"],
});

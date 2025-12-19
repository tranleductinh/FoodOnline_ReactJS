import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate", // Tự động cập nhật khi có nội dung mới
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Food Order",
        short_name: "FO",
        description: "Siêu cấp đặc biệt",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png", // Bạn phải chuẩn bị icon này trong thư mục public
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png", // Bạn phải chuẩn bị icon này trong thư mục public
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

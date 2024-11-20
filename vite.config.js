import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        imageUploader: "./pages/image_uploades/index.html",
        checkoutPage: "./pages/image_uploades/chckout_page.html",
      },
    },
  },
});

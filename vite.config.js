import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        imageUploader: "./pages/image_uploader/index.html",
        checkoutPage: "./pages/checkout_page/checkout_page.html",
      },
    },
  },
});

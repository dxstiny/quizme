/*
 * Copyright (c) 2023, dxstiny.
 * Licenced under the GNU General Public License v3.0
 */

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "QuizMe",
                short_name: "QuizMe",
                icons: [
                    {
                        src: "/quizme/favicon.png",
                        sizes: "512x512"
                    }
                ],
                start_url: "/quizme/",
                display: "standalone",
                description: "QuizMe is a free, open-source learning platform"
            }
        })
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },
    base: "/quizme/"
});

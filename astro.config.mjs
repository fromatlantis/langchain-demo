import { defineConfig } from 'astro/config';
import node from "@astrojs/node";

import solid from "@astrojs/solid-js";
import UnoCSS from 'unocss/astro';

import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [
    UnoCSS(),
    solid(),
    AstroPWA({
        base: '/',
        scope: '/',
        includeAssets: ['favicon.svg', 'sam/sam_onnx_quantized_example.onnx'],
        registerType: 'autoUpdate',
        manifest: {
            name: 'Idou',
            lang: 'zh-cn',
            short_name: 'Idou',
            background_color: '#f6f8fa',
            icons: [
                {
                    src: '192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: '256.png',
                    sizes: '256x256',
                    type: 'image/png',
                },
                {
                    src: '512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: 'apple-touch-icon.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
            ],
        },
        disable: !!process.env.NETLIFY,
        workbox: {
            navigateFallback: '/lost',
            globPatterns: ['**/*.{css,js,html,svg,png,jpeg,ico,txt,wasm,onnx}'],
            maximumFileSizeToCacheInBytes: 12 * 1024 * 1024,
        },
        devOptions: {
            enabled: true,
            navigateFallbackAllowlist: [/^\/lost$/],
        },
    }),
  ]
});
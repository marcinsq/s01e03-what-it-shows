import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { mdsvex } from 'mdsvex';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		sveltekit({
			extensions: ['.svelte', '.svx'],
			preprocess: [
				vitePreprocess(),
				mdsvex({
					extensions: ['.svx'],
					layout: {
						runbook: path.join(root, 'src/lib/layouts/runbook.svelte')
					},
					layoutPropForwarding: 'runes'
				})
			],
			adapter: adapter({
				pages: 'rendered/site',
				assets: 'rendered/site'
			}),
		})
	]
});
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
	resolve: {
		alias: {
			'three/addons': 'three/examples/jsm',
			// Remove or alter 'three/tsl' if needed
			// 'three/tsl': 'three/examples/jsm/nodes'
		}
	},
	plugins: [
		topLevelAwait({
			promiseExportName: "__tla",
			promiseImportName: (i) => `__tla_${i}`
		}),

	],
	server: {
		port: 5173,
	}
});
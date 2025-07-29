import { tanstackConfig } from '@tanstack/eslint-config';
import pluginRouter from '@tanstack/eslint-plugin-router';
import pluginQuery from '@tanstack/eslint-plugin-query';
import type { Linter } from 'eslint';

const config: Array<Linter.Config> = [
	{
		// Global ignores - these apply to all configurations
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'**/build/**',
			'**/.output/**',
			'**/.vinxi/**',
			'**/public/_build/**',
			'**/*.min.js',
			'**/*.bundle.js',
			'**/coverage/**',
			'**/.next/**',
			'**/.nuxt/**',
			'**/.turbo/**',
			'**/.nitro/**',
			'src/routeTree.gen.ts',
		],
	},
	...tanstackConfig,
	{
		// Custom rules and overrides
		rules: {
			'prefer-const': 'error',
			// Remove TypeScript-specific rules if they're already in tanstackConfig
		},
	},
	// TanStack Router configuration
	...(pluginRouter.configs?.['flat/recommended'] || []),
	{
		plugins: {
			'@tanstack/router': pluginRouter,
		},
		rules: {
			'@tanstack/router/create-route-property-order': 'error',
			// Only use rules that actually exist in the plugin
		},
	},
	// TanStack Query configuration
	...(pluginQuery.configs?.['flat/recommended'] || []),
	{
		plugins: {
			'@tanstack/query': pluginQuery,
		},
		rules: {
			'@tanstack/query/exhaustive-deps': 'error',
			'@tanstack/query/stable-query-client': 'error',
			// Only use rules that actually exist in the plugin
		},
	},
	{
		// File-specific overrides
		files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
		rules: {
			'no-console': 'off', // Allow console in tests
			'@typescript-eslint/no-explicit-any': 'off', // More lenient in tests
		},
	},
	{
		rules: {
			'@typescript-eslint/array-type': [
				'error',
				{
					default: 'generic',
					readonly: 'generic',
				},
			],
		},
	},
	{
		// Configuration files
		files: [
			'**/*.config.ts',
			'**/*.config.js',
			'vite.config.ts',
			'vitest.config.ts',
		],
		rules: {
			'no-console': 'off',
			'@typescript-eslint/no-var-requires': 'off',
		},
	},
];

export default config;

// types.d.ts
declare module '@tanstack/eslint-config' {
	import type { Linter } from 'eslint';

	export const tanstackConfig: Array<Linter.Config>;
}

declare module '@tanstack/eslint-plugin-query' {
	import type { ESLint } from 'eslint';

	const plugin: ESLint.Plugin & {
		configs?: {
			'flat/recommended'?: Array<Linter.Config>;
			recommended?: Array<Linter.Config>;
		};
	};
	export default plugin;
}

declare module '@tanstack/eslint-plugin-router' {
	import type { ESLint } from 'eslint';

	const plugin: ESLint.Plugin & {
		configs?: {
			'flat/recommended'?: Array<Linter.Config>;
			recommended?: Array<Linter.Config>;
		};
	};
	export default plugin;
}

declare module '@typescript-eslint/eslint-plugin' {
	import type { ESLint } from 'eslint';

	const plugin: ESLint.Plugin;
	export default plugin;
}

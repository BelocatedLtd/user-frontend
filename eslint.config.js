import { fixupConfigRules } from '@eslint/compat';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin'; // Corrected import for typescript-eslint plugin
import parser from '@typescript-eslint/parser'; // Ensure to include the parser
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';

export default [
	{
		languageOptions: { globals: globals.browser },
	},
	pluginJs.configs.recommended,
	{
		languageOptions: {
			parser: parser,
		},
		...tseslint.configs.recommended,
		rules: {
			'@typescript-eslint/no-unused-vars': 'off', // Disabling the no-unused-vars rule
		},
	},
	...fixupConfigRules(pluginReactConfig),
]

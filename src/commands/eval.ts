import { getText, replace } from '../utils/text';

export function evaluate() {
	const text = getText();

	if (text === '') {
		return;
	}

	// Indirect eval for esbuild
	const output = (0, eval)(text);
	if (output) {
		replace(output);
	}
}

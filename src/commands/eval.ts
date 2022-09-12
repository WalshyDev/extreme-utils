import { getText, replace } from '../utils/text';

export function evaluate() {
	const text = getText();

	if (text === '') {
		return;
	}

	const output = eval(text);
	if (output) {
		replace(output);
	}
}

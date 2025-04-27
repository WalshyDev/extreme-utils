import { getText, replace } from '../utils/text';

export function toBase64() {
	const text = getText();
	if (text === '') {
		return;
	}

	replace(Buffer.from(text).toString('base64'));
}

export function fromBase64() {
	const text = getText();
	if (text === '') {
		return;
	}

	replace(Buffer.from(text, 'base64').toString('ascii'));
}

export function toHex() {
	const text = getText();
	if (text === '') {
		return;
	}

	replace(Buffer.from(text).toString('hex'));
}

export function fromHex() {
	const text = getText();
	if (text === '') {
		return;
	}

	replace(Buffer.from(text, 'hex').toString());
}

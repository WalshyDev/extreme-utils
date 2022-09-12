import { getText, replaceSelection } from '../utils/text';

export function encode() {
	const text = getText();

	replaceSelection(encodeURI(text));
}

export function encodePart() {
	const text = getText();

	replaceSelection(encodeURIComponent(text));
}

export function decode() {
	const text = getText();

	replaceSelection(decodeURI(text));
}

export function decodePart() {
	const text = getText();

	replaceSelection(decodeURIComponent(text));
}

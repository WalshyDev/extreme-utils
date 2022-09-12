import { window } from 'vscode';
import { getText, replace } from '../utils/text';

export function prettifyJSON() {
	const text = getText();
	if (text === '') {
		return;
	}

	try {
		const obj = JSON.parse(text);
		replace(JSON.stringify(obj, null, 4));
	} catch(e) {
		window.showWarningMessage('Invalid JSON!');
	}
}

export function minifyJSON() {
	const text = getText();
	if (text === '') {
		return;
	}

	try {
		const obj = JSON.parse(text);
		replace(JSON.stringify(obj));
	} catch(e) {
		window.showWarningMessage('Invalid JSON!');
	}
}

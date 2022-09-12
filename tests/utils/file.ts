import { readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import path = require('path');
import * as vscode from 'vscode';

const TMP_PREFIX = path.resolve(__dirname, 'test.tmp.');

export async function openFile(text: string) {
	const file = TMP_PREFIX + Date.now();

	writeFileSync(file, text);

	const openPath = vscode.Uri.file(file);
	return await openFileInVSCode(openPath);
}

export function openFileInVSCode(uri: vscode.Uri): Promise<vscode.TextEditor> {
	return new Promise((resolve) => {
		vscode.workspace.openTextDocument(uri).then(doc => {
			vscode.window.showTextDocument(doc).then(editor => {
				resolve(editor);
			});
		});
	});
}

export function cleanupFiles() {
	// Remove any files created
	for (const file of readdirSync(__dirname)) {
		if (file.startsWith(TMP_PREFIX)) {
			rmSync(file);
		}
	}

	// Close any tabs created
	const tabGroups = vscode.window.tabGroups;
	for (const tab of tabGroups.activeTabGroup.tabs) {
		tabGroups.close(tab);
	}
}

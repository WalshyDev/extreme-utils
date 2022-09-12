import * as vscode from 'vscode';

export function getText(): string {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return '';
	}

	const activeSelection = editor.document.getText(editor.selection);
	if (activeSelection !== '') {
		return activeSelection;
	}

	return editor.document.getText();
}

export function replace(text: string) {
	const editor = vscode.window.activeTextEditor;
	
	if (!editor) {
		return;
	}

	let selection = editor.selection;
	if (selection.isEmpty) {
		const start = new vscode.Position(0, 0);
		// lineCount returns a non-0 index but lineAt expects 0 indexed. Sooo we -1
		const end = editor.document.lineAt(editor.document.lineCount - 1).range.end;
		selection = new vscode.Selection(start, end);
	}

	editor.edit(builder => {
		builder.replace(selection, text);

		// TODO: Figure out how to reset the selection so it doesn't half-select the changed text
	});
}

export function replaceSelection(text: string) {
	const editor = vscode.window.activeTextEditor;

	if (!editor || editor.selection.isEmpty) {
		return;
	}

	editor.edit(builder => {
		builder.replace(editor.selection, text);
	});
}

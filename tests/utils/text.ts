import * as vscode from 'vscode';
import * as assert from 'assert';

export function selectAll() {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		assert.fail('No editor open!');
	}

	const start = new vscode.Position(0, 0);
	// lineCount returns a non-0 index but lineAt expects 0 indexed. Sooo we -1
	const end = editor.document.lineAt(editor.document.lineCount - 1).range.end;
	const selection = new vscode.Selection(start, end);

	editor.selection = selection;
}

export function selectText(text: string) {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		assert.fail('No editor open!');
	}
	
	// This is jank as fuck, there has to be a better way... right?
	// Select all the text
	selectAll();
	// Grab the text
	const allText = editor.document.getText(editor.selection);

	// Get the starting index the text what we're looking for
	const idxStart = allText.indexOf(text);
	// Get the end index, this gives us the full selection range
	const idxEnd = idxStart + text.length;

	// Now make the selection
	const selection = new vscode.Selection(editor.document.positionAt(idxStart), editor.document.positionAt(idxEnd));

	// And finally select it
	editor.selection = selection;
}

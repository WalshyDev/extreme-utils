import * as vscode from 'vscode';
import { inputboxValdiationToMessage } from './mapping';

export function getSelectedText(): string | null {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return null;
	}
	const activeSelection = editor.document.getText(editor.selection);
	if (activeSelection === '') {
		return null;
	}
	return activeSelection;
}

export function getText(): string {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return '';
	}

	const activeSelection = getSelectedText();
	if (activeSelection !== null) {
		return activeSelection;
	}

	return editor.document.getText();
}

interface SelectionOrInputOptions {
	title: string;
	prompt?: string;
	placeholder?: string;
	validate: (str: string) => null | vscode.InputBoxValidationMessage;
}

export async function getSelectionOrInput({ title, prompt, placeholder, validate }: SelectionOrInputOptions): Promise<string | null> {
	const selectedText = getSelectedText();
	if (selectedText !== null) {
		const validation = validate(selectedText);

		if (validation !== null) {
			inputboxValdiationToMessage(validation);
			return null;
		}

		return selectedText;
	}

	const input = await vscode.window.showInputBox({
		title,
		prompt,
		placeHolder: placeholder,
		validateInput: validate,
	});

	return input ? input : null;
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

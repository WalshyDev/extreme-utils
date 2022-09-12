import * as vscode from 'vscode';

export function runCommand(cmd: string): Promise<void> {
	return new Promise((resolve) => {
		vscode.commands.executeCommand(`extreme-utils.${cmd}`).then(() => {
			resolve(void 0);
		});
	});
}

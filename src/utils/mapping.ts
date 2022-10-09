import { InputBoxValidationMessage, InputBoxValidationSeverity, window } from 'vscode';

export function inputboxValdiationToMessage(validation: InputBoxValidationMessage): void {
	if (validation.severity === InputBoxValidationSeverity.Info) {
		window.showInformationMessage(validation.message);
	} else if (validation.severity === InputBoxValidationSeverity.Warning) {
		window.showWarningMessage(validation.message);
	} else {
		window.showErrorMessage(validation.message);
	}
}

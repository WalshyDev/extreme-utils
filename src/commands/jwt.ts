import * as vscode from 'vscode';
import * as jose from 'jose';
import { getSelectionOrInput } from '../utils/text';

const jwtRegex = /^[a-zA-Z0-9+\/_+=-]+(\.[a-zA-Z0-9+\/_+=-]+){1,2}$/g;

export async function verify() {
	let jwt = await getSelectionOrInput({
		title: 'Input JWT',
		prompt: 'JWT formatted as (header).<payload>.<signature>',
		placeholder: 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhlbGxvIFdvcmxkIiwiaWF0IjowfQ.3m2dRV8kuI2LM_w0czBqq-rOUQGSzITL7d3FeT7LGDY',
		validate: (str) => jwtRegex.test(str)
			? null
			: { message: 'Invalid JWT', severity: vscode.InputBoxValidationSeverity.Error },
	});

	if (jwt === null) {
		return;
	}

	const secret = await vscode.window.showInputBox({
		title: 'Input secret',
		prompt: 'Input your JWT secret used for signing the payload',
		placeHolder: 'secret',
		validateInput: (str) => str.length > 0 ? null : { message: 'Invalid secret', severity: vscode.InputBoxValidationSeverity.Error},
	});

	if (!secret) {
		return null;
	}

	// If there is no header then ask for the algo and append it on the start so jose can parse.
	const parts = jwt.split('.');
	if (parts.length === 2) {
		const algo = await vscode.window.showQuickPick([
			'HS256',
			'HS384',
			'HS512',
			'PS256',
			'PS384',
			'PS512',
			'RS256',
			'RS384',
			'RS512',
			'ES256',
			'ES256K',
			'ES384',
			'ES512',
			'EdDSA',
		], {
			title: 'Input secret',
			placeHolder: 'HS256',
		});

		if (!algo) {
			return;
		}

		const header = { alg: algo, typ: 'JWT' };
		jwt = Buffer.from(JSON.stringify(header)).toString('base64') + '.' + jwt;
	}

	try {
		await jose.jwtVerify(jwt, Buffer.from(secret));

		vscode.window.showInformationMessage('JWT is valid :)');
	} catch(e) {
		// @ts-ignore
		if (e.code && e.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
			vscode.window.showWarningMessage('Could not verify JWT!');
			return;
		}

		console.error(e);
		// @ts-ignore
		vscode.window.showErrorMessage('Failed to verify JWT: ' + (e.message ? e.message : e.code));
	}
}

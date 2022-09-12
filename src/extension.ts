import * as vscode from 'vscode';
import { encode, encodePart, decode, decodePart } from './commands/url';
import { md5, sha1, sha256, sha384, sha512 } from './commands/hash';
import { fromBase64, toBase64 } from './commands/encode';
import { evaluate } from './commands/eval';
import { minifyJSON, prettifyJSON } from './commands/format';

export function activate(ctx: vscode.ExtensionContext) {
	registerCommand(ctx, 'urlEncode', encode);
	registerCommand(ctx, 'urlDecode', decode);
	registerCommand(ctx, 'urlEncodePart', encodePart);
	registerCommand(ctx, 'urlDecodePart', decodePart);

	registerCommand(ctx, 'md5', md5);
	registerCommand(ctx, 'sha1', sha1);
	registerCommand(ctx, 'sha256', sha256);
	registerCommand(ctx, 'sha384', sha384);
	registerCommand(ctx, 'sha512', sha512);

	registerCommand(ctx, 'toBase64', toBase64);
	registerCommand(ctx, 'fromBase64', fromBase64);

	registerCommand(ctx, 'eval', evaluate);

	registerCommand(ctx, 'prettifyJson', prettifyJSON);
	registerCommand(ctx, 'minifyJson', minifyJSON);
}

function registerCommand(ctx: vscode.ExtensionContext, cmd: string, func: () => void) {
	ctx.subscriptions.push(vscode.commands.registerCommand(`extreme-utils.${cmd}`, func));
}

export function deactivate() {}

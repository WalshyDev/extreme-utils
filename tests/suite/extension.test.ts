import * as assert from 'assert';
import { afterEach, describe } from 'mocha';
import * as vscode from 'vscode';
import { getText } from '../../src/utils/text';
import { runCommand } from '../utils/cmd';
import { cleanupFiles, openFile } from '../utils/file';
import { sleep } from '../utils/sleep';
import { selectAll, selectText } from '../utils/text';

// TODO:
// 1. Split into multiple files
// 2. Try and fix this race condition in a better way
// 3. Fix eval

async function stupidRaceCondition() {
	// VSCode is stupid and doesn't use promises.
	// This makes dealing with async ops a pain.
	// The editing can sometimes cause a race condition so let's just wait 25ms
	// 
	// this "thenify" syntax is bad... I can't await and trying to make this work nicely is just not possible.
	await sleep(25);
}

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Starting tests');

	afterEach(() => {
		cleanupFiles();
	});

	describe('URL encoding/decoding', () => {
		// URL encode
		test('URL encode - only URL', async () => {
			await openFile('https://google.com/Testing 1234');
			selectAll();

			await runCommand('urlEncode');
			// VSCode is stupid and doesn't use promises.
			// This makes dealing with async ops a pain.
			// The editing can sometimes cause a race condition so let's just wait 10ms
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'https://google.com/Testing%201234');
		});

		test('URL encode - URL in document', async () => {
			await openFile('-- https://google.com/Testing 1234 --');
			selectText('https://google.com/Testing 1234');

			await runCommand('urlEncode');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'https://google.com/Testing%201234');
		});

		test('URL encode part - only URL', async () => {
			await openFile('Testing 1234');
			selectAll();

			await runCommand('urlEncode');
			// VSCode is stupid and doesn't use promises.
			// This makes dealing with async ops a pain.
			// The editing can sometimes cause a race condition so let's just wait 10ms
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'Testing%201234');
		});

		test('URL encode part in document', async () => {
			await openFile('-- Testing 1234 --');
			selectText('Testing 1234');

			await runCommand('urlEncode');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'Testing%201234');
		});

		// URL decode
		test('URL decode - only URL', async () => {
			await openFile('https://google.com/Testing%201234');
			selectAll();

			await runCommand('urlDecode');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'https://google.com/Testing 1234');
		});

		test('URL decode - URL in document', async () => {
			await openFile('-- https://google.com/Testing%201234 --');
			selectText('https://google.com/Testing%201234');

			await runCommand('urlDecode');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'https://google.com/Testing 1234');
		});

		test('URL decode part - only URL', async () => {
			await openFile('Testing%201234');
			selectAll();

			await runCommand('urlDecode');
			// VSCode is stupid and doesn't use promises.
			// This makes dealing with async ops a pain.
			// The editing can sometimes cause a race condition so let's just wait 10ms
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'Testing 1234');
		});

		test('URL decode part in document', async () => {
			await openFile('-- Testing%201234 --');
			selectText('Testing%201234');

			await runCommand('urlDecode');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'Testing 1234');
		});
	});

	describe('Hashing', () => {
		// md5
		test('md5 - whole file', async () => {
			await openFile('hello world');
			selectAll();

			await runCommand('md5');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, '5eb63bbbe01eeed093cb22bb8f5acdc3');
		});

		test('md5 - part file', async () => {
			await openFile('hello world, the weather is nice eh?');
			selectText('weather is nice');

			await runCommand('md5');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'e57b96ed601a4a6a571221c4aad81a45');
		});

		// sha1
		test('sha1 - whole file', async () => {
			await openFile('hello world');
			selectAll();

			await runCommand('sha1');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, '2aae6c35c94fcfb415dbe95f408b9ce91ee846ed');
		});

		test('sha1 - part file', async () => {
			await openFile('hello world, the weather is nice eh?');
			selectText('weather is nice');

			await runCommand('sha1');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, '057443b9023c02c5dd719f299f41621f595444cc');
		});

		// sha256
		test('sha256 - whole file', async () => {
			await openFile('hello world');
			selectAll();

			await runCommand('sha256');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9');
		});

		test('sha256 - part file', async () => {
			await openFile('hello world, the weather is nice eh?');
			selectText('weather is nice');

			await runCommand('sha256');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'df41fbeabe7ffc46edb966a38ecc813382d72767fb37bd0cf0555c9bae048d3c');
		});

		// sha384
		test('sha384 - whole file', async () => {
			await openFile('hello world');
			selectAll();

			await runCommand('sha384');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'fdbd8e75a67f29f701a4e040385e2e23986303ea10239211af907fcbb83578b3e417cb71ce646efd0819dd8c088de1bd');
		});

		test('sha384 - part file', async () => {
			await openFile('hello world, the weather is nice eh?');
			selectText('weather is nice');

			await runCommand('sha384');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'bd3457faa371b7edf01231b4707c233275cf9613fdd3552d899a64a1a6ad1ad6eb94e443de351f61c10aaf176f5390ac');
		});

		// sha512
		test('sha512 - whole file', async () => {
			await openFile('hello world');
			selectAll();

			await runCommand('sha512');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, '309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f');
		});

		test('sha512 - part file', async () => {
			await openFile('hello world, the weather is nice eh?');
			selectText('weather is nice');

			await runCommand('sha512');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, '28e8c11ad391055d38afa0c8acd327da2a6fac7143cdc52cc2e1be434e9d999ca426b1fc8d29e479b7b11c6dc04e6b097e83fd8d399d6386111502411c29cf8f');
		});
	});

	describe('Base64', () => {
		test('toBase64 - whole file', async () => {
			await openFile('hello world');
			selectAll();

			await runCommand('toBase64');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'aGVsbG8gd29ybGQ=');
		});

		test('toBase64 - part file', async () => {
			await openFile('hello world, the weather is nice eh?');
			selectText('weather is nice');

			await runCommand('toBase64');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'd2VhdGhlciBpcyBuaWNl');
		});

		test('fromBase64 - whole file', async () => {
			await openFile('aGVsbG8gd29ybGQ=');
			selectAll();

			await runCommand('fromBase64');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'hello world');
		});

		test('fromBase64 - part file', async () => {
			await openFile('{"token": "aGVsbG8gd29ybGQ="}');
			selectText('aGVsbG8gd29ybGQ=');

			await runCommand('fromBase64');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, 'hello world');
		});
	});

	// TODO: Fix eval
	describe('eval', () => {
		test.skip('basic eval - whole file', async () => {
			await openFile('1 + 2 + 3');
			selectAll();

			await runCommand('eval');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, '6');
		});

		test.skip('basic eval - part file', async () => {
			await openFile('const percent = (1 + 2 + 3 / 10) * 100');
			selectText('1 + 2 + 3');

			await runCommand('eval');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, '6');
		});
	});

	describe('Format', () => {
		test('prettifyJson - whole file', async () => {
			await openFile('{"hello": "world", "abc": true, "env": {"production":{"var": true}}}');
			selectAll();

			await runCommand('prettifyJson');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, `{
    "hello": "world",
    "abc": true,
    "env": {
        "production": {
            "var": true
        }
    }
}`);
		});

		test('prettifyJson - part file', async () => {
			await openFile(`[
				{"hello": "world", "abc": true, "env": {"production":{"var": true}}},
				{"hello": "world", "abc": false, "env": {"production":{"var": true}}},
				{"hello": "world", "abc": true, "env": {"staging":{"var": true}}},
			]`);
			selectText('{"hello": "world", "abc": true, "env": {"production":{"var": true}}}');

			await runCommand('prettifyJson');
			await stupidRaceCondition();
			const text = getText();

			assert.equal(text, `{
    "hello": "world",
    "abc": true,
    "env": {
        "production": {
            "var": true
        }
    }
}`);
		});
	});
});

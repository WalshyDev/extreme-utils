import { createHash } from 'node:crypto';
import { getText, replace } from '../utils/text';

function hash(algo: string) {
	const text = getText();
	if (text === '') {
		return;
	}

	replace(createHash(algo).update(text).digest('hex'));
}

export const md5 = () => hash('md5');
export const sha1 = () => hash('sha1');
export const sha256 = () => hash('sha256');
export const sha384 = () => hash('sha384');
export const sha512 = () => hash('sha512');

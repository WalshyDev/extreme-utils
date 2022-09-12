# Extreme Utils

I constantly need different utils which aren't available in extensions or are all across many different ones. So, I made this to just satisfy my needs.

Download here: https://marketplace.visualstudio.com/items?itemName=WalshyDev.extreme-utils

## Features
- URL encoding/decoding
- Hashing
  - MD5
  - SHA-1
  - SHA-256
  - SHA-384
  - SHA-512
- Base64
- Eval
  - Run JS code easily
- Prettify/minify JS

## Commands
* `extreme-utils.urlEncode`
  * URL encode
* `extreme-utils.urlDecode`
  * URL decode
* `extreme-utils.urlEncodePart`
  * URL encode a part
* `extreme-utils.urlDecodePart`
  * URL decode a part
* `extreme-utils.md5`
  * MD5 hash
* `extreme-utils.sha1`
  * SHA-1 hash
* `extreme-utils.sha256`
  * SHA-256 hash
* `extreme-utils.sha384`
  * SHA-384 hash
* `extreme-utils.sha512`
  * SHA-512 hash
* `extreme-utils.toBase64`
  * Base64 encode
* `extreme-utils.fromBase64`
  * Base64 decode
* `extreme-utils.eval`
  * Evaluate some JS
* `extreme-utils.prettifyJson`
  * Prettify JSON
* `extreme-utils.minifyJson`
  * Minify JSON

## Making a shortcut
This extension doesn't ship with any default shortcuts right now so here is an example:

```json
[
	{
		"key": "cmd+shift+m",
		"command": "extreme-utils.eval",
		"when": "editorFocus"
	}
]
```

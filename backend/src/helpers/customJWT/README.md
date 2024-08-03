# JWT Utility

This utility provides functions to generate and validate JSON Web Tokens (JWT).

## Functions

### `base64urlEncode(obj)`

Base64url encodes a JSON object.

- **Parameters:**
    - `obj` (Object): The JSON object to encode.
- **Returns:** `string` - The base64url encoded string.
- **Purpose:** This function is used to convert a JSON object (like the header or payload of a JWT) into a base64url encoded string. Base64url encoding is a URL-safe version of base64 encoding.

### `base64urlDecode(str)`

Base64url decodes a string.

- **Parameters:**
    - `str` (string): The base64url encoded string.
- **Returns:** `Object` - The decoded JSON object.
- **Purpose:** This function decodes a base64url encoded string back into a JSON object. It's useful for decoding the payload of a JWT.

### `createSignature(header, payload, secret)`

Creates the JWT signature.

- **Parameters:**
    - `header` (string): The encoded header.
    - `payload` (string): The encoded payload.
    - `secret` (string): The secret key.
- **Returns:** `string` - The base64url encoded signature.
- **Purpose:** This function generates a signature for the JWT using the encoded header and payload, combined with a secret key. The signature ensures the integrity and authenticity of the token.

### `generateJWT(payload)`

Generates a JWT.

- **Parameters:**
    - `payload` (Object): The payload to encode in the JWT.
- **Returns:** `string` - The generated JWT.
- **Purpose:** This function creates a complete JWT. It encodes the header and payload, generates a signature, and combines these parts into a single token.

### `validateJWT(token)`

Validates a JWT.

- **Parameters:**
    - `token` (string): The JWT to validate.
- **Returns:** `Object|null` - The decoded payload if the token is valid, or `null` if it is not.
- **Purpose:** This function checks the validity of a JWT by verifying its signature. If the signature is valid, it decodes and returns the payload; otherwise, it returns `null`.

## JWT Creation Process

1. **Header Creation:**
    - A header object is created, typically specifying the algorithm used (e.g., `HS256`) and the token type (`JWT`).

2. **Payload Encoding:**
    - The payload, which contains the claims or data to be transmitted, is base64url encoded using the `base64urlEncode` function.

3. **Signature Generation:**
    - A signature is generated using the `createSignature` function. This involves:
        - Combining the encoded header and payload.
        - Creating a hash using HMAC with the specified algorithm (e.g., SHA-256) and the secret key.
        - Base64url encoding the resulting hash to produce the signature.

4. **Token Assembly:**
    - The final JWT is assembled by concatenating the encoded header, encoded payload, and signature, separated by dots (`.`).

## Usage

### Generating a JWT

To generate a JWT, you can use the `generateJWT` function. Here's an example:

```javascript
const { generateJWT } = require('./jwtUtility');

const payload = { userId: 123, role: 'admin' };
const token = generateJWT(payload);
console.log(token);

const { validateJWT } = require('./jwtUtility');

const token = 'your.jwt.token.here';
const payload = validateJWT(token);

if (payload) {
    console.log('Token is valid:', payload);
} else {
    console.log('Token is invalid');
}
```
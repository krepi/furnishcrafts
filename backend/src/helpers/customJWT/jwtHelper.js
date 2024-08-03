const secret = process.env.JWT_SECRET;
import crypto from 'crypto';


/**
 * Base64url encodes a JSON object.
 * @param {Object} obj - The JSON object to encode.
 * @returns {string} The base64url encoded string.
 */
function base64urlEncode(obj) {
    return Buffer.from(JSON.stringify(obj))
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

/**
 * Base64url decodes a string.
 * @param {string} str - The base64url encoded string.
 * @returns {Object} The decoded JSON object.
 */
function base64urlDecode(str) {
    return JSON.parse(Buffer.from(str, 'base64').toString());
}

/**
 * Creates the JWT signature.
 * @param {string} header - The encoded header.
 * @param {string} payload - The encoded payload.
 * @param {string} secret - The secret key.
 * @returns {string} The base64url encoded signature.
 */
function createSignature(header, payload, secret) {
    const data = `${header}.${payload}`;
    return crypto
        .createHmac('sha256', secret)
        .update(data)
        .digest('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

/**
 * Generates a JWT.
 * @param {Object} payload - The payload to encode in the JWT.
 * @returns {string} The generated JWT.
 */
function generateJWT(payload) {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = base64urlEncode(header);
    const encodedPayload = base64urlEncode(payload);
    const signature = createSignature(encodedHeader, encodedPayload, secret);
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Validates a JWT.
 * @param {string} token - The JWT to validate.
 * @returns {Object|null} The decoded payload if the token is valid, or null if it is not.
 */
function validateJWT(token) {
    const [header, payload, signature] = token.split('.');
    const validSignature = createSignature(header, payload, secret);
    if (signature === validSignature) {
        return base64urlDecode(payload);
    }
    return null;
}

export {
    generateJWT,
    validateJWT
};

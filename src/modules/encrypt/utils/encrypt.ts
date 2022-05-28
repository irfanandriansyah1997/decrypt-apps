import {
    DecryptSignatureFnType,
    EncryptSignatureFnType
} from '../types';

const applySaltToChar = (uuid: string) => {
    return (code: number | number[] = 0) =>
        uuid
            .split('')
            .map((c) => c.charCodeAt(0))
            .reduce(
                (prev: number, current) => prev ^ current,
                Array.isArray(code) ? code[0] : code
            );
};

/**
 * Encrypt Text
 *
 * @param {string} plainText - plain text which will be encrypted
 * @param {string} uuid - uuid to generate encrypted data
 * @description encrypt plain text
 * @returns {string}
 * @since 2022.04.27
 */
export const encrypt: EncryptSignatureFnType = (
    plainText,
    uuid
) => {
    const textToChars = (text = '') =>
        text.split('').map((c) => c.charCodeAt(0));
    const byteHex = (n = 0) =>
        ('0' + Number(n).toString(16)).slice(-2);

    return plainText
        .split('')
        .map(textToChars)
        .map(applySaltToChar(uuid))
        .map(byteHex)
        .join('');
};

/**
 * Decrypt Hashed Char
 *
 * @param {string} encryptedData - encrypted data will be transforming into decrypted string
 * @param {string} uuid - uuid to generate encrypted data
 * @description decrypt hashed char with salt algorithm
 * @returns {string}
 * @since 2022.04.27
 */
export const decrypt: DecryptSignatureFnType = (
    encryptedData,
    uuid
) => {
    const matchedString =
        encryptedData.match(/.{1,2}/g) || [];

    return matchedString
        .map((hex = '') => parseInt(hex, 16))
        .map(applySaltToChar(uuid))
        .map((charCode = 0) =>
            String.fromCharCode(charCode)
        )
        .join('');
};

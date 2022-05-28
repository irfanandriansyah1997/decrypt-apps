/**
 * Encrypt Type
 *
 * @description Signature function type
 * @since 2022.05.12
 */
export interface EncryptSignatureFnType {
    (plainText: string, uuid: string): string;
}

/**
 * Decrypt Type
 *
 * @description Signature function type
 * @since 2022.05.12
 */
export interface DecryptSignatureFnType {
    (encryptedData: string, uuid: string): string;
}

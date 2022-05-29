import { EncryptModulesTypes } from '../../types';

export interface SetFormValueArgsType {
    content: string;
    uuid: string;
}

/**
 * Encrypt State Type
 *
 * @since 2022.05.29
 */
export interface EncryptStateType {
    content: string;
    uuid: string;
    type: EncryptModulesTypes;
    result: string;
}

/**
 * Encrypt Action Type
 *
 * @since 2022.05.29
 */
export interface EncryptActionType {
    toggleMode(mode: EncryptModulesTypes): void;
    onChangeFormValue(
        mode: Partial<SetFormValueArgsType>
    ): void;
    doExecute(): void;
}

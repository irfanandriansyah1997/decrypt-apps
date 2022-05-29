import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
    useState
} from 'react';
import { Maybe } from '../../../types';
import { EncryptModulesTypes } from '../types';
import { decrypt, encrypt } from '../utils/encrypt';
import {
    EncryptActionType,
    EncryptStateType,
    SetFormValueArgsType
} from './types';

/**
 * Encrypt State Context
 *
 * @since 2022.05.29
 */
const EncryptStateContext =
    createContext<Maybe<EncryptStateType>>(undefined);

/**
 * Encrypt State Context
 *
 * @since 2022.05.29
 */
const EncryptActionContext =
    createContext<Maybe<EncryptActionType>>(undefined);

/**
 * Encrypt State Custom Hooks
 *
 * @returns {EncryptStateType}
 * @since 2022.05.29
 */
export const useEncryptState = (): EncryptStateType => {
    const state = useContext(EncryptStateContext);

    if (state === undefined)
        throw new Error(
            'useEncryptState must be used within a EncryptProvider'
        );

    return state;
};

/**
 * Encrypt Action Custom Hooks
 *
 * @returns {EncryptActionType}
 * @since 2022.05.29
 */
export const useEncryptAction = (): EncryptActionType => {
    const state = useContext(EncryptActionContext);

    if (state === undefined)
        throw new Error(
            'useEncryptAction must be used within a EncryptProvider'
        );

    return state;
};

/**
 * Encrypt Provider Component
 *
 * @since 2022.05.29
 */
const EncryptProvider = (
    props: PropsWithChildren<unknown>
) => {
    const { children } = props;
    const [type, setType] = useState<EncryptModulesTypes>(
        EncryptModulesTypes.DECRYPT
    );
    const [result, setResultValue] = useState<string>('');
    const [{ content, uuid }, changeContent] =
        useState<SetFormValueArgsType>({
            content:
                '2a73351835736b636067697d73301835736b6069656566646569667d733d333d736b7303243c303971182337303f737d73321835736b6067647d733d3e3f36736b736061667f646862666369737d733d3025736b737c677f686362696669737d7321123e736b736561636560737d73261835736b617d73221835736b60606462616466627d732205282134736b733e3e32737d73263922736b730a2a0d7326302334393e2422340e38350d736b617d0d73223423273832340e252821340d736b0d7363390d737d0d730e0e252821343f303c340d736b0d7306302334393e242234220d732c7d2a0d7326302334393e2422340e38350d736b617d0d73223423273832340e252821340d736b0d7360643c0d737d0d730e0e252821343f303c340d736b0d7306302334393e242234220d732c0c732c',
            uuid: 'a30e3f06-e834-464f-b4ea-1f23fa0a78e7'
        });

    const onChangeFormValue = useCallback(
        (param: Partial<SetFormValueArgsType>) => {
            const filterredParam = Object.keys(
                param
            ).reduce<Partial<SetFormValueArgsType>>(
                (prev, current) => {
                    const key =
                        current as keyof SetFormValueArgsType;

                    if (param[key] !== undefined) {
                        return {
                            ...prev,
                            [current]: param[key]
                        };
                    }

                    return prev;
                },
                {}
            );

            changeContent((currentState) => {
                return {
                    ...currentState,
                    ...filterredParam
                };
            });
        },
        []
    );

    const toggleMode = useCallback(
        (mode: EncryptModulesTypes) => {
            if (type !== mode) {
                setType(mode);
                setResultValue('');
                changeContent({
                    content: '',
                    uuid: ''
                });
            }
        },
        [type]
    );

    const doExecute = useCallback(() => {
        switch (type) {
            case EncryptModulesTypes.ENCRYPT:
                setResultValue(encrypt(content, uuid));
                break;

            case EncryptModulesTypes.DECRYPT:
                setResultValue(decrypt(content, uuid));
                break;
        }
    }, [content, type, uuid]);

    const stateContextValue =
        useMemo<EncryptStateType>(() => {
            return {
                content,
                result,
                type,
                uuid
            };
        }, [content, result, type, uuid]);

    const actionContextValue =
        useMemo<EncryptActionType>(() => {
            return {
                doExecute,
                onChangeFormValue,
                toggleMode
            };
        }, [doExecute, onChangeFormValue, toggleMode]);

    return (
        <EncryptActionContext.Provider
            value={actionContextValue}
        >
            <EncryptStateContext.Provider
                value={stateContextValue}
            >
                {children}
            </EncryptStateContext.Provider>
        </EncryptActionContext.Provider>
    );
};

export default EncryptProvider;

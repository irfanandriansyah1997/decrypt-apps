import { useCallback, useMemo } from 'react';
import Button from '../../../../../components/atomic/button';
import Textarea from '../../../../../components/atomic/textarea';
import Textfield from '../../../../../components/atomic/textfield';
import TabsNav from '../../../../../components/molecules/tabs-nav';
import {
    useEncryptAction,
    useEncryptState
} from '../../../context';
import { EncryptModulesTypes } from '../../../types';

import './style.css';

/**
 * Encrypt Form Component
 *
 * @since 2022.05.28
 */
const EncryptForm = () => {
    const { uuid, content, type } = useEncryptState();
    const { onChangeFormValue, toggleMode, doExecute } =
        useEncryptAction();

    /**
     * Event On Change Selected Nav
     *
     * @param {string} navigationKey - selected navigation tab
     * @returns {void}
     */
    const eventOnChangeSelectedNav = useCallback(
        (navigationKey: string) => {
            switch (navigationKey) {
                case EncryptModulesTypes.ENCRYPT:
                case EncryptModulesTypes.DECRYPT: {
                    toggleMode(navigationKey);
                    break;
                }
            }
        },
        [toggleMode]
    );

    const onChangeForm = useCallback(
        (param: { name: string; value: string }) => {
            onChangeFormValue({
                [param.name]: param.value
            });
        },
        [onChangeFormValue]
    );

    const isDisabled = useMemo(() => {
        return uuid.length === 0 || content.length === 0;
    }, [content.length, uuid.length]);

    return (
        <div className="m-form">
            <TabsNav
                active={type}
                onChooseItem={eventOnChangeSelectedNav}
            >
                <TabsNav.Item
                    text="Encrypt"
                    id={EncryptModulesTypes.ENCRYPT}
                />
                <TabsNav.Item
                    text="Decrypt"
                    id={EncryptModulesTypes.DECRYPT}
                />
            </TabsNav>
            <div className="m-form__content">
                <Textarea
                    name="text"
                    id="text"
                    type="text"
                    label="Content"
                    placeholder="Please fill content will be to encrypt / decrypt"
                    value={content}
                    onChange={onChangeForm}
                />
                <Textfield
                    name="uuid"
                    id="uuid"
                    type="text"
                    label="UUID Keys"
                    placeholder="Please fill uuid key"
                    value={uuid}
                    onChange={onChangeForm}
                />
                <Button
                    onClick={doExecute}
                    disabled={isDisabled}
                    text={
                        type === EncryptModulesTypes.ENCRYPT
                            ? 'Encrypt'
                            : 'Decrypt'
                    }
                />
            </div>
        </div>
    );
};

export default EncryptForm;

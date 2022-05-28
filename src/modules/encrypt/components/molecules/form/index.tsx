import TabsNav from '../../../../../components/molecules/tabs-nav';
import { EncryptModulesTypes } from '../../../types';

import './style.css';

/**
 * Encrypt Form Interface
 *
 * @since 2022.05.28
 */
export interface EncryptFormTypes {
    type: EncryptModulesTypes;
}

/**
 * Encrypt Form Component
 *
 * @since 2022.05.28
 */
const EncryptForm = (props: EncryptFormTypes) => {
    const { type } = props;

    return (
        <div className="m-form">
            <TabsNav active={type}>
                <TabsNav.Item
                    text="Encrypt"
                    id={EncryptModulesTypes.ENCRYPT}
                />
                <TabsNav.Item
                    text="Decrypt"
                    id={EncryptModulesTypes.DECRYPT}
                />
            </TabsNav>
        </div>
    );
};

export default EncryptForm;

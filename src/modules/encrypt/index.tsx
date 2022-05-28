import EncryptForm from './components/molecules/form';
import ResultViewer from './components/molecules/viewer';
import { EncryptModulesTypes } from './types';

import './style.css';

/**
 * Encrypt Modules Component
 *
 * @since 2022.05.28
 */
const EncryptModules = () => (
    <div className="encrypt-modules">
        <EncryptForm type={EncryptModulesTypes.ENCRYPT} />
        <ResultViewer
            content={
                '{"name": "irfan andriansyah", "age": 24}'
            }
        />
    </div>
);

export default EncryptModules;

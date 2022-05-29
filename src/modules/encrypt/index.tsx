import EncryptForm from './components/molecules/form';
import ResultViewer from './components/molecules/viewer';

import './style.css';
import EncryptProvider from './context';

/**
 * Encrypt Modules Component
 *
 * @since 2022.05.28
 */
const EncryptModules = () => (
    <EncryptProvider>
        <div className="encrypt-modules">
            <EncryptForm />
            <ResultViewer />
        </div>
    </EncryptProvider>
);

export default EncryptModules;

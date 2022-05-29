import { useMemo } from 'react';
import { deepParseJson } from '../../../../../utils/json';
import { useEncryptState } from '../../../context';

import './style.css';

/**
 * Result Viewer Component
 *
 * @since 2022.05.28
 */
const ResultViewer = () => {
    const { result } = useEncryptState();

    const formattedContent = useMemo(() => {
        try {
            return JSON.stringify(
                deepParseJson(result),
                null,
                2
            );
        } catch {
            return result;
        }
    }, [result]);

    return (
        <div className="m-viewer">
            <pre>{formattedContent}</pre>
        </div>
    );
};

export default ResultViewer;

import { useMemo } from 'react';

/**
 * Result Viewe Props Interface
 *
 * @since 2022.05.28
 */
export interface ResultViewerProps {
    content: string;
}

/**
 * Result Viewer Component
 *
 * @since 2022.05.28
 */
const ResultViewer = (props: ResultViewerProps) => {
    const { content } = props;

    const formattedContent = useMemo(() => {
        try {
            return JSON.stringify(
                JSON.parse(content),
                null,
                2
            );
        } catch {
            return content;
        }
    }, [content]);

    return (
        <div>
            <pre>{formattedContent}</pre>
        </div>
    );
};

export default ResultViewer;

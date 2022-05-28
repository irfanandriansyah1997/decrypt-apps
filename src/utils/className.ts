/**
 * Generate Classname
 *
 * @param {Record<string, boolean>} className - classname arguments
 * @returns {string}
 * @description mapping class name key based on key value from classname arguments
 * @since 2022.05.28
 */
export const cx = (className: Record<string, boolean>) => {
    return Object.keys(className).reduce(
        (prev, current) => {
            if (className[current])
                return [prev, current].join(' ');

            return prev;
        },
        ''
    );
};

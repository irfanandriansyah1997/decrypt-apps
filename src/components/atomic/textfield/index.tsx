import { FC, InputHTMLAttributes } from 'react';
import { cx } from '../../../utils/className';

type BaseProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * Textfield Props Interface
 *
 * @since 2022.05.28
 */
export interface TexfieldProps extends BaseProps {
    label: string;
}

/**
 * Textfield Component
 *
 * @since 2022.05.28
 */
const Textfield = (props: TexfieldProps) => {
    const { label, className, name, id } = props;

    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                {...props}
                id={id}
                name={name}
                className={cx({
                    className: Boolean(className)
                })}
            />
        </div>
    );
};

export default Textfield;

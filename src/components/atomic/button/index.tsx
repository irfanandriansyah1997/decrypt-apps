import { useCallback } from 'react';
import { cx } from '../../../utils/className';

import './style.css';

interface ButtonProps {
    text: string;
    disabled?: boolean;
    onClick(): void;
}

/**
 * Button Component
 *
 * @since 2022.05.29
 */
const Button = (props: ButtonProps) => {
    const { text, onClick, disabled } = props;

    const handlerOnClick = useCallback(() => {
        !disabled && onClick();
    }, [disabled, onClick]);

    return (
        <button
            className={cx({
                'a-button': true,
                'a-button--disabled': Boolean(disabled)
            })}
            type="button"
            onClick={handlerOnClick}
        >
            {text}
        </button>
    );
};

export default Button;

import {
    ChangeEventHandler,
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState
} from 'react';

import { Maybe } from '../../../types';
import { cx } from '../../../utils/className';

import './style.css';

type BaseProps = Omit<
    InputHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'name' | 'value'
>;

/**
 * Textarea Props Interface
 *
 * @since 2022.05.28
 */
export interface TextareaProps extends BaseProps {
    label: string;
    name: string;
    value: string;
    onChange(param: { name: string; value: string }): void;
    timeout?: number;
}

/**
 * Textarea Component
 *
 * @since 2022.05.28
 */
const Textarea = (props: TextareaProps) => {
    const {
        label,
        className,
        name,
        id,
        value,
        onChange,
        timeout = 100
    } = props;
    const [tempValue, setTempValue] = useState<string>('');
    const intervalRef =
        useRef<Maybe<ReturnType<typeof setTimeout>>>(
            undefined
        );

    /**
     * Event On Change
     *
     * @returns {void}
     */
    const eventOnChange: ChangeEventHandler<
        HTMLTextAreaElement
    > = (e) => {
        const {
            target: { value: currentValue }
        } = e;

        setTempValue(currentValue);
    };

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    useEffect(() => {
        if (intervalRef.current)
            clearTimeout(intervalRef.current);

        intervalRef.current = setTimeout(() => {
            onChange({ name, value: tempValue });
        }, timeout);

        return () => {
            if (intervalRef.current)
                clearTimeout(intervalRef.current);
        };
    }, [name, onChange, tempValue, timeout]);

    return (
        <div className="a-textarea">
            <label htmlFor={id}>{label}</label>
            <textarea
                {...props}
                id={id}
                name={name}
                className={cx({
                    className: Boolean(className)
                })}
                onChange={eventOnChange}
                value={tempValue}
            />
        </div>
    );
};

export default Textarea;

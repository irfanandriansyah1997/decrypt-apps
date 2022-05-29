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
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'name' | 'value'
>;

/**
 * Textfield Props Interface
 *
 * @since 2022.05.28
 */
export interface TextfieldProps extends BaseProps {
    label: string;
    name: string;
    value: string;
    timeout?: number;
    onChange(param: { name: string; value: string }): void;
}

/**
 * Textfield Component
 *
 * @since 2022.05.28
 */
const Textfield = (props: TextfieldProps) => {
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
        HTMLInputElement
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
        <div className="a-textfield">
            <label htmlFor={id}>{label}</label>
            <input
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

export default Textfield;

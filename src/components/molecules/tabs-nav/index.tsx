import {
    cloneElement,
    MouseEventHandler,
    useCallback
} from 'react';
import { getChildrenByType } from '../../../modules/encrypt/utils/component';
import {
    TabsNavItemProps as BaseItemProps,
    TabsNavComponentType
} from './types';

import './style.css';
import { cx } from '../../../utils/className';

interface TabsNavItemProps extends BaseItemProps {
    __TYPE?: 'tabs-item';
    active?: boolean;
    onClick?: (name: string) => void;
}

/**
 * Tabs Nav Item Component
 *
 * @author Irfan Andriansyah <irfan.andriansyah@tokopedia.com>
 * @since 2022.05.28
 */
const _TabsNavItem = (props: TabsNavItemProps) => {
    const { text, active, onClick, id } = props;

    /**
     * Event Handler On Click
     *
     * @param {MouseEvent<HTMLDivElement, MouseEvent>} e - event handler trigger when user click div element
     * @returns {void}
     */
    const eventOnClick: MouseEventHandler<HTMLDivElement> =
        useCallback(
            (e) => {
                e.preventDefault();

                onClick && onClick(id);
            },
            [id, onClick]
        );

    return (
        <div
            className={cx({
                'nav-tabs-item': true,
                'nav-tabs-item--active': Boolean(active)
            })}
            role="button"
            tabIndex={0}
            onKeyDown={undefined}
            onClick={eventOnClick}
        >
            {text}
        </div>
    );
};

_TabsNavItem.defaultProps = {
    __TYPE: 'tabs-item',
    active: false
};

/**
 * Tabs Nav Component
 *
 * @since 2022.05.28
 */
const TabsNav: TabsNavComponentType = (props) => {
    const { children, active, onChooseItem } = props;

    /**
     * Event On Click Navigation Item
     *
     * @description this method will be invoked when user try to click one of navigation item
     * @returns {void}
     */
    const eventOnClickNavItem = useCallback(
        (key: string) => {
            if (key !== active) onChooseItem(key);
        },
        [active, onChooseItem]
    );

    return (
        <div className="nav-tabs">
            {getChildrenByType(children, ['tabs-item']).map(
                (child) => {
                    const { id } =
                        (child as any)?.props || {};

                    return cloneElement(
                        child as any,
                        {
                            active: id === active,
                            onClick: eventOnClickNavItem
                        },
                        null
                    );
                }
            )}
        </div>
    );
};

TabsNav.Item = _TabsNavItem;

export default TabsNav;

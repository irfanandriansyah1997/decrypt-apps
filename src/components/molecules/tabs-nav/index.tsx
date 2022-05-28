import { cloneElement } from 'react';
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
}

/**
 * Tabs Nav Item Component
 *
 * @author Irfan Andriansyah <irfan.andriansyah@tokopedia.com>
 * @since 2022.05.28
 */
const _TabsNavItem = (props: TabsNavItemProps) => {
    const { text, active } = props;

    return (
        <div
            className={cx({
                'nav-tabs-item': true,
                'nav-tabs-item--active': Boolean(active)
            })}
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
    const { children, active } = props;

    return (
        <div className="nav-tabs">
            {getChildrenByType(children, ['tabs-item']).map(
                (child) => {
                    const { id } =
                        (child as any)?.props || {};

                    return cloneElement(
                        child as any,
                        {
                            active: id === active
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

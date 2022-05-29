import type { Key, PropsWithChildren } from 'react';

/**
 * Tabs Nav Props Interface
 *
 * @since 2022.05.28
 */
export interface TabsNavProps {
    active?: Key;
    onChooseItem(key: string): void;
}

/**
 * Tabs Nav Item Props Interface
 *
 * @since 2022.05.28
 */
export interface TabsNavItemProps {
    text: string;
    id: string;
}

/**
 * Tabs Nav Component Type
 *
 * @since 2022.05.28
 */
export interface TabsNavComponentType {
    (props: PropsWithChildren<TabsNavProps>): JSX.Element;
    Item: (props: TabsNavItemProps) => JSX.Element;
}

import React from 'react';
import {combineClasses} from '../utils/helpers';

/**
 * Represent the header section.
 *
 * @constructor
 * @param {boolean} isCollapsible
 * @param {JSX.Element[]} children
 * @return {JSX.Element}
 */
const Header = ({isCollapsible, children}) => {
    // Initialize menu visibility state
    const [isOpen, setIsOpen] = React.useState(false);

    // Handle opening/closing the menu
    const handleClickEvent = () => setIsOpen(!isOpen);

    return (
        <header className={combineClasses(
            'header page__header',
            isCollapsible && 'header_collapsible'
        )}>
            <div className="header__logo"/>

            {isCollapsible && (
                <button
                    type="button"
                    title="Toggle menu"
                    className={combineClasses(
                        'header__button',
                        isOpen && 'header__button_active'
                    )}
                    onClick={handleClickEvent}
                />
            )}

            <div className={combineClasses(
                'header__content',
                isCollapsible && 'header__content_collapsible',
                isCollapsible && !isOpen && 'header__content_hidden'
            )}>
                {children}
            </div>
        </header>
    );
};

export default Header;

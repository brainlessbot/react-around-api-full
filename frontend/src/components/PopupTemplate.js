import React from 'react';
import {combineClasses} from '../utils/helpers';

/**
 * Represent a basic popup template.
 *
 * @constructor
 * @param {string} contentType
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {boolean} isNotification
 * @param {JSX.Element[]} children
 * @return {JSX.Element}
 */
const PopupTemplate = ({contentType, isOpen, onCloseClick, isNotification = false, children}) => {
    // Latest timeout used, so it can be cleared when the popup is closed
    let latestTimeout = undefined;

    // If the popup is a notification, define after how many seconds the popup is closed automatically
    const timeoutSeconds = 3;

    // Handle closing the popup and clear timeout (if exists)
    const handlePopupClosing = () => {
        latestTimeout && clearTimeout(latestTimeout);
        onCloseClick();
    };

    // Handle closing the popup if Escape button was pressed
    const handleEscKeydown = (event) => event.key === 'Escape' && handlePopupClosing();

    // Popup side effects
    React.useEffect(() => {
        // Allow closing the popup by pressing Escape button
        if (isOpen) {
            document.addEventListener('keydown', handleEscKeydown);
        }

        // Close notifications automatically after X seconds
        if (isOpen && isNotification) {
            latestTimeout = setTimeout(handlePopupClosing, timeoutSeconds * 1000);
        }

        return () => document.removeEventListener('keydown', handleEscKeydown);
    }, [isOpen]);

    return (
        <div className={combineClasses(
            'popup',
            isOpen && 'popup_open',
            isNotification && 'popup_notification'
        )}>
            <div
                className="popup__overlay"
                onClick={handlePopupClosing}
            />

            <div className={combineClasses(
                'popup__container',
                'popup__container_content_' + contentType
            )}>
                {!isNotification && (
                    <button
                        type="button"
                        title="Close popup"
                        className="popup__close-button"
                        onClick={handlePopupClosing}
                    />
                )}

                {children}
            </div>
        </div>
    );
};

export default PopupTemplate;

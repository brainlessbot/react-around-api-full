import React from 'react';
import PopupTemplate from './PopupTemplate';
import {combineClasses} from '../utils/helpers';

/**
 * Represent a basic popup with a form.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Function} onFormSubmit
 * @param {Object} formSettings
 * @param {boolean} isProcessing
 * @param {JSX.Element[]} children
 * @return {JSX.Element}
 */
const PopupWithForm = ({isOpen, onCloseClick, onFormSubmit, formSettings, isProcessing, children}) => {
    // Handle the submission of the form
    const handleFormSubmit = (event) => {
        event.preventDefault();
        onFormSubmit();
    };

    return (
        <PopupTemplate
            contentType="form"
            isOpen={isOpen}
            onCloseClick={onCloseClick}
        >
            <h2 className={combineClasses(
                'popup__title',
                formSettings.isCompact && 'popup__title_compact'
            )}>
                {formSettings.title}
            </h2>

            <form
                id={formSettings.id}
                className="popup__form"
                onSubmit={handleFormSubmit}
            >
                {children}
                <button
                    type="submit"
                    className={combineClasses(
                        'popup__submit-button',
                        formSettings.isCompact && 'popup__submit-button_compact',
                        isProcessing && 'popup__submit-button_disabled'
                    )}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Processing...' : formSettings.submitButton}
                </button>
            </form>
        </PopupTemplate>
    );
};

export default PopupWithForm;

import React from 'react';
import PopupWithForm from './PopupWithForm';

/**
 * Represent profile edit avatar popup.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Function} onFormSubmit
 * @return {JSX.Element}
 */
const EditAvatarPopup = ({isOpen, onCloseClick, onFormSubmit}) => {
    // Initialize input references
    const avatarInputRef = React.useRef();

    // Initialize processing state
    const [isProcessing, setIsProcessing] = React.useState(false);

    // Handle the submission of the form
    const handleFormSubmit = () => {
        setIsProcessing(true);
        onFormSubmit({
            avatar: avatarInputRef.current.value
        }, () => setIsProcessing(false));
    };

    // Reset the form when the popup is opened/closed
    React.useEffect(() => {
        avatarInputRef.current.value = null;
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            onFormSubmit={handleFormSubmit}
            formSettings={{
                id: 'profile-edit-avatar',
                title: 'Change Profile Picture',
                submitButton: 'Save'
            }}
            isProcessing={isProcessing}
        >
            <input
                ref={avatarInputRef}
                name="avatar"
                type="url"
                placeholder="Avatar link"
                className="popup__form-field"
                autoComplete="off"
                required
            />
        </PopupWithForm>
    );
};

export default EditAvatarPopup;

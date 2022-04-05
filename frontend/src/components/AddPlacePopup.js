import React from 'react';
import PopupWithForm from './PopupWithForm';

/**
 * Represent card add popup.
 *
 * @constructor
 * @param {boolean} isOpen
 * @param {Function} onCloseClick
 * @param {Function} onFormSubmit
 * @return {JSX.Element}
 */
const AddPlacePopup = ({isOpen, onCloseClick, onFormSubmit}) => {
    // Initialize input states
    const [nameInput, setNameInput] = React.useState('');
    const [linkInput, setLinkInput] = React.useState('');

    // Initialize processing state
    const [isProcessing, setIsProcessing] = React.useState(false);

    // Input-change event handlers
    const handleNameInputChange = (event) => setNameInput(event.target.value);
    const handleLinkInputChange = (event) => setLinkInput(event.target.value);

    // Handle the submission of the form
    const handleFormSubmit = () => {
        setIsProcessing(true);
        onFormSubmit({
            name: nameInput,
            link: linkInput
        }, () => setIsProcessing(false));
    };

    // Reset the form when the popup is opened/closed
    React.useEffect(() => {
        setNameInput('');
        setLinkInput('');
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            onFormSubmit={handleFormSubmit}
            formSettings={{
                id: 'card-add',
                title: 'New Card',
                submitButton: 'Save'
            }}
            isProcessing={isProcessing}
        >
            <input
                value={nameInput}
                onChange={handleNameInputChange}
                name="name"
                type="text"
                placeholder="Name"
                className="popup__form-field"
                minLength={1}
                maxLength={30}
                autoComplete="off"
                required
            />

            <input
                value={linkInput}
                onChange={handleLinkInputChange}
                name="link"
                type="url"
                placeholder="Image link"
                className="popup__form-field"
                autoComplete="off"
                required
            />
        </PopupWithForm>
    );
};

export default AddPlacePopup;

import React from 'react';
import ProfileInfo from './ProfileInfo';
import ProfileCards from './ProfileCards';
import CurrentUserContext from '../contexts/CurrentUserContext';

/**
 * Represent the main-content section.
 *
 * @constructor
 * @param {Object} cardsData
 * @param {Function} onAddCardClick
 * @param {Function} onEditInfoClick
 * @param {Function} onEditAvatarClick
 * @param {Function} onCardImageClick
 * @param {Function} onCardLikeClick
 * @param {Function} onCardRemoveClick
 * @param {boolean} isLoading
 * @return {JSX.Element}
 */
const Main = ({cardsData, onAddCardClick, onEditInfoClick, onEditAvatarClick, onCardImageClick, onCardLikeClick, onCardRemoveClick, isLoading}) => {
    // Subscribe to logged-in user context
    const userData = React.useContext(CurrentUserContext);

    return (
        <main className="content page__content">
            {isLoading ? (
                <div className="content__loading-icon"/>
            ) : (
                <>
                    <ProfileInfo
                        userData={userData}
                        onAddCardClick={onAddCardClick}
                        onEditInfoClick={onEditInfoClick}
                        onEditAvatarClick={onEditAvatarClick}
                    />

                    <ProfileCards
                        cardsData={cardsData}
                        onCardImageClick={onCardImageClick}
                        onCardLikeClick={onCardLikeClick}
                        onCardRemoveClick={onCardRemoveClick}
                    />
                </>
            )}
        </main>
    );
};

export default Main;

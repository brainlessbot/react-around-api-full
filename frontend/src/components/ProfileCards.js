import Card from './Card';

/**
 * Represent the profile-cards section.
 *
 * @constructor
 * @param {Object} cardsData
 * @param {Function} onCardImageClick
 * @param {Function} onCardLikeClick
 * @param {Function} onCardRemoveClick
 * @return {JSX.Element}
 */
const ProfileCards = ({cardsData, onCardImageClick, onCardLikeClick, onCardRemoveClick}) => {
    return (
        <section className="profile-cards content__profile-cards">
            <ul className="profile-cards__list">
                {cardsData.map((cardData) => (
                    <Card
                        key={cardData._id}
                        cardData={cardData}
                        onCardImageClick={onCardImageClick}
                        onCardLikeClick={onCardLikeClick}
                        onCardRemoveClick={onCardRemoveClick}
                    />
                ))}
            </ul>
        </section>
    );
};

export default ProfileCards;

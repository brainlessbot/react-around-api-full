/**
 * Represent the footer section.
 *
 * @constructor
 * @return {JSX.Element}
 */
const Footer = () => {
    return (
        <footer className="footer page__footer">
            <p className="footer__copyright">&copy; {new Date().getFullYear()} Around The U.S.</p>
        </footer>
    );
};

export default Footer;

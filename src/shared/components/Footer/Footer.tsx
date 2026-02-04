import { SSRLink } from '../SSRLink';

const Footer = () => {
  return (
    <footer className="app-footer" data-testid="app-footer">
      <SSRLink to="/" className="footer-link" data-testid="footer-link">
        Movie Browser
      </SSRLink>
    </footer>
  );
};

export default Footer;

import { SSRLink } from '../SSRLink';
import '../../../styles/header.scss';

interface HeaderProps {
  subtitle?: string;
}

const Header = ({ subtitle = 'Discover Your Next Favorite Film' }: HeaderProps) => {
  return (
    <header className="app-header" data-testid="app-header">
      <SSRLink to="/" className="header-title" data-testid="header-title">FILM BROWSER</SSRLink>
      <p className="header-subtitle" data-testid="header-subtitle">{subtitle}</p>
    </header>
  );
};

export default Header;

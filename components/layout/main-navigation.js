import Link from 'next/link';
import Logo from './logo';
import css from './main-navigation.module.css';

const MainNavigation = (props) => {
  return (
    <header className={css.header}>
      <Link href='/'>
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/posts'>Posts</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

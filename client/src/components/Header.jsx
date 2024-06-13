import { Menu, CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import ModeToggle from './mode-toggle';
import LanguageSwitcher from './LanguageSwitcher/index';
import logoWhite from '../assets/logo-white.png';
import logoBlack from '../assets/logo-black.png';

export default function Header() {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="border-b">
      <header className="flex h-16 items-center gap-4  bg-background max-w-screen-xl mx-auto p-3">
        <nav className="hidden flex-col gap-4 text-lg font-bold md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ">
          <Link to="/">
            <img
              src={logoBlack}
              alt="logo"
              className="hidden dark:block w-60"
            />
            <img src={logoWhite} alt="logo" className="dark:hidden w-60" />
          </Link>
          <Link to="/about" className="hover:text-muted-foreground">
            {t('about')}
          </Link>
          <Link to="/contact" className="hover:text-muted-foreground">
            {t('contact')}
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <SheetClose asChild>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <img
                    src={logoBlack}
                    alt="logo"
                    className="hidden dark:block w-32"
                  />
                  <img
                    src={logoWhite}
                    alt="logo"
                    className="dark:hidden w-32"
                  />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t('about')}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t('contact')}
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
            <Link to="/create-service">
              <Button className="font-bold" variant="ringHover">
                {t('createservice')}
              </Button>
            </Link>
          </div>
          <LanguageSwitcher />
          <ModeToggle />
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt=""
              />
            ) : (
              <Button variant="outline" size="icon">
                <CircleUserRound className="h-5 w-5" />
              </Button>
            )}
          </Link>
        </div>
      </header>
    </div>
  );
}

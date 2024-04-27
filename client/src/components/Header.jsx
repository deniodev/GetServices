import { Menu, Search, LogIn, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ModeToggle from "./mode-toggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold md:text-base"
        >
          <h1>
            <span className="text-slate-700 dark:text-slate-500">Home</span>
            <span className="text-slate-500 dark:text-slate-100">Services</span>
          </h1>
        </Link>
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <Link
          to="/about"
          className="text-muted-foreground hover:text-foreground"
        >
          About
        </Link>
        <Link
          to="/services"
          className="text-muted-foreground hover:text-foreground"
        >
          Services
        </Link>
        <Link
          to="/contact"
          className="text-muted-foreground hover:text-foreground"
        >
          Contact
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <h1 className="">
                <span className="text-slate-500">Home</span>
                <span className="text-slate-700">Services</span>
              </h1>
            </Link>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form
          onSubmit={handleSubmit}
          className="ml-auto flex-1 sm:flex-initial"
        >
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Languages />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-30">
            <DropdownMenuGroup>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Portuguese</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
        <Link to="/profile">
          {currentUser ? (
            <img
              className="rounded-full h-7 w-7 object-cover"
              src={currentUser.avatar}
              alt="profile picture"
            />
          ) : (
            <Button variant="outline" size="icon">
              <LogIn className="h-5 w-5" />
            </Button>
          )}
        </Link>
      </div>
    </header>
  );
}

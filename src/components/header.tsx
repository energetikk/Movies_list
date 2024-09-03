import { Navigation } from "./navigation";

const navItems = [
  { label: "Главная", href: "/" },
  { label: "Фильмы", href: "/films" },
];

const Header = () => {
  return (
    <header className="">
      <Navigation navLinks={navItems} />
    </header>
  );
};

export { Header };
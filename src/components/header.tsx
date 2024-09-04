import { Navigation } from "./navigation";

const navItems = [
  { label: "Главная", href: "/" },
  { label: "Фильмы", href: "/films" },
  { label: "Избраное", href: "/favorite" },
  { label: "Профиль", href: "/profile" },
];

const Header = () => {
  return (
    <header className="border-2  border-red-500">
      <Navigation navLinks={navItems} />
    </header>
  );
};

export { Header };
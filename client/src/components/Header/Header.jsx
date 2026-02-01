import HeaderTop from "./HeaderTop";
import HeaderMain from "./HeaderMain";
import Navigation from "./Navigation"; // folder import stays valid

function Header() {
  return (
    <header className="bg-white">
      <HeaderTop />
      <HeaderMain />

      <div className="header py-2 border-b-2 border-gray-300">
        <Navigation />
      </div>
    </header>
  );
}

export default Header;

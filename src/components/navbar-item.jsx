import { Link } from "react-router-dom";

const NavbarItem = ({ text, to }) => {
  let activeClass = "";

  if (to === window.location.pathname) {
    activeClass = "text-green";
  }

  return (
    <li>
      <Link to={to} className={`hover:text-green hover:underline ${activeClass}`}>
        {text}
      </Link>
    </li>
  );
};

export default NavbarItem;

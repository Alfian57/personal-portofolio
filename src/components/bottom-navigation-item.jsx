import { Link } from "react-router-dom";

const BottomNavigationItem = ({ to, text, icon }) => {
  let activeClass = "";

  if (to === window.location.pathname) {
    activeClass = "text-green";
  }

  return (
    <Link to={to} className="w-full text-white flex flex-col justify-between items-center gap-1 text-center pt-2 pb-1">
      <span className={`${activeClass}`}>{icon}</span>
      <span className={`text-xs block ${activeClass}`}>{text}</span>
    </Link>
  );
};

export default BottomNavigationItem;

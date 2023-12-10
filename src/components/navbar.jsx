import NavbarItem from "./navbar-item";

const Navbar = () => {
  return (
    <div className="hidden md:flex flex-col xl:flex-row gap-3 fixed w-full justify-between items-center font-poppins py-6 px-48 border border-x-0 border-t-0 border-white z-50 backdrop-blur-md shadow-2xl">
      <h1 className="font-bold text-2xl block">
        Alfian Gading <span className="text-green">Saputra</span>
      </h1>
      <ul className="flex gap-12 font-semibold text-lg">
        <NavbarItem to={"/"} text={"Biography"} />
        <NavbarItem to={"/experience"} text={"Experience"} />
        <NavbarItem to={"/project"} text={"Project"} />
        <NavbarItem to={"/certificate"} text={"Certificate"} />
        <NavbarItem to={"/achievement"} text={"Achievement"} />
      </ul>
    </div>
  );
};

export default Navbar;

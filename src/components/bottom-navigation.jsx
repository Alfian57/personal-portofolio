import { IoPersonCircleOutline, IoBriefcaseOutline } from "react-icons/io5";
import { FaCode } from "react-icons/fa";
import { GrCertificate, GrAchievement } from "react-icons/gr";
import { Link } from "react-router-dom";
import BottomNavigationItem from "./bottom-navigation-item";

const BottomNavigation = () => {
  return (
    <section className="lg:hidden block fixed inset-x-0 bottom-0 z-10 bg-dark shadow-2xl">
      <div className="flex justify-between gap-2">
        <BottomNavigationItem to={"/"} icon={<IoPersonCircleOutline />} text={"Biography"} />
        <BottomNavigationItem to={"/experience"} icon={<IoBriefcaseOutline />} text={"Experience"} />
        <BottomNavigationItem to={"/project"} icon={<FaCode />} text={"Project"} />
        <BottomNavigationItem to={"/certificate"} icon={<GrCertificate />} text={"Certificate"} />
        <BottomNavigationItem to={"/achievement"} icon={<GrAchievement />} text={"Achievement"} />
        <BottomNavigationItem to={"/experience"} icon={<IoBriefcaseOutline />} text={"Experience"} />
      </div>
    </section>
  );
};

export default BottomNavigation;

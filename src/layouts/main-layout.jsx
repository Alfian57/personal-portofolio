import BottomNavigation from "../components/bottom-navigation";
import Navbar from "../components/navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="px-6 md:pt-36 xl:pt-24 md:px-48">{children}</div>
      <BottomNavigation />
    </>
  );
};

export default MainLayout;

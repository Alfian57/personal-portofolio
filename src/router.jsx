import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import Biography from "./pages/biography";
import Experience from "./pages/experience";
import Project from "./pages/project";
import Certificate from "./pages/certificate";
import Achievement from "./pages/achievement";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Biography />
      </MainLayout>
    ),
  },
  {
    path: "/experience",
    element: (
      <MainLayout>
        <Experience />
      </MainLayout>
    ),
  },
  {
    path: "/project",
    element: (
      <MainLayout>
        <Project />
      </MainLayout>
    ),
  },
  {
    path: "/certificate",
    element: (
      <MainLayout>
        <Certificate />
      </MainLayout>
    ),
  },
  {
    path: "/achievement",
    element: (
      <MainLayout>
        <Achievement />
      </MainLayout>
    ),
  },
]);

export default router;

import { IoGlobeSharp } from "react-icons/io5";
import ProjectCard from "../components/project-card";
import projectData from "../data/project-data";
import { FaCode } from "react-icons/fa";

const Project = () => {
  return (
    <div className="pt-6 pb-20">
      <h1 className="font-bold text-3xl md:text-4xl md:mb-14 md:text-center">
        Project that I have <span className="text-green">done</span>
      </h1>

      <hr className="my-4 md:hidden" />

      <div className="my-24 hidden md:block"></div>

      {projectData.map((item, index) => {
        return (
          <ProjectCard
            key={index}
            title={item.title}
            year={item.year}
            type={item.type}
            desc={item.desc}
            image={item.image}
            githubLink={item.githubLink}
            websiteLink={item.websiteLink}
          />
        );
      })}
    </div>
  );
};

export default Project;

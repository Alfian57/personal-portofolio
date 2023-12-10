import { IoGlobeSharp } from "react-icons/io5";
import { FaCode } from "react-icons/fa";
import { Tooltip } from "@material-tailwind/react";

const ProjectCard = ({ title, year, type, image, desc, githubLink, websiteLink }) => {
  return (
    <>
      <div className="md:grid grid-cols-3 gap-12">
        <div className="relative w-full rounded-lg shadow-2xl overflow-hidden group">
          <img src={image.src} alt={image.alt} className="group-hover:scale-125 transition-all duration-300 delay-100" />
          <div className="absolute flex gap-3 md:gap-6 bottom-3 left-3 md:bottom-1/2 md:translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:opacity-0 group-hover:opacity-100 duration-300 delay-100">
            <Tooltip content="Show Live Website">
              <a href={websiteLink} target="_blank">
                <IoGlobeSharp className="text-2xl md:text-5xl hover:text-primary" />
              </a>
            </Tooltip>
            <Tooltip content="Show Code">
              <a href={githubLink} target="_blank">
                <FaCode className="text-2xl md:text-5xl hover:text-primary" />
              </a>
            </Tooltip>
          </div>
        </div>
        <div className="col-span-2 flex flex-col justify-center">
          <h3 className="font-bold text-xl md:text-4xl mt-3">{title}</h3>
          <div className="flex gap-3 mt-1">
            <div className="text-sm md:text-base text-primary font-poppins font-bold rounded-full px-2 py-0.5 bg-green">
              {year}
            </div>
            <p className="font-medium md:text-xl">{type}</p>
          </div>
          <p className="text-justify text-sm md:text-base mt-3">{desc}</p>
        </div>
      </div>

      <hr className="my-12" />
    </>
  );
};

export default ProjectCard;

import { Timeline } from "@material-tailwind/react";
import experienceData from "../data/experience-data";
import ExperienceItem from "../components/experience-item";

const Experience = () => {
  return (
    <div className="pt-6">
      <h1 className="font-bold text-3xl md:text-4xl md:mb-14 md:text-center">
        Experience that I have <span className="text-green">had</span>
      </h1>

      <hr className="my-4 md:hidden" />

      <div className="md:flex">
        <div className="hidden md:flex items-center justify-center flex-1">
          <h1 className="font-bold text-3xl">Nanti Dikasih Illustrator</h1>
        </div>

        <Timeline className="mb-32 mt-12 flex-1">
          {experienceData.map((item, index) => {
            return (
              <ExperienceItem
                key={index}
                logo={item.logo}
                title={item.title}
                organisation={item.organisation}
                time={item.time}
                desc={item.desc}
                images={item.images}
              />
            );
          })}
        </Timeline>
      </div>
    </div>
  );
};

export default Experience;

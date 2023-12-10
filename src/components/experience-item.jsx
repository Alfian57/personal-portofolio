import {
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

const ExperienceItem = ({ logo, title, organisation, time, desc, images }) => {
  return (
    <TimelineItem>
      <TimelineConnector />
      <TimelineHeader>
        <TimelineIcon className="p-0">
          <Avatar size="md" src={logo} alt="Seven Inc" withBorder />
        </TimelineIcon>
        <h2 className="font-bold font-poppins text-lg md:text-3xl flex flex-col">
          {title}
          <span className="text-base md:text-2xl font-semibold">{organisation}</span>
          <span className="text-sm md:text-xl font-normal">{time}</span>
        </h2>
      </TimelineHeader>
      <TimelineBody className="pb-8">
        <Typography color="gary" className="text-sm md:text-lg text-justify font-inter text-gray-300">
          <ul className="list-disc mb-3">
            {desc.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {images.map((image, index) => {
              return <img key={index} src={image.src} alt={image.alt} className="rounded-lg" />;
            })}
          </div>
        </Typography>
      </TimelineBody>
    </TimelineItem>
  );
};

export default ExperienceItem;

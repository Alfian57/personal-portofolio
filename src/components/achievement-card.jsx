import { Carousel } from "@material-tailwind/react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";

const AchievementCard = ({ title, organisation, images, techLogos, desc }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const handleOpen = (index) => {
    setOpen(!open);
    setIndex(index ? index : 0);
  };

  return (
    <div className="mb-12 md:mt-24">
      <h2 className="font-bold text-xl md:text-2xl md:text-center">{title}</h2>
      <h5 className="text-sm font-inter md:text-lg md:font-semibold md:text-center text-green">{organisation}</h5>

      <Dialog open={open} handler={handleOpen} className="max-h-[85vh] overflow-y-scroll">
        <img src={images[index].src} alt={images[index].alt} className="h-full w-full object-cover" />
      </Dialog>

      <Carousel className="rounded-xl overflow-hidden transition-all my-4 w-full md:w-2/3 mx-auto">
        {images.map((image, index) => {
          return (
            <div className="relative group" onClick={() => handleOpen(index)}>
              <h1 className="font-bold absolute text-xl md:text-4xl text-white top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 z-10">
                Click Me
              </h1>
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className="h-full w-full aspect-video object-cover object-center group-hover:scale-125 transition-all duration-300 delay-100"
              />
            </div>
          );
        })}
      </Carousel>

      <div className="flex gap-3 justify-center mb-3">
        {techLogos.map((logo) => {
          return (
            <div className="border bg-white rounded-xl shadow-lg p-1">
              <img src={logo.src} alt={logo.alt} className="w-6 md:w-10" title={logo.alt} />
            </div>
          );
        })}
      </div>
      <p className="font-inter text-sm md:text-lg md:font-medium text-justify md:text-center">{desc}</p>
    </div>
  );
};

export default AchievementCard;

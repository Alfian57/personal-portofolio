import { FaInstagram, FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa6";
import avatar from "../assets/avatar.png";
import SkillCard from "../components/skill-card";
import ReactTypingEffect from "react-typing-effect";
import { Button } from "@material-tailwind/react";

const Biography = () => {
  return (
    <div className="pt-6 pb-20 flex flex-col md:items-center md:gap-10">
      <div className="md:flex-1">
        <div className="border-4 w-3/5 md:w-3/5 mx-auto aspect-square rounded-full mb-5 md:mb-0 flex justify-center items-center">
          <img src={avatar} alt="Avatar" />
        </div>
      </div>

      <div className="md:flex-1">
        <h1 className="text-center text-red-800 text-7xl absolute font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Masih Jelek
        </h1>
        <h1 className="text-2xl md:text-5xl font-bold text-center">
          Hi, I'am <span className="text-green">Alfian Gading</span>
        </h1>
        <h2 className="text-xl md:text-4xl font-bold text-center mb-5">
          I'am a{" "}
          <ReactTypingEffect
            text={["Informatics Student", "Fullstack Enthusiasm"]}
            eraseDelay={2000}
            typingDelay={500}
            speed={100}
            eraseSpeed={100}
            className="font-extrabold"
          />
        </h2>

        <div className="flex gap-5 justify-center mb-5">
          <FaLinkedin className="text-3xl md:text-4xl hover:text-green" />
          <FaInstagram className="text-3xl md:text-4xl hover:text-green" />
          <FaGithub className="text-3xl md:text-4xl hover:text-green" />
          <FaWhatsapp className="text-3xl md:text-4xl hover:text-green" />
        </div>

        <p className="text-justify md:text-center font-poppins md:text-xl mb-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam optio asperiores natus quas corrupti. Vero,
          voluptatum. Consectetur tempore magni autem?
        </p>

        <div className="flex justify-center">
          <Button className="bg-green hover:brightness-75">Download Resume</Button>
        </div>
      </div>
    </div>
  );
};

export default Biography;

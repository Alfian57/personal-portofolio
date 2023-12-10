import sevenInc from "../assets/seven-inc.jpg";
import integra from "../assets/integra.jpg";

import sevenInc1 from "../assets/experience/seven-inc-1.jpg";
import sevenInc2 from "../assets/experience/seven-inc-2.jpg";

import integra1 from "../assets/experience/seven-inc-2.jpg";

const experienceData = [
  {
    title: "Backend Developer",
    organisation: "Seven Inc",
    time: "June 2023 - September 2023",
    logo: sevenInc,
    desc: [
      "Successfully managed and maintained the office's server infrastructure, ensuring smooth daily operations and acquiring valuable insights into server management and system administration.",
      "Contributed to web application development projects using WordPress and Laravel, enhancing my skills in content management system (CMS) development and backend web development.",
      'Recognized as "Best Intern of the Month" in July 2023 for my dedication and contributions to the team, underscoring my commitment to excellence in the workplace.',
    ],
    images: [
      {
        src: sevenInc1,
        alt: "Test",
      },
      {
        src: sevenInc2,
        alt: "Test",
      },
    ],
  },
  {
    title: "Fullstack Developer",
    organisation: "PT. Integra Inovasi Indonesia",
    time: "June 2022 - December 2022",
    logo: integra,
    desc: [
      "Developed a groundbreaking academy attendance operation, both web-grounded and Android-grounded, to address the unique requirements of the academy. This hands-on experience allowed me to strengthen my chops in website and mobile app development.",
      "Took the initiative to design and implement the application, ensuring its user-friendly interface and optimal functionality. This project demonstrated my ability to tackle complex tasks and deliver innovative solutions.",
      "Gained practical knowledge in Full Stack Development, with a focus on creating seamless user experiences across web and mobile platforms.",
    ],
    images: [
      {
        src: integra1,
        alt: "Test",
      },
    ],
  },
];

export default experienceData;

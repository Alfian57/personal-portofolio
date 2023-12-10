const SkillCard = ({ title, body, icon }) => {
  return (
    <div className="bg-secondary min-h-[30vh] rounded-xl px-3 pt-8 pb-3 flex-1 relative shadow-lg">
      <div className="border-2 border-white rounded-full absolute left-1/2 -translate-x-1/2 -top-8 md:-top-14 z-20">
        <img src={icon} className="p-3 md:p-6 h-14 md:h-20 mx-auto aspect-square" />
      </div>
      <h5 className="text-center font-semibold text-sm md:text-xl mb-3">{title}</h5>
      <p className="text-xs md:text-lg text-justify">{body}</p>
    </div>
  );
};

export default SkillCard;

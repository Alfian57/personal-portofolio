import AchievementCard from "../components/achievement-card";
import achievementData from "../data/achievement-data";

const Achievement = () => {
  console.log(achievementData);
  return (
    <div className="pt-6 pb-12">
      <h1 className="font-bold text-3xl md:text-4xl md:mb-14 md:text-center">
        Achievement that I <span className="text-green">won</span>
      </h1>

      <hr className="my-4 md:hidden" />

      {achievementData.map((item, index) => {
        return (
          <AchievementCard
            key={index}
            title={item.title}
            organisation={item.organisation}
            images={item.images}
            techLogos={item.techLogos}
            desc={item.desc}
          />
        );
      })}
    </div>
  );
};

export default Achievement;

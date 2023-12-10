import CertificateCard from "../components/certificate-card";
import certificateData from "../data/certificate-data";

const Certificate = () => {
  return (
    <div className="pt-6 pb-12">
      <h1 className="font-bold text-3xl md:text-4xl md:mb-14 md:text-center">
        Certificate that I <span className="text-green">have</span>
      </h1>

      <hr className="my-4 md:hidden" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {certificateData.map((item, index) => {
          return (
            <CertificateCard
              key={index}
              title={item.title}
              organisation={item.organisation}
              image={item.image}
              link={item.link}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Certificate;

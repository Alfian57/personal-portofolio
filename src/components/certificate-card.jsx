const CertificateCard = ({ title, organisation, image, link }) => {
  return (
    <a className="group" href={link} target="_blank">
      <figure className="relative rounded-xl overflow-hidden w-full aspect-video shadow-2xl mb-3">
        <h5 className="font-bold text-lg md:text-xl text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          View Credentials
        </h5>

        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover object-center group-hover:scale-125 transition-all duration-300 delay-100"
        />
      </figure>

      <div className="font-inter text-center">
        <h2 className="font-bold md:text-xl">{title}</h2>
        <h5 className="font-semibold text-sm md:text-base text-green">{organisation}</h5>
      </div>
    </a>
  );
};

export default CertificateCard;

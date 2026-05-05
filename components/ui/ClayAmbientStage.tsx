export function ClayAmbientStage() {
  return (
    <div className="clay-ambient-stage" aria-hidden="true">
      <div className="ambient-orb ambient-orb-one" />
      <div className="ambient-orb ambient-orb-two" />

      <div className="ambient-ribbon ambient-ribbon-one">
        <span />
        <span />
      </div>

      <div className="ambient-ribbon ambient-ribbon-two">
        <span />
        <span />
      </div>

      <div className="ambient-stack ambient-stack-one">
        <span />
        <span />
        <span />
      </div>

      <div className="ambient-tile-cluster">
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="ambient-mini ambient-mini-one" />
      <div className="ambient-mini ambient-mini-two" />
      <div className="ambient-mini ambient-mini-three" />
    </div>
  );
}

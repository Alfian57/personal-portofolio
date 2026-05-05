type Clay3DAssetVariant = "workspace" | "database" | "cube" | "orbit" | "badge" | "message";

interface Clay3DAssetProps {
  variant: Clay3DAssetVariant;
  className?: string;
  delay?: "none" | "short" | "medium" | "long";
}

const delayClass = {
  none: "",
  short: "clay-asset-delay-short",
  medium: "clay-asset-delay-medium",
  long: "clay-asset-delay-long",
};

export function Clay3DAsset({ variant, className = "", delay = "none" }: Clay3DAssetProps) {
  return (
    <aside
      aria-hidden="true"
      className={`clay-3d-asset clay-3d-${variant} ${delayClass[delay]} ${className}`}
    >
      <div className="clay-3d-shadow" />
      <div className="clay-3d-inner">
        {variant === "workspace" && (
          <>
            <span className="clay-window">
              <i />
              <i />
              <i />
              <b />
              <b />
            </span>
            <span className="clay-key clay-key-one" />
            <span className="clay-key clay-key-two" />
            <span className="clay-key clay-key-three" />
          </>
        )}

        {variant === "database" && (
          <>
            <span className="clay-disc clay-disc-one" />
            <span className="clay-disc clay-disc-two" />
            <span className="clay-disc clay-disc-three" />
          </>
        )}

        {variant === "cube" && (
          <>
            <span className="clay-cube-face clay-cube-top" />
            <span className="clay-cube-face clay-cube-left" />
            <span className="clay-cube-face clay-cube-right" />
          </>
        )}

        {variant === "orbit" && (
          <>
            <span className="clay-orb-core" />
            <span className="clay-orbit-ring clay-orbit-ring-one" />
            <span className="clay-orbit-ring clay-orbit-ring-two" />
            <span className="clay-orbit-dot clay-orbit-dot-one" />
            <span className="clay-orbit-dot clay-orbit-dot-two" />
          </>
        )}

        {variant === "badge" && (
          <>
            <span className="clay-badge-main" />
            <span className="clay-badge-ribbon clay-badge-ribbon-left" />
            <span className="clay-badge-ribbon clay-badge-ribbon-right" />
            <span className="clay-badge-check" />
          </>
        )}

        {variant === "message" && (
          <>
            <span className="clay-message-card clay-message-card-back" />
            <span className="clay-message-card clay-message-card-front">
              <i />
              <i />
              <b />
            </span>
          </>
        )}
      </div>
    </aside>
  );
}

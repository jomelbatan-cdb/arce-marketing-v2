type FullscreenLoaderProps = {
  /** Width of the area the loader should cover (default: 100vw) */
  width?: string;
  /** Height of the area the loader should cover (default: 100vh) */
  height?: string;
};

export default function FullscreenLoader({
  width = "100vw",
  height = "100vh",
}: FullscreenLoaderProps) {
  return (
    <div
      style={{ width, height }}
      className="fixed inset-0 flex items-center justify-center"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="loader" />
    </div>
  );
}

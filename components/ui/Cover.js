// Generative colourful cover art for projects/posts. Pass `image` to use a real picture instead.
export default function Cover({ title = '', hue = 245, image, className = '' }) {
  const initials = title
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (image) {
    return (
      <div className={`cover ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="cover-img" loading="lazy" />
      </div>
    );
  }

  hue = 245;
  const h2 = 250;
  return (
    <div
      className={`cover ${className}`}
      style={{
        background: `radial-gradient(90% 80% at 85% 100%, hsl(${h2} 90% 62% / .85), transparent 62%),
                     radial-gradient(80% 70% at 10% 0%, hsl(${hue} 95% 66% / .9), transparent 60%),
                     linear-gradient(145deg, hsl(${hue} 80% 52%), hsl(${h2} 80% 38%))`,
      }}
    >
      <svg className="cover-lines" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[40, 80, 120, 160, 200, 240].map((r, i) => (
          <circle key={r} cx="310" cy="80" r={r} fill="none" stroke="#fff" strokeOpacity={0.3 - i * 0.04} />
        ))}
        <line x1="0" y1="235" x2="400" y2="150" stroke="#fff" strokeOpacity="0.3" />
        <circle cx="310" cy="80" r="5" fill="#fff" />
      </svg>
      <span className="cover-initials">{initials}</span>
    </div>
  );
}

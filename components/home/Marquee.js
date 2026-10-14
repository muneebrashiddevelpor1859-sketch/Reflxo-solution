const items = ['Strategy', 'Digital experiences', 'Brand systems', 'AI & automation', 'E-commerce', 'Growth'];

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Our capabilities">
      <div className="marquee-intro">
        <span className="marquee-status" aria-hidden="true" />
        <span>ONE TEAM, BUILT TO MOVE YOU FORWARD</span>
      </div>
      <div className="marquee-viewport">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-row" key={copy} aria-hidden={copy === 1}>
              {items.map((item) => (
                <span className="marquee-item" key={item}>
                  {item}
                  <i aria-hidden="true">✳</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

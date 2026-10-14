// import { stats } from '@/data/site';
// import Counter from '../ui/Counter';
// import Reveal from '../ui/Reveal';

// export default function Stats() {
//   return (
//     <section className="stats">
//       <div className="container stats-grid">
//         {stats.map((s, i) => (
//           <Reveal key={s.label} delay={i * 0.08} y={24}>
//             <div className="stat">
//               <span className="stat-value">
//                 <Counter to={s.value} suffix={s.suffix} />
//               </span>
//               <span className="stat-label">{s.label}</span>
//             </div>
//           </Reveal>
//         ))}
//       </div>
//     </section>
//   );
// }







import { stats } from '@/data/site';
import Counter from '../ui/Counter';
import Reveal from '../ui/Reveal';

export default function Stats() {
  return (
    <section 
      className="stats" 
      style={{
        backgroundImage: 'url(images/group-people-working-out-business-plan-office_1303-15773.avif)', // Yahan apni image ka path lagayein
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Darker Overlay div */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // Opacity ko 0.5 se barha kar 0.75 kar diya hai taake dark feel aaye
          backgroundColor: 'rgba(0, 0, 0, 0.75)', 
          zIndex: -1,
        }}
      />

      <div className="container stats-grid" style={{ position: 'relative', zIndex: 1 }}>
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} y={24}>
            <div className="stat">
              <span className="stat-value">
                <Counter to={s.value} suffix={s.suffix} />
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
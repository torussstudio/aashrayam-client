import campusVideo from '../../videos/CampusTour.mp4';
import './CampusVideo.css';

const CampusVideo = () => {
  return (
    <section className="cv-section">
      <div className="cv-container">

        <div className="cv-header">
          <div className="section-label">Campus Life</div>
          <h2 className="cv-title">A Greener, Quieter Place<br />That Keeps You Focused</h2>
          <p className="cv-subtitle">
            Set not next to, but within a mango orchard. The Aashrayam campus offers calm,
            distraction free learning with your routine, faculty, and future in one place.
          </p>
        </div>

        <div className="cv-video-wrap">
          <video
            className="cv-video"
            src={campusVideo}
            autoPlay
            muted
            playsInline
            loop
          />
        </div>

        <div className="cv-stats">
          <div className="cv-stat">
            <span className="cv-stat-value">5</span>
            <span className="cv-stat-label">Acre Orchard Campus</span>
          </div>
          <div className="cv-stat-divider" />
          <div className="cv-stat">
            <span className="cv-stat-value">100+</span>
            <span className="cv-stat-label">Mango Trees</span>
          </div>
          <div className="cv-stat-divider" />
          <div className="cv-stat">
            <span className="cv-stat-value">16K</span>
            <span className="cv-stat-label">Sq. ft. Classrooms</span>
          </div>
          <div className="cv-stat-divider" />
          <div className="cv-stat">
            <span className="cv-stat-value">Wi‑Fi</span>
            <span className="cv-stat-label">Throughout Campus</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CampusVideo;
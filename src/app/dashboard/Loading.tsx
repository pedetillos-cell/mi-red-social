export default function DashboardLoading() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <div className="title-skeleton" style={{ width: '300px', height: '32px' }}></div>
          <div className="subtitle-skeleton" style={{ width: '200px', height: '20px' }}></div>
        </div>
      </div>

      <div className="stats-grid">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="stat-card-skeleton">
            <div className="stat-header-skeleton">
              <div className="stat-icon-skeleton"></div>
              <div className="stat-title-skeleton"></div>
            </div>
            <div className="stat-value-skeleton"></div>
          </div>
        ))}
      </div>

      <div className="dashboard-loading-content">
        <div className="loading-section"></div>
        <div className="loading-section"></div>
      </div>
    </div>
  );
}

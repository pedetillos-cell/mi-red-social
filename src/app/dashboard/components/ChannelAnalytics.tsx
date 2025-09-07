'use client';

interface ChannelAnalyticsProps {
  stats: any;
  isLoading: boolean;
}

export default function ChannelAnalytics({ stats, isLoading }: ChannelAnalyticsProps) {
  if (isLoading) {
    return (
      <div className="channel-analytics">
        <h3 className="section-title">Analytics del Canal</h3>
        <div className="analytics-skeleton">
          <div className="chart-skeleton"></div>
          <div className="metrics-skeleton">
            <div className="metric-skeleton"></div>
            <div className="metric-skeleton"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="channel-analytics">
      <h3 className="section-title">Analytics del Canal</h3>
      
      <div className="analytics-content">
        <div className="engagement-chart">
          <div className="chart-placeholder">
            <span>📈 Gráfico de engagement</span>
            <p>+15% de crecimiento esta semana</p>
          </div>
        </div>
        
        <div className="analytics-metrics">
          <div className="metric">
            <span className="metric-label">Tasa de retención</span>
            <span className="metric-value">68%</span>
            <span className="metric-trend positive">+5%</span>
          </div>
          <div className="metric">
            <span className="metric-label">Avg. view duration</span>
            <span className="metric-value">4:32</span>
            <span className="metric-trend positive">+0:45</span>
          </div>
          <div className="metric">
            <span className="metric-label">Click-through rate</span>
            <span className="metric-value">7.2%</span>
            <span className="metric-trend negative">-0.8%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
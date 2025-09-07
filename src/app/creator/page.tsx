import Sidebar from '@/components/creator/Sidebar';
import Header from '@/components/creator/Header';
import StatsGrid from '@/components/creator/StatsGrid';
import Charts from '@/components/creator/Charts';
import VideosTable from '@/components/creator/VideosTable';
import MonetizationCards from '@/components/creator/MonetizationCards';
import MobileAppSection from '@/components/creator/MobileAppSection';

export default function CreatorDashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      
      <div className="main-content">
        <Header />
        
        <StatsGrid />
        
        <Charts />
        
        <VideosTable />
        
        <div className="section-header">
          <h3 className="section-title">Monetización</h3>
        </div>
        
        <MonetizationCards />
        
        <MobileAppSection />
      </div>
    </div>
  );
}
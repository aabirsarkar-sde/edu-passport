import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import ExecutiveKPIStrip from './components/ExecutiveKPIStrip';
import GlobalControls from './components/GlobalControls';
import EnrollmentFunnelChart from './components/EnrollmentFunnelChart';
import BasketParticipationHeatmap from './components/BasketParticipationHeatmap';
import PerformanceCorrelationMatrix from './components/PerformanceCorrelationMatrix';
import RealTimeEngagementPanel from './components/RealTimeEngagementPanel';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InstitutionalAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isExporting, setIsExporting] = useState(false);

  const tabOptions = [
    { key: 'overview', label: 'Overview', icon: 'BarChart3' },
    { key: 'enrollment', label: 'Enrollment Analysis', icon: 'Users' },
    { key: 'engagement', label: 'Student Engagement', icon: 'Activity' },
    { key: 'performance', label: 'Performance Analytics', icon: 'TrendingUp' },
    { key: 'predictive', label: 'Predictive Insights', icon: 'Brain' }
  ];

  const handleExportReport = async () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      console.log('Report exported successfully');
    }, 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <ExecutiveKPIStrip />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <EnrollmentFunnelChart />
              </div>
              <div className="xl:col-span-1">
                <RealTimeEngagementPanel />
              </div>
            </div>
          </div>
        );
      case 'enrollment':
        return (
          <div className="space-y-8">
            <EnrollmentFunnelChart />
            <BasketParticipationHeatmap />
          </div>
        );
      case 'engagement':
        return (
          <div className="space-y-8">
            <BasketParticipationHeatmap />
            <RealTimeEngagementPanel />
          </div>
        );
      case 'performance':
        return (
          <div className="space-y-8">
            <PerformanceCorrelationMatrix />
            <ExecutiveKPIStrip />
          </div>
        );
      case 'predictive':
        return (
          <div className="space-y-8">
            <PredictiveAnalytics />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8 gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 break-words">
                Institutional Analytics Dashboard
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground break-words">
                Strategic insights into student engagement patterns and program effectiveness
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 flex-shrink-0">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                loading={isExporting}
                onClick={handleExportReport}
                className="w-full sm:w-auto"
              >
                {isExporting ? 'Exporting...' : 'Export Report'}
              </Button>
              <Button
                variant="default"
                iconName="Settings"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Configure Dashboard
              </Button>
            </div>
          </div>

          {/* Global Controls */}
          <GlobalControls />

          {/* Tab Navigation */}
          <div className="academic-card p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              {tabOptions?.map((tab) => (
                <Button
                  key={tab?.key}
                  variant={activeTab === tab?.key ? 'default' : 'ghost'}
                  size="sm"
                  iconName={tab?.icon}
                  iconPosition="left"
                  onClick={() => setActiveTab(tab?.key)}
                  className="flex-shrink-0 text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">{tab?.label}</span>
                  <span className="sm:hidden">{tab?.label?.split(' ')?.[0]}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6 sm:space-y-8">
            {renderTabContent()}
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-8 sm:mt-12 academic-card p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 break-words">
                  Need More Insights?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground break-words">
                  Access advanced analytics tools and custom report generation
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 flex-shrink-0">
                <Button variant="outline" iconName="FileText" className="w-full sm:w-auto text-xs sm:text-sm">
                  Custom Reports
                </Button>
                <Button variant="outline" iconName="Database" className="w-full sm:w-auto text-xs sm:text-sm">
                  Data Export
                </Button>
                <Button variant="default" iconName="Zap" className="w-full sm:w-auto text-xs sm:text-sm">
                  Advanced Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg flex-shrink-0">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-sm font-semibold text-foreground">EduPassport Analytics</span>
                <p className="text-xs text-muted-foreground">Institutional Dashboard</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-1 sm:space-y-0 text-xs sm:text-sm text-muted-foreground">
              <span>Last Updated: Dec 12, 2024</span>
              <span className="hidden sm:inline">•</span>
              <span>Data Refresh: Every 15 minutes</span>
              <span className="hidden sm:inline">•</span>
              <span>© {new Date()?.getFullYear()} EduPassport</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InstitutionalAnalyticsDashboard;
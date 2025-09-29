import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import StudentPerformanceOverviewDashboard from './pages/student-performance-overview-dashboard';
import InstitutionalAnalyticsDashboard from './pages/institutional-analytics-dashboard';
import AcademicAdvisorMonitoringDashboard from './pages/academic-advisor-monitoring-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AcademicAdvisorMonitoringDashboard />} />
        <Route path="/student-performance-overview-dashboard" element={<StudentPerformanceOverviewDashboard />} />
        <Route path="/institutional-analytics-dashboard" element={<InstitutionalAnalyticsDashboard />} />
        <Route path="/academic-advisor-monitoring-dashboard" element={<AcademicAdvisorMonitoringDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

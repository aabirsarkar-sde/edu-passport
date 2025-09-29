import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutiveKPIStrip = () => {
  const kpiData = [
    {
      id: 1,
      title: "Total Enrollment",
      value: "12,847",
      change: "+8.3%",
      trend: "up",
      period: "vs last year",
      icon: "Users",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      title: "Average CGPA",
      value: "7.42",
      change: "+0.18",
      trend: "up",
      period: "vs last semester",
      icon: "TrendingUp",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 3,
      title: "Activity Participation",
      value: "84.6%",
      change: "+12.4%",
      trend: "up",
      period: "vs last year",
      icon: "Activity",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: 4,
      title: "Program Completion",
      value: "91.2%",
      change: "-2.1%",
      trend: "down",
      period: "vs last year",
      icon: "GraduationCap",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {kpiData?.map((kpi) => (
        <div key={kpi?.id} className="academic-card-interactive p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${kpi?.bgColor}`}>
              <Icon name={kpi?.icon} size={24} className={kpi?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              kpi?.trend === 'up' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={kpi?.trend === 'up' ? 'ArrowUp' : 'ArrowDown'} 
                size={16} 
              />
              <span>{kpi?.change}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {kpi?.title}
            </h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-foreground">
                {kpi?.value}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {kpi?.period}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExecutiveKPIStrip;
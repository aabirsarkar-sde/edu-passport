import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertStrip = ({ atRiskCount, interventions, upcomingDeadlines, onViewDetails }) => {
  const alerts = [
    {
      type: 'critical',
      icon: 'AlertTriangle',
      title: `${atRiskCount} Students at Risk`,
      description: 'Require immediate intervention',
      action: 'View Students',
      color: 'bg-error/10 border-error/20 text-error'
    },
    {
      type: 'warning',
      icon: 'Clock',
      title: `${interventions} Pending Interventions`,
      description: 'Follow-up actions needed',
      action: 'Review',
      color: 'bg-warning/10 border-warning/20 text-warning'
    },
    {
      type: 'info',
      icon: 'Calendar',
      title: `${upcomingDeadlines} Upcoming Deadlines`,
      description: 'Next 7 days',
      action: 'View Calendar',
      color: 'bg-primary/10 border-primary/20 text-primary'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="AlertCircle" size={20} />
          <span>Advisor Alerts</span>
        </h2>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date()?.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alerts?.map((alert) => (
          <div key={alert?.type} className={`border rounded-lg p-4 ${alert?.color}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Icon name={alert?.icon} size={20} />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{alert?.title}</h3>
                  <p className="text-xs opacity-80 mt-1">{alert?.description}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(alert?.type)}
                className="text-xs h-8"
              >
                {alert?.action}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground data-font">24</div>
            <div className="text-xs text-muted-foreground">Total Advisees</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success data-font">18</div>
            <div className="text-xs text-muted-foreground">On Track</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning data-font">4</div>
            <div className="text-xs text-muted-foreground">Needs Attention</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-error data-font">2</div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertStrip;
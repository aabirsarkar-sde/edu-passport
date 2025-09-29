import React from 'react';
import Icon from '../../../components/AppIcon';

const GoalProgressTracker = ({ goals }) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-success';
    if (percentage >= 70) return 'bg-primary';
    if (percentage >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'at-risk': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-primary';
      case 'at-risk': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="academic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Goal Progress</h3>
          <p className="text-sm text-muted-foreground">Academic year milestones</p>
        </div>
        <Icon name="Target" size={20} className="text-accent" />
      </div>
      <div className="space-y-6">
        {goals?.map((goal) => (
          <div key={goal?.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getStatusIcon(goal?.status)} 
                  size={16} 
                  className={getStatusColor(goal?.status)} 
                />
                <div>
                  <h4 className="text-sm font-medium text-foreground">{goal?.title}</h4>
                  <p className="text-xs text-muted-foreground">{goal?.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{goal?.progress}%</p>
                <p className="text-xs text-muted-foreground">
                  {goal?.current}/{goal?.target}
                </p>
              </div>
            </div>

            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(goal?.progress)}`}
                style={{ width: `${goal?.progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Due: {new Date(goal.deadline)?.toLocaleDateString()}
              </span>
              <span className={`font-medium ${getStatusColor(goal?.status)}`}>
                {goal?.status?.replace('-', ' ')?.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-accent hover:text-accent/80 font-medium transition-colors">
          Set New Goal
        </button>
      </div>
    </div>
  );
};

export default GoalProgressTracker;
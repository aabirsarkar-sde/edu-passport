import React from 'react';
import Icon from '../../../components/AppIcon';

const BasketPerformanceCard = ({ basket, data, peerComparison }) => {
  const completionPercentage = Math.round((data?.completed / data?.total) * 100);
  const peerAvgPercentage = Math.round((peerComparison?.average / data?.total) * 100);
  
  const isAbovePeer = completionPercentage > peerAvgPercentage;

  const getBasketColor = () => {
    const colors = {
      'Academic': 'bg-primary',
      'Clubs': 'bg-accent', 
      'Competitions': 'bg-warning',
      'Workshops': 'bg-success',
      'Community': 'bg-error'
    };
    return colors?.[basket] || 'bg-muted';
  };

  const getBasketIcon = () => {
    const icons = {
      'Academic': 'BookOpen',
      'Clubs': 'Users',
      'Competitions': 'Trophy', 
      'Workshops': 'Briefcase',
      'Community': 'Heart'
    };
    return icons?.[basket] || 'Star';
  };

  return (
    <div className="academic-card p-3 sm:p-4">
      <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${getBasketColor()} flex-shrink-0`}>
          <Icon name={getBasketIcon()} size={14} color="white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs sm:text-sm font-semibold text-foreground truncate">{basket}</h3>
          <p className="text-xs text-muted-foreground">Activity basket</p>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Percentile</span>
            <span className="text-xs font-medium text-foreground">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
            <div 
              className={`h-1.5 sm:h-2 rounded-full ${getBasketColor()}`}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats */}

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Points:</span>
          <span className="font-medium text-foreground break-all">{data?.points}</span>
        </div>

        {/* Peer Comparison */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">vs Peers:</span>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <Icon 
                name={isAbovePeer ? "TrendingUp" : "TrendingDown"} 
                size={10} 
                className={isAbovePeer ? "text-success" : "text-error"}
              />
              <span className={`font-medium ${isAbovePeer ? "text-success" : "text-error"}`}>
                {isAbovePeer ? "+" : ""}{completionPercentage - peerAvgPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPerformanceCard;
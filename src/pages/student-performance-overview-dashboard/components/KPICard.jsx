import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, trend, trendValue, icon, color, description }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="academic-card p-4 sm:p-6">
      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${color} flex-shrink-0`}>
            <Icon name={icon} size={20} color="white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</h3>
            <p className="text-xl sm:text-2xl font-bold text-foreground break-words">{value}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor()} flex-shrink-0`}>
          <Icon name={getTrendIcon()} size={14} />
          <span className="text-xs sm:text-sm font-medium">{trendValue}</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2 break-words">{description}</p>
    </div>
  );
};

export default KPICard;
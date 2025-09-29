import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementFeed = ({ achievements }) => {
  const getBasketColor = (basket) => {
    const colors = {
      'Academic': 'bg-primary',
      'Clubs': 'bg-accent',
      'Competitions': 'bg-warning',
      'Workshops': 'bg-success',
      'Community': 'bg-error'
    };
    return colors?.[basket] || 'bg-muted';
  };

  const getBasketIcon = (basket) => {
    const icons = {
      'Academic': 'BookOpen',
      'Clubs': 'Users',
      'Competitions': 'Trophy',
      'Workshops': 'Briefcase',
      'Community': 'Heart'
    };
    return icons?.[basket] || 'Star';
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div className="academic-card p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">Recent Achievements</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Latest milestones and activities</p>
        </div>
        <Icon name="Award" size={20} className="text-accent flex-shrink-0" />
      </div>
      <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
        {achievements?.map((achievement) => (
          <div key={achievement?.id} className="flex items-start space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-lg hover:bg-muted transition-colors">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${getBasketColor(achievement?.basket)} flex-shrink-0`}>
              <Icon name={getBasketIcon(achievement?.basket)} size={14} color="white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1 gap-2">
                <h4 className="text-xs sm:text-sm font-medium text-foreground break-words flex-1">
                  {achievement?.title}
                </h4>
                <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                  {formatTimeAgo(achievement?.date)}
                </span>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2 break-words">
                {achievement?.description}
              </p>
              
              <div className="flex items-center justify-between gap-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBasketColor(achievement?.basket)} text-white flex-shrink-0`}>
                  {achievement?.basket}
                </span>
                
                {achievement?.points && (
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <Icon name="Plus" size={10} className="text-success" />
                    <span className="text-xs font-medium text-success">
                      {achievement?.points} pts
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
        <button className="w-full text-xs sm:text-sm text-accent hover:text-accent/80 font-medium transition-colors">
          View All Achievements
        </button>
      </div>
    </div>
  );
};

export default AchievementFeed;
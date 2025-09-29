import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentProfilePanel = ({ student, recommendations }) => {
  if (!student) {
    return (
      <div className="academic-card h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Student</h3>
          <p className="text-sm text-muted-foreground">
            Choose a student from the table to view their detailed profile and performance analytics.
          </p>
        </div>
      </div>
    );
  }

  const basketData = [
    {
      name: 'Academic',
      score: student?.baskets?.academic,
      color: 'bg-blue-500',
      icon: 'GraduationCap',
      details: `CGPA: ${student?.cgpa?.toFixed(2)} • Credits: ${student?.credits}`
    },
    {
      name: 'Clubs & Fests',
      score: student?.baskets?.clubs,
      color: 'bg-purple-500',
      icon: 'Users',
      details: `${student?.clubMemberships} memberships • ${student?.eventParticipation} events`
    },
    {
      name: 'Competitions',
      score: student?.baskets?.competitions,
      color: 'bg-orange-500',
      icon: 'Trophy',
      details: `${student?.competitionWins} wins • ${student?.competitionParticipation} participated`
    },
    {
      name: 'Workshops',
      score: student?.baskets?.workshops,
      color: 'bg-green-500',
      icon: 'BookOpen',
      details: `${student?.workshopsAttended} attended • ${student?.certificationsEarned} certifications`
    },
    {
      name: 'Community Service',
      score: student?.baskets?.community,
      color: 'bg-red-500',
      icon: 'Heart',
      details: `${student?.volunteerHours} hours • ${student?.communityProjects} projects`
    }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'High': return 'text-error';
      case 'Critical': return 'text-error font-semibold';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="academic-card h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold text-primary">
                {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">{student?.name}</h3>
              <p className="text-sm text-muted-foreground">{student?.studentId}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-muted-foreground">
                  {student?.program} • Year {student?.year}
                </span>
                <span className={`text-sm font-medium ${getRiskColor(student?.riskLevel)}`}>
                  {student?.riskLevel} Risk
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="MessageCircle">
              Message
            </Button>
            <Button variant="default" size="sm" iconName="Calendar">
              Schedule
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Performance Overview */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Performance Overview</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-foreground data-font">{student?.cgpa?.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Current CGPA</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-foreground data-font">{student?.activityScore}</div>
              <div className="text-sm text-muted-foreground">Activity Score</div>
            </div>
          </div>
        </div>

        {/* Basket Performance */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Basket Performance</h4>
          <div className="space-y-3">
            {basketData?.map((basket) => (
              <div key={basket?.name} className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${basket?.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={basket?.icon} size={16} color="white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{basket?.name}</span>
                    <span className="text-sm font-medium text-foreground data-font">{basket?.score}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`${basket?.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${basket?.score}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{basket?.details}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h4>
          <div className="space-y-3">
            {student?.recentActivity?.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                <div className="flex-1">
                  <div className="text-sm text-foreground">{activity?.description}</div>
                  <div className="text-xs text-muted-foreground">{activity?.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        {recommendations && recommendations?.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Icon name="Lightbulb" size={16} />
              <span>AI Recommendations</span>
            </h4>
            <div className="space-y-3">
              {recommendations?.map((rec, index) => (
                <div key={index} className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Icon name="ArrowRight" size={14} className="text-accent mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm text-foreground">{rec?.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{rec?.description}</div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          rec?.priority === 'High' ? 'bg-error/10 text-error' :
                          rec?.priority === 'Medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                        }`}>
                          {rec?.priority} Priority
                        </span>
                        <span className="text-xs text-muted-foreground">{rec?.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfilePanel;
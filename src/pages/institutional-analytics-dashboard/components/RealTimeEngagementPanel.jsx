import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealTimeEngagementPanel = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveMetrics, setLiveMetrics] = useState({
    activeStudents: 8247,
    ongoingEvents: 12,
    libraryOccupancy: 78,
    labUtilization: 65
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time data updates
      setLiveMetrics(prev => ({
        activeStudents: prev?.activeStudents + Math.floor(Math.random() * 20 - 10),
        ongoingEvents: prev?.ongoingEvents + Math.floor(Math.random() * 3 - 1),
        libraryOccupancy: Math.max(0, Math.min(100, prev?.libraryOccupancy + Math.floor(Math.random() * 10 - 5))),
        labUtilization: Math.max(0, Math.min(100, prev?.labUtilization + Math.floor(Math.random() * 8 - 4)))
      }));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Symposium 2024",
      time: "2:00 PM",
      location: "Main Auditorium",
      attendees: 450,
      status: "starting-soon",
      type: "academic"
    },
    {
      id: 2,
      title: "Basketball Championship",
      time: "4:30 PM",
      location: "Sports Complex",
      attendees: 280,
      status: "registration-open",
      type: "sports"
    },
    {
      id: 3,
      title: "Career Fair",
      time: "10:00 AM Tomorrow",
      location: "Exhibition Hall",
      attendees: 1200,
      status: "upcoming",
      type: "career"
    },
    {
      id: 4,
      title: "Research Presentation",
      time: "11:00 AM Tomorrow",
      location: "Conference Room A",
      attendees: 85,
      status: "upcoming",
      type: "research"
    }
  ];

  const retentionRisks = [
    {
      id: 1,
      studentId: "ST2024001",
      name: "Alex Johnson",
      department: "Engineering",
      riskLevel: "high",
      factors: ["Low attendance", "Declining grades", "No activity participation"],
      lastSeen: "3 days ago"
    },
    {
      id: 2,
      studentId: "ST2024045",
      name: "Sarah Chen",
      department: "Business",
      riskLevel: "medium",
      factors: ["Missed assignments", "Irregular attendance"],
      lastSeen: "1 day ago"
    },
    {
      id: 3,
      studentId: "ST2024089",
      name: "Michael Rodriguez",
      department: "Sciences",
      riskLevel: "high",
      factors: ["Academic probation", "No mentor meetings"],
      lastSeen: "5 days ago"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'starting-soon': return 'text-error';
      case 'registration-open': return 'text-warning';
      case 'upcoming': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="space-y-6">
      {/* Live Metrics */}
      <div className="academic-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Live Campus Metrics</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="data-font">{formatTime(currentTime)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Active Students</span>
            </div>
            <span className="text-2xl font-bold text-primary">
              {liveMetrics?.activeStudents?.toLocaleString()}
            </span>
          </div>

          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={20} className="text-accent" />
              <span className="text-sm font-medium text-foreground">Ongoing Events</span>
            </div>
            <span className="text-2xl font-bold text-accent">
              {liveMetrics?.ongoingEvents}
            </span>
          </div>

          <div className="p-4 bg-success/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="BookOpen" size={20} className="text-success" />
              <span className="text-sm font-medium text-foreground">Library</span>
            </div>
            <span className="text-2xl font-bold text-success">
              {liveMetrics?.libraryOccupancy}%
            </span>
          </div>

          <div className="p-4 bg-warning/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Cpu" size={20} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Lab Usage</span>
            </div>
            <span className="text-2xl font-bold text-warning">
              {liveMetrics?.labUtilization}%
            </span>
          </div>
        </div>
      </div>
      {/* Upcoming Events */}
      <div className="academic-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Upcoming Events Impact</h3>
          <Button variant="outline" size="sm" iconName="Calendar">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {upcomingEvents?.map((event) => (
            <div key={event?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-card rounded-lg">
                  <Icon 
                    name={
                      event?.type === 'academic' ? 'BookOpen' :
                      event?.type === 'sports' ? 'Trophy' :
                      event?.type === 'career' ? 'Briefcase' : 'Lightbulb'
                    } 
                    size={16} 
                    className="text-foreground" 
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{event?.title}</h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{event?.time}</span>
                    <span>•</span>
                    <span>{event?.location}</span>
                    <span>•</span>
                    <span>{event?.attendees} attendees</span>
                  </div>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(event?.status)}`}>
                {event?.status?.replace('-', ' ')?.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Retention Risk Alerts */}
      <div className="academic-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Retention Risk Alerts</h3>
          <Button variant="outline" size="sm" iconName="AlertTriangle">
            View All Risks
          </Button>
        </div>

        <div className="space-y-3">
          {retentionRisks?.map((student) => (
            <div key={student?.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground">{student?.name}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getRiskColor(student?.riskLevel)}`}>
                      {student?.riskLevel?.toUpperCase()} RISK
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {student?.studentId} • {student?.department} • Last seen: {student?.lastSeen}
                  </p>
                </div>
                <Button variant="outline" size="sm" iconName="MessageCircle">
                  Contact
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {student?.factors?.map((factor, index) => (
                  <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                    {factor}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimeEngagementPanel;
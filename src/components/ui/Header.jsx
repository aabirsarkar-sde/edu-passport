import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'Academic progress updated successfully', time: '2 min ago', read: false },
    { id: 2, type: 'warning', message: 'Advisor meeting scheduled for tomorrow', time: '1 hour ago', read: false },
    { id: 3, type: 'info', message: 'New analytics report available', time: '3 hours ago', read: true }
  ]);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [lastSync, setLastSync] = useState(new Date());

  const navigationItems = [
    {
      label: 'Student Dashboard',
      path: '/student-performance-overview-dashboard',
      icon: 'User',
      description: 'Individual performance tracking'
    },
    {
      label: 'Advisor Console',
      path: '/academic-advisor-monitoring-dashboard',
      icon: 'Users',
      description: 'Multi-student monitoring'
    },
    {
      label: 'Admin Panel',
      path: '/institutional-analytics-dashboard',
      icon: 'BarChart3',
      description: 'Institutional insights'
    }
  ];

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(n => n?.id === id ? { ...n, read: true } : n)
    );
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-success';
      case 'syncing': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4 sm:space-x-8">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-shrink-0">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-lg font-semibold text-foreground truncate">EduPassport</span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => {
              const isActive = location?.pathname === item?.path;
              return (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={item?.description}
                >
                  <Icon name={item?.icon} size={16} />
                  <span className="truncate max-w-24 lg:max-w-none">{item?.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Session Status Indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-2 sm:px-3 py-1 bg-muted rounded-md">
            <div className={`w-2 h-2 rounded-full ${getConnectionStatusColor()}`} />
            <span className="text-xs text-muted-foreground data-font">
              {formatTime(lastSync)}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {connectionStatus === 'connected' ? 'Live' : connectionStatus}
            </span>
          </div>

          {/* Notification Center */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
              className="relative"
            >
              <Icon name="Bell" size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-popover border border-border rounded-lg shadow-lg z-50">
                <div className="p-3 sm:p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground truncate">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    {unreadCount} unread notifications
                  </p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div
                      key={notification?.id}
                      className={`p-3 sm:p-4 border-b border-border last:border-b-0 cursor-pointer hover:bg-muted transition-colors ${
                        !notification?.read ? 'bg-accent/5' : ''
                      }`}
                      onClick={() => markAsRead(notification?.id)}
                    >
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification?.type === 'success' ? 'bg-success' :
                          notification?.type === 'warning'? 'bg-warning' : 'bg-primary'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground break-words">{notification?.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
                        </div>
                        {!notification?.read && (
                          <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full text-xs sm:text-sm">
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Icon name="Menu" size={18} />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-card">
        <nav className="flex overflow-x-auto px-3 sm:px-4 py-2 space-x-1">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span className="text-xs sm:text-sm">{item?.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Notification Overlay for Mobile */}
      {isNotificationOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsNotificationOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const GlobalControls = () => {
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedCohort, setSelectedCohort] = useState('current');

  const academicYears = [
    { value: '2024-25', label: '2024-25' },
    { value: '2023-24', label: '2023-24' },
    { value: '2022-23', label: '2022-23' },
    { value: '2021-22', label: '2021-22' }
  ];

  const programs = [
    { value: 'all', label: 'All Programs' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'sciences', label: 'Sciences' },
    { value: 'arts', label: 'Liberal Arts' },
    { value: 'medicine', label: 'Medicine' }
  ];

  const cohorts = [
    { value: 'current', label: 'Current Students' },
    { value: 'graduates', label: 'Recent Graduates' },
    { value: 'all', label: 'All Students' },
    { value: 'at-risk', label: 'At-Risk Students' }
  ];

  const handleExportSchedule = () => {
    console.log('Export scheduled');
  };

  const handleRefreshData = () => {
    console.log('Data refreshed');
  };

  return (
    <div className="academic-card p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={20} className="text-muted-foreground" />
            <Select
              options={academicYears}
              value={selectedYear}
              onChange={setSelectedYear}
              placeholder="Select Year"
              className="w-32"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Icon name="BookOpen" size={20} className="text-muted-foreground" />
            <Select
              options={programs}
              value={selectedProgram}
              onChange={setSelectedProgram}
              placeholder="Select Program"
              className="w-48"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Icon name="Users" size={20} className="text-muted-foreground" />
            <Select
              options={cohorts}
              value={selectedCohort}
              onChange={setSelectedCohort}
              placeholder="Select Cohort"
              className="w-40"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={handleRefreshData}
          >
            Refresh
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={handleExportSchedule}
          >
            Export
          </Button>

          <Button
            variant="default"
            size="sm"
            iconName="Settings"
            iconPosition="left"
          >
            Configure
          </Button>
        </div>
      </div>
      {/* Quick Stats Bar */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-6">
            <span>Last Updated: Dec 12, 2024 at 7:23 PM</span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Live Data</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Showing: {selectedProgram === 'all' ? 'All Programs' : programs?.find(p => p?.value === selectedProgram)?.label}</span>
            <span>•</span>
            <span>Academic Year: {selectedYear}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalControls;
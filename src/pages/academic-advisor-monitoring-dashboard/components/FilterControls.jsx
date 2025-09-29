import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  onExportData, 
  onResetFilters,
  studentCount 
}) => {
  const cohortOptions = [
    { value: 'all', label: 'All Students' },
    { value: '2024', label: 'Class of 2024' },
    { value: '2025', label: 'Class of 2025' },
    { value: '2026', label: 'Class of 2026' },
    { value: '2027', label: 'Class of 2027' }
  ];

  const riskLevelOptions = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' },
    { value: 'critical', label: 'Critical Risk' }
  ];

  const academicPeriodOptions = [
    { value: 'current', label: 'Current Semester' },
    { value: 'fall2024', label: 'Fall 2024' },
    { value: 'spring2024', label: 'Spring 2024' },
    { value: 'fall2023', label: 'Fall 2023' },
    { value: 'academic2024', label: 'Academic Year 2024' }
  ];

  const performanceLevelOptions = [
    { value: 'all', label: 'All Performance Levels' },
    { value: 'excellent', label: 'Excellent (3.5+)' },
    { value: 'good', label: 'Good (3.0-3.49)' },
    { value: 'average', label: 'Average (2.5-2.99)' },
    { value: 'below', label: 'Below Average (<2.5)' }
  ];

  const activityEngagementOptions = [
    { value: 'all', label: 'All Activity Levels' },
    { value: 'high', label: 'High Engagement (80+)' },
    { value: 'medium', label: 'Medium Engagement (50-79)' },
    { value: 'low', label: 'Low Engagement (<50)' }
  ];

  return (
    <div className="academic-card mb-6">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2 min-w-0">
            <Icon name="Filter" size={20} className="text-muted-foreground flex-shrink-0" />
            <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              ({studentCount} students)
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onResetFilters}
              iconName="RotateCcw"
              className="w-full sm:w-auto"
            >
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onExportData}
              iconName="Download"
              className="w-full sm:w-auto"
            >
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Select
            label="Student Cohort"
            options={cohortOptions}
            value={filters?.cohort}
            onChange={(value) => onFilterChange('cohort', value)}
            className="w-full"
          />

          <Select
            label="Risk Level"
            options={riskLevelOptions}
            value={filters?.riskLevel}
            onChange={(value) => onFilterChange('riskLevel', value)}
            className="w-full"
          />

          <Select
            label="Academic Period"
            options={academicPeriodOptions}
            value={filters?.academicPeriod}
            onChange={(value) => onFilterChange('academicPeriod', value)}
            className="w-full"
          />

          <Select
            label="Performance Level"
            options={performanceLevelOptions}
            value={filters?.performanceLevel}
            onChange={(value) => onFilterChange('performanceLevel', value)}
            className="w-full"
          />

          <Select
            label="Activity Engagement"
            options={activityEngagementOptions}
            value={filters?.activityEngagement}
            onChange={(value) => onFilterChange('activityEngagement', value)}
            className="w-full"
          />
        </div>

        {/* Active Filters Display */}
        {Object.values(filters)?.some(filter => filter !== 'all' && filter !== 'current') && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Tag" size={16} className="text-muted-foreground flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">Active Filters:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters)?.map(([key, value]) => {
                if (value === 'all' || value === 'current') return null;
                
                const getFilterLabel = (filterKey, filterValue) => {
                  const optionMap = {
                    cohort: cohortOptions,
                    riskLevel: riskLevelOptions,
                    academicPeriod: academicPeriodOptions,
                    performanceLevel: performanceLevelOptions,
                    activityEngagement: activityEngagementOptions
                  };
                  
                  const option = optionMap?.[filterKey]?.find(opt => opt?.value === filterValue);
                  return option ? option?.label : filterValue;
                };

                return (
                  <span
                    key={key}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20"
                  >
                    <span className="break-words">{getFilterLabel(key, value)}</span>
                    <button
                      onClick={() => onFilterChange(key, key === 'academicPeriod' ? 'current' : 'all')}
                      className="ml-2 hover:text-accent/80 flex-shrink-0"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterControls;
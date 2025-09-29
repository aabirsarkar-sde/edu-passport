import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const CohortHeatmap = ({ cohortData, onStudentDrillDown }) => {
  const [selectedBasket, setSelectedBasket] = useState('all');
  const [viewMode, setViewMode] = useState('performance'); // performance, risk, activity

  const baskets = [
    { id: 'all', name: 'All Baskets', color: 'bg-slate-500' },
    { id: 'academic', name: 'Academic', color: 'bg-blue-500' },
    { id: 'clubs', name: 'Clubs & Fests', color: 'bg-purple-500' },
    { id: 'competitions', name: 'Competitions', color: 'bg-orange-500' },
    { id: 'workshops', name: 'Workshops', color: 'bg-green-500' },
    { id: 'community', name: 'Community', color: 'bg-red-500' }
  ];

  const getHeatmapColor = (value, mode) => {
    if (mode === 'performance') {
      if (value >= 80) return 'bg-emerald-600';
      if (value >= 60) return 'bg-emerald-400';
      if (value >= 40) return 'bg-amber-400';
      if (value >= 20) return 'bg-red-400';
      return 'bg-red-600';
    } else if (mode === 'risk') {
      if (value === 'Low') return 'bg-emerald-600';
      if (value === 'Medium') return 'bg-amber-400';
      if (value === 'High') return 'bg-red-400';
      if (value === 'Critical') return 'bg-red-600';
      return 'bg-slate-300';
    } else {
      if (value >= 80) return 'bg-violet-600';
      if (value >= 60) return 'bg-violet-400';
      if (value >= 40) return 'bg-violet-300';
      if (value >= 20) return 'bg-violet-200';
      return 'bg-slate-300';
    }
  };

  const getDisplayValue = (student, mode) => {
    if (mode === 'performance') {
      return selectedBasket === 'all' 
        ? Math.round((student?.baskets?.academic + student?.baskets?.clubs + student?.baskets?.competitions + student?.baskets?.workshops + student?.baskets?.community) / 5)
        : student?.baskets?.[selectedBasket] || 0;
    } else if (mode === 'risk') {
      return student?.riskLevel;
    } else {
      return student?.activityScore;
    }
  };

  const getTextColor = (value, mode) => {
    if (mode === 'performance') {
      if (value >= 60) return 'text-white';
      return 'text-slate-800';
    } else if (mode === 'risk') {
      if (value === 'Low' || value === 'Critical') return 'text-white';
      return 'text-slate-800';
    } else {
      if (value >= 60) return 'text-white';
      return 'text-slate-800';
    }
  };

  // Ensure cohortData exists and has valid data
  const validCohortData = cohortData?.filter(student => 
    student?.id && 
    student?.name && 
    student?.baskets &&
    typeof student?.activityScore === 'number' &&
    student?.riskLevel
  ) || [];

  return (
    <div className="academic-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Cohort Performance Heatmap</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'performance' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('performance')}
            >
              Performance
            </Button>
            <Button
              variant={viewMode === 'risk' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('risk')}
            >
              Risk
            </Button>
            <Button
              variant={viewMode === 'activity' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('activity')}
            >
              Activity
            </Button>
          </div>
        </div>

        {/* Basket Filter */}
        {viewMode === 'performance' && (
          <div className="flex flex-wrap gap-2">
            {baskets?.map((basket) => (
              <Button
                key={basket?.id}
                variant={selectedBasket === basket?.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedBasket(basket?.id)}
                className="text-xs"
              >
                <div className={`w-3 h-3 ${basket?.color} rounded-full mr-2`} />
                {basket?.name}
              </Button>
            ))}
          </div>
        )}
      </div>
      <div className="p-6">
        {/* Heatmap Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2 mb-6">
          {validCohortData?.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              <p>No student data available for heatmap visualization</p>
            </div>
          ) : (
            validCohortData?.map((student) => {
              const value = getDisplayValue(student, viewMode);
              const colorClass = getHeatmapColor(value, viewMode);
              const textColor = getTextColor(value, viewMode);
              
              return (
                <div
                  key={student?.id}
                  className={`aspect-square ${colorClass} rounded-lg cursor-pointer hover:scale-110 transition-all duration-200 flex items-center justify-center group relative`}
                  onClick={() => onStudentDrillDown?.(student)}
                  title={`${student?.name} - ${viewMode === 'risk' ? value : value + (viewMode === 'performance' ? '%' : '')}`}
                >
                  <span className={`text-xs font-medium ${textColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    {student?.name?.split(' ')?.map(n => n?.[0])?.join('') || 'N/A'}
                  </span>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover border border-border rounded text-xs text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {student?.name}: {viewMode === 'risk' ? value : value + (viewMode === 'performance' ? '%' : '')}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-foreground">Legend:</span>
            {viewMode === 'performance' && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-emerald-600 rounded" />
                  <span className="text-xs text-muted-foreground">80-100%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-emerald-400 rounded" />
                  <span className="text-xs text-muted-foreground">60-79%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-amber-400 rounded" />
                  <span className="text-xs text-muted-foreground">40-59%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-red-400 rounded" />
                  <span className="text-xs text-muted-foreground">20-39%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-red-600 rounded" />
                  <span className="text-xs text-muted-foreground">0-19%</span>
                </div>
              </div>
            )}
            {viewMode === 'risk' && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-emerald-600 rounded" />
                  <span className="text-xs text-muted-foreground">Low</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-amber-400 rounded" />
                  <span className="text-xs text-muted-foreground">Medium</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-red-400 rounded" />
                  <span className="text-xs text-muted-foreground">High</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-red-600 rounded" />
                  <span className="text-xs text-muted-foreground">Critical</span>
                </div>
              </div>
            )}
            {viewMode === 'activity' && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-violet-600 rounded" />
                  <span className="text-xs text-muted-foreground">High Activity</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-violet-300 rounded" />
                  <span className="text-xs text-muted-foreground">Medium Activity</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-slate-300 rounded" />
                  <span className="text-xs text-muted-foreground">Low Activity</span>
                </div>
              </div>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            Click any cell to view student details • Showing {validCohortData?.length} students
          </div>
        </div>
      </div>
    </div>
  );
};

export default CohortHeatmap;
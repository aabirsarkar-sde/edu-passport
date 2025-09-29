import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';

const TimelineChart = ({ data, selectedBaskets }) => {
  const [selectedSemester, setSelectedSemester] = useState(null);

  const filteredData = data?.filter(item => 
    selectedBaskets?.length === 0 || selectedBaskets?.includes(item?.basket)
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 sm:p-4 shadow-lg max-w-xs">
          <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base truncate">{label}</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">CGPA:</span>
              <span className="text-xs sm:text-sm font-medium text-foreground">{data?.cgpa}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Activity Points:</span>
              <span className="text-xs sm:text-sm font-medium text-foreground">{data?.activityPoints}</span>
            </div>
            {data?.milestone && (
              <div className="pt-2 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={12} className="text-accent flex-shrink-0" />
                  <span className="text-xs text-accent font-medium break-words flex-1">{data?.milestone}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="academic-card p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-foreground break-words">Academic Journey Timeline</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">CGPA trends with activity milestones</p>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Icon name="TrendingUp" size={14} className="text-success" />
          <span className="text-xs sm:text-sm text-success font-medium">Improving Trend</span>
        </div>
      </div>
      <div className="h-64 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="semester" 
              stroke="var(--color-muted-foreground)"
              fontSize={10}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              domain={[0, 10]} 
              stroke="var(--color-muted-foreground)"
              fontSize={10}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={7.5} stroke="var(--color-warning)" strokeDasharray="5 5" />
            <Line 
              type="monotone" 
              dataKey="cgpa" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: 'var(--color-accent)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground gap-2">
        <span>Target CGPA: 7.5+</span>
        <span>Last updated: {new Date()?.toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default TimelineChart;
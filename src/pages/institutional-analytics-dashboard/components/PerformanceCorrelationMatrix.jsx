import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceCorrelationMatrix = () => {
  const [selectedCorrelation, setSelectedCorrelation] = useState('cgpa-activities');

  const correlationData = {
    'cgpa-activities': [
      { x: 2.1, y: 6.2, students: 45, department: 'Engineering' },
      { x: 3.8, y: 7.1, students: 78, department: 'Engineering' },
      { x: 5.2, y: 7.8, students: 156, department: 'Engineering' },
      { x: 6.8, y: 8.2, students: 234, department: 'Engineering' },
      { x: 8.1, y: 8.7, students: 189, department: 'Engineering' },
      { x: 2.5, y: 6.8, students: 34, department: 'Business' },
      { x: 4.1, y: 7.4, students: 67, department: 'Business' },
      { x: 5.7, y: 8.1, students: 123, department: 'Business' },
      { x: 7.2, y: 8.5, students: 145, department: 'Business' },
      { x: 8.5, y: 9.1, students: 98, department: 'Business' },
      { x: 1.8, y: 6.5, students: 28, department: 'Sciences' },
      { x: 3.4, y: 7.2, students: 52, department: 'Sciences' },
      { x: 4.9, y: 7.9, students: 89, department: 'Sciences' },
      { x: 6.3, y: 8.3, students: 112, department: 'Sciences' },
      { x: 7.8, y: 8.8, students: 87, department: 'Sciences' }
    ],
    'attendance-performance': [
      { x: 65, y: 6.1, students: 23, department: 'Engineering' },
      { x: 72, y: 6.8, students: 45, department: 'Engineering' },
      { x: 78, y: 7.2, students: 89, department: 'Engineering' },
      { x: 85, y: 7.8, students: 156, department: 'Engineering' },
      { x: 92, y: 8.4, students: 234, department: 'Engineering' },
      { x: 68, y: 6.5, students: 34, department: 'Business' },
      { x: 75, y: 7.1, students: 67, department: 'Business' },
      { x: 82, y: 7.6, students: 123, department: 'Business' },
      { x: 88, y: 8.2, students: 145, department: 'Business' },
      { x: 94, y: 8.7, students: 98, department: 'Business' }
    ]
  };

  const correlationMetrics = [
    {
      title: 'CGPA vs Activities',
      correlation: 0.78,
      strength: 'Strong Positive',
      description: 'Higher activity participation correlates with better academic performance',
      color: 'text-success'
    },
    {
      title: 'Attendance vs Performance',
      correlation: 0.82,
      strength: 'Very Strong Positive',
      description: 'Class attendance strongly predicts academic success',
      color: 'text-success'
    },
    {
      title: 'Research vs CGPA',
      correlation: 0.65,
      strength: 'Moderate Positive',
      description: 'Research involvement shows moderate correlation with grades',
      color: 'text-warning'
    },
    {
      title: 'Sports vs Academic',
      correlation: 0.34,
      strength: 'Weak Positive',
      description: 'Sports participation has minimal impact on academic performance',
      color: 'text-muted-foreground'
    }
  ];

  const departmentColors = {
    'Engineering': '#1E3A8A',
    'Business': '#7C3AED',
    'Sciences': '#059669',
    'Liberal Arts': '#EA580C',
    'Medicine': '#DC2626'
  };

  const currentData = correlationData?.[selectedCorrelation] || correlationData?.['cgpa-activities'];
  const currentMetric = correlationMetrics?.find(m => 
    m?.title?.toLowerCase()?.includes(selectedCorrelation?.split('-')?.[0])
  ) || correlationMetrics?.[0];

  const getCorrelationStrength = (value) => {
    const abs = Math.abs(value);
    if (abs >= 0.8) return 'Very Strong';
    if (abs >= 0.6) return 'Strong';
    if (abs >= 0.4) return 'Moderate';
    if (abs >= 0.2) return 'Weak';
    return 'Very Weak';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Performance Correlation Matrix</h3>
          <p className="text-sm text-muted-foreground">Statistical relationships between academic and activity metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant={selectedCorrelation === 'cgpa-activities' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedCorrelation('cgpa-activities')}
          >
            CGPA vs Activities
          </Button>
          <Button 
            variant={selectedCorrelation === 'attendance-performance' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedCorrelation('attendance-performance')}
          >
            Attendance vs Performance
          </Button>
        </div>
      </div>
      {/* Correlation Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {correlationMetrics?.map((metric, index) => (
          <div key={index} className="academic-card p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-foreground">{metric?.title}</h4>
              <Icon name="TrendingUp" size={16} className={metric?.color} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-foreground">
                  {metric?.correlation?.toFixed(2)}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  Math.abs(metric?.correlation) >= 0.7 ? 'bg-success/10 text-success' :
                  Math.abs(metric?.correlation) >= 0.5 ? 'bg-warning/10 text-warning': 'bg-muted text-muted-foreground'
                }`}>
                  {getCorrelationStrength(metric?.correlation)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{metric?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Scatter Plot */}
      <div className="academic-card p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <h4 className="text-sm font-medium text-foreground mb-4">
              {selectedCorrelation === 'cgpa-activities' ? 'CGPA vs Activity Participation' : 'Attendance vs Academic Performance'}
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="x"
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    label={{ 
                      value: selectedCorrelation === 'cgpa-activities' ? 'Activity Score' : 'Attendance %', 
                      position: 'insideBottom', 
                      offset: -10 
                    }}
                  />
                  <YAxis 
                    dataKey="y"
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    label={{ 
                      value: 'CGPA', 
                      angle: -90, 
                      position: 'insideLeft' 
                    }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'y' ? `CGPA: ${value}` : 
                      selectedCorrelation === 'cgpa-activities' ? `Activity Score: ${value}` : `Attendance: ${value}%`,
                      ''
                    ]}
                    labelFormatter={(label, payload) => 
                      payload && payload?.[0] ? 
                      `${payload?.[0]?.payload?.department} - ${payload?.[0]?.payload?.students} students` : ''
                    }
                    contentStyle={{ 
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Scatter dataKey="y">
                    {currentData?.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={departmentColors?.[entry?.department] || '#64748B'}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Legend and Insights */}
          <div className="space-y-6">
            <div>
              <h5 className="text-sm font-medium text-foreground mb-3">Department Legend</h5>
              <div className="space-y-2">
                {Object.entries(departmentColors)?.map(([dept, color]) => (
                  <div key={dept} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-xs text-muted-foreground">{dept}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-foreground mb-3">Key Insights</h5>
              <div className="space-y-3">
                <div className="p-3 bg-success/10 rounded-lg">
                  <Icon name="TrendingUp" size={16} className="text-success mb-1" />
                  <p className="text-xs text-success font-medium">Strong positive correlation detected</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="Users" size={16} className="text-primary mb-1" />
                  <p className="text-xs text-primary font-medium">Business students show highest engagement</p>
                </div>
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Icon name="AlertTriangle" size={16} className="text-warning mb-1" />
                  <p className="text-xs text-warning font-medium">Low activity students need intervention</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCorrelationMatrix;
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, Cell } from 'recharts';
import Button from '../../../components/ui/Button';



const EnrollmentFunnelChart = () => {
  const funnelData = [
    { name: 'Applications', value: 25847, color: '#1E3A8A' },
    { name: 'Qualified', value: 18234, color: '#3B82F6' },
    { name: 'Interviewed', value: 15678, color: '#60A5FA' },
    { name: 'Offered', value: 13456, color: '#93C5FD' },
    { name: 'Enrolled', value: 12847, color: '#DBEAFE' }
  ];

  const yearlyTrends = [
    { year: '2020-21', applications: 22000, enrolled: 11200, rate: 50.9 },
    { year: '2021-22', applications: 23500, enrolled: 11800, rate: 50.2 },
    { year: '2022-23', applications: 24200, enrolled: 12100, rate: 50.0 },
    { year: '2023-24', applications: 24800, enrolled: 12400, rate: 50.0 },
    { year: '2024-25', applications: 25847, enrolled: 12847, rate: 49.7 }
  ];

  const conversionRates = [
    { stage: 'Application to Qualified', rate: 70.5, change: '+2.3%' },
    { stage: 'Qualified to Interview', rate: 86.0, change: '+1.8%' },
    { stage: 'Interview to Offer', rate: 85.8, change: '-0.5%' },
    { stage: 'Offer to Enrollment', rate: 95.5, change: '+3.2%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Enrollment Funnel Analysis</h3>
          <p className="text-sm text-muted-foreground">Application to enrollment conversion tracking</p>
        </div>
        <Button variant="outline" size="sm" iconName="TrendingUp">
          View Details
        </Button>
      </div>
      {/* Funnel Visualization */}
      <div className="academic-card p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Funnel Chart */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Current Year Funnel</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip 
                    formatter={(value, name) => [value?.toLocaleString(), name]}
                    labelStyle={{ color: 'var(--color-foreground)' }}
                    contentStyle={{ 
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Funnel
                    dataKey="value"
                    data={funnelData}
                    isAnimationActive={true}
                  >
                    {funnelData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Rates */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Conversion Rates</h4>
            <div className="space-y-4">
              {conversionRates?.map((conversion, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {conversion?.stage}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-foreground">
                        {conversion?.rate}%
                      </span>
                      <span className={`text-xs font-medium ${
                        conversion?.change?.startsWith('+') ? 'text-success' : 'text-error'
                      }`}>
                        {conversion?.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${conversion?.rate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Yearly Trends */}
      <div className="academic-card p-6">
        <h4 className="text-sm font-medium text-foreground mb-4">5-Year Enrollment Trends</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="year" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'rate' ? `${value}%` : value?.toLocaleString(), 
                  name === 'applications' ? 'Applications' : 
                  name === 'enrolled' ? 'Enrolled' : 'Conversion Rate'
                ]}
                labelStyle={{ color: 'var(--color-foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="applications" fill="#3B82F6" name="applications" />
              <Bar dataKey="enrolled" fill="#1E3A8A" name="enrolled" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentFunnelChart;
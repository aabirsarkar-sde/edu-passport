import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import Button from '../../../components/ui/Button';

const PredictiveAnalytics = () => {
  const [selectedPrediction, setSelectedPrediction] = useState('enrollment');

  const enrollmentPrediction = [
    { period: 'Q1 2024', actual: 12847, predicted: null, confidence: null },
    { period: 'Q2 2024', actual: 12934, predicted: null, confidence: null },
    { period: 'Q3 2024', actual: 13021, predicted: null, confidence: null },
    { period: 'Q4 2024', actual: 13156, predicted: null, confidence: null },
    { period: 'Q1 2025', actual: null, predicted: 13289, confidence: 85 },
    { period: 'Q2 2025', actual: null, predicted: 13445, confidence: 82 },
    { period: 'Q3 2025', actual: null, predicted: 13598, confidence: 78 },
    { period: 'Q4 2025', actual: null, predicted: 13734, confidence: 75 }
  ];

  const retentionPrediction = [
    { period: 'Q1 2024', actual: 94.2, predicted: null, confidence: null },
    { period: 'Q2 2024', actual: 93.8, predicted: null, confidence: null },
    { period: 'Q3 2024', actual: 94.1, predicted: null, confidence: null },
    { period: 'Q4 2024', actual: 93.9, predicted: null, confidence: null },
    { period: 'Q1 2025', actual: null, predicted: 94.3, confidence: 88 },
    { period: 'Q2 2025', actual: null, predicted: 94.1, confidence: 85 },
    { period: 'Q3 2025', actual: null, predicted: 94.5, confidence: 82 },
    { period: 'Q4 2025', actual: null, predicted: 94.2, confidence: 79 }
  ];

  const performancePrediction = [
    { period: 'Q1 2024', actual: 7.42, predicted: null, confidence: null },
    { period: 'Q2 2024', actual: 7.38, predicted: null, confidence: null },
    { period: 'Q3 2024', actual: 7.45, predicted: null, confidence: null },
    { period: 'Q4 2024', actual: 7.41, predicted: null, confidence: null },
    { period: 'Q1 2025', actual: null, predicted: 7.48, confidence: 91 },
    { period: 'Q2 2025', actual: null, predicted: 7.52, confidence: 89 },
    { period: 'Q3 2025', actual: null, predicted: 7.55, confidence: 86 },
    { period: 'Q4 2025', actual: null, predicted: 7.58, confidence: 83 }
  ];

  const predictionTypes = [
    { 
      key: 'enrollment', 
      name: 'Enrollment Trends', 
      icon: 'Users', 
      data: enrollmentPrediction,
      unit: '',
      color: '#1E3A8A'
    },
    { 
      key: 'retention', 
      name: 'Retention Rates', 
      icon: 'UserCheck', 
      data: retentionPrediction,
      unit: '%',
      color: '#059669'
    },
    { 
      key: 'performance', 
      name: 'Academic Performance', 
      icon: 'TrendingUp', 
      data: performancePrediction,
      unit: ' CGPA',
      color: '#7C3AED'
    }
  ];

  const riskFactors = [
    {
      factor: 'Economic Downturn',
      impact: 'High',
      probability: 35,
      description: 'Potential reduction in enrollment due to economic factors',
      mitigation: 'Increase financial aid programs'
    },
    {
      factor: 'Competition from Online Programs',
      impact: 'Medium',
      probability: 65,
      description: 'Growing preference for online education options',
      mitigation: 'Enhance hybrid learning offerings'
    },
    {
      factor: 'Faculty Shortage',
      impact: 'High',
      probability: 28,
      description: 'Difficulty in recruiting qualified faculty members',
      mitigation: 'Improve compensation packages'
    },
    {
      factor: 'Technology Infrastructure',
      impact: 'Medium',
      probability: 42,
      description: 'Need for continuous technology upgrades',
      mitigation: 'Increase IT investment budget'
    }
  ];

  const recommendations = [
    {
      category: 'Enrollment',
      priority: 'High',
      action: 'Launch targeted recruitment campaign for underrepresented demographics',
      impact: '+8% enrollment increase',
      timeline: '6 months',
      cost: '$250K'
    },
    {
      category: 'Retention',
      priority: 'Critical',
      action: 'Implement early warning system for at-risk students',
      impact: '+3.2% retention improvement',
      timeline: '3 months',
      cost: '$150K'
    },
    {
      category: 'Performance',
      priority: 'Medium',
      action: 'Expand peer tutoring and mentorship programs',
      impact: '+0.15 CGPA improvement',
      timeline: '4 months',
      cost: '$100K'
    },
    {
      category: 'Infrastructure',
      priority: 'High',
      action: 'Upgrade learning management system and analytics tools',
      impact: 'Enhanced data insights',
      timeline: '8 months',
      cost: '$500K'
    }
  ];

  const currentPrediction = predictionTypes?.find(p => p?.key === selectedPrediction);
  const currentData = currentPrediction?.data || enrollmentPrediction;

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'text-error bg-error/10';
      case 'high': return 'text-warning bg-warning/10';
      case 'medium': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Predictive Analytics</h3>
          <p className="text-sm text-muted-foreground">AI-powered forecasting and strategic recommendations</p>
        </div>
        <div className="flex items-center space-x-2">
          {predictionTypes?.map(type => (
            <Button 
              key={type?.key}
              variant={selectedPrediction === type?.key ? 'default' : 'outline'} 
              size="sm"
              iconName={type?.icon}
              onClick={() => setSelectedPrediction(type?.key)}
            >
              {type?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Prediction Chart */}
      <div className="academic-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-sm font-medium text-foreground">
            {currentPrediction?.name} Forecast
          </h4>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Actual</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-muted-foreground">Predicted</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="period" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value, name) => [
                  `${value}${currentPrediction?.unit || ''}`,
                  name === 'actual' ? 'Actual' : 'Predicted'
                ]}
                labelStyle={{ color: 'var(--color-foreground)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke={currentPrediction?.color || '#1E3A8A'}
                strokeWidth={3}
                dot={{ fill: currentPrediction?.color || '#1E3A8A', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#7C3AED"
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ fill: '#7C3AED', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Risk Factors and Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Factors */}
        <div className="academic-card p-6">
          <h4 className="text-sm font-medium text-foreground mb-4">Risk Factors Analysis</h4>
          <div className="space-y-4">
            {riskFactors?.map((risk, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-sm font-medium text-foreground">{risk?.factor}</h5>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium ${getImpactColor(risk?.impact)}`}>
                      {risk?.impact}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {risk?.probability}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{risk?.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-success">
                    Mitigation: {risk?.mitigation}
                  </span>
                  <div className="w-16 bg-border rounded-full h-1">
                    <div 
                      className="bg-warning h-1 rounded-full"
                      style={{ width: `${risk?.probability}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Recommendations */}
        <div className="academic-card p-6">
          <h4 className="text-sm font-medium text-foreground mb-4">Strategic Recommendations</h4>
          <div className="space-y-4">
            {recommendations?.map((rec, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h5 className="text-sm font-medium text-foreground">{rec?.category}</h5>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(rec?.priority)}`}>
                      {rec?.priority}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" iconName="ArrowRight">
                    Implement
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{rec?.action}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Impact:</span>
                    <p className="font-medium text-success">{rec?.impact}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Timeline:</span>
                    <p className="font-medium text-foreground">{rec?.timeline}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cost:</span>
                    <p className="font-medium text-foreground">{rec?.cost}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
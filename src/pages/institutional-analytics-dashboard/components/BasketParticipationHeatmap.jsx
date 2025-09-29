import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BasketParticipationHeatmap = () => {
  const [selectedView, setSelectedView] = useState('department');

  const basketData = [
    {
      department: 'Engineering',
      academic: { participation: 95, students: 3420, color: '#1E3A8A' },
      clubs: { participation: 78, students: 2668, color: '#7C3AED' },
      competitions: { participation: 65, students: 2223, color: '#EA580C' },
      workshops: { participation: 82, students: 2804, color: '#059669' },
      community: { participation: 45, students: 1539, color: '#DC2626' }
    },
    {
      department: 'Business',
      academic: { participation: 92, students: 2208, color: '#1E3A8A' },
      clubs: { participation: 85, students: 2040, color: '#7C3AED' },
      competitions: { participation: 72, students: 1728, color: '#EA580C' },
      workshops: { participation: 88, students: 2112, color: '#059669' },
      community: { participation: 68, students: 1632, color: '#DC2626' }
    },
    {
      department: 'Sciences',
      academic: { participation: 94, students: 1692, color: '#1E3A8A' },
      clubs: { participation: 71, students: 1278, color: '#7C3AED' },
      competitions: { participation: 58, students: 1044, color: '#EA580C' },
      workshops: { participation: 79, students: 1422, color: '#059669' },
      community: { participation: 52, students: 936, color: '#DC2626' }
    },
    {
      department: 'Liberal Arts',
      academic: { participation: 89, students: 1246, color: '#1E3A8A' },
      clubs: { participation: 91, students: 1274, color: '#7C3AED' },
      competitions: { participation: 43, students: 602, color: '#EA580C' },
      workshops: { participation: 75, students: 1050, color: '#059669' },
      community: { participation: 84, students: 1176, color: '#DC2626' }
    },
    {
      department: 'Medicine',
      academic: { participation: 97, students: 1164, color: '#1E3A8A' },
      clubs: { participation: 62, students: 744, color: '#7C3AED' },
      competitions: { participation: 38, students: 456, color: '#EA580C' },
      workshops: { participation: 91, students: 1092, color: '#059669' },
      community: { participation: 73, students: 876, color: '#DC2626' }
    }
  ];

  const basketCategories = [
    { key: 'academic', name: 'Academic', icon: 'BookOpen' },
    { key: 'clubs', name: 'Clubs/Fests', icon: 'Users' },
    { key: 'competitions', name: 'Competitions', icon: 'Trophy' },
    { key: 'workshops', name: 'Workshops', icon: 'Lightbulb' },
    { key: 'community', name: 'Community', icon: 'Heart' }
  ];

  const getIntensityClass = (participation) => {
    if (participation >= 90) return 'bg-success text-white';
    if (participation >= 80) return 'bg-success/80 text-white';
    if (participation >= 70) return 'bg-warning text-white';
    if (participation >= 60) return 'bg-warning/80 text-white';
    if (participation >= 50) return 'bg-error/60 text-white';
    return 'bg-error/40 text-white';
  };

  const totalStudentsByBasket = basketCategories?.map(category => ({
    ...category,
    total: basketData?.reduce((sum, dept) => sum + dept?.[category?.key]?.students, 0),
    avgParticipation: Math.round(
      basketData?.reduce((sum, dept) => sum + dept?.[category?.key]?.participation, 0) / basketData?.length
    )
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Basket Participation Heatmap</h3>
          <p className="text-sm text-muted-foreground">Cross-departmental activity engagement analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant={selectedView === 'department' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedView('department')}
          >
            By Department
          </Button>
          <Button 
            variant={selectedView === 'year' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedView('year')}
          >
            By Year
          </Button>
        </div>
      </div>
      {/* Heatmap Grid */}
      <div className="academic-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                  Department
                </th>
                {basketCategories?.map(category => (
                  <th key={category?.key} className="text-center p-3 text-sm font-medium text-muted-foreground">
                    <div className="flex flex-col items-center space-y-1">
                      <Icon name={category?.icon} size={16} />
                      <span>{category?.name}</span>
                    </div>
                  </th>
                ))}
                <th className="text-center p-3 text-sm font-medium text-muted-foreground">
                  Overall
                </th>
              </tr>
            </thead>
            <tbody>
              {basketData?.map((dept, index) => {
                const overallParticipation = Math.round(
                  (dept?.academic?.participation + dept?.clubs?.participation + 
                   dept?.competitions?.participation + dept?.workshops?.participation + 
                   dept?.community?.participation) / 5
                );
                
                return (
                  <tr key={index} className="border-t border-border">
                    <td className="p-3 font-medium text-foreground">
                      {dept?.department}
                    </td>
                    {basketCategories?.map(category => (
                      <td key={category?.key} className="p-3 text-center">
                        <div className="flex flex-col items-center space-y-1">
                          <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
                            getIntensityClass(dept?.[category?.key]?.participation)
                          }`}>
                            {dept?.[category?.key]?.participation}%
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {dept?.[category?.key]?.students?.toLocaleString()}
                          </span>
                        </div>
                      </td>
                    ))}
                    <td className="p-3 text-center">
                      <div className={`px-3 py-2 rounded-lg text-sm font-bold ${
                        getIntensityClass(overallParticipation)
                      }`}>
                        {overallParticipation}%
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Basket Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {totalStudentsByBasket?.map(basket => (
          <div key={basket?.key} className="academic-card p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 rounded-lg bg-muted">
                <Icon name={basket?.icon} size={20} className="text-foreground" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{basket?.name}</h4>
                <p className="text-xs text-muted-foreground">Total Engagement</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Students</span>
                <span className="text-sm font-bold text-foreground">
                  {basket?.total?.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Avg Rate</span>
                <span className="text-sm font-bold text-foreground">
                  {basket?.avgParticipation}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasketParticipationHeatmap;
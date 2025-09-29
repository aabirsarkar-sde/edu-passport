import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentOverviewTable = ({ students, onStudentSelect, selectedStudent, onMessageStudent, onScheduleMeeting, onFlagStudent }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedStudents = [...students]?.sort((a, b) => {
    if (sortConfig?.key === 'name') {
      return sortConfig?.direction === 'asc' 
        ? a?.name?.localeCompare(b?.name)
        : b?.name?.localeCompare(a?.name);
    }
    if (sortConfig?.key === 'cgpa') {
      return sortConfig?.direction === 'asc' 
        ? a?.cgpa - b?.cgpa
        : b?.cgpa - a?.cgpa;
    }
    if (sortConfig?.key === 'activityScore') {
      return sortConfig?.direction === 'asc' 
        ? a?.activityScore - b?.activityScore
        : b?.activityScore - a?.activityScore;
    }
    if (sortConfig?.key === 'riskLevel') {
      const riskOrder = { 'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4 };
      return sortConfig?.direction === 'asc' 
        ? riskOrder?.[a?.riskLevel] - riskOrder?.[b?.riskLevel]
        : riskOrder?.[b?.riskLevel] - riskOrder?.[a?.riskLevel];
    }
    return 0;
  });

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'High': return 'text-error bg-error/10';
      case 'Critical': return 'text-error bg-error/20 font-semibold';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <Icon name="TrendingUp" size={16} className="text-success" />;
      case 'down': return <Icon name="TrendingDown" size={16} className="text-error" />;
      case 'stable': return <Icon name="Minus" size={16} className="text-muted-foreground" />;
      default: return null;
    }
  };

  return (
    <div className="academic-card h-full">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Student Overview</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {students?.length} advisees • Click to view details
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Student</span>
                    {sortConfig?.key === 'name' && (
                      <Icon 
                        name={sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={14} 
                      />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort('cgpa')}
                >
                  <div className="flex items-center space-x-1">
                    <span>CGPA</span>
                    {sortConfig?.key === 'cgpa' && (
                      <Icon 
                        name={sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={14} 
                      />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort('activityScore')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Activity Score</span>
                    {sortConfig?.key === 'activityScore' && (
                      <Icon 
                        name={sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={14} 
                      />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted transition-colors"
                  onClick={() => handleSort('riskLevel')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Risk Level</span>
                    {sortConfig?.key === 'riskLevel' && (
                      <Icon 
                        name={sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={14} 
                      />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {sortedStudents?.map((student) => (
                <tr 
                  key={student?.id}
                  className={`hover:bg-muted/50 cursor-pointer transition-colors ${
                    selectedStudent?.id === student?.id ? 'bg-accent/10' : ''
                  }`}
                  onClick={() => onStudentSelect(student)}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{student?.name}</div>
                        <div className="text-xs text-muted-foreground">{student?.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground data-font">
                        {student?.cgpa?.toFixed(2)}
                      </span>
                      {getTrendIcon(student?.cgpaTrend)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground data-font">
                        {student?.activityScore}
                      </span>
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(student?.activityScore / 100) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(student?.riskLevel)}`}>
                      {student?.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onMessageStudent(student);
                        }}
                        className="h-8 w-8"
                      >
                        <Icon name="MessageCircle" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onScheduleMeeting(student);
                        }}
                        className="h-8 w-8"
                      >
                        <Icon name="Calendar" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onFlagStudent(student);
                        }}
                        className="h-8 w-8"
                      >
                        <Icon name="Flag" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentOverviewTable;
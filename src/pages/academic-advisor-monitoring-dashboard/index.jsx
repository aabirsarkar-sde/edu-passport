import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AlertStrip from './components/AlertStrip';
import FilterControls from './components/FilterControls';
import StudentOverviewTable from './components/StudentOverviewTable';
import StudentProfilePanel from './components/StudentProfilePanel';
import FacultyApprovalWidget from './components/FacultyApprovalWidget';

const AcademicAdvisorMonitoringDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({
    cohort: 'all',
    riskLevel: 'all',
    academicPeriod: 'current',
    performanceLevel: 'all',
    activityEngagement: 'all'
  });

  // Mock student data
  const mockStudents = [
    {
      id: 1,
      name: "Aabir Sarkar",
      studentId: "CS2024001",
      program: "Computer Science",
      year: 3,
      cgpa: 3.85,
      cgpaTrend: "up",
      activityScore: 92,
      riskLevel: "Low",
      credits: 128,
      clubMemberships: 3,
      eventParticipation: 12,
      competitionWins: 2,
      competitionParticipation: 5,
      workshopsAttended: 8,
      certificationsEarned: 4,
      volunteerHours: 45,
      communityProjects: 3,
      baskets: {
        academic: 88,
        clubs: 95,
        competitions: 85,
        workshops: 90,
        community: 92
      },
      recentActivity: [
        { description: "Completed Advanced Algorithms course with A grade", date: "Dec 10, 2024" },
        { description: "Won first place in Hackathon 2024", date: "Dec 8, 2024" },
        { description: "Attended Machine Learning Workshop", date: "Dec 5, 2024" }
      ]
    },
    {
      id: 2,
      name: "Puneet Kathuria",
      studentId: "EE2024002",
      program: "Electrical Engineering",
      year: 2,
      cgpa: 2.45,
      cgpaTrend: "down",
      activityScore: 35,
      riskLevel: "Critical",
      credits: 85,
      clubMemberships: 1,
      eventParticipation: 2,
      competitionWins: 0,
      competitionParticipation: 1,
      workshopsAttended: 2,
      certificationsEarned: 0,
      volunteerHours: 8,
      communityProjects: 0,
      baskets: {
        academic: 45,
        clubs: 25,
        competitions: 20,
        workshops: 30,
        community: 35
      },
      recentActivity: [
        { description: "Failed Circuit Analysis midterm exam", date: "Dec 9, 2024" },
        { description: "Missed 3 consecutive classes", date: "Dec 7, 2024" },
        { description: "Requested academic support meeting", date: "Dec 6, 2024" }
      ]
    },
    {
      id: 3,
      name: "Aaryan Jangde",
      studentId: "BIO2025003",
      program: "Biology",
      year: 2,
      cgpa: 3.65,
      cgpaTrend: "stable",
      activityScore: 78,
      riskLevel: "Low",
      credits: 95,
      clubMemberships: 2,
      eventParticipation: 8,
      competitionWins: 1,
      competitionParticipation: 3,
      workshopsAttended: 6,
      certificationsEarned: 2,
      volunteerHours: 32,
      communityProjects: 2,
      baskets: {
        academic: 82,
        clubs: 75,
        competitions: 70,
        workshops: 80,
        community: 85
      },
      recentActivity: [
        { description: "Published research paper in undergraduate journal", date: "Dec 11, 2024" },
        { description: "Completed Genetics lab with distinction", date: "Dec 9, 2024" },
        { description: "Volunteered at local health clinic", date: "Dec 7, 2024" }
      ]
    },
    {
      id: 4,
      name: "Samarth Chaudhary",
      studentId: "ME2023004",
      program: "Mechanical Engineering",
      year: 4,
      cgpa: 3.12,
      cgpaTrend: "up",
      activityScore: 65,
      riskLevel: "Medium",
      credits: 145,
      clubMemberships: 2,
      eventParticipation: 6,
      competitionWins: 0,
      competitionParticipation: 2,
      workshopsAttended: 5,
      certificationsEarned: 3,
      volunteerHours: 22,
      communityProjects: 1,
      baskets: {
        academic: 68,
        clubs: 60,
        competitions: 55,
        workshops: 75,
        community: 65
      },
      recentActivity: [
        { description: "Improved Thermodynamics grade from C to B+", date: "Dec 10, 2024" },
        { description: "Joined Engineering Society leadership team", date: "Dec 8, 2024" },
        { description: "Attended Career Fair networking event", date: "Dec 6, 2024" }
      ]
    },
    {
      id: 5,
      name: "Yashi Agarwal",
      studentId: "CHEM2025005",
      program: "Chemistry",
      year: 2,
      cgpa: 2.85,
      cgpaTrend: "down",
      activityScore: 42,
      riskLevel: "High",
      credits: 88,
      clubMemberships: 1,
      eventParticipation: 3,
      competitionWins: 0,
      competitionParticipation: 1,
      workshopsAttended: 3,
      certificationsEarned: 1,
      volunteerHours: 15,
      communityProjects: 1,
      baskets: {
        academic: 55,
        clubs: 40,
        competitions: 30,
        workshops: 45,
        community: 40
      },
      recentActivity: [
        { description: "Struggling with Organic Chemistry concepts", date: "Dec 11, 2024" },
        { description: "Scheduled tutoring sessions for next week", date: "Dec 9, 2024" },
        { description: "Attended study group for exam preparation", date: "Dec 7, 2024" }
      ]
    }
  ];

  // Mock AI recommendations
  const mockRecommendations = [
    {
      title: "Schedule Academic Support Meeting",
      description: "Student showing declining CGPA trend with missed assignments",
      priority: "High",
      category: "Academic"
    },
    {
      title: "Encourage Extracurricular Participation",
      description: "Low activity score suggests need for more engagement",
      priority: "Medium",
      category: "Activities"
    },
    {
      title: "Connect with Career Services",
      description: "Senior year student should begin career planning",
      priority: "Medium",
      category: "Career"
    }
  ];

  const [filteredStudents, setFilteredStudents] = useState(mockStudents);

  useEffect(() => {
    let filtered = [...mockStudents];

    // Apply filters
    if (filters?.riskLevel !== 'all') {
      const riskMap = {
        'low': 'Low',
        'medium': 'Medium', 
        'high': 'High',
        'critical': 'Critical'
      };
      filtered = filtered?.filter(student => student?.riskLevel === riskMap?.[filters?.riskLevel]);
    }

    if (filters?.performanceLevel !== 'all') {
      filtered = filtered?.filter(student => {
        switch (filters?.performanceLevel) {
          case 'excellent': return student?.cgpa >= 3.5;
          case 'good': return student?.cgpa >= 3.0 && student?.cgpa < 3.5;
          case 'average': return student?.cgpa >= 2.5 && student?.cgpa < 3.0;
          case 'below': return student?.cgpa < 2.5;
          default: return true;
        }
      });
    }

    if (filters?.activityEngagement !== 'all') {
      filtered = filtered?.filter(student => {
        switch (filters?.activityEngagement) {
          case 'high': return student?.activityScore >= 80;
          case 'medium': return student?.activityScore >= 50 && student?.activityScore < 80;
          case 'low': return student?.activityScore < 50;
          default: return true;
        }
      });
    }

    setFilteredStudents(filtered);
  }, [filters]);

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleMessageStudent = (student) => {
    console.log('Message student:', student?.name);
    // Mock implementation - would integrate with messaging system
  };

  const handleScheduleMeeting = (student) => {
    console.log('Schedule meeting with:', student?.name);
    // Mock implementation - would integrate with calendar system
  };

  const handleFlagStudent = (student) => {
    console.log('Flag student:', student?.name);
    // Mock implementation - would add to intervention list
  };

  const handleViewAlertDetails = (alertType) => {
    console.log('View alert details:', alertType);
    // Mock implementation - would show detailed alert view
  };

  const handleExportData = () => {
    console.log('Export data for filtered students');
    // Mock implementation - would generate CSV/PDF export
  };

  const handleResetFilters = () => {
    setFilters({
      cohort: 'all',
      riskLevel: 'all',
      academicPeriod: 'current',
      performanceLevel: 'all',
      activityEngagement: 'all'
    });
  };

  // Calculate alert metrics
  const atRiskCount = filteredStudents?.filter(s => s?.riskLevel === 'High' || s?.riskLevel === 'Critical')?.length;
  const interventions = 5; // Mock data
  const upcomingDeadlines = 3; // Mock data

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Monitoring Dashboard - EduPassport Analytics</title>
        <meta name="description" content="Comprehensive student performance monitoring and intervention identification for administrators" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 break-words">
              Admin Monitoring Dashboard
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground break-words">
              Holistic student performance monitoring and early intervention identification for administrative oversight
            </p>
          </div>

          {/* Alert Strip */}
          <AlertStrip
            atRiskCount={atRiskCount}
            interventions={interventions}
            upcomingDeadlines={upcomingDeadlines}
            onViewDetails={handleViewAlertDetails}
          />

          {/* Filter Controls */}
          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onExportData={handleExportData}
            onResetFilters={handleResetFilters}
            studentCount={filteredStudents?.length}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-16 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Student Overview Table */}
            <div className="lg:col-span-10">
              <StudentOverviewTable
                students={filteredStudents}
                onStudentSelect={handleStudentSelect}
                selectedStudent={selectedStudent}
                onMessageStudent={handleMessageStudent}
                onScheduleMeeting={handleScheduleMeeting}
                onFlagStudent={handleFlagStudent}
              />
            </div>

            {/* Student Profile Panel */}
            <div className="lg:col-span-6">
              <StudentProfilePanel
                student={selectedStudent}
                recommendations={selectedStudent ? mockRecommendations : null}
              />
            </div>
          </div>

          {/* Faculty Approval Widget */}
          <div className="mb-6 sm:mb-8">
            <FacultyApprovalWidget />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AcademicAdvisorMonitoringDashboard;
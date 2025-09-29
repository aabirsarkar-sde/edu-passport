import React, { useState } from 'react';
import { CheckCircle2, X, Clock, FileText, User, Calendar, AlertCircle, Search } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FacultyApprovalWidget = () => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock pending records for approval
  const mockPendingRecords = [
    {
      id: 1,
      studentName: 'Aabir Sarkar',
      studentId: 'CS2024001',
      recordType: 'Academic Achievement',
      title: 'Advanced Algorithms Course Completion',
      description: 'Completed course with A grade, submitted for academic record approval',
      uploadedBy: 'Aabir Sarkar',
      uploadDate: '2024-12-10',
      evidence: 'grade_certificate.pdf',
      category: 'Academic',
      priority: 'Medium',
      status: 'Pending'
    },
    {
      id: 2,
      studentName: 'Puneet Kathuria',
      studentId: 'EE2024002',
      recordType: 'Competition Entry',
      title: 'IEEE Circuit Design Competition',
      description: 'Participated in national level circuit design competition',
      uploadedBy: 'Puneet Kathuria',
      uploadDate: '2024-12-09',
      evidence: 'participation_certificate.jpg',
      category: 'Competition',
      priority: 'Low',
      status: 'Pending'
    },
    {
      id: 3,
      studentName: 'Aaryan Jangde',
      studentId: 'BIO2025003',
      recordType: 'Research Publication',
      title: 'Undergraduate Research Paper Published',
      description: 'Research paper on cellular biology published in undergraduate journal',
      uploadedBy: 'Aaryan Jangde',
      uploadDate: '2024-12-11',
      evidence: 'publication_proof.pdf',
      category: 'Research',
      priority: 'High',
      status: 'Pending'
    },
    {
      id: 4,
      studentName: 'Yashi Agarwal',
      studentId: 'CHEM2025005',
      recordType: 'Workshop Completion',
      title: 'Organic Chemistry Lab Workshop',
      description: 'Completed intensive 3-day workshop on advanced lab techniques',
      uploadedBy: 'Yashi Agarwal',
      uploadDate: '2024-12-08',
      evidence: 'workshop_certificate.pdf',
      category: 'Workshop',
      priority: 'Medium',
      status: 'Pending'
    }
  ];

  // Mock approved records
  const mockApprovedRecords = [
    {
      id: 5,
      studentName: 'Samarth Chaudhary',
      recordType: 'Club Leadership',
      title: 'Engineering Society Vice President',
      approvedBy: 'Dr. Smith',
      approvedDate: '2024-12-08',
      category: 'Leadership',
      status: 'Approved'
    },
    {
      id: 6,
      studentName: 'Aabir Sarkar',
      recordType: 'Hackathon Victory',
      title: 'First Place in Hackathon 2024',
      approvedBy: 'Prof. Johnson',
      approvedDate: '2024-12-08',
      category: 'Competition',
      status: 'Approved'
    }
  ];

  const [pendingRecords, setPendingRecords] = useState(mockPendingRecords);
  const [approvedRecords, setApprovedRecords] = useState(mockApprovedRecords);

  const handleApproval = (recordId, action, comment = '') => {
    const record = pendingRecords?.find(r => r?.id === recordId);
    if (!record) return;

    if (action === 'approve') {
      const approvedRecord = {
        ...record,
        status: 'Approved',
        approvedBy: 'Current Faculty', // In real app, this would be current user
        approvedDate: new Date()?.toISOString()?.split('T')?.[0],
        approvalComment: comment
      };
      setApprovedRecords(prev => [approvedRecord, ...prev]);
    }

    setPendingRecords(prev => prev?.filter(r => r?.id !== recordId));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Academic': return <FileText className="w-4 h-4" />;
      case 'Competition': return <AlertCircle className="w-4 h-4" />;
      case 'Research': return <FileText className="w-4 h-4" />;
      case 'Workshop': return <User className="w-4 h-4" />;
      case 'Leadership': return <User className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredPendingRecords = pendingRecords?.filter(record =>
    record?.studentName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    record?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    record?.recordType?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const filteredApprovedRecords = approvedRecords?.filter(record =>
    record?.studentName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    record?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    record?.recordType?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="academic-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Faculty Approval Center</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <Button
            variant={selectedTab === 'pending' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTab('pending')}
            className="flex-1"
          >
            <Clock className="w-4 h-4 mr-2" />
            Pending ({filteredPendingRecords?.length})
          </Button>
          <Button
            variant={selectedTab === 'approved' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTab('approved')}
            className="flex-1"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Approved ({filteredApprovedRecords?.length})
          </Button>
        </div>
      </div>

      <div className="p-6">
        {selectedTab === 'pending' && (
          <div className="space-y-4">
            {filteredPendingRecords?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No pending records for approval</p>
              </div>
            ) : (
              filteredPendingRecords?.map((record) => (
                <div key={record?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                        {getCategoryIcon(record?.category)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-foreground text-sm">
                          {record?.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {record?.studentName} ({record?.studentId}) • {record?.recordType}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {record?.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(record?.priority)}`}>
                        {record?.priority}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {record?.uploadDate}
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        {record?.evidence}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleApproval(record?.id, 'approve')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApproval(record?.id, 'reject')}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button size="sm" variant="ghost" className="text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {selectedTab === 'approved' && (
          <div className="space-y-4">
            {filteredApprovedRecords?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No approved records found</p>
              </div>
            ) : (
              filteredApprovedRecords?.map((record) => (
                <div key={record?.id} className="border border-border rounded-lg p-4 bg-green-50/30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-green-100">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-foreground text-sm">
                          {record?.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          {record?.studentName} • {record?.recordType}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Approved by {record?.approvedBy} on {record?.approvedDate}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Approved
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyApprovalWidget;
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import Button from './Button';
import Icon from '../AppIcon';

const ResumeDownloadButton = ({ 
  studentInfo,
  kpiData,
  timelineData,
  achievementsData,
  basketPerformanceData,
  goalsData,
  variant = "primary",
  size = "md",
  className = ""
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateStudentResume = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      // Create new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf?.internal?.pageSize?.getWidth();
      const pageHeight = pdf?.internal?.pageSize?.getHeight();
      
      let yPosition = 20;
      const leftMargin = 20;
      const rightMargin = pageWidth - 20;
      
      // Header Section
      pdf?.setFontSize(24);
      pdf?.setFont('helvetica', 'bold');
      pdf?.setTextColor(44, 82, 130); // Primary blue color
      pdf?.text('Academic Performance Resume', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 15;
      
      // Student Information
      pdf?.setFontSize(16);
      pdf?.setFont('helvetica', 'bold');
      pdf?.setTextColor(0, 0, 0);
      pdf?.text(`${studentInfo?.name || 'Student Name'}`, pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 8;
      pdf?.setFontSize(12);
      pdf?.setFont('helvetica', 'normal');
      pdf?.setTextColor(100, 100, 100);
      pdf?.text(`${studentInfo?.program || 'Program'} • Semester ${studentInfo?.currentSemester || 'N/A'} • ID: ${studentInfo?.studentId || 'N/A'}`, pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 15;
      
      // Add horizontal line
      pdf?.setDrawColor(200, 200, 200);
      pdf?.line(leftMargin, yPosition, rightMargin, yPosition);
      yPosition += 15;
      
      // Key Performance Indicators Section
      pdf?.setFontSize(14);
      pdf?.setFont('helvetica', 'bold');
      pdf?.setTextColor(0, 0, 0);
      pdf?.text('Key Performance Indicators', leftMargin, yPosition);
      yPosition += 10;
      
      // KPI Grid
      const kpiColumns = 2;
      const kpiWidth = (rightMargin - leftMargin - 10) / kpiColumns;
      let kpiX = leftMargin;
      let kpiY = yPosition;
      
      kpiData?.forEach((kpi, index) => {
        if (index > 0 && index % kpiColumns === 0) {
          kpiY += 25;
          kpiX = leftMargin;
        }
        
        // KPI Card background
        pdf?.setFillColor(248, 249, 250);
        pdf?.rect(kpiX, kpiY - 5, kpiWidth, 20, 'F');
        
        // KPI Content
        pdf?.setFontSize(10);
        pdf?.setFont('helvetica', 'bold');
        pdf?.setTextColor(0, 0, 0);
        pdf?.text(kpi?.title || 'KPI', kpiX + 5, kpiY);
        
        pdf?.setFontSize(12);
        pdf?.setFont('helvetica', 'bold');
        pdf?.setTextColor(44, 82, 130);
        pdf?.text(kpi?.value || '0', kpiX + 5, kpiY + 6);
        
        pdf?.setFontSize(8);
        pdf?.setFont('helvetica', 'normal');
        pdf?.setTextColor(100, 100, 100);
        pdf?.text(kpi?.description || 'Description', kpiX + 5, kpiY + 11);
        
        kpiX += kpiWidth + 10;
      });
      
      yPosition = kpiY + 30;
      
      // Timeline Performance Section
      if (yPosition > pageHeight - 60) {
        pdf?.addPage();
        yPosition = 20;
      }
      
      pdf?.setFontSize(14);
      pdf?.setFont('helvetica', 'bold');
      pdf?.setTextColor(0, 0, 0);
      pdf?.text('Academic Timeline', leftMargin, yPosition);
      yPosition += 10;
      
      // Timeline table
      const timelineTableData = timelineData?.map(item => [
        item?.semester || 'N/A',
        item?.cgpa?.toString() || '0.0',
        item?.activityPoints?.toString() || '0',
        item?.basket || 'N/A',
        item?.milestone || 'N/A'
      ]) || [['No data available', '', '', '', '']];
      
      autoTable(pdf, {
        startY: yPosition,
        head: [['Semester', 'CGPA', 'Activity Points', 'Primary Basket', 'Milestone']],
        body: timelineTableData,
        theme: 'striped',
        headStyles: {
          fillColor: [44, 82, 130],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [0, 0, 0]
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250]
        },
        margin: { left: leftMargin, right: leftMargin }
      });
      
      yPosition = pdf?.lastAutoTable?.finalY + 20;
      
      // Achievements Section
      if (yPosition > pageHeight - 80) {
        pdf?.addPage();
        yPosition = 20;
      }
      
      pdf?.setFontSize(14);
      pdf?.setFont('helvetica', 'bold');
      pdf?.setTextColor(0, 0, 0);
      pdf?.text('Recent Achievements', leftMargin, yPosition);
      yPosition += 10;
      
      // Achievements table
      const achievementsTableData = achievementsData?.slice(0, 8)?.map(achievement => [
        achievement?.title || 'Achievement',
        achievement?.basket || 'Category',
        achievement?.points?.toString() || '0',
        achievement?.date ? new Date(achievement.date)?.toLocaleDateString() : 'N/A'
      ]) || [['No achievements recorded', '', '', '']];
      
      autoTable(pdf, {
        startY: yPosition,
        head: [['Achievement', 'Category', 'Points', 'Date']],
        body: achievementsTableData,
        theme: 'striped',
        headStyles: {
          fillColor: [44, 82, 130],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [0, 0, 0]
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250]
        },
        margin: { left: leftMargin, right: leftMargin },
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 30 },
          2: { cellWidth: 20 },
          3: { cellWidth: 30 }
        }
      });
      
      yPosition = pdf?.lastAutoTable?.finalY + 20;
      
      // Basket Performance Section
      if (yPosition > pageHeight - 60) {
        pdf?.addPage();
        yPosition = 20;
      }
      
      pdf?.setFontSize(14);
      pdf?.setFont('helvetica', 'bold');
      pdf?.setTextColor(0, 0, 0);
      pdf?.text('Activity Basket Performance', leftMargin, yPosition);
      yPosition += 10;
      
      // Basket performance table
      const basketTableData = basketPerformanceData?.map(basket => [
        basket?.basket || 'Activity',
        `${basket?.data?.completed || 0}/${basket?.data?.total || 0}`,
        ((basket?.data?.completed || 0) / (basket?.data?.total || 1) * 100)?.toFixed(1) + '%',
        basket?.data?.points?.toString() || '0',
        basket?.peerComparison?.average?.toString() || '0'
      ]) || [['No basket data available', '', '', '', '']];
      
      autoTable(pdf, {
        startY: yPosition,
        head: [['Activity Basket', 'Progress', 'Completion %', 'Points Earned', 'Peer Average']],
        body: basketTableData,
        theme: 'striped',
        headStyles: {
          fillColor: [44, 82, 130],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [0, 0, 0]
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250]
        },
        margin: { left: leftMargin, right: leftMargin }
      });
      
      yPosition = pdf?.lastAutoTable?.finalY + 20;
      
      // Goals Progress Section
      if (yPosition > pageHeight - 60) {
        pdf?.addPage();
        yPosition = 20;
      }
      
      pdf?.setFontSize(14);
      pdf?.setFont('helvetica', 'bold');
      pdf?.setTextColor(0, 0, 0);
      pdf?.text('Current Goals & Progress', leftMargin, yPosition);
      yPosition += 10;
      
      // Goals table
      const goalsTableData = goalsData?.map(goal => [
        goal?.title || 'Goal',
        goal?.category || 'Category',
        (goal?.progress || 0) + '%',
        goal?.status ? goal?.status?.charAt(0)?.toUpperCase() + goal?.status?.slice(1) : 'N/A',
        goal?.deadline ? new Date(goal.deadline)?.toLocaleDateString() : 'N/A'
      ]) || [['No goals set', '', '', '', '']];
      
      autoTable(pdf, {
        startY: yPosition,
        head: [['Goal', 'Category', 'Progress', 'Status', 'Deadline']],
        body: goalsTableData,
        theme: 'striped',
        headStyles: {
          fillColor: [44, 82, 130],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [0, 0, 0]
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250]
        },
        margin: { left: leftMargin, right: leftMargin },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 25 },
          2: { cellWidth: 20 },
          3: { cellWidth: 25 },
          4: { cellWidth: 30 }
        }
      });
      
      // Footer
      const pageCount = pdf?.internal?.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf?.setPage(i);
        pdf?.setFontSize(8);
        pdf?.setFont('helvetica', 'normal');
        pdf?.setTextColor(150, 150, 150);
        pdf?.text(
          `Generated on ${new Date()?.toLocaleDateString()} • EduPassport Analytics • Page ${i} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      }
      
      // Generate filename and save
      const timestamp = new Date()?.toISOString()?.split('T')?.[0];
      const filename = `${(studentInfo?.name || 'Student')?.replace(/\s+/g, '_')}_Academic_Resume_${timestamp}.pdf`;
      
      pdf?.save(filename);
      
      // Show success message
      console.log('PDF generated successfully:', filename);
      
    } catch (error) {
      console.error('Error generating resume PDF:', error);
      alert('Error generating resume. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={generateStudentResume}
      disabled={isGenerating}
      iconName={isGenerating ? "Loader2" : "Download"}
      iconPosition="left"
      className={`${className} ${isGenerating ? 'opacity-75 cursor-not-allowed' : ''}`}
    >
      {isGenerating ? (
        <>
          <Icon name="Loader2" className="animate-spin mr-2" size={16} />
          Generating Resume...
        </>
      ) : (
        'Download Resume'
      )}
    </Button>
  );
};

export default ResumeDownloadButton;
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDFReport = (scanData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Header
  doc.setFillColor(10, 14, 39); // cyber-dark
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  // Logo/Title
  doc.setTextColor(0, 217, 255); // cyber-blue
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('🛡️ PhishGuard', 15, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('Phishing Detection Report', 15, 30);
  
  // Report metadata
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - 15, 20, { align: 'right' });
  doc.text(`Report ID: ${generateReportId()}`, pageWidth - 15, 27, { align: 'right' });
  
  let yPosition = 50;
  
  // Executive Summary
  doc.setFontSize(16);
  doc.setTextColor(0, 217, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', 15, yPosition);
  yPosition += 10;
  
  // Risk Level Box
  const riskLevel = scanData.riskScore >= 70 ? 'HIGH RISK' : scanData.riskScore >= 40 ? 'MEDIUM RISK' : 'LOW RISK';
  const riskColor = scanData.riskScore >= 70 ? [255, 0, 85] : scanData.riskScore >= 40 ? [251, 191, 36] : [0, 255, 136];
  
  doc.setFillColor(...riskColor);
  doc.roundedRect(15, yPosition, 60, 12, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(riskLevel, 45, yPosition + 8, { align: 'center' });
  
  // Risk Score
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Risk Score:', 85, yPosition + 5);
  doc.setTextColor(...riskColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`${scanData.riskScore}/100`, 115, yPosition + 8);
  
  yPosition += 20;
  
  // Classification Result
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.setFont('helvetica', 'normal');
  doc.text('Classification:', 15, yPosition);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(scanData.classification || 'Phishing Detected', 50, yPosition);
  
  yPosition += 7;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('Scan Type:', 15, yPosition);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(scanData.type || 'Email', 50, yPosition);
  
  yPosition += 7;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('Confidence:', 15, yPosition);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`${scanData.confidence || 95}%`, 50, yPosition);
  
  yPosition += 15;
  
  // Analyzed Content
  doc.setFontSize(16);
  doc.setTextColor(0, 217, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Analyzed Content', 15, yPosition);
  yPosition += 10;
  
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(15, yPosition, pageWidth - 30, 40, 3, 3, 'F');
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont('courier', 'normal');
  const contentLines = doc.splitTextToSize(scanData.content || 'No content provided', pageWidth - 40);
  doc.text(contentLines.slice(0, 5), 20, yPosition + 5); // Show first 5 lines
  
  yPosition += 50;
  
  // Risk Indicators
  doc.setFontSize(16);
  doc.setTextColor(0, 217, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Risk Indicators', 15, yPosition);
  yPosition += 5;
  
  const indicators = scanData.indicators || [
    { name: 'Suspicious URL', severity: 'High', detected: true },
    { name: 'Urgency Language', severity: 'High', detected: true },
    { name: 'Impersonation Attempt', severity: 'Medium', detected: true },
    { name: 'Legitimate Domain', severity: 'Low', detected: false }
  ];
  
  doc.autoTable({
    startY: yPosition,
    head: [['Indicator', 'Severity', 'Status']],
    body: indicators.map(ind => [
      ind.name,
      ind.severity,
      ind.detected ? '✓ Detected' : '✗ Not Detected'
    ]),
    theme: 'grid',
    headStyles: {
      fillColor: [0, 217, 255],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [50, 50, 50]
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    margin: { left: 15, right: 15 }
  });
  
  yPosition = doc.lastAutoTable.finalY + 15;
  
  // Threat Intelligence (if available)
  if (scanData.threatIntel) {
    doc.setFontSize(16);
    doc.setTextColor(0, 217, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Threat Intelligence', 15, yPosition);
    yPosition += 10;
    
    doc.autoTable({
      startY: yPosition,
      body: [
        ['Domain Age', scanData.threatIntel.domainAge || 'Unknown'],
        ['SSL Certificate', scanData.threatIntel.ssl || 'Not Verified'],
        ['Blacklist Status', scanData.threatIntel.blacklisted ? 'Listed' : 'Clean'],
        ['Reputation Score', `${scanData.threatIntel.reputation || 50}/100`]
      ],
      theme: 'plain',
      styles: {
        fontSize: 9,
        cellPadding: 3
      },
      columnStyles: {
        0: { fontStyle: 'bold', textColor: [80, 80, 80], cellWidth: 50 },
        1: { textColor: [0, 0, 0] }
      },
      margin: { left: 15, right: 15 }
    });
    
    yPosition = doc.lastAutoTable.finalY + 15;
  }
  
  // Add new page if needed
  if (yPosition > pageHeight - 80) {
    doc.addPage();
    yPosition = 20;
  }
  
  // Recommendations
  doc.setFontSize(16);
  doc.setTextColor(0, 217, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommendations', 15, yPosition);
  yPosition += 10;
  
  const recommendations = scanData.recommendations || [
    'Do not click on any links in this email',
    'Do not provide any personal or financial information',
    'Report this email to your IT security team',
    'Delete this email immediately',
    'Check your account directly through official website'
  ];
  
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  doc.setFont('helvetica', 'normal');
  
  recommendations.forEach((rec, index) => {
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFillColor(255, 240, 240);
    doc.roundedRect(15, yPosition - 4, pageWidth - 30, 10, 2, 2, 'F');
    doc.text(`${index + 1}. ${rec}`, 20, yPosition + 2);
    yPosition += 12;
  });
  
  // Footer on last page
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'italic');
  doc.text(
    'This report is generated by PhishGuard AI. For questions, contact: security@phishguard.ai',
    pageWidth / 2,
    pageHeight - 20,
    { align: 'center' }
  );
  
  doc.text(
    '© 2025 PhishGuard. All rights reserved. | Confidential Security Report',
    pageWidth / 2,
    pageHeight - 15,
    { align: 'center' }
  );
  
  // Save the PDF
  const fileName = `PhishGuard_Report_${new Date().getTime()}.pdf`;
  doc.save(fileName);
  
  return fileName;
};

const generateReportId = () => {
  return 'PG-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
};

export default { generatePDFReport };

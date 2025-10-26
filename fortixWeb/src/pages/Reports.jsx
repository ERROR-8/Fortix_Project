import React from 'react';
import { FaFileAlt, FaBoxes, FaChartLine, FaReceipt, FaExclamationTriangle, FaChartBar, FaPlus } from 'react-icons/fa';
import './Reports.css';

const Reports = () => {
  const reportCards = [
    {
      id: 1,
      title: 'Sales Report',
      description: 'Track sales performance over time.',
      icon: <FaFileAlt />,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Inventory Summary',
      description: 'Get a snapshot of your current stock levels.',
      icon: <FaBoxes />,
      color: 'green'
    },
    {
      id: 3,
      title: 'Customer Trends',
      description: 'Analyze customer purchasing habits.',
      icon: <FaChartLine />,
      color: 'yellow'
    },
    {
      id: 4,
      title: 'Expense Report',
      description: 'Monitor business expenditures.',
      icon: <FaReceipt />,
      color: 'purple'
    },
    {
      id: 5,
      title: 'Low Stock Alert',
      description: 'Identify products that need reordering.',
      icon: <FaExclamationTriangle />,
      color: 'red'
    },
    {
      id: 6,
      title: 'Profit & Loss',
      description: 'Review your financial performance.',
      icon: <FaChartBar />,
      color: 'indigo'
    }
  ];

  return (
    <div className="reports-page">
      {/* Header Card */}
      <div className="card mb-4 text-center py-5">
        <div className="card-body">
          <h2 className="mb-3">Build Your Own Report</h2>
          <p className="text-muted mb-4">
            Gain deeper insights by creating reports tailored to your specific needs.
          </p>
          <button className="btn btn-primary btn-lg px-4">
            <FaPlus className="me-2" />
            Create Custom Report
          </button>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="row g-4">
        {reportCards.map((report) => (
          <div key={report.id} className="col-md-6 col-lg-4">
            <div className="card report-card h-100">
              <div className="card-body">
                <div className={`report-icon report-icon-${report.color} mb-3`}>
                  {report.icon}
                </div>
                <h5 className="card-title mb-2">{report.title}</h5>
                <p className="card-text text-muted mb-3">{report.description}</p>
                <a href="#" className="text-primary text-decoration-none">
                  View Report →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
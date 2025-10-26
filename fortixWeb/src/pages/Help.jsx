import React, { useState } from 'react';
import { 
  FaSearch, 
  FaBook, 
  FaVideo, 
  FaQuestionCircle, 
  FaEnvelope,
  FaPhone,
  FaComments,
  FaChevronRight,
  FaExternalLinkAlt
} from 'react-icons/fa';
import './Help.css';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: <FaBook /> },
    { id: 'getting-started', name: 'Getting Started', icon: <FaQuestionCircle /> },
    { id: 'inventory', name: 'Inventory Management', icon: <FaBook /> },
    { id: 'users', name: 'User Management', icon: <FaBook /> },
    { id: 'reports', name: 'Reports & Analytics', icon: <FaBook /> },
  ];

  const helpArticles = [
    {
      id: 1,
      category: 'getting-started',
      title: 'Getting Started with Fortix',
      description: 'Learn the basics of using Fortix for inventory management',
      views: '1.2k',
      helpful: 156
    },
    {
      id: 2,
      category: 'getting-started',
      title: 'How to Set Up Your Account',
      description: 'Step-by-step guide to configure your account settings',
      views: '856',
      helpful: 92
    },
    {
      id: 3,
      category: 'inventory',
      title: 'Adding Products to Inventory',
      description: 'Learn how to add and manage products in your inventory',
      views: '2.1k',
      helpful: 234
    },
    {
      id: 4,
      category: 'inventory',
      title: 'Managing Stock Levels',
      description: 'Keep track of your stock and set up low stock alerts',
      views: '1.8k',
      helpful: 198
    },
    {
      id: 5,
      category: 'users',
      title: 'User Roles and Permissions',
      description: 'Understanding different user roles and access levels',
      views: '965',
      helpful: 87
    },
    {
      id: 6,
      category: 'reports',
      title: 'Creating Custom Reports',
      description: 'Generate custom reports to analyze your business data',
      views: '1.4k',
      helpful: 145
    }
  ];

  const videoTutorials = [
    {
      id: 1,
      title: 'Product Overview',
      duration: '5:24',
      thumbnail: '🎬'
    },
    {
      id: 2,
      title: 'Inventory Management Basics',
      duration: '8:15',
      thumbnail: '🎬'
    },
    {
      id: 3,
      title: 'Advanced Reporting',
      duration: '12:30',
      thumbnail: '🎬'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'Go to Account Settings > Security > Change Password. You can also use the "Forgot Password" link on the login page.'
    },
    {
      id: 2,
      question: 'Can I export my data?',
      answer: 'Yes, you can export data from any report page using the Export button. Data can be exported in CSV, Excel, or PDF formats.'
    },
    {
      id: 3,
      question: 'How do I add multiple users?',
      answer: 'Navigate to Users page and click "Add New User". You can also bulk import users using a CSV file.'
    },
    {
      id: 4,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.'
    }
  ];

  const filteredArticles = helpArticles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="help-page">
      {/* Header Section */}
      <div className="help-header">
        <h2 className="mb-3">How can we help you?</h2>
        <p className="text-muted mb-4">Search our knowledge base or browse categories below</p>
        
        <div className="help-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="form-control"
            placeholder="Search for help articles, guides, and FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-3 mb-5">
        <div className="col-md-4">
          <div className="card help-action-card">
            <div className="card-body text-center">
              <div className="help-action-icon">
                <FaBook />
              </div>
              <h5>Documentation</h5>
              <p className="text-muted mb-3">Browse our comprehensive guides</p>
              <button className="btn btn-outline-primary btn-sm">View Docs</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card help-action-card">
            <div className="card-body text-center">
              <div className="help-action-icon">
                <FaVideo />
              </div>
              <h5>Video Tutorials</h5>
              <p className="text-muted mb-3">Watch step-by-step video guides</p>
              <button className="btn btn-outline-primary btn-sm">Watch Videos</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card help-action-card">
            <div className="card-body text-center">
              <div className="help-action-icon">
                <FaComments />
              </div>
              <h5>Contact Support</h5>
              <p className="text-muted mb-3">Get help from our support team</p>
              <button className="btn btn-outline-primary btn-sm">Contact Us</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Categories Sidebar */}
        <div className="col-lg-3">
          <div className="card">
            <div className="card-body p-0">
              <div className="help-categories">
                <div className="category-header">Categories</div>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                    <FaChevronRight className="category-arrow" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="card mt-4">
            <div className="card-body">
              <h6 className="mb-3">Need More Help?</h6>
              <div className="contact-options">
                <a href="mailto:support@fortix.com" className="contact-option">
                  <FaEnvelope />
                  <span>support@fortix.com</span>
                </a>
                <a href="tel:+15551234567" className="contact-option">
                  <FaPhone />
                  <span>+1 (555) 123-4567</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          {/* Help Articles */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="mb-4">Help Articles</h5>
              <div className="article-list">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="article-item">
                    <div className="article-content">
                      <h6 className="article-title">{article.title}</h6>
                      <p className="article-description text-muted">{article.description}</p>
                      <div className="article-meta">
                        <span className="meta-item">{article.views} views</span>
                        <span className="meta-item">{article.helpful} found this helpful</span>
                      </div>
                    </div>
                    <button className="btn btn-link">
                      <FaExternalLinkAlt />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Video Tutorials */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="mb-4">Video Tutorials</h5>
              <div className="row g-3">
                {videoTutorials.map((video) => (
                  <div key={video.id} className="col-md-4">
                    <div className="video-card">
                      <div className="video-thumbnail">
                        <div className="video-icon">{video.thumbnail}</div>
                        <div className="video-duration">{video.duration}</div>
                      </div>
                      <div className="video-info">
                        <h6>{video.title}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="card">
            <div className="card-body">
              <h5 className="mb-4">Frequently Asked Questions</h5>
              <div className="faq-list">
                {faqs.map((faq) => (
                  <div key={faq.id} className="faq-item">
                    <div className="faq-question">
                      <FaQuestionCircle className="me-2 text-primary" />
                      {faq.question}
                    </div>
                    <div className="faq-answer">{faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
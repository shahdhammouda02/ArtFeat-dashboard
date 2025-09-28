import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Form,
} from "react-bootstrap";
import { useState } from "react";
import { Edit, Trash2, Filter } from "lucide-react";

const DonationManagement = () => {
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);

  // Sample data
  const donors = [
    {
      name: "Alice Smith",
      amount: 500,
      date: "2024-07-28",
      method: "Credit Card",
    },
    { name: "Bob Johnson", amount: 150, date: "2024-07-27", method: "PayPal" },
    {
      name: "Charlie Brown",
      amount: 1200,
      date: "2024-07-26",
      method: "Bank Transfer",
    },
    {
      name: "Diana Prince",
      amount: 75,
      date: "2024-07-25",
      method: "Debit Card",
    },
    {
      name: "Eve Adams",
      amount: 200,
      date: "2024-07-24",
      method: "Credit Card",
    },
    {
      name: "Frank White",
      amount: 300,
      date: "2024-07-23",
      method: "Credit Card",
    },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(donors.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const currentDonors = donors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold" style={{ color: "#38bdf8" }}>Donations Overview</h2>
      </div>

      {/* Header Stats */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100" style={{ backgroundColor: "white" }}>
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Total Donations</p>
                  <h3 className="fw-bold text-dark mb-1">$12,345.00</h3>
                  <small className="text-success fw-medium">+15% vs. last month</small>
                </div>
                <div 
                  className="d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "32px", 
                    height: "32px", 
                    backgroundColor: "#e0f7ff",
                    borderRadius: "6px"
                  }}
                >
                  <span style={{ color: "#38bdf8", fontSize: "16px" }}>💰</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100" style={{ backgroundColor: "white" }}>
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Total Donors</p>
                  <h3 className="fw-bold text-dark mb-1">1,230</h3>
                  <small className="text-success fw-medium">+8% vs. last month</small>
                </div>
                <div 
                  className="d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "32px", 
                    height: "32px", 
                    backgroundColor: "#e0f7ff",
                    borderRadius: "6px"
                  }}
                >
                  <span style={{ color: "#38bdf8", fontSize: "16px" }}>👥</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100" style={{ backgroundColor: "white" }}>
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Average Donation</p>
                  <h3 className="fw-bold text-dark mb-1">$10.04</h3>
                  <small className="text-danger fw-medium">-3% vs. last month</small>
                </div>
                <div 
                  className="d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "32px", 
                    height: "32px", 
                    backgroundColor: "#e0f7ff",
                    borderRadius: "6px"
                  }}
                >
                  <span style={{ color: "#38bdf8", fontSize: "16px" }}>📊</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Donors List */}
        <Col lg={7}>
          <Card className="border-0 shadow-sm" style={{ backgroundColor: "white" }}>
            <Card.Body className="p-0">
              <div className="p-3 border-bottom">
                <h5 className="fw-bold mb-3 text-dark">Donors List</h5>
                <Row>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="Search donors..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{ 
                        backgroundColor: "#f1f5f9", 
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px"
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <Button
                      variant="outline-secondary"
                      className="w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{ 
                        backgroundColor: "#f1f5f9", 
                        border: "1px solid #e2e8f0",
                        color: "#6b7280",
                        borderRadius: "6px"
                      }}
                    >
                      <Filter size={16} /> Filter
                    </Button>
                  </Col>
                </Row>
              </div>
              
              <div className="table-responsive">
                <Table className="mb-0" style={{ fontSize: "14px" }}>
                  <thead style={{ backgroundColor: "#f8fafc" }}>
                    <tr>
                      <th className="border-0 py-3 px-3 fw-medium text-muted">Donor Name</th>
                      <th className="border-0 py-3 px-3 fw-medium text-muted">Donation Amount</th>
                      <th className="border-0 py-3 px-3 fw-medium text-muted">Date</th>
                      <th className="border-0 py-3 px-3 fw-medium text-muted">Payment Method</th>
                      <th className="border-0 py-3 px-3 fw-medium text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDonors.map((donor, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td className="py-3 px-3 fw-medium text-dark">{donor.name}</td>
                        <td className="py-3 px-3 fw-bold text-dark">${donor.amount.toFixed(2)}</td>
                        <td className="py-3 px-3 text-muted">{donor.date}</td>
                        <td className="py-3 px-3 text-muted">{donor.method}</td>
                        <td className="py-3 px-3">
                          <div className="d-flex align-items-center gap-1">
                            <button
                              className="btn btn-sm p-1"
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#6b7280",
                              }}
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              className="btn btn-sm p-1"
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#ef4444",
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              
              {/* Custom Pagination */}
              <div className="p-3 border-top">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <button
                    onClick={() => setActivePage((p) => Math.max(p - 1, 1))}
                    disabled={activePage === 1}
                    className="btn btn-sm px-3 py-1"
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid #e2e8f0",
                      color: "#6b7280",
                      borderRadius: "6px",
                      fontSize: "14px"
                    }}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setActivePage(i + 1)}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: i + 1 === activePage ? "#007bff" : "transparent",
                        border: "1px solid #e2e8f0",
                        color: i + 1 === activePage ? "white" : "#6b7280",
                        borderRadius: "6px",
                        width: "32px",
                        height: "32px",
                        fontSize: "14px"
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setActivePage((p) => Math.min(p + 1, totalPages))}
                    disabled={activePage === totalPages}
                    className="btn btn-sm px-3 py-1"
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid #e2e8f0",
                      color: "#6b7280",
                      borderRadius: "6px",
                      fontSize: "14px"
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Charts */}
        <Col lg={5}>
          <Row>
            <Col md={12} className="mb-4">
              <Card className="border-0 shadow-sm" style={{ backgroundColor: "white" }}>
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0 text-dark">Statistics</h5>
                    <Form.Select 
                      size="sm" 
                      style={{ 
                        width: "auto", 
                        backgroundColor: "#f1f5f9",
                        border: "1px solid #e2e8f0",
                        fontSize: "12px"
                      }}
                    >
                      <option>Last Month</option>
                      <option>This Month</option>
                    </Form.Select>
                  </div>
                  <div className="text-center">
                    <div style={{ position: "relative", display: "inline-block" }}>
                      <svg width="180" height="180" viewBox="0 0 180 180">
                        {/* Background circle */}
                        <circle
                          cx="90"
                          cy="90"
                          r="70"
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth="20"
                        />
                        {/* Cyan part (65%) */}
                        <circle
                          cx="90"
                          cy="90"
                          r="70"
                          fill="none"
                          stroke="#00bcd4"
                          strokeWidth="20"
                          strokeDasharray={`${65 * 4.4} ${35 * 4.4}`}
                          strokeDashoffset="0"
                          transform="rotate(-90 90 90)"
                          strokeLinecap="round"
                        />
                        {/* Blue part (35%) */}
                        <circle
                          cx="90"
                          cy="90"
                          r="70"
                          fill="none"
                          stroke="#2196f3"
                          strokeWidth="20"
                          strokeDasharray={`${35 * 4.4} ${65 * 4.4}`}
                          strokeDashoffset={`-${65 * 4.4}`}
                          transform="rotate(-90 90 90)"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="d-flex justify-content-center gap-4 mt-3">
                      <div className="d-flex align-items-center gap-2">
                        <div 
                          style={{ 
                            width: "8px", 
                            height: "8px", 
                            backgroundColor: "#2196f3", 
                            borderRadius: "50%" 
                          }}
                        ></div>
                        <small className="text-muted">Recurring</small>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <div 
                          style={{ 
                            width: "8px", 
                            height: "8px", 
                            backgroundColor: "#00bcd4", 
                            borderRadius: "50%" 
                          }}
                        ></div>
                        <small className="text-muted">One-Time</small>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12}>
              <Card className="border-0 shadow-sm" style={{ backgroundColor: "white" }}>
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0 text-dark">Donations</h5>
                    <Form.Select 
                      size="sm" 
                      style={{ 
                        width: "auto", 
                        backgroundColor: "#f1f5f9",
                        border: "1px solid #e2e8f0",
                        fontSize: "12px"
                      }}
                    >
                      <option>2024</option>
                      <option>2023</option>
                    </Form.Select>
                  </div>
                  <div style={{ height: "160px", position: "relative" }}>
                    <svg width="100%" height="160" viewBox="0 0 300 160">
                      {/* Background bars */}
                      <rect x="20" y="20" width="40" height="120" fill="#f1f5f9" rx="4" />
                      <rect x="70" y="20" width="40" height="120" fill="#f1f5f9" rx="4" />
                      <rect x="120" y="20" width="40" height="120" fill="#f1f5f9" rx="4" />
                      <rect x="170" y="20" width="40" height="120" fill="#f1f5f9" rx="4" />
                      <rect x="220" y="20" width="40" height="120" fill="#f1f5f9" rx="4" />
                      
                      {/* Data bars */}
                      <rect x="20" y="60" width="40" height="80" fill="#2196f3" rx="4" />
                      <rect x="70" y="30" width="40" height="110" fill="#2196f3" rx="4" />
                      <rect x="120" y="50" width="40" height="90" fill="#2196f3" rx="4" />
                      <rect x="170" y="20" width="40" height="120" fill="#2196f3" rx="4" />
                      <rect x="220" y="40" width="40" height="100" fill="#2196f3" rx="4" />
                      
                      {/* Month labels */}
                      <text x="40" y="155" textAnchor="middle" fontSize="12" fill="#6b7280">Jan</text>
                      <text x="90" y="155" textAnchor="middle" fontSize="12" fill="#6b7280">Feb</text>
                      <text x="140" y="155" textAnchor="middle" fontSize="12" fill="#6b7280">Mar</text>
                      <text x="190" y="155" textAnchor="middle" fontSize="12" fill="#6b7280">Apr</text>
                      <text x="240" y="155" textAnchor="middle" fontSize="12" fill="#6b7280">May</text>
                    </svg>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div 
                      style={{ 
                        width: "8px", 
                        height: "8px", 
                        backgroundColor: "#2196f3", 
                        borderRadius: "2px" 
                      }}
                    ></div>
                    <small className="text-muted">Donated</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DonationManagement;
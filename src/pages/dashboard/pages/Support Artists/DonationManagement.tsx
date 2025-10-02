import { Card, Row, Col, Table, Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import {
  Edit,
  Trash2,
  DollarSign,
  Users,
  TrendingUp,
  Filter,
} from "lucide-react";

const DonationManagement = () => {
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [filterMethod, setFilterMethod] = useState<string | null>(null);
  const [donors, setDonors] = useState([
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
  ]);

  const [chartPeriod, setChartPeriod] = useState("Last Month");
  const [chartYear, setChartYear] = useState("2024");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDonor, setEditingDonor] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    amount: 0,
    date: "",
    method: "",
  });

  const itemsPerPage = 6;

  // Filter + Search
  const filteredDonors = donors.filter((donor) => {
    const matchesSearch = donor.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filterMethod ? donor.method === filterMethod : true;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const currentDonors = filteredDonors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const findOriginalIndex = (donor: (typeof donors)[0]) =>
    donors.findIndex(
      (d) =>
        d.name === donor.name &&
        d.amount === donor.amount &&
        d.date === donor.date &&
        d.method === donor.method
    );

  // Handle Edit Dialog Open
  const handleEdit = (index: number) => {
    const donor = currentDonors[index];
    const originalIndex = findOriginalIndex(donor);

    setEditingDonor({ ...donor, originalIndex });
    setEditFormData({ ...donor });
    setShowEditModal(true);
  };

  // Handle Edit Save
  const handleSaveEdit = () => {
    if (editingDonor) {
      const updated = donors.map((d, i) =>
        i === editingDonor.originalIndex
          ? { ...editFormData, amount: Number(editFormData.amount) }
          : d
      );
      setDonors(updated);
      setShowEditModal(false);
      setEditingDonor(null);
    }
  };

  // Handle Delete
  const handleDelete = (index: number) => {
    const donor = currentDonors[index];
    const originalIndex = findOriginalIndex(donor);

    if (window.confirm("Are you sure you want to delete this donor?")) {
      setDonors(donors.filter((_, i) => i !== originalIndex));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  return (
    <div
      className="p-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold" style={{ color: "#2196f3" }}>
          Donations Overview
        </h2>
      </div>

      {/* Header Stats */}
      <Row className="mb-4">
        <Col md={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ backgroundColor: "white" }}
          >
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Total Donations</p>
                  <h3 className="fw-bold text-dark mb-1">$12,345.00</h3>
                  <small className="text-success fw-medium">
                    +15% vs. last month
                  </small>
                </div>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "32px",
                    height: "32px",
                  }}
                >
                  <DollarSign size={16} color="#38bdf8" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ backgroundColor: "white" }}
          >
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Total Donors</p>
                  <h3 className="fw-bold text-dark mb-1">1,230</h3>
                  <small className="text-success fw-medium">
                    +8% vs. last month
                  </small>
                </div>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "32px",
                    height: "32px",
                  }}
                >
                  <Users size={16} color="#38bdf8" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ backgroundColor: "white" }}
          >
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted mb-1 small">Average Donation</p>
                  <h3 className="fw-bold text-dark mb-1">$10.04</h3>
                  <small className="text-danger fw-medium">
                    -3% vs. last month
                  </small>
                </div>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "32px",
                    height: "32px",
                  }}
                >
                  <TrendingUp size={16} color="#38bdf8" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="align-items-stretch">
        {/* Donors List */}
        <Col lg={7} className="d-flex flex-column">
          <Card
            className="border-0 shadow-sm flex-grow-1"
            style={{ backgroundColor: "white" }}
          >
            <Card.Body className="p-0">
              <div className="p-3 border-bottom">
                <h5 className="fw-bold mb-3 text-dark">Donors List</h5>
                <Row>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="Search donors..."
                      value={search}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearch(e.target.value);
                        setActivePage(1);
                      }}
                      style={{
                        backgroundColor: "#f1f5f9",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      {/* Lucide Filter icon overlay (only show when nothing selected) */}
                      {!filterMethod && (
                        <Filter
                          size={16}
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "10px",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                            color: "#64748b",
                          }}
                        />
                      )}

                      <Form.Select
                        value={filterMethod || ""}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const val = e.target.value;
                          if (val === "reset") {
                            setFilterMethod(null); // reset filter
                          } else {
                            setFilterMethod(val || null);
                          }
                        }}
                        style={{
                          backgroundColor: "#f1f5f9",
                          border: "1px solid #e2e8f0",
                          borderRadius: "6px",
                          paddingLeft: filterMethod ? "12px" : "32px",
                        }}
                      >
                        {/* Placeholder (only shows when nothing is selected) */}
                        <option value="" hidden>
                          Filter
                        </option>

                        {/* Reset option */}
                        <option value="reset">Reset Filter</option>

                        <option value="Credit Card">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Debit Card">Debit Card</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="table-responsive">
                <Table className="mb-0" style={{ fontSize: "14px" }}>
                  <thead style={{ backgroundColor: "#f8fafc" }}>
                    <tr>
                      <th className="border-0 py-3 px-3 fw-medium text-muted">
                        Donor Name
                      </th>
                      <th className="border-0 py-3 px-3 fw-medium text-muted">
                        Donation Amount
                      </th>
                      <th className="border-0 py-3 px-3 fw-medium text-muted">
                        Date
                      </th>
                      <th className="border-0 py-3 px-3 fw-medium text-muted">
                        Payment Method
                      </th>
                      <th className="border-0 py-3 px-3 fw-medium text-muted">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDonors.map((donor, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td className="py-3 px-3 fw-medium text-dark">
                          {donor.name}
                        </td>
                        <td className="py-3 px-3 fw-bold text-dark">
                          ${donor.amount.toFixed(2)}
                        </td>
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
                              onClick={() => handleEdit(i)}
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
                              onClick={() => handleDelete(i)}
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
                      fontSize: "14px",
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
                        backgroundColor:
                          i + 1 === activePage ? "#007bff" : "transparent",
                        border: "1px solid #e2e8f0",
                        color: i + 1 === activePage ? "white" : "#6b7280",
                        borderRadius: "6px",
                        width: "32px",
                        height: "32px",
                        fontSize: "14px",
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setActivePage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={activePage === totalPages}
                    className="btn btn-sm px-3 py-1"
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid #e2e8f0",
                      color: "#6b7280",
                      borderRadius: "6px",
                      fontSize: "14px",
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
        <Col lg={5} className="d-flex flex-column">
          <Row className="flex-grow-1">
            <Col md={12} className="mb-4 d-flex">
              <Card
                className="border-0 shadow-sm flex-grow-1"
                style={{ backgroundColor: "white" }}
              >
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0 text-dark">Statistics</h5>
                    <Form.Select
                      size="sm"
                      value={chartPeriod}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setChartPeriod(e.target.value)
                      }
                      style={{
                        width: "auto",
                        backgroundColor: "#f1f5f9",
                        border: "1px solid #e2e8f0",
                        fontSize: "12px",
                      }}
                    >
                      <option>Last Month</option>
                      <option>This Month</option>
                    </Form.Select>
                  </div>
                  <div className="text-center">
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
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
                            borderRadius: "50%",
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
                            borderRadius: "50%",
                          }}
                        ></div>
                        <small className="text-muted">One-Time</small>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} className="d-flex">
              <Card
                className="border-0 shadow-sm flex-grow-1"
                style={{ backgroundColor: "white" }}
              >
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0 text-dark">Donations</h5>
                    <Form.Select
                      size="sm"
                      value={chartYear}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setChartYear(e.target.value)
                      }
                      style={{
                        width: "auto",
                        backgroundColor: "#f1f5f9",
                        border: "1px solid #e2e8f0",
                        fontSize: "12px",
                      }}
                    >
                      <option>2024</option>
                      <option>2023</option>
                    </Form.Select>
                  </div>
                  <div style={{ height: "160px", position: "relative" }}>
                    <svg width="100%" height="160" viewBox="0 0 300 160">
                      <rect
                        x="40"
                        y="30"
                        width="220"
                        height="12"
                        fill="#f8fafc"
                        rx="2"
                      />
                      <rect
                        x="40"
                        y="52"
                        width="220"
                        height="12"
                        fill="#f8fafc"
                        rx="2"
                      />
                      <rect
                        x="40"
                        y="74"
                        width="220"
                        height="12"
                        fill="#f8fafc"
                        rx="2"
                      />
                      <rect
                        x="40"
                        y="96"
                        width="220"
                        height="12"
                        fill="#f8fafc"
                        rx="2"
                      />
                      <rect
                        x="40"
                        y="118"
                        width="220"
                        height="12"
                        fill="#f8fafc"
                        rx="2"
                      />

                      <rect
                        x="40"
                        y="30"
                        width="180"
                        height="12"
                        fill="#2196f3"
                        rx="2"
                      />
                      <rect
                        x="40"
                        y="52"
                        width="140"
                        height="12"
                        fill="#2196f3"
                        rx="2"
                      />
                      <rect
                        x="40"
                        y="74"
                        width="200"
                        height="12"
                        fill="#2196f3"
                        rx="2"
                      />
                      <rect
                        x="40"
                        y="96"
                        width="160"
                        height="12"
                        fill="#2196f3"
                        rx="2"
                      />
                      <rect
                        x="40"
                        y="118"
                        width="120"
                        height="12"
                        fill="#2196f3"
                        rx="2"
                      />

                      <text
                        x="25"
                        y="38"
                        textAnchor="end"
                        fontSize="11"
                        fill="#6b7280"
                        fontWeight="500"
                      >
                        Jan
                      </text>
                      <text
                        x="25"
                        y="60"
                        textAnchor="end"
                        fontSize="11"
                        fill="#6b7280"
                        fontWeight="500"
                      >
                        Feb
                      </text>
                      <text
                        x="25"
                        y="82"
                        textAnchor="end"
                        fontSize="11"
                        fill="#6b7280"
                        fontWeight="500"
                      >
                        Mar
                      </text>
                      <text
                        x="25"
                        y="104"
                        textAnchor="end"
                        fontSize="11"
                        fill="#6b7280"
                        fontWeight="500"
                      >
                        Apr
                      </text>
                      <text
                        x="25"
                        y="126"
                        textAnchor="end"
                        fontSize="11"
                        fill="#6b7280"
                        fontWeight="500"
                      >
                        May
                      </text>
                    </svg>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#2196f3",
                        borderRadius: "2px",
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

      {/* Edit Donor Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Donor Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              { label: "Donor Name", name: "name", type: "text" },
              { label: "Donation Amount", name: "amount", type: "number" },
              { label: "Date", name: "date", type: "date" },
            ].map((field) => (
              <Form.Group className="mb-3" key={field.name}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={(editFormData as any)[field.name]}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                name="method"
                value={editFormData.method}
                onChange={handleInputChange}
              >
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Debit Card">Debit Card</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DonationManagement;

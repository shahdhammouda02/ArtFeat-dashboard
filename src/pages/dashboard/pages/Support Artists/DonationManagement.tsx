import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Form,
  Pagination,
} from "react-bootstrap";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

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

  // Pagination logic
  const itemsPerPage = 5;
  const filteredDonors = donors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const currentDonors = filteredDonors.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <div className="p-4">
      {/* Page Title */}
      <h4 className="mb-4 fw-bold" style={{ color: "#38bdf8" }}>
        Donation Management
      </h4>

      {/* Header Stats */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="p-3 text-center shadow-sm">
            <h6>Total Donations</h6>
            <h3 className="fw-bold text-dark">$12,345.00</h3>
            <small className="text-success">+15% vs. last month</small>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 text-center shadow-sm">
            <h6>Total Donors</h6>
            <h3 className="fw-bold text-dark">1,230</h3>
            <small className="text-success">+8% vs. last month</small>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 text-center shadow-sm">
            <h6>Average Donation</h6>
            <h3 className="fw-bold text-dark">$10.04</h3>
            <small className="text-danger">-3% vs. last month</small>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Donors List */}
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Header>
              <strong>Donors List</strong>
              <Row className="mt-2">
                <Col md={9}>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Search donors..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="w-100"
                  >
                    Filter
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Donor Name</th>
                    <th>Donation Amount</th>
                    <th>Date</th>
                    <th>Payment Method</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDonors.map((donor, i) => (
                    <tr key={i}>
                      <td>{donor.name}</td>
                      <td>${donor.amount}</td>
                      <td>{donor.date}</td>
                      <td>{donor.method}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            style={{
                              background: "transparent",
                              border: "none",
                              outline: "none",
                              padding: 0,
                              color: "black",
                              cursor: "pointer",
                            }}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            style={{
                              background: "transparent",
                              border: "none",
                              outline: "none",
                              padding: 0,
                              color: "red",
                              cursor: "pointer",
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Pagination */}
              <Pagination className="justify-content-center">
                <Pagination.Prev
                  onClick={() => setActivePage((p) => Math.max(p - 1, 1))}
                  disabled={activePage === 1}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === activePage}
                    onClick={() => setActivePage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() =>
                    setActivePage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={activePage === totalPages}
                />
              </Pagination>
            </Card.Body>
          </Card>
        </Col>

        {/* Charts */}
        <Col md={5}>
          <Row>
            <Col md={12} className="mb-3">
              <Card className="shadow-sm p-3">
                <div className="d-flex justify-content-between">
                  <h6>Statistics</h6>
                  <Form.Select size="sm" style={{ width: "auto" }}>
                    <option>Last Month</option>
                    <option>This Month</option>
                  </Form.Select>
                </div>
                <img
                  src="https://quickchart.io/chart?c=%7B%22type%22%3A%22doughnut%22%2C%22data%22%3A%7B%22labels%22%3A%5B%22Recurring%22%2C%22One-Time%22%5D%2C%22datasets%22%3A%5B%7B%22data%22%3A%5B65%2C35%5D%2C%22backgroundColor%22%3A%5B%22%233b82f6%22%2C%22%23d1d5db%22%5D%7D%5D%7D%7D"
                  alt="Pie Chart"
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "contain",
                  }}
                />
              </Card>
            </Col>
            <Col md={12}>
              <Card className="shadow-sm p-3">
                <div className="d-flex justify-content-between">
                  <h6>Donations</h6>
                  <Form.Select size="sm" style={{ width: "auto" }}>
                    <option>2024</option>
                    <option>2023</option>
                  </Form.Select>
                </div>
                <img
                  src="https://quickchart.io/chart?c=%7B%22type%22%3A%22bar%22%2C%22data%22%3A%7B%22labels%22%3A%5B%22Jan%22%2C%22Feb%22%2C%22Mar%22%2C%22Apr%22%2C%22May%22%5D%2C%22datasets%22%3A%5B%7B%22label%22%3A%22Donated%22%2C%22data%22%3A%5B500%2C800%2C600%2C900%2C700%5D%2C%22backgroundColor%22%3A%22%233b82f6%22%7D%5D%7D%7D"
                  alt="Bar Chart"
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "contain",
                  }}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DonationManagement;

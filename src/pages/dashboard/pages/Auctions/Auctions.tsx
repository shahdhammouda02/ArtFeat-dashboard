import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Button,
  Pagination,
  Form,
  Row,
  Col,
  Table,
  Badge,
} from "react-bootstrap";
import { Auction } from "types";
import { auctions as MOCK_AUCTIONS } from "data/auctions/auctionsData";
import AuctionForm from "./AuctionForm";
import BidHistoryModal from "./BidHistoryModal";
import ShippingModal from "./ShippingModal";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // <-- NEW

const Auctions: React.FC = () => {
  const [rows, setRows] = useState<Auction[]>([]);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const nextId = useRef(1);
  const navigate = useNavigate(); // <-- NEW

  // Column visibility toggles
  const [columnVisibility, setColumnVisibility] = useState({
    auctionName: true,
    auctionImage: true,
    type: true,
    author: true,
    time: true,
    bid: true,
    bidsCount: true,
    actions: true,
  });

  // Modals
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Auction | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [showShipping, setShowShipping] = useState(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // New auction form data
  const [newAuction, setNewAuction] = useState<Omit<Auction, "id">>({
    type: "Digital",
    title: "",
    author: "",
    time: "",
    bid: "",
    bidsCount: 0,
    image: "",
  });

  useEffect(() => {
    // Load mock data
    const withIds: Auction[] = MOCK_AUCTIONS.map((m, idx) => ({
      ...m,
      id: idx + 1,
    }));
    nextId.current = withIds.length + 1;
    setRows(withIds);
  }, []);

  // Add new auction
  const addAuction = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Auction = { ...newAuction, id: nextId.current++ };
    setRows((prev) => [...prev, payload]);
    setShowForm(false);
    setNewAuction({
      type: "Digital",
      title: "",
      author: "",
      time: "",
      bid: "",
      bidsCount: 0,
      image: "",
    });
  };

  // Save edit
  const saveEdit = () => {
    if (!editing) return;
    setRows((prev) => prev.map((r) => (r.id === editing.id ? editing : r)));
    setEditing(null);
  };

  // Delete one
  const delOne = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(id);
      return n;
    });
  };

  // Delete selected
  const delSelected = () => {
    setRows((prev) => prev.filter((r) => !selected.has(r.id)));
    setSelected(new Set());
  };

  // Search + filter
  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return rows.filter(
      (r) =>
        !text ||
        r.title.toLowerCase().includes(text) ||
        r.author.toLowerCase().includes(text)
    );
  }, [rows, q]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const pageData = filtered.slice(start, start + pageSize);

  const allOnPage =
    pageData.length > 0 && pageData.every((r) => selected.has(r.id));
  const toggleAllOnPage = () => {
    const next = new Set(selected);
    if (allOnPage) pageData.forEach((r) => next.delete(r.id));
    else pageData.forEach((r) => next.add(r.id));
    setSelected(next);
  };

  const toggleOne = (id: number) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  // View bid history for an auction
  const viewHistory = (auction: Auction) => {
    setSelectedAuction(auction);
    setShowHistory(true);
  };

  // Check shipping for an auction
  const checkShipping = (auction: Auction) => {
    setSelectedAuction(auction);
    setShowShipping(true);
  };

  // Handle form field changes
  const handleFormChange = (field: keyof Auction, value: string | number) => {
    if (editing) {
      setEditing({ ...editing, [field]: value });
    } else {
      setNewAuction({ ...newAuction, [field]: value });
    }
  };

  // Toggle column visibility
  const toggleColumn = (column: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column as keyof typeof columnVisibility],
    }));
  };

  return (
    <div className="container-fluid py-3 px-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h4 className="mb-1">Auctions Dashboard</h4>
          <small className="text-muted">
            Manage your live and upcoming auctions.
          </small>
        </div>
        <div>
          <Button variant="success" onClick={() => setShowForm(true)}>
            + Add Auction
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="row g-2 mb-3">
        <div className="col-md-8 d-flex">
          <div className="input-group flex-grow-1 me-2">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <Form.Control
              placeholder="Search auctions by title or author..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Dropdown*/}
          <div className="ms-2 position-relative">
            <Button
              variant="outline-secondary"
              className="d-flex align-items-center"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <FaFilter className="me-1" /> Filters
            </Button>

            {showFilters && (
              <div
                className="dropdown-menu p-3 show position-absolute"
                style={{ width: 300, top: "100%", left: 0, marginTop: 3 }}
              >
                <h6 className="mb-3">Show/Hide Columns</h6>
                <Row>
                  <Col sm={6}>
                    <Form.Check
                      type="switch"
                      id="toggle-auction-name"
                      label="Auction Name"
                      checked={columnVisibility.auctionName}
                      onChange={() => toggleColumn("auctionName")}
                    />
                    <Form.Check
                      type="switch"
                      id="toggle-auction-image"
                      label="Auction Image"
                      checked={columnVisibility.auctionImage}
                      onChange={() => toggleColumn("auctionImage")}
                    />
                    <Form.Check
                      type="switch"
                      id="toggle-type"
                      label="Type"
                      checked={columnVisibility.type}
                      onChange={() => toggleColumn("type")}
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Check
                      type="switch"
                      id="toggle-author"
                      label="Author"
                      checked={columnVisibility.author}
                      onChange={() => toggleColumn("author")}
                    />
                    <Form.Check
                      type="switch"
                      id="toggle-time"
                      label="Time"
                      checked={columnVisibility.time}
                      onChange={() => toggleColumn("time")}
                    />
                    <Form.Check
                      type="switch"
                      id="toggle-bid"
                      label="Bid"
                      checked={columnVisibility.bid}
                      onChange={() => toggleColumn("bid")}
                    />
                    <Form.Check
                      type="switch"
                      id="toggle-actions"
                      label="Actions"
                      checked={columnVisibility.actions}
                      onChange={() => toggleColumn("actions")}
                    />
                  </Col>
                </Row>

                <hr className="my-3" />

                <Form.Group>
                  <Form.Label>Results per page</Form.Label>
                  <Form.Select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setPage(1);
                    }}
                  >
                    <option value="3">3 results</option>
                    <option value="5">5 results</option>
                    <option value="10">10 results</option>
                    <option value="20">20 results</option>
                    <option value="50">50 results</option>
                  </Form.Select>
                </Form.Group>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-4 d-flex justify-content-end gap-2">
          {selected.size > 0 && (
            <Button variant="outline-danger" onClick={delSelected}>
              Delete Selected ({selected.size})
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead className="table-light">
            <tr className="text-center align-middle">
              <th>
                <Form.Check
                  type="checkbox"
                  checked={allOnPage}
                  onChange={toggleAllOnPage}
                />
              </th>
              <th>ID</th>
              {columnVisibility.auctionImage && <th>Image</th>}
              {columnVisibility.auctionName && <th>Title</th>}
              {columnVisibility.author && <th>Author</th>}
              {columnVisibility.type && <th>Type</th>}
              {columnVisibility.bid && <th>Bid</th>}
              {columnVisibility.bidsCount && <th>Bids Count</th>}
              {columnVisibility.time && <th>Time Left</th>}
              {columnVisibility.actions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 && (
              <tr>
                <td
                  colSpan={
                    2 + // Checkbox and ID columns
                    Object.values(columnVisibility).filter((visible) => visible)
                      .length
                  }
                  className="text-center py-5"
                >
                  No auctions found
                </td>
              </tr>
            )}
            {pageData.map((a) => (
              <tr
                key={a.id}
                className={`${
                  selected.has(a.id) ? "table-active" : ""
                } text-center align-middle`}
              >
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selected.has(a.id)}
                    onChange={() => toggleOne(a.id)}
                  />
                </td>
                <td>{a.id}</td>
                {columnVisibility.auctionImage && (
                  <td>
                    {a.image ? (
                      <img
                        src={a.image}
                        alt=""
                        width={48}
                        height={48}
                        style={{ objectFit: "cover", borderRadius: 50 }}
                      />
                    ) : (
                      <div
                        className="bg-light text-muted d-flex align-items-center justify-content-center"
                        style={{ width: 48, height: 48, borderRadius: 50 }}
                      >
                        IMG
                      </div>
                    )}
                  </td>
                )}
                {columnVisibility.auctionName && <td>{a.title}</td>}
                {columnVisibility.author && <td>{a.author}</td>}
                {columnVisibility.type && (
                  <td>
                    <Badge bg="info">{a.type}</Badge>
                  </td>
                )}
                {columnVisibility.bid && <td>{a.bid}</td>}
                {columnVisibility.bidsCount && <td>{a.bidsCount}</td>}
                {columnVisibility.time && <td>{a.time}</td>}
                {columnVisibility.actions && (
                  <td className="text-center">
                    <div className="d-flex flex-column gap-1">
                      <div className="d-flex gap-1 justify-content-center flex-wrap">
                        {/* NEW: Details button */}
                        <Button
                          size="sm"
                          variant="outline-success"
                        onClick={() =>
  navigate(`/pages/auctions/${a.id}`, { state: { auction: a } })
}

                        >
                          Details
                        </Button>

                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => setEditing(a)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => delOne(a.id)}
                        >
                          Delete
                        </Button>
                      </div>

                      <div className="d-flex gap-1 justify-content-center flex-wrap mt-1">
                        <Button
                          size="sm"
                          variant="outline-info"
                          onClick={() => viewHistory(a)}
                        >
                          View History
                        </Button>
                        {a.type === "Physical" ? (
                          <Button
                            size="sm"
                            variant="outline-warning"
                            onClick={() => checkShipping(a)}
                          >
                            Check Shipping
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            disabled
                            className="opacity-50"
                          >
                            Check Shipping
                          </Button>
                        )}
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {start + 1} to {Math.min(start + pageSize, filtered.length)}{" "}
          of <strong>{filtered.length}</strong> auctions
        </div>
        <Pagination>
          <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
          <Pagination.Prev
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === page}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          />
          <Pagination.Last
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          />
        </Pagination>
      </div>

      {/* Add Auction Modal */}
      <AuctionForm
        show={showForm}
        onHide={() => setShowForm(false)}
        auction={newAuction}
        onSubmit={addAuction}
        onChange={handleFormChange}
        isEditing={false}
      />

      {/* Edit Auction Modal */}
      <AuctionForm
        show={!!editing}
        onHide={() => setEditing(null)}
        auction={editing}
        onSubmit={saveEdit}
        onChange={handleFormChange}
        isEditing={true}
      />

      {/* View History Modal */}
      <BidHistoryModal
        show={showHistory}
        onHide={() => setShowHistory(false)}
        auction={selectedAuction}
      />

      {/* Shipping Modal */}
      <ShippingModal
        show={showShipping}
        onHide={() => setShowShipping(false)}
        auction={selectedAuction}
      />
    </div>
  );
};

export default Auctions;

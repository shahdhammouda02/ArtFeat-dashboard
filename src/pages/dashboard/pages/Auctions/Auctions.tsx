import React, { useState, useEffect, useMemo, useRef } from "react";
import { Table, Button, Modal, Form, Badge, Pagination } from "react-bootstrap";
import type { Auction } from "types";
import { auctions as MOCK } from "data/auctions/auctionsData";

const Auctions: React.FC = () => {
  const [rows, setRows] = useState<Auction[]>([]);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3); // Changed to 3 rows per page
  const nextId = useRef(1);

  // Add Modal
  const [showForm, setShowForm] = useState(false);
  const [newAuction, setNewAuction] = useState<Omit<Auction, "id">>({
    type: "Digital",
    title: "",
    author: "",
    time: "",
    bid: "",
    bidsCount: 0,
    image: "",
  });

  // Edit Modal
  const [editing, setEditing] = useState<Auction | null>(null);

  useEffect(() => {
    // Load mock data
    const withIds: Auction[] = MOCK.map((m, idx) => ({ ...m, id: idx + 1 }));
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
    return rows.filter((r) =>
      !text ||
      r.title.toLowerCase().includes(text) ||
      r.author.toLowerCase().includes(text)
    );
  }, [rows, q]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const pageData = filtered.slice(start, start + pageSize);

  const allOnPage = pageData.length > 0 && pageData.every((r) => selected.has(r.id));
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

  return (
    <div className="container-fluid py-3 px-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h4 className="mb-1">Auctions Dashboard</h4>
          <small className="text-muted">Manage your live and upcoming auctions.</small>
        </div>
        <div>
          <Button variant="success" onClick={() => setShowForm(true)}>
            + Add Auction
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <Form.Control
            placeholder="Search auctions by title or author..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-6 d-flex justify-content-end gap-2">
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
                <Form.Check type="checkbox" checked={allOnPage} onChange={toggleAllOnPage} />
              </th>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Type</th>
              <th>Bid</th>
              <th>Bids Count</th>
              <th>Time Left</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 && (
              <tr><td colSpan={10} className="text-center py-5">No auctions found</td></tr>
            )}
            {pageData.map((a) => (
              <tr key={a.id} className={`selected.has(a.id) ? "table-active" : "" text-center align-middle`}>
                <td>
                  <Form.Check type="checkbox" checked={selected.has(a.id)} onChange={() => toggleOne(a.id)} />
                </td>
                <td>{a.id}</td>
                <td>
                  {a.image ? (
                    <img src={a.image} alt="" width={48} height={48} style={{ objectFit: "cover", borderRadius: 50}} />
                  ) : (
                    <div className="bg-light text-muted d-flex align-items-center justify-content-center"
                      style={{ width: 48, height: 48, borderRadius: 50 }}>IMG</div>
                  )}
                </td>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td><Badge bg="info">{a.type}</Badge></td>
                <td>{a.bid}</td>
                <td>{a.bidsCount}</td>
                <td>{a.time}</td>
                <td>
                  <Button size="sm" variant="outline-primary" onClick={() => setEditing(a)}>Edit</Button>{" "}
                  <Button size="sm" variant="outline-danger" onClick={() => delOne(a.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>Total Auctions: <strong>{filtered.length}</strong></div>
        <Pagination>
          <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
          <Pagination.Prev onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === page}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
          <Pagination.Last onClick={() => setPage(totalPages)} disabled={page === totalPages} />
        </Pagination>
      </div>

      {/* Add Auction Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg">
        <Modal.Header closeButton><Modal.Title>Add New Auction</Modal.Title></Modal.Header>
        <Form onSubmit={addAuction}>
          <Modal.Body className="row g-3">
            <div className="col-md-6">
              <Form.Label>Title</Form.Label>
              <Form.Control required value={newAuction.title}
                onChange={(e) => setNewAuction({ ...newAuction, title: e.target.value })} />
            </div>
            <div className="col-md-6">
              <Form.Label>Author</Form.Label>
              <Form.Control required value={newAuction.author}
                onChange={(e) => setNewAuction({ ...newAuction, author: e.target.value })} />
            </div>
            <div className="col-md-4">
              <Form.Label>Type</Form.Label>
              <Form.Select value={newAuction.type}
                onChange={(e) => setNewAuction({ ...newAuction, type: e.target.value as "Digital" | "Physical" })}>
                <option>Digital</option>
                <option>Physical</option>
              </Form.Select>
            </div>
            <div className="col-md-4">
              <Form.Label>Bid</Form.Label>
              <Form.Control required value={newAuction.bid}
                onChange={(e) => setNewAuction({ ...newAuction, bid: e.target.value })} />
            </div>
            <div className="col-md-4">
              <Form.Label>Bids Count</Form.Label>
              <Form.Control type="number" value={newAuction.bidsCount}
                onChange={(e) => setNewAuction({ ...newAuction, bidsCount: Number(e.target.value) })} />
            </div>
            <div className="col-md-6">
              <Form.Label>Time Left</Form.Label>
              <Form.Control value={newAuction.time}
                onChange={(e) => setNewAuction({ ...newAuction, time: e.target.value })} />
            </div>
            <div className="col-md-6">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept="image/*"
                onChange={(e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) setNewAuction({ ...newAuction, image: URL.createObjectURL(file) });
                }} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Auction Modal */}
      <Modal show={!!editing} onHide={() => setEditing(null)} size="lg">
        <Modal.Header closeButton><Modal.Title>Edit Auction</Modal.Title></Modal.Header>
        {editing && (
          <Form onSubmit={(e) => { e.preventDefault(); saveEdit(); }}>
            <Modal.Body className="row g-3">
              <div className="col-md-6">
                <Form.Label>Title</Form.Label>
                <Form.Control required value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div className="col-md-6">
                <Form.Label>Author</Form.Label>
                <Form.Control required value={editing.author}
                  onChange={(e) => setEditing({ ...editing, author: e.target.value })} />
              </div>
              <div className="col-md-4">
                <Form.Label>Type</Form.Label>
                <Form.Select value={editing.type}
                  onChange={(e) => setEditing({ ...editing, type: e.target.value as "Digital" | "Physical" })}>
                  <option>Digital</option>
                  <option>Physical</option>
                </Form.Select>
              </div>
              <div className="col-md-4">
                <Form.Label>Bid</Form.Label>
                <Form.Control required value={editing.bid}
                  onChange={(e) => setEditing({ ...editing, bid: e.target.value })} />
              </div>
              <div className="col-md-4">
                <Form.Label>Bids Count</Form.Label>
                <Form.Control type="number" value={editing.bidsCount}
                  onChange={(e) => setEditing({ ...editing, bidsCount: Number(e.target.value) })} />
              </div>
              <div className="col-md-6">
                <Form.Label>Time Left</Form.Label>
                <Form.Control value={editing.time}
                  onChange={(e) => setEditing({ ...editing, time: e.target.value })} />
              </div>
              <div className="col-md-6">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" accept="image/*"
                  onChange={(e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) setEditing({ ...editing, image: URL.createObjectURL(file) });
                  }} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEditing(null)}>Cancel</Button>
              <Button type="submit" variant="primary">Save Changes</Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Auctions;
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Button, Pagination, Form } from "react-bootstrap";
import { Auction } from "types";
import { auctions as MOCK_AUCTIONS } from "data/auctions/auctionsData";
import AuctionTable from "./AuctionTable";
import AuctionForm from "./AuctionForm";
import BidHistoryModal from "./BidHistoryModal";
import ShippingModal from "./ShippingModal";

const Auctions: React.FC = () => {
  const [rows, setRows] = useState<Auction[]>([]);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3);
  const nextId = useRef(1);

  // Modals
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Auction | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [showShipping, setShowShipping] = useState(false);

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
    const withIds: Auction[] = MOCK_AUCTIONS.map((m, idx) => ({ ...m, id: idx + 1 }));
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
      <AuctionTable
        auctions={pageData}
        selected={selected}
        toggleOne={toggleOne}
        toggleAllOnPage={toggleAllOnPage}
        allOnPage={allOnPage}
        setEditing={setEditing}
        viewHistory={viewHistory}
        checkShipping={checkShipping}
        delOne={delOne}
      />

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Total Auctions: <strong>{filtered.length}</strong>
        </div>
        <Pagination>
          <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
          <Pagination.Prev
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === page}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
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
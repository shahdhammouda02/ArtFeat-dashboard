import React, { useState, useEffect, useMemo, useRef } from "react";
import { Table, Button, Modal, Form, Badge, Pagination } from "react-bootstrap";
import { EventItem, EventType, EventStatus } from "../../../../types";
import {
  CATEGORY_OPTIONS,
  TYPES,
  STATUSES,
  MOCK,
} from "../../../../data/events/EventsData";
import { fmtDate, statusBadge } from "../../../../utils";

const Events: React.FC = () => {
  const [rows, setRows] = useState<EventItem[]>([]);
  const [activeType, setActiveType] = useState<"All" | EventType>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | EventStatus>("All");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const nextId = useRef(1);

  // Add Modal
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState<
    Omit<EventItem, "id" | "categories">
  >({
    cover: "",
    title: "",
    type: "Exhibition",
    date: "",
    status: "Ended",
    description: "",
  });
  const [selectedCats, setSelectedCats] = useState<string[]>([]);

  // Edit Modal
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [editingCats, setEditingCats] = useState<string[]>([]);

  // View Modal
  const [viewing, setViewing] = useState<EventItem | null>(null);

  useEffect(() => {
    const withIds: EventItem[] = MOCK.map((m, idx) => ({ ...m, id: idx + 1 }));
    nextId.current = withIds.length + 1;
    setRows(withIds);
  }, []);

  const toggleCat = (cat: string) =>
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  const toggleEditCat = (cat: string) =>
    setEditingCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: EventItem = {
      ...newEvent,
      categories: selectedCats,
      id: nextId.current++,
    };
    setRows((prev) => {
      const next = [...prev, payload];
      setPage(Math.max(1, Math.ceil(next.length / pageSize)));
      return next;
    });
    setShowForm(false);
    setNewEvent({
      cover: "",
      title: "",
      type: "Exhibition",
      date: "",
      status: "Ended",
      description: "",
    });
    setSelectedCats([]);
  };

  const saveEdit = () => {
    if (!editing) return;
    const updated: EventItem = { ...editing, categories: editingCats };
    setRows((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setEditing(null);
    setEditingCats([]);
  };

  const delOne = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(id);
      return n;
    });
  };

  const delSelected = () => {
    setRows((prev) => prev.filter((r) => !selected.has(r.id)));
    setSelected(new Set());
  };

  const resetFilters = () => {
    setActiveType("All");
    setStatusFilter("All");
    setQ("");
    setPage(1);
  };

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return rows.filter((r) => {
      const byType = activeType === "All" || r.type === activeType;
      const byStatus = statusFilter === "All" || r.status === statusFilter;
      const byText =
        !text ||
        r.title.toLowerCase().includes(text) ||
        r.description.toLowerCase().includes(text) ||
        r.categories.some((c) => c.toLowerCase().includes(text));
      return byType && byStatus && byText;
    });
  }, [rows, activeType, statusFilter, q]);

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

  const countsByType = useMemo(() => {
    const all = rows.length;
    const map: Record<"All" | EventType, number> = { All: all } as any;
    for (const t of TYPES) map[t] = rows.filter((r) => r.type === t).length;
    return map;
  }, [rows]);

  return (
    <div className="container-fluid py-3">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h4 className="mb-1">Events</h4>
          <small className="text-muted">Find and manage art events.</small>
        </div>
        <Button variant="success" onClick={() => setShowForm(true)}>
          + Add New Event
        </Button>
      </div>

      {/* Type Filter Buttons */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        <Button
          size="sm"
          variant={activeType === "All" ? "dark" : "outline-secondary"}
          onClick={() => {
            setActiveType("All");
            setPage(1);
          }}
        >
          All{" "}
          <Badge bg="light" text="dark">
            {countsByType.All}
          </Badge>
        </Button>
        {TYPES.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={activeType === t ? "dark" : "outline-secondary"}
            onClick={() => {
              setActiveType(t);
              setPage(1);
            }}
          >
            {t}{" "}
            <Badge bg="light" text="dark">
              {countsByType[t]}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <Form.Control
            placeholder="Search by title, categories, description..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-3">
          <Form.Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setPage(1);
            }}
          >
            <option value="All">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="col-md-3 d-flex gap-2 justify-content-md-end">
          <Button variant="outline-secondary" onClick={resetFilters}>
            Reset
          </Button>
          {selected.size > 0 && (
            <Button variant="outline-danger" onClick={delSelected}>
              Delete Selected ({selected.size})
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive overflow-hidden">
        <Table striped bordered hover size="sm" className="mb-0">
          <thead className="table-light">
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  checked={allOnPage}
                  onChange={toggleAllOnPage}
                />
              </th>
              <th>ID</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Categories</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Description</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-5">
                  No events found
                </td>
              </tr>
            )}
            {pageData.map((ev) => (
              <tr
                key={ev.id}
                className={selected.has(ev.id) ? "table-active" : ""}
              >
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selected.has(ev.id)}
                    onChange={() => toggleOne(ev.id)}
                  />
                </td>
                <td>#{ev.id}</td>
                <td>
                  {ev.cover ? (
                    <img
                      src={ev.cover}
                      alt=""
                      width={48}
                      height={48}
                      style={{ objectFit: "cover", borderRadius: 6 }}
                    />
                  ) : (
                    <div
                      className="bg-light text-muted d-flex align-items-center justify-content-center"
                      style={{ width: 48, height: 48, borderRadius: 6 }}
                    >
                      IMG
                    </div>
                  )}
                </td>
                <td>{ev.title}</td>
                <td>
                  {ev.categories.map((c, i) => (
                    <Badge key={i} bg="light" text="dark" className="me-1">
                      {c}
                    </Badge>
                  ))}
                </td>
                <td>{ev.type}</td>
                <td>{fmtDate(ev.date)}</td>
                <td>
                  <Badge className={statusBadge(ev.status)}>{ev.status}</Badge>
                </td>
                <td style={{ maxWidth: 360, whiteSpace: "normal" }}>
                  {ev.description}
                </td>
                <td className="text-end">
                  <div className="d-flex gap-1 justify-content-end mt-3">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => setViewing(ev)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => {
                        setEditing(ev);
                        setEditingCats(ev.categories);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => delOne(ev.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination & PageSize */}
      <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between mt-2">
        <div>
          Total Events: <strong>{filtered.length}</strong>
        </div>
        <div className="d-flex align-items-center gap-2">
          Show
          <Form.Select
            size="sm"
            style={{ width: 90 }}
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value));
              setPage(1);
            }}
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Form.Select>
          per page
        </div>
        <Pagination className="mb-0">
          <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
          <Pagination.Prev
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          />
          <Pagination.Item active>{page}</Pagination.Item>
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

      {/* Modals (Add, Edit, View) */}
      {/* Add Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Form onSubmit={addEvent}>
          <Modal.Body>
            <div className="row g-3">
              <div className="col-md-4">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </div>
              <div className="col-md-2">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  value={newEvent.type}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      type: e.target.value as EventType,
                    })
                  }
                >
                  {TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-2">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={newEvent.status}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      status: e.target.value as EventStatus,
                    })
                  }
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-2">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  required
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                />
              </div>
              <div className="col-md-2">
                <Form.Label>Cover</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    const file = target.files?.[0];
                    if (file) {
                      setNewEvent({
                        ...newEvent,
                        cover: URL.createObjectURL(file),
                      });
                    }
                  }}
                />
              </div>
              <div className="col-12">
                <Form.Label>Categories</Form.Label>
                <div className="d-flex flex-wrap gap-3">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <Form.Check
                      type="checkbox"
                      key={cat}
                      label={cat}
                      checked={selectedCats.includes(cat)}
                      onChange={() => toggleCat(cat)}
                    />
                  ))}
                </div>
              </div>
              <div className="col-12">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal show={!!editing} onHide={() => setEditing(null)} size="lg">
        {editing && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Edit Event #{editing.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                <div className="col-md-4">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={editing.title}
                    onChange={(e) =>
                      setEditing({ ...editing, title: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-2">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={editing.type}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        type: e.target.value as EventType,
                      })
                    }
                  >
                    {TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className="col-md-2">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={editing.status}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        status: e.target.value as EventStatus,
                      })
                    }
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className="col-md-2">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={editing.date}
                    onChange={(e) =>
                      setEditing({ ...editing, date: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-2">
                  <Form.Label>Cover</Form.Label>
                  <Form.Control
                    value={editing.cover || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, cover: e.target.value })
                    }
                  />
                </div>
                <div className="col-12">
                  <Form.Label>Categories</Form.Label>
                  <div className="d-flex flex-wrap gap-3">
                    {CATEGORY_OPTIONS.map((cat) => (
                      <Form.Check
                        key={cat}
                        type="checkbox"
                        label={cat}
                        checked={editingCats.includes(cat)}
                        onChange={() => toggleEditCat(cat)}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-12">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editing.description}
                    onChange={(e) =>
                      setEditing({ ...editing, description: e.target.value })
                    }
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEditing(null)}>
                Close
              </Button>
              <Button variant="primary" onClick={saveEdit}>
                Save changes
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* View Modal */}
      <Modal show={!!viewing} onHide={() => setViewing(null)} size="lg">
        {viewing && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Event Details #{viewing.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-wrap gap-3">
              <div className="col-md-4">
                {viewing.cover ? (
                  <img
                    src={viewing.cover}
                    alt=""
                    className="img-fluid rounded"
                  />
                ) : (
                  <div
                    className="bg-light text-muted d-flex align-items-center justify-content-center rounded"
                    style={{ width: "100%", height: 160 }}
                  >
                    No Image
                  </div>
                )}
              </div>
              <div className="col-md-8">
                <h5>{viewing.title}</h5>
                <div className="mb-2">
                  <Badge bg="light" text="dark" className="me-2">
                    {viewing.type}
                  </Badge>
                  <Badge className={statusBadge(viewing.status)}>
                    {viewing.status}
                  </Badge>
                </div>
                <div className="text-muted mb-2">{fmtDate(viewing.date)}</div>
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {viewing.categories.map((c, i) => (
                    <Badge key={i} bg="light" text="dark">
                      {c}
                    </Badge>
                  ))}
                </div>
                <p>{viewing.description}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setViewing(null)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Events;

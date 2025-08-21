import React, { useState, useRef, useMemo } from "react";
import { Table, Button, Modal, Form, Pagination, Badge } from "react-bootstrap";
import { Artist } from "types";
import { MOCK_ARTISTS } from "data/events/ArtistsData";

const Profiles: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>(MOCK_ARTISTS);
  const nextId = useRef(artists.length + 1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [q, setQ] = useState("");

  // Add
  const [showAdd, setShowAdd] = useState(false);
  const [newArtist, setNewArtist] = useState<Omit<Artist, "id">>({
    name: "",
    picture: "",
    description: "",
    artworks: [],
  });

  // Edit / View
  const [editing, setEditing] = useState<Artist | null>(null);
  const [viewing, setViewing] = useState<Artist | null>(null);

  // Create
  const addArtist = (e: React.FormEvent) => {
    e.preventDefault();
    const artist: Artist = { ...newArtist, id: nextId.current++ };
    setArtists((prev) => [...prev, artist]);
    setShowAdd(false);
    setNewArtist({ name: "", picture: "", description: "", artworks: [] });
  };

  // Save edit
  const saveEdit = () => {
    if (!editing) return;
    setArtists((prev) => prev.map((a) => (a.id === editing.id ? editing : a)));
    setEditing(null);
  };

  // Delete one
  const delOne = (id: number) => {
    setArtists((prev) => prev.filter((a) => a.id !== id));
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(id);
      return n;
    });
  };

  // Selection
  const toggleOne = (id: number) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const deleteSelected = () => {
    setArtists((prev) => prev.filter((a) => !selected.has(a.id)));
    setSelected(new Set());
  };

  // Filter + paginate
  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    if (!text) return artists;
    return artists.filter(
      (a) =>
        a.name.toLowerCase().includes(text) ||
        a.description.toLowerCase().includes(text) ||
        a.artworks.some((art) => art.toLowerCase().includes(text))
    );
  }, [artists, q]);

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

  return (
    <div className="container-fluid py-3 px-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h4 className="mb-1">Artists Profiles</h4>
          <small className="text-muted">Manage artist profiles and artworks.</small>
        </div>

        {/* زر كبير للديسكتوب + زر صغير للموبايل */}
        <div>
          <Button
            variant="success"
            onClick={() => setShowAdd(true)}
            className="d-none d-md-inline-block"
          >
            + Add Artist
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => setShowAdd(true)}
            className="d-inline-block d-md-none ms-2"
          >
            + Add
          </Button>

          {selected.size > 0 && (
            <>
              <Button
                variant="outline-danger"
                onClick={deleteSelected}
                className="ms-2 d-none d-md-inline-block"
              >
                Delete Selected ({selected.size})
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={deleteSelected}
                className="ms-2 d-inline-block d-md-none"
              >
                Delete ({selected.size})
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="row g-2 mb-3">
        <div className="col-12 col-md-6">
          <Form.Control
            placeholder="Search by name, description or artworks..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* ===== Desktop Table (md and up) ===== */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <Table striped bordered hover size="sm" className="mb-0">
            <thead className="table-light">
              <tr>
                <th>
                  <Form.Check type="checkbox" checked={allOnPage} onChange={toggleAllOnPage} />
                </th>
                <th>ID</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Description</th>
                <th>Artworks</th>
                <th className="text-center align-middle" style={{ width: 240 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-5">No artists found</td>
                </tr>
              ) : (
                pageData.map((a) => (
                  <tr key={a.id} className={selected.has(a.id) ? "table-active" : ""}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selected.has(a.id)}
                        onChange={() => toggleOne(a.id)}
                      />
                    </td>
                    <td className="text-center align-middle">{a.id}</td>
                    <td className="text-center align-middle">
                      {a.picture ? (
                        <img
                          src={a.picture}
                          alt={a.name}
                          width={48}
                          height={48}
                          style={{ objectFit: "cover", borderRadius: "50%" }}
                        />
                      ) : (
                        <div
                          className="bg-light text-muted d-inline-flex align-items-center justify-content-center"
                          style={{ width: 48, height: 48, borderRadius: "50%" }}
                        >
                          IMG
                        </div>
                      )}
                    </td>
                    <td className="align-middle">{a.name}</td>
                    <td className="align-middle" style={{ maxWidth: 360, whiteSpace: "normal" }}>
                      {a.description}
                    </td>
                    <td className="align-middle" style={{ maxWidth: 240, whiteSpace: "normal" }}>
                      {a.artworks.length > 0 ? (
                        <div className="d-flex flex-wrap gap-1">
                          {a.artworks.map((w, i) => (
                            <Badge key={i} bg="light" text="dark">{w}</Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="align-middle">
                      <div className="d-flex justify-content-center align-items-center gap-2" style={{ whiteSpace: "nowrap" }}>
                        <Button size="sm" variant="outline-secondary" onClick={() => setViewing(a)}>View</Button>
                        <Button size="sm" variant="outline-primary" onClick={() => setEditing(a)}>Edit</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => delOne(a.id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* ===== Mobile Cards (sm and down) ===== */}
      <div className="d-md-none">
        {pageData.length === 0 && (
          <div className="text-center text-body-secondary py-5">No artists found</div>
        )}
        {pageData.map((a) => (
          <div key={a.id} className={`card mb-2 ${selected.has(a.id) ? "border-primary" : ""}`}>
            <div className="card-body">
              <div className="d-flex align-items-start gap-2">
                <div className="d-flex flex-column align-items-center">
                  <Form.Check
                    className="mb-2"
                    type="checkbox"
                    checked={selected.has(a.id)}
                    onChange={() => toggleOne(a.id)}
                  />
                  {a.picture ? (
                    <img
                      src={a.picture}
                      alt={a.name}
                      width={56}
                      height={56}
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                  ) : (
                    <div
                      className="bg-light text-muted d-flex align-items-center justify-content-center"
                      style={{ width: 56, height: 56, borderRadius: "50%" }}
                    >
                      IMG
                    </div>
                  )}
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">{a.name}</h6>
                    <small className="text-muted">#{a.id}</small>
                  </div>

                  {a.artworks.length > 0 && (
                    <div className="mt-1 d-flex align-items-center gap-1 flex-wrap">
                      {a.artworks.slice(0, 4).map((w, i) => (
                        <Badge key={i} bg="light" text="dark">{w}</Badge>
                      ))}
                    </div>
                  )}

                  <p className="mt-2 mb-2 small text-body">{a.description}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-nowrap">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        className="me-1"
                        onClick={() => setViewing(a)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="me-1"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination & PageSize */}
      <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between mt-2">
        <div> Total Artists: <strong>{filtered.length}</strong> </div>
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
              <option key={n} value={n}>{n}</option>
            ))}
          </Form.Select>
          per page
        </div>
        <Pagination className="mb-0">
          <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
          <Pagination.Prev onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Next onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
          <Pagination.Last onClick={() => setPage(totalPages)} disabled={page === totalPages} />
        </Pagination>
      </div>

      {/* Add Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton><Modal.Title>Add New Artist</Modal.Title></Modal.Header>
        <Form onSubmit={addArtist}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                value={newArtist.name}
                onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) setNewArtist({ ...newArtist, picture: URL.createObjectURL(file) });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={newArtist.description}
                onChange={(e) => setNewArtist({ ...newArtist, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Artworks (comma separated)</Form.Label>
              <Form.Control
                value={newArtist.artworks.join(", ")}
                onChange={(e) =>
                  setNewArtist({
                    ...newArtist,
                    artworks: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal show={!!editing} onHide={() => setEditing(null)}>
        {editing && (
          <>
            <Modal.Header closeButton><Modal.Title>Edit Artist #{editing.id}</Modal.Title></Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Picture</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) setEditing({ ...editing, picture: URL.createObjectURL(file) });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Artworks (comma separated)</Form.Label>
                <Form.Control
                  value={editing.artworks.join(", ")}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      artworks: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEditing(null)}>Close</Button>
              <Button variant="primary" onClick={saveEdit}>Save changes</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* View Modal (صورة متمركزة مثل صفحة Events) */}
      <Modal show={!!viewing} onHide={() => setViewing(null)}>
        {viewing && (
          <>
            <Modal.Header closeButton><Modal.Title>{viewing.name}'s Details</Modal.Title></Modal.Header>
            <Modal.Body>
              <div className="w-100 d-flex justify-content-center mb-3">
                {viewing.picture ? (
                  <>
                    <img
                      src={viewing.picture}
                      alt={viewing.name}
                      className="rounded d-block d-md-none"
                      style={{ width: "100%", maxWidth: 260, height: 260, objectFit: "cover" }}
                    />
                    <img
                      src={viewing.picture}
                      alt={viewing.name}
                      className="rounded d-none d-md-block"
                      style={{ width: 320, height: 320, objectFit: "cover" }}
                    />
                  </>
                ) : (
                  <>
                    <div
                      className="bg-light text-muted d-flex align-items-center justify-content-center rounded d-block d-md-none"
                      style={{ width: "100%", maxWidth: 260, height: 260 }}
                    >
                      No Image
                    </div>
                    <div
                      className="bg-light text-muted d-flex align-items-center justify-content-center rounded d-none d-md-flex"
                      style={{ width: 320, height: 320 }}
                    >
                      No Image
                    </div>
                  </>
                )}
              </div>

              <h5 className="mb-2 text-center text-md-start">{viewing.name}</h5>
              <p className="mb-2"><strong>Description:</strong> {viewing.description}</p>
              <p className="mb-0"><strong>Artworks:</strong> {viewing.artworks.join(", ") || "—"}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setViewing(null)}>Close</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Profiles;

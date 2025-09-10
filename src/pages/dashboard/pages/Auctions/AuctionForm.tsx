import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Auction } from "types";

interface AuctionFormProps {
  show: boolean;
  onHide: () => void;
  auction: Omit<Auction, "id"> | Auction | null;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: keyof Auction, value: string | number) => void;
  isEditing: boolean;
}

const AuctionForm: React.FC<AuctionFormProps> = ({
  show,
  onHide,
  auction,
  onSubmit,
  onChange,
  isEditing
}) => {
  if (!auction) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Auction" : "Add New Auction"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body className="row g-3">
          <div className="col-md-6">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              value={auction.title}
              onChange={(e) => onChange("title", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <Form.Label>Author</Form.Label>
            <Form.Control
              required
              value={auction.author}
              onChange={(e) => onChange("author", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <Form.Label>Type</Form.Label>
            <Form.Select
              value={auction.type}
              onChange={(e) => onChange("type", e.target.value)}
            >
              <option>Digital</option>
              <option>Physical</option>
            </Form.Select>
          </div>
          <div className="col-md-4">
            <Form.Label>Bid</Form.Label>
            <Form.Control
              required
              value={auction.bid}
              onChange={(e) => onChange("bid", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <Form.Label>Bids Count</Form.Label>
            <Form.Control
              type="number"
              value={auction.bidsCount}
              onChange={(e) => onChange("bidsCount", Number(e.target.value))}
            />
          </div>
          <div className="col-md-6">
            <Form.Label>Time Left</Form.Label>
            <Form.Control
              value={auction.time}
              onChange={(e) => onChange("time", e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) onChange("image", URL.createObjectURL(file));
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button type="submit" variant="primary">
            {isEditing ? "Save Changes" : "Save"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AuctionForm;
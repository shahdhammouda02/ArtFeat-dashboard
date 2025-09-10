import React from "react";
import { Modal } from "react-bootstrap";
import { Auction } from "types";

interface ShippingModalProps {
  show: boolean;
  onHide: () => void;
  auction: Auction | null;
}

const ShippingModal: React.FC<ShippingModalProps> = ({ show, onHide, auction }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Shipping Availability for {auction?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-3">Shipping is available to the following regions and countries:</p>
        <ul className="list-group">
          <li className="list-group-item d-flex align-items-center">
            <span className="text-success me-2">✓</span>
            United States (All 50 states)
          </li>
          <li className="list-group-item d-flex align-items-center">
            <span className="text-success me-2">✓</span>
            Canada (All provinces and territories)
          </li>
          <li className="list-group-item d-flex align-items-center">
            <span className="text-success me-2">✓</span>
            United Kingdom (England, Scotland, Wales, Northern Ireland)
          </li>
          <li className="list-group-item d-flex align-items-center">
            <span className="text-success me-2">✓</span>
            Australia (All states and territories)
          </li>
          <li className="list-group-item d-flex align-items-center">
            <span className="text-success me-2">✓</span>
            Germany
          </li>
          <li className="list-group-item d-flex align-items-center">
            <span className="text-success me-2">✓</span>
            France
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShippingModal;
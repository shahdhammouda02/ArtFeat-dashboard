import React from "react";
import { Modal, Table } from "react-bootstrap";
import { Auction } from "types";
import { bidHistory } from "data/auctions/bidHistory";

interface BidHistoryModalProps {
  show: boolean;
  onHide: () => void;
  auction: Auction | null;
}

const BidHistoryModal: React.FC<BidHistoryModalProps> = ({ show, onHide, auction }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Bid History for {auction?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Bidder</th>
                <th>Bid Amount</th>
                <th>Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {bidHistory.map((bid, index) => (
                <tr key={index}>
                  <td>{bid.bidder}</td>
                  <td>{bid.amount}</td>
                  <td>{bid.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

export default BidHistoryModal;
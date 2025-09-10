import React from "react";
import { Table, Form, Button, Badge } from "react-bootstrap";
import { Auction } from "types";

interface AuctionTableProps {
  auctions: Auction[];
  selected: Set<number>;
  toggleOne: (id: number) => void;
  toggleAllOnPage: () => void;
  allOnPage: boolean;
  setEditing: (auction: Auction) => void;
  viewHistory: (auction: Auction) => void;
  checkShipping: (auction: Auction) => void;
  delOne: (id: number) => void;
}

const AuctionTable: React.FC<AuctionTableProps> = ({
  auctions,
  selected,
  toggleOne,
  toggleAllOnPage,
  allOnPage,
  setEditing,
  viewHistory,
  checkShipping,
  delOne
}) => {
  return (
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
          {auctions.length === 0 && (
            <tr><td colSpan={10} className="text-center py-5">No auctions found</td></tr>
          )}
          {auctions.map((a) => (
            <tr key={a.id} className={`${selected.has(a.id) ? "table-active" : ""} text-center align-middle`}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selected.has(a.id)}
                  onChange={() => toggleOne(a.id)}
                />
              </td>
              <td>{a.id}</td>
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
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td><Badge bg="info">{a.type}</Badge></td>
              <td>{a.bid}</td>
              <td>{a.bidsCount}</td>
              <td>{a.time}</td>
              <td className="text-center">
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex gap-1 justify-content-center flex-wrap">
                    <Button size="sm" variant="outline-primary" onClick={() => setEditing(a)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline-danger" onClick={() => delOne(a.id)}>
                      Delete
                    </Button>
                  </div>
                  
                  <div className="d-flex gap-1 justify-content-center flex-wrap mt-1">
                    <Button size="sm" variant="outline-info" onClick={() => viewHistory(a)}>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AuctionTable;
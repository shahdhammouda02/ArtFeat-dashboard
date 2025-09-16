import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Table, Button, Badge } from "react-bootstrap";
import { Auction } from "types";
import { auctions as MOCK_AUCTIONS } from "data/auctions/auctionsData";
import AuctionForm from "./AuctionForm";
import BidHistoryModal from "./BidHistoryModal"; // <-- لعرض history

type AuctionExtra = Auction &
  Partial<{
    startingPrice: string;
    endingDate: string;
    dimensions: string;
    medium: string;
    category: string;
    artist: string;
    year: string;
  }>;

// helper لعرض شرطة إذا ما في قيمة
const cell = (value?: React.ReactNode) =>
  value ? value : <span className="text-muted">—</span>;

const DETAILS: Record<number, Partial<AuctionExtra>> = {
  1: {
    artist: "Elana Kenule",
    category: "Digital",
    medium: "Oil on Canvas",
    dimensions: "48 x 36 inches (122 x 91 cm)",
    year: "2023",
    startingPrice: "$4,500",
    endingDate: "19/09/2025, 14:36:01 GMT",
  },
  2: {
    artist: "Marcus Thorne",
    category: "Digital",
    medium: "Oil on Canvas",
    dimensions: "48 x 36 inches (122 x 91 cm)",
    year: "2023",
    startingPrice: "$2,700",
    endingDate: "21/09/2025, 11:00:00 GMT",
  },
  3: {
    artist: "Lehna Petrov",
    category: "Physical",
    medium: "Oil on Canvas",
    dimensions: "48 x 36 inches (122 x 91 cm)",
    year: "2023",
    startingPrice: "$1,500",
    endingDate: "25/09/2025, 18:30:00 GMT",
  },
};

const AuctionDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const loc = useLocation() as { state?: { auction?: AuctionExtra } };

  const [editing, setEditing] = useState<AuctionExtra | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const withIds: AuctionExtra[] = useMemo(
    () =>
      MOCK_AUCTIONS.map((m, idx) => ({ ...(m as AuctionExtra), id: idx + 1 })),
    []
  );

  const auction: AuctionExtra | undefined = useMemo(() => {
    const fromState = loc.state?.auction;
    if (fromState) {
      const extra = fromState.id ? DETAILS[fromState.id] : undefined;
      return { ...fromState, ...extra };
    }

    const num = Number(id);
    if (!Number.isFinite(num)) return undefined;
    const base = withIds.find((a) => a.id === num);
    if (!base) return undefined;
    return { ...base, ...(DETAILS[num] || {}) };
  }, [id, loc.state, withIds]);

  if (!auction) {
    return (
      <div className="container-fluid py-3 px-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Auction Details</h4>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
        <div className="alert alert-danger mb-0">Auction not found.</div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-3 px-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <h4 className="mb-0">{auction.title}</h4>
          <Badge bg="info" className="fw-normal">
            {auction.type}
          </Badge>
        </div>

        {/* Back button فوق يمين */}
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      {/* صورة فوق الجدول */}
      <div className="mb-3 d-flex justify-content-center">
        {auction.image ? (
          <img
            src={auction.image}
            alt={auction.title}
            className="rounded-circle border"
            style={{ width: 140, height: 140, objectFit: "cover" }}
          />
        ) : (
          <div
            className="bg-light text-muted d-flex align-items-center justify-content-center rounded-circle border"
            style={{ width: 100, height: 100 }}
          >
            IMG
          </div>
        )}
      </div>

      {/* جدول أفقي */}
      <div className="table-responsive mb-3">
        <Table
          striped
          bordered
          hover
          size="sm"
          className="mb-0 align-middle text-center"
        >
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Category</th>
              <th>Medium</th>
              <th>Dimensions</th>
              <th>Year</th>
              <th>Type</th>
              <th>Starting Price</th>
              <th>Current Bid</th>
              <th>Bids Count</th>
              <th>Time Left</th>
              <th>Ending Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{cell(auction.title)}</td>
              <td>{cell(auction.artist || auction.author)}</td>
              <td>{cell(auction.category)}</td>
              <td>{cell(auction.medium)}</td>
              <td>{cell(auction.dimensions)}</td>
              <td>{cell(auction.year)}</td>
              <td>{cell(<Badge bg="info">{auction.type}</Badge>)}</td>
              <td>{cell(auction.startingPrice)}</td>
              <td>{cell(auction.bid)}</td>
              <td>{cell(auction.bidsCount)}</td>
              <td>{cell(auction.time)}</td>
              <td>{cell(auction.endingDate)}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* الأزرار تحت الجدول */}
      <div className="d-flex justify-content-center gap-2 mb-3">
        <Button variant="primary" onClick={() => setEditing(auction)}>
          Edit
        </Button>
        <Button variant="outline-info" onClick={() => setShowHistory(true)}>
          View History
        </Button>
      </div>

      {/* Edit Modal */}
      <AuctionForm
        show={!!editing}
        onHide={() => setEditing(null)}
        auction={editing}
        onSubmit={() => setEditing(null)}
        onChange={() => {}}
        isEditing={true}
      />

      {/* View History Modal */}
      <BidHistoryModal
        show={showHistory}
        onHide={() => setShowHistory(false)}
        auction={auction as Auction}
      />
    </div>
  );
};

export default AuctionDetails;

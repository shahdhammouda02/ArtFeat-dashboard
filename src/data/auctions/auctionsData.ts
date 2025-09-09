import type { Auction } from "types";
import image1 from "assets/images/2017 sergi.jpg";
import image2 from "assets/images/CeramicWonders.jpeg";
import image3 from "assets/images/Outdoor Paint Party Ideas.jpg";
import image4 from "assets/images/download (8).jpg";

export const auctions: Auction[] = [
  {
    id: 1,
    type: "Digital",
    title: "Aurora Borealis Flow",
    author: "Elana Kenule",
    time: "00h 04m 59s",
    bid: "$6,000",
    bidsCount: 15,
    image: image1,
  },
  {
    id: 2,
    type: "Digital",
    title: "Urban Geometry",
    author: "Marcus Thorne",
    time: "00h 29m 59s",
    bid: "$3,200",
    bidsCount: 15,
    image: image2,
  },
  {
    id: 3,
    type: "Physical",
    title: "Crimson Desert",
    author: "Lehna Petrov",
    time: "12h 09m 59s",
    bid: "$1,800",
    bidsCount: 15,
    image: image3,
  },
  {
    id: 4,
    type: "Physical",
    title: "Spring Bloom",
    author: "Sophia Cher",
    time: "00h 44m 59s",
    bid: "$4,500",
    bidsCount: 15,
    image: image4,
  },
];

import { EventItem, EventType, EventStatus } from "../../types";
import testImage from '../../assets/images/Outdoor Paint Party Ideas.jpg'

export const CATEGORY_OPTIONS = ["Painting","Sculpture","Abstract Art","Nature Art","Illustration","Crafts"];

export const TYPES: EventType[] = ["Exhibition","Workshop","Auction","Festival","Online"];
export const STATUSES: EventStatus[] = ["Upcoming","Ongoing","Ended","Cancelled"];

export const MOCK: Omit<EventItem, "id">[] = [
  { cover: testImage, title: "Abstract Expressions", categories: ["Painting","Abstract Art"], type: "Exhibition", date: "2024-10-24", status: "Ended", description: "A mesmerizing exhibition featuring dynamic and vibrant abstract artworks from emerging talents." },
  { cover: testImage, title: "Ceramic Wonders", categories: ["Sculpture","Crafts"], type: "Workshop", date: "2024-11-15", status: "Upcoming", description: "Discover the beauty of handcrafted ceramics, from traditional to contemporary." },
  { cover: testImage, title: "Botanical Illustration", categories: ["Illustration","Nature Art"], type: "Exhibition", date: "2024-09-30", status: "Ended", description: "An immersive journey into the intricate world of botanical art, celebrating nature's forms." },
];

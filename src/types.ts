export interface NotificationProps {
  id: string;
  sender: string;
  message: string;
}

export interface ChildrenItemProps {
  id: string;
  title?: string;
  name?: string;
  link: string;
  children?: ChildrenItemProps[];
  icon?: string | React.ReactNode;
  badge?: string;
  badgecolor?: string;
}

export interface DashboardMenuProps {
  id: string;
  title: string;
  link?: string;
  grouptitle?: boolean;
  children?: ChildrenItemProps[];
  icon?: string | React.ReactNode;
  badge?: string;
  badgecolor?: string;
}

export interface CustomToggleProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface TeamsDataProps {
  id: number;
  name: string;
  email: string;
  role: string;
  lastActivity: string;
  image: string;
}

export interface ActiveProjectsDataProps {
  id: number;
  projectName: string;
  priority: string;
  priorityBadgeBg: string;
  hours: number;
  progress: number;
  brandLogo: string;
  brandLogoBg: string;
  members: {
    image: string;
  }[];
}

export interface ProjectsStatsProps {
  id: number;
  title: string;
  value: number | string;
  icon: React.ReactNode;
  statInfo: string;
}

export interface ProjectContriProps {
  id: number;
  projectName: string;
  description: string;
  brandLogo: string;
  brandLogoBg: string;
  members: {
    image: string;
  }[];
}

export interface StandardProps {
  plantitle: string;
  description: string;
  monthly: number;
  buttonText: string;
  buttonClass: string;
  featureHeading: string;
  features: {
    feature: string;
  }[];
}

export interface FAQsProps {
  id: number;
  question: string;
  answer: string;
}

export interface FeaturesDataProps {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface ChildrenItemProps {
  id: string;
  title?: string;
  name?: string;
  link: string;
  children?: ChildrenItemProps[];
  icon?: string | React.ReactNode;
  badge?: string;
  badgecolor?: string;
}

export interface DashboardMenuProps {
  id: string;
  title: string;
  link?: string;
  grouptitle?: boolean;
  children?: ChildrenItemProps[];
  icon?: string | React.ReactNode;
  badge?: string;
  badgecolor?: string;
}

export type EventStatus = "Upcoming" | "Ongoing" | "Ended" | "Cancelled";
export type EventType = "Exhibition" | "Workshop" | "Auction" | "Festival" | "Online";

export interface EventItem {
  id: number;
  cover?: string;
  title: string;
  categories: string[];
  type: EventType;
  date: string;
  status: EventStatus;
  description: string;
}

export interface Artist {
  id: number;
  name: string;
  picture: string;
  description: string;
  artworks: string[];
};

export type Auction = {
  id: number;
  type: "Digital" | "Physical";
  title: string;
  author: string;
  time: string;
  bid: string;
  bidsCount: number;
  image?: string;
};

export interface BidEntry {
  bidder: string;
  amount: string;
  date: string;
}

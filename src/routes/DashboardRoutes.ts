import { DashboardMenuProps } from "types";
import { v4 as uuid } from "uuid";
export const DashboardMenu: DashboardMenuProps[] = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: "home",
    link: "/",
  },
  {
    id: uuid(),
    title: "PAGES",
    grouptitle: true,
  },
  {
    id: uuid(),
    title: "Pages",
    icon: "layers",
    children: [
      {
        id: uuid(),
        title: "Events",
        icon: "calendar",
        link: "#",
        children: [
          { id: uuid(), link: "/pages/events", name: "Events" },
          { id: uuid(), link: "/pages/events/profiles", name: "Profiles" },
        ],
      },
      {id: uuid(), icon: "shopping-bag", link: "/pages/auctions", name: "Auctions" },
      {
        id: uuid(),
        title: "Support Artists",
        icon: "heart",
        link: "#",
        children: [
          { id: uuid(), link: "/pages/support-artists/donation-management", name: "Donation Management" },
          { id: uuid(), link: "/pages/support-artists/hero-section", name: "Hero Section" },
          { id: uuid(), link: "/pages/support-artists/success-stories", name: "Success Stories" },
          { id: uuid(), link: "/pages/support-artists/donation-form-settings", name: "Donation Form Settings" },
        ],
      },
      { id: uuid(), link: "/pages/profile", name: "Profile" },
      { id: uuid(), link: "/pages/settings", name: "Settings" },
      { id: uuid(), link: "/pages/billing", name: "Billing" },
      { id: uuid(), link: "/pages/pricing", name: "Pricing" },
      { id: uuid(), link: "/not-found", name: "404 Error" },
    ],
  },
  {
    id: uuid(),
    title: "Authentication",
    icon: "lock",
    children: [
      { id: uuid(), link: "/auth/sign-in", name: "Sign In" },
      { id: uuid(), link: "/auth/sign-up", name: "Sign Up" },
      {
        id: uuid(),
        link: "/auth/forget-password",
        name: "Forget Password",
      },
    ],
  },
];

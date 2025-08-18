import { EventStatus } from "./types";

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

export const statusBadge = (s: EventStatus) =>
  s === "Upcoming" ? "bg-info" : s === "Ongoing" ? "bg-warning" : s === "Ended" ? "bg-danger" : "bg-secondary";

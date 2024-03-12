export interface NavLink {
  id: string;
  name: string;
  icon: string;
  linksTo: string;
  unreadMessages?: number;
  unansweredTradeRequests?: number;
  iconColor?: string;
}

export enum TicketType {
  Single = 'Single',
  Time_20_Minutes = 'Time_20_Minutes',
  Time_60_Minutes = 'Time_60_Minutes',
  Time_6_Hours = 'Time_6_Hours',
  Time_24_Hours = 'Time_24_Hours',
}

export interface Ticket {
  uuid: string;
  createdAt: string;
  validUntil: string;
  type: TicketType;
  ownerUserSub: string;
  line: string;
  vehicleNumber: string;
}

export interface TicketResponse {
  uuid: string;
  createdAt: string;
  validUntil: string;
  type: TicketType;
  line: string;
  vehicleNumber: string;
}

export interface CreateTicketRequest {
  line: string;
  vehicleNumber: string;
  type: TicketType;
}

export interface GetUserTicketsRequest {
  showExpired: boolean;
}
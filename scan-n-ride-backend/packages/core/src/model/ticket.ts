export enum TicketType {
  Single = 'Single',
  Time_20_Minutes = 'Time_20_Minutes',
  Time_60_Minutes = 'Time_60_Minutes',
  Time_6_Hours = 'Time_6_Hours',
  Time_Daily = 'Time_Daily',
}

export interface Ticket {
  uuid: string;
  createdAt: string;
  validUntil: string;
  type: TicketType;
  // TODO: owner
  line: string;
  vehicleNumber: string;
}
import { TicketType } from "../model/ticket";

export function calcTicketTypeValidityTime(from: Date, type: TicketType): Date | null {
  if (type === 'Single') {
    return null;
  }

  let validityTime: number;

  switch (type) {
    case 'Time_20_Minutes':
      validityTime = 20 * 60 * 1000; // 20 minutes in milliseconds
      break;
    case 'Time_60_Minutes':
      validityTime = 60 * 60 * 1000; // 60 minutes in milliseconds
      break;
    case 'Time_6_Hours':
      validityTime = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
      break;
    case 'Time_Daily':
      validityTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      break;
    default:
      throw new Error('Invalid ticket type');
  }

  const validUntil = new Date(from.getTime() + validityTime);
  return validUntil;
}

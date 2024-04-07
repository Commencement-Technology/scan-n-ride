import { Ticket, TicketResponse, TicketType } from "../model/ticket";


export const ticketToResponse  = (ticket: Ticket): TicketResponse => {
  const { ownerUserSub, ...ticketResponse } = ticket;
  return ticketResponse;
}

// TODO: use some kind of ORM?
export const dynamodbItemsToTickets = (items: any[]): Ticket[] => {
  return items.map((item) => {
    return {
      uuid: item.uuid.S,
      createdAt: item.createdAt.S,
      validUntil: item.validUntil.S,
      type: item.type.S as TicketType,
      line: item.line.S,
      vehicleNumber: item.vehicleNumber.S,
      ownerUserSub: item.ownerUserSub.S,
    };
  });
}
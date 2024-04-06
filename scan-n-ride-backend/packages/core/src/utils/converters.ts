import { Ticket, TicketResponse, TicketType } from "../model/ticket";


export const ticketToResponse  = (ticket: Ticket): TicketResponse => {
  const { ownerUserSub, ...ticketResponse } = ticket;
  return ticketResponse;
}
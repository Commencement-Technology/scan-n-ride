import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {createTicket} from "@scan-n-ride-backend/core/service/ticket_service";
import { TicketType } from "@scan-n-ride-backend/core/model/ticket";

interface CreateTicketRequest {
  line: string;
  vehicleNumber: string;
  type: TicketType;
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // TODO: add ticket type validation
  const { line, vehicleNumber, type } = JSON.parse(event?.body ?? "") as CreateTicketRequest;
  const ticket = await createTicket(line, vehicleNumber, type);
  return {
    statusCode: 200,
    body: JSON.stringify(ticket),
  };
};
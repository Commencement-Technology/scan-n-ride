import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {createTicket} from "@scan-n-ride-backend/core/service/ticket_service";

interface CreateTicketRequest {
  line: string;
  vehicleNumber: string;
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const { line, vehicleNumber } = JSON.parse(event?.body ?? "") as CreateTicketRequest;
  const ticket = await createTicket(line, vehicleNumber);
  return {
    statusCode: 200,
    body: JSON.stringify(ticket),
  };
};
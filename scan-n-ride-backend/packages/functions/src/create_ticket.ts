import { APIGatewayProxyHandlerV2WithJWTAuthorizer } from "aws-lambda";
import { createTicket } from "@scan-n-ride-backend/core/service/ticket_service";
import { CreateTicketRequest } from "@scan-n-ride-backend/core/model/ticket";

export const handler: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (event) => {
  // TODO: add ticket type validation
  const { line, vehicleNumber, type } = JSON.parse(event?.body ?? "") as CreateTicketRequest;
  const userSub = event.requestContext.authorizer.jwt.claims.sub;
  const ticket = await createTicket(line, vehicleNumber, type, String(userSub));
  return {
    statusCode: 200,
    body: JSON.stringify(ticket),
  };
};
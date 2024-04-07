import { APIGatewayProxyHandlerV2WithJWTAuthorizer } from "aws-lambda";
import { getUserTicket } from "@scan-n-ride-backend/core/service/ticket_service";
import { GetUserTicketsRequest } from "@scan-n-ride-backend/core/model/ticket";

export const handler: APIGatewayProxyHandlerV2WithJWTAuthorizer = async (event) => {
    // TODO: how cast the query string parameter to boolean
    const { showExpired } = { showExpired: event.queryStringParameters?.showExpired == 'true' } as GetUserTicketsRequest;
    const userSub = event.requestContext.authorizer.jwt.claims.sub;
    const tickets = await getUserTicket(showExpired, String(userSub));
    return {
        statusCode: 200,
        body: JSON.stringify(tickets),
    };
};
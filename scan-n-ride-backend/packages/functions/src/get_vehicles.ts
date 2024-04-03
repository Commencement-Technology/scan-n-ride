import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getVehicles } from "@scan-n-ride-backend/core/service/vehicle_service";

interface GetVehiclesRequest {
    lines: string[] // request param
}

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    // TODO: add some kind of validation
    const lines = event.queryStringParameters!.lines!.split(',').filter(e => e);
    if (!lines) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Invalid body. Lines not specified."
            })
        }
    }
    const vehicles = await getVehicles(lines);
    return {
        statusCode: 200,
        body: JSON.stringify(vehicles),
    };
};
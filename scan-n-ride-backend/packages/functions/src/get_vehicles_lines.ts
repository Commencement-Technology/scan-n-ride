import {APIGatewayProxyHandlerV2} from "aws-lambda";
import {getVehiclesLines} from "@scan-n-ride-backend/core/service/vehicle_service";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  const vehiclesLines = await getVehiclesLines();
  return {
    statusCode: 200,
    body: JSON.stringify(vehiclesLines),
  };
};
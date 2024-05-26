import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2, APIGatewayProxyStructuredResultV2, Context } from "aws-lambda";
import { handler } from "@scan-n-ride-backend/functions/src/create_ticket";
import { expect, test } from "vitest";

test("should throw error caused by invalid ticket type", async () => {
    const event = {
        requestContext: {
            authorizer: {
                jwt: {
                    claims: {
                        sub: "user-sub",
                    },
                },
            },
        },
        body: JSON.stringify({
            line: "line",
            vehicleNumber: "vehicle-number",
            type: "Invalid",
        }),
    } as unknown as APIGatewayProxyEventV2WithJWTAuthorizer;
    (handler(event, {} as unknown as Context, () => { }) as Promise<APIGatewayProxyResultV2>).catch((error) => {
        expect(error.message).toBe("Invalid ticket type");
    });
});

test("should create a ticket", async () => {
    const event = {
        requestContext: {
            authorizer: {
                jwt: {
                    claims: {
                        sub: "user-sub",
                    },
                },
            },
        },
        body: JSON.stringify({
            line: "line",
            vehicleNumber: "vehicle-number",
            type: "Single",
        }),
    } as unknown as APIGatewayProxyEventV2WithJWTAuthorizer;
    const result = await handler(event, {} as unknown as Context, () => { }) as APIGatewayProxyStructuredResultV2;
    expect(result.statusCode).toBe(200);
    const createdTicket = JSON.parse(result.body ?? "");
    expect(createdTicket.line).toBe("line");
    expect(createdTicket.vehicleNumber).toBe("vehicle-number");
    expect(createdTicket.type).toBe("Single");
});
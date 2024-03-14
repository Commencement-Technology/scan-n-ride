import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { randomUUID } from "crypto";
import { Table } from "sst/node/table";

const client = new DynamoDBClient({});

export const create: APIGatewayProxyHandlerV2 = async (event) => {
  // const { line, vehicleNumber } = JSON.parse(event?.body || "");
  const { line, vehicleNumber } = event

  const now = new Date();

  const Item = {
    uuid: `UUID#${randomUUID().toString()}`,
    createdAt: `DATE#${now.toISOString()}`,
    line,
    vehicleNumber,
  };

  await client.send(
    new PutCommand({
      TableName: Table.Tickets.tableName,
      Item,
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify(Item),
  };
};
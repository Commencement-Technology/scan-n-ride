import { Ticket, TicketResponse, TicketType } from "../model/ticket";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { Table } from "sst/node/table";
import { dynamodbItemsToTickets, ticketToResponse } from "../utils/converters";

const client = new DynamoDBClient({});

export const getUserTicket = async (showExpired: boolean, userSub: string) => {
  const now = new Date().toISOString();
  const singleTypeOffset = new Date(new Date().getTime() - 3600 * 1000).toISOString(); // 1 hour
  const FilterExpression =
    `ownerUserSub = :ownerUserSub ${showExpired ? "" : "AND (validUntil > :now OR (#type = :singleType AND createdAt > :singleTypeOffset))"}`;
  const ExpressionAttributeValues = {
    ":ownerUserSub": { S: userSub },
    ...(!showExpired && {
      ":now": { S: now },
      ":singleTypeOffset": { S: singleTypeOffset },
      ":singleType": { S: TicketType.Single }
    })
  };
  const ExpressionAttributeNames = showExpired
    ? undefined
    : { "#type": "type" };
  const rawTickets = await client.send(
    new ScanCommand({
      TableName: Table.Tickets.tableName,
      FilterExpression,
      ExpressionAttributeValues,
      ExpressionAttributeNames
    })
  );
  const tickets = dynamodbItemsToTickets(rawTickets.Items ?? []);
  return tickets.map(ticketToResponse);
}

export const createTicket = async (line: string, vehicleNumber: string, type: TicketType, userSub: string): Promise<TicketResponse> => {
  const now = new Date();
  const validUntil = calcTicketTypeValidityTime(now, type);

  const ticket: Ticket = {
    uuid: randomUUID().toString(),
    createdAt: now.toISOString(),
    validUntil: validUntil?.toISOString() ?? "",
    type,
    line,
    vehicleNumber,
    ownerUserSub: userSub,
  };
  await client.send(
    new PutCommand({
      TableName: Table.Tickets.tableName,
      Item: ticket,
    })
  );
  return ticketToResponse(ticket);
}

function calcTicketTypeValidityTime(from: Date, type: TicketType): Date | null {
  if (type === 'Single') {
    return null;
  }
  let validityTime: number;
  switch (type) {
    case 'Time_20_Minutes':
      validityTime = 20 * 60 * 1000; // 20 minutes in milliseconds
      break;
    case 'Time_60_Minutes':
      validityTime = 60 * 60 * 1000; // 60 minutes in milliseconds
      break;
    case 'Time_6_Hours':
      validityTime = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
      break;
    case 'Time_24_Hours':
      validityTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      break;
    default:
      throw new Error('Invalid ticket type');
  }
  return new Date(from.getTime() + validityTime);
}

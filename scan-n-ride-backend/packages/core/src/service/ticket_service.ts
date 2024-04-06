import {Ticket, TicketType} from "../model/ticket";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {randomUUID} from "crypto";
import {PutCommand} from "@aws-sdk/lib-dynamodb";
import {Table} from "sst/node/table";

const client = new DynamoDBClient({});

// TODO: add fetching ticket by ownerUserSub

export const createTicket = async (line: string, vehicleNumber: string, type: TicketType, userSub: string): Promise<Ticket> => {
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
  return ticket;
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
    case 'Time_Daily':
      validityTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      break;
    default:
      throw new Error('Invalid ticket type');
  }

  const validUntil = new Date(from.getTime() + validityTime);
  return validUntil;
}

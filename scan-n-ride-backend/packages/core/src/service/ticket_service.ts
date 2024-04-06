import {Ticket, TicketType} from "../model/ticket";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {randomUUID} from "crypto";
import {PutCommand} from "@aws-sdk/lib-dynamodb";
import {Table} from "sst/node/table";
import { calcTicketTypeValidityTime } from "../utils/converters";

const client = new DynamoDBClient({});

export const createTicket = async (line: string, vehicleNumber: string, type: TicketType): Promise<Ticket> => {
  const now = new Date();
  const validUntil = calcTicketTypeValidityTime(now, type);

  const ticket: Ticket = {
    uuid: `UUID#${randomUUID().toString()}`,
    createdAt: `DATE#${now.toISOString()}`,
    validUntil: validUntil ? `DATE#${validUntil.toISOString()}` : "",
    type,
    line,
    vehicleNumber,
  };
  await client.send(
    new PutCommand({
      TableName: Table.Tickets.tableName,
      Item: ticket,
    })
  );
  return ticket;
}
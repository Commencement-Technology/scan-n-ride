import {Ticket} from "../model/ticket";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {randomUUID} from "crypto";
import {PutCommand} from "@aws-sdk/lib-dynamodb";
import {Table} from "sst/node/table";

const client = new DynamoDBClient({});

export const createTicket = async (line: string, vehicleNumber: string): Promise<Ticket> => {
  const now = new Date();
  const ticket: Ticket = {
    uuid: `UUID#${randomUUID().toString()}`,
    createdAt: `DATE#${now.toISOString()}`,
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
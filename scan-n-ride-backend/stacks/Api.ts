import { StackContext, Api, EventBus, Table } from "sst/constructs";

export function API({ stack }: StackContext) {
  const ticketsTable = new Table(stack, "Tickets", {
    primaryIndex: { partitionKey: "uuid", sortKey: "createdAt" },
    fields: {
      uuid: "string",
      createdAt: "string",
      line: "string",
      vehicleNumber: "string"
    },
  });

  const api = new Api(stack, "ScanNRideApi", {
    defaults: {
      function: {
        bind: [ticketsTable],
      },
    },
    routes: {
      "POST /ticket": "packages/functions/src/ticket.create",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    ticketsTable,
    api,
  };
}

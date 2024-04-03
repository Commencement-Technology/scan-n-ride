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
      "POST /ticket": {
        function: {
          functionName: "create_ticket",
          handler: "packages/functions/src/create_ticket.handler",
        }
      },
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

import { SSTConfig } from "sst";
import { API } from "./stacks/Api";

export default {
  config(_input) {
    return {
      name: "scan-n-ride",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;

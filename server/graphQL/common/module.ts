import { createModule } from "graphql-modules";
import commonTypeDefs from "./typeDefs.gql";

export const commonModule = createModule({
  id: "common",
  typeDefs: [commonTypeDefs],
});

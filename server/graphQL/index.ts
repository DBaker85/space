import { createApplication } from "graphql-modules";
import { commonModule } from "./common/module";
import { weatherModule } from "./weather/module";
import { NEOModule } from "./nearEarthObjects/module";

// This is your application, it contains your GraphQL schema and the implementation of it.
const application = createApplication({
  modules: [commonModule, weatherModule, NEOModule],
});

// This is your actual GraphQL schema
export const schema = application.schema;

export const executor = application.createApolloExecutor();

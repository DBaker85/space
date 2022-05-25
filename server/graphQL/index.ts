import { createApplication } from "graphql-modules";
import { weatherModule } from "./weather/module";
import { NEOModule } from "./nearEarthObjects/module";

// This is your application, it contains your GraphQL schema and the implementation of it.
const application = createApplication({
  modules: [weatherModule, NEOModule],
});

// This is your actual GraphQL schema
export const schema = application.createSchemaForApollo();

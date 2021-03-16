import { createServer } from "http";
const destroyable = require("server-destroy");
// import { app } from './app';
declare const module: any;

const Koa = require("koa");
const app = new Koa();
const localPort = 5055;

const port = process.env.PORT || localPort;

const server = createServer(app.callback()).listen(port, () =>
  console.log(`static assets served on ${port}`)
) as any;
destroyable(server);

app.use(async (ctx: any) => {
  ctx.body = "Hello there again, yup";
});

if (process.env.NODE_ENV === "development") {
  // Here HMR story begins

  // You need only 3 lines of code to start accepting code changes coming through the HMR
  if (module.hot) {
    module.hot.accept();
    // Next callback is essential: After code changes were accepted     we need to restart the app. server.close() is here Express.JS-specific and can differ in other frameworks. The idea is that you should shut down your app here. Data/state saving between shutdown and new start is possible
    module.hot.dispose(() => server.destroy());
  }
}

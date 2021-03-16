import { createServer } from 'http';

// import { app } from './app';

const localPort = 5055;

const port = process.env.PORT || localPort;

// createServer(app.callback()).listen(port, () =>
//   console.log(`static assets served on ${port}`)
// );

const Koa = require('koa');
const app = new Koa();

app.use(async (ctx:any) => {
  ctx.body = 'Hello World part 10';
});


const _server = app.listen(port);


// Here HMR story begins
declare const module: any;
// You need only 3 lines of code to start accepting code changes coming through the HMR
if (module.hot) {
    module.hot.accept();
    // Next callback is essential: After code changes were accepted     we need to restart the app. server.close() is here Express.JS-specific and can differ in other frameworks. The idea is that you should shut down your app here. Data/state saving between shutdown and new start is possible
    module.hot.dispose(()=>_server.close());
}


// var destroyable = require('server-destroy');
// var http = require('http');

// var server = http.createServer(app.callback());
// server.listen();
// destroyable(server);

// // then
// server.destroy();
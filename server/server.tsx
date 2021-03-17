import { createServer } from "http";
const destroyable = require("server-destroy");

import {readFile} from 'fs-extra';
import {resolve} from 'path';

import serve from 'koa-static';
import compress from 'koa-compress';
import mount from 'koa-mount';

import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

import App from '../client/src/App';

const sheet = new ServerStyleSheet();

const html = renderToString(
  sheet.collectStyles(
   
    
        <App />
      
    
  )
);
const styleTags = sheet.getStyleTags();

const indexFile = resolve(__dirname, 'public', 'index.html');
 let index;
  readFile(indexFile, 'utf8').then(
    file => {
      const rx = new RegExp('<div id="root"></div>', 'g');
      index = file.replace(
        rx,
        `<div id="root">
        ${styleTags}
        ${html}
        </div>`
      );
    })


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

const clientPath = resolve(__dirname, 'public');
app.use(compress());
app.use(mount('/', serve(clientPath, { index: 'none' })));

app.use(async (ctx: any) => {
  ctx.body = index;
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

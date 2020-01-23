"use strict";
//============================================================================
/** # Standalone Server Application
 ** This is the enty point of the server application after bootstrapping the
 ** 'app.js' file.
 */
//============================================================================
const bootstrappedApp = require("./app");
const fp = require("fastify-plugin");
const fastify = require("fastify");
const { PORT, NODE_ENV, HOST } = process.env;
const server = fastify({
  trustProxy: true,
  pluginTimeout: 10000,
  logger: { level: "fatal" }
});
server
  .register(fp(bootstrappedApp))
  .listen({
    port: PORT || 3000,
    host: HOST || "localhost",
    backlog: 511
  })
  .then(address =>
    console.log(`Server listening on ${address} in ${NODE_ENV} mode!`)
  )
  .catch(err => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
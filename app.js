"use strict";
//==============================================================================
const path = require("path");
const fp = require("fastify-plugin");
const AutoLoad = require("fastify-autoload");
const routes = require("fastify-routes");
// const compression = require("compression");
// const compressionConfig = require("./configs/compression.config");
const connectToPostgresDb = require("./middlewares/connectToPostgresDb");
const registerEnv = require("./middlewares/register_env");
//==============================================================================
module.exports = function(fastify, opts, next) {
  //============================================================================
  // Custom code lives here!
  //============================================================================
  fastify
    .register(fp(registerEnv))
    // .use(compression(compressionConfig))
    .register(require("fastify-compress"), { global: true })
    .register(fp(connectToPostgresDb))
    .register(require("fastify-cors"), {
      origin: "*",
      methods: ["GET", "POST", "HEAD"],
      maxAge: 10 * 60, // seconds.
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Accept",
        "Authorization",
        "X-Apollo-Tracing",
        "Content-Type",
        "Content-Length",
        "X-PostGraphile-Explain"
      ],
      exposedHeaders: ["X-GraphQL-Event-Stream"],
      optionsSuccessStatus: 200
    })
    .register(routes)
    .ready(err => {
      console.warn(fastify.routes);   // can't see '/schema' from routes
      fastify.log.error(err);
    });
  //============================================================================
  // Do not touch the following lines
  //============================================================================
  // Load all plugins defined in plugins those should be support plugins
  // that are reused through your application.
  // A plugin can be a set of routes, a server decorator or whatever.
  fastify.register(AutoLoad, {
    dir: path.resolve("plugins"),
    options: Object.assign({}, opts)
  });
  // Load all plugins defined in services define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.resolve("services"),
    options: Object.assign({}, opts)
  });
  //============================================================================
  // Make sure to call next when done
  //============================================================================
  next();
  //============================================================================
};
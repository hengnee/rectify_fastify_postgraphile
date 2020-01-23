const fp = require("fastify-plugin");
const env = require("fastify-env");
//============================================================================
// Environment Variables
//============================================================================
module.exports = async function registerEnv(fastify, opts) {
  const properties = {
    // pg connection config
    PGUSER    : {type: "string"},
    PGPASS    : {type: "string"},
    PGHOST    : {type: "string"},
    PGPORT    : {type: "string"},
    PGDATABASE: {type: "string"},
    PGSCHEMA  : {type: "string"},
    // node config
    NODE_ENV  : {type: "string"},
    PORT      : {type: "string"},
    // gcp connection config
    GOOGLE_CLOUD_RUN_HOST     : {type: "string"},
    GOOGLE_CONNECTION_INSTANCE: {type: "string"},
    GOOGLE_APP_ENGINE_URL     : {type: "string"}
  }
  const schema = {
    type: "object",
    properties,
    required: Object.keys(properties),
    additionalProperties: false
  };
  await fastify
    .register(env, { schema, data: [opts], confKey: "env" })
    .ready(err => fastify.log.error("ERROR:", err));
};
//============================================================================
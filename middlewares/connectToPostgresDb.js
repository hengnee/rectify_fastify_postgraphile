"use strict";
//============================================================================
const { postgraphile } = require("postgraphile");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
//============================================================================
//* PostgreSQL Database Connection
//============================================================================
module.exports = async function(fastify) {
  fastify.log.info("Establishing PostgreSQL DB connection...");
  const { PGUSER, PGPASS, PGHOST, PGPORT, PGDATABASE, PGSCHEMA } = fastify.env;
  const { NODE_ENV, GOOGLE_CONNECTION_INSTANCE } = fastify.env;
  const isDevMode = NODE_ENV === "development" || false;
  const postgresConfig = {
    user            : PGUSER,
    password        : PGPASS,
    host            : PGHOST || "localhost",
    port            : PGPORT || 5432,
    database        : PGDATABASE,
    connectionString: isDevMode
      ? undefined
      : `/cloudsql/${GOOGLE_CONNECTION_INSTANCE}`
  };
  const postgraphileOpt = {
    watchPg        : isDevMode,
    retryOnInitFail: true,
    graphiql       : isDevMode,
    enhanceGraphiql: isDevMode,
    graphiqlRoute  : "/schema",
    // enableCors     : true,   // this is overwriting all routes to use this.
    // externalUrlBase: isDevMode ? undefined: `${GOOGLE_APP_ENGINE_URL}/schema`,
    // enabling query log is useful but soon becomes a performance issue
    disableQueryLog: true,
    appendPlugins  : [ConnectionFilterPlugin]
  };
  await fastify
    .use(postgraphile(postgresConfig, PGSCHEMA, postgraphileOpt))
    .ready(err => {
      if (err) return fastify.log.error(err);
      if (isDevMode) {
        fastify.log.info(
          `Open in route http://localhost${postgraphileOpt.graphiqlRoute} to explore the APIs.`
        );
      }
    });
};
//============================================================================
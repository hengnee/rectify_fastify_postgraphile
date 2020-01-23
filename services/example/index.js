"use strict";
module.exports = async function(fastify, opts) {
  fastify.get("/example", async (req, res) => {
    res.send("This is an example route");
  });
};

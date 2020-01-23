"use strict";
const fs = require("fs");

module.exports = async function(fastify, opts) {
  fastify.get("/", async (req, res) => {
    res
      .header("content-type", "text/plain")
      .send(fs.createReadStream("./README.md"));
  });
};

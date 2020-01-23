"use strict";
//==============================================================================
/** # Note:
 ** - Will use Fastify-Compress once issue has been resolved from both sides.
 ** - Currently, the compression library does not support brotli compression yet.
 */
//==============================================================================
// const zlib = require("zlib");
module.exports = {
  // brotli: {
  //   flush: zlib.constants.BROTLI_OPERATION_PROCESS,
  //   params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 4 }
  // },
  chunkSize: 1024,
  level: 9
};
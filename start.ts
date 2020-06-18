import { createServer } from "https";

import { readFileSync } from "fs-extra";
import { resolve } from "path";

import app from "./src/Server";
require("dotenv").config();

const options = {
  cert: process.env.SSL_CERT || readFileSync(resolve("certs", "server.crt")),
  key: process.env.SSL_KEY || readFileSync(resolve("certs", "key.pem")),
};

const port = process.env.PORT || 3000;
const server = createServer(options, app);

server.listen(port, () => console.info("Secure Server running on port", port));

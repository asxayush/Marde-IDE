import fs from "node:fs";
import Redis from "ioredis";

const redisEnvPath = new URL("./.env", import.meta.url);
if (fs.existsSync(redisEnvPath)) {
  for (const line of fs.readFileSync(redisEnvPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, "$2");
    }
  }
}

const redis = new Redis(process.env.REDIS_URL)

redis.on("connect", () => {
  console.log("Connected to Redis");
});

export default redis;
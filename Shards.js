const { ShardingManager } = require("discord.js");

const shards = new ShardingManager("./index.js", {
  token: process.env.token,
  totalShards: 3,
  respawn: true
});

shards.on("shardCreate", async (shard) => {
  console.log(`[MINORI] - Loading shard #${shard.id}`);
});

shards.spawn(shards.totalShards, 10000);

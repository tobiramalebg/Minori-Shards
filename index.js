console.clear();
const Discord = require("discord.js");
const MinoriClient = require("./struct/minori");
let client = new MinoriClient({
  ws: { intents: ["GUILDS", "GUILDS_MESSAGES"] },
  disableMentions: "everyone",
  autoReconnect: true,
  disabledEvents: ["TYPING_START"],
  partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "REACTION"],
});
const hook = new Discord.WebhookClient(
  "WEBHOOK ID",
  "WEBHOOK TOKEN"
);
const hooks = new Discord.WebhookClient(
  "WEBHOOK ID",
  "WEBHOOK TOKEN"
);

client.on("shardError", async (shard) => {
  const error = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`Shard ${shard + 1}/3`)
    .setDescription(`- This shard got an error`);
  hooks.send(error);
  console.log(`Shard ${shard + 1} got an error!`);
});
client.on("shardReady", async (shard) => {
  const ready = new Discord.MessageEmbed()
    .setColor("#00FF00")
    .setTitle(`Shard ${shard + 1}/3`)
    .setDescription(`- Ready on ${client.guilds.cache.size} servers.`);
  hook.send(ready);
  console.log(`[MINORI] - Shard ${shard + 1} is ready!`);
});
client.on("shardDisconnect", async (shard) => {
  const disconnect = new Discord.MessageEmbed()
    .setColor("#dc143c")
    .setTitle(`Shard ${shard + 1}/3`)
    .setDescription(`- Disconnected from its servers and users temporarily.`);
  hooks.send(disconnect);
  console.log(`[MINORI] - Shard ${shard + 1} is disconnected!`);
});

client.on("shardReconnecting", async (shard) => {
  const reconnect = new Discord.MessageEmbed()
    .setColor("#8a2be2")
    .setTitle(`Shard ${shard + 1}/3`)
    .setDescription(
      "- Reconnection in progress on the servers containing this shard."
    );
  hooks.send(reconnect);
  console.log(`[MINORI] - Shard ${shard + 1} is trying to reconnect!`);
});

client.on("shardResume", async (shard) => {
  const resume = new Discord.MessageEmbed()
    .setColor("#00ffff")
    .setTitle(`Shard ${shard + 1}/3`)
    .setDescription(`- Shard resumed on ${client.guilds.cache.size} servers.`);
  hook.send(resume);
  console.log(`[MINORI] - Shard ${shard + 1} resumed!`);
});

client.start(process.env.token, "./struct/commands", "./struct/events");

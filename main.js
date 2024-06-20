const { Client, GatewayIntentBits, Partials, ActivityType } = require("discord.js");
require('dotenv').config();

const client = new Client({
  intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ],
  partials: [ Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User ],
  restTimeOffset: 0,
  failIfNotExists: false,
  presence: {
    activities: [{
      name: `starting...`,
      type: ActivityType.Custom,
    }],
    status: "Online"
  },
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false
  }
});

client.config = require("./config.json");

require('./loader/events.js')(client);
require('./loader/commands.js')(client);



client.login(process.env.TOKEN);
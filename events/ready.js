const { ActivityType } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const commands = [];
    client.commands.forEach(command => {
      commands.push(command.data.toJSON());
    })
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
    try {
      console.log('Started refreshing application (/) commands.');
      await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: commands },
      );
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }

    console.log(`[READY]  ${client.user.tag} est prêt | ${client.guilds.cache.size.toLocaleString('fr-FR')} serveurs | ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0).toLocaleString('fr-FR')} utilisateurs\n`);
    setInterval(() => {
      let random = Math.floor(Math.random() * status.length);
      client.user.setActivity(status[random]);
    }, 6000);
  }
}

let status = [
  {
    name: '/help',
    type: ActivityType.Custom,
  }
]
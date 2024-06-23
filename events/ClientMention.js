const getPrefix = require("../fonctions/getPrefix.js");

module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (!message || !message.author) return;
    if (message.author.bot) return;
    if (
      message.content === `<@!${client.user.id}>` ||
      message.content === `<@${client.user.id}>`
    ) {
      let prefix;
      if (message.channel.type === 1) {
        prefix = await getPrefix(message.channel.id);
      } else {
        prefix = await getPrefix(message.guild.id);
      }
      message.reply(`Mon préfixe est \`${prefix}\`.`);
    }
  },
};

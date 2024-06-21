module.exports = {
  name: 'messageCreate',
  async execute(client, message) {
    if (!message || !message.author) return;
    if (message.author.bot) return;
    if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
      message.reply(`Mon préfixe est \`${client.config.prefix}\`.`);
    };
  },
};
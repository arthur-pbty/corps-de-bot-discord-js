module.exports = {
  name: 'messageCreate',
  async execute(client, message) {
    if (!message || !message.author) return;
    if (message.author.bot) return;
    if (!message.content || !client.config) return;
    if (!message.content.startsWith(client.config.prefix)) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (command.dm !== true && message.channel.type === 1) return;
    if (command.botOwnerOnly && !client.config.owner.includes(message.author.id)) return;
    if (command.permissions && !message.member.permissions.has(command.permissions)) return;

    try {
      command.executePrefix(client, message, args);
    } catch (error) {
      console.error(`Erreur lors de l'exécution de la commande '${commandName}':`, error);
    }
  },
};
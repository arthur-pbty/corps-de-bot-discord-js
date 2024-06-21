require('dotenv').config();

module.exports = {
  name: 'messageCreate',
  async execute(client, message) {
    if (!message || !message.author) return;
    if (message.author.bot) return;
    if (!message.content) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (command.dm !== true && message.channel.type === 1) return message.reply({ content: 'Cette commande ne peut pas être utilisée en message privé.' }).then(msg => setTimeout(() => msg.delete(), 5000));
    if (process.env.OWNER && !process.env.OWNER === message.author.id) {
      if (command.botOwnerOnly) return message.reply({ content: 'Cette commande est réservée au propriétaire du bot.' }).then(msg => setTimeout(() => msg.delete(), 5000));
      if (command.permissions && message.channel.type !== 1 && !command.permissions.every(permission => message.member.permissions.has(permission))) return message.reply({ content: 'Vous n\'avez pas la permission d\'utiliser cette commande.' }).then(msg => setTimeout(() => msg.delete(), 5000));
    }

    try {
      command.executePrefix(client, message, args);
      console.log(`[CMD - PREFIX] ${message.author.tag} | ${commandName}`);
    } catch (error) {
      console.error(`Erreur lors de l'exécution de la commande '${commandName}':`, error);
    }
  },
};
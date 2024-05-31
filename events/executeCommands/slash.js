module.exports = {
  name: 'interactionCreate',
  async execute(client, interaction) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    if (command.dm !== true && interaction.channel.type === 1) {
      return interaction.reply({ content: 'Cette commande ne peut pas être utilisée en message privé.', ephemeral: true });
    }
    if (command.botOwnerOnly && !client.config.owner.includes(interaction.user.id)) {
      return interaction.reply({ content: 'Cette commande est réservée au propriétaire du bot.', ephemeral: true });
    }
    if (command.permissions && !interaction.member.permissions.has(command.permissions) && !client.config.owner.includes(message.author.id)) {
      return interaction.reply({ content: 'Vous n\'avez pas la permission d\'utiliser cette commande.', ephemeral: true });
    }

    try {
      command.executeSlash(client, interaction);
    } catch (error) {
      console.error(`Erreur lors de l'exécution de la commande slash '${interaction.commandName}':`, error);
    }
  },
};
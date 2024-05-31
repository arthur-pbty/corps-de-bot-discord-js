module.exports = {
  name: 'interactionCreate',
  async execute(client, interaction) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      command.executeSlash(client, interaction);
    } catch (error) {
      console.error(`Erreur lors de l'exécution de la commande slash '${interaction.commandName}':`, error);
    }
  },
};
const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

const command = {
  name: "ping",
  description: "Affiche le ping du bot.",
  aliases: ['pong', 'latency'],
  permissions: [PermissionsBitField.Flags.ViewChannel],
  botOwnerOnly: false,
  dm: true,

  async executePrefix(client, message, args) {
    const texte = args[0]; // Utilise le premier argument comme 'texte'
    message.reply(`🏓 **Mon ping est de :** ${client.ws.ping} ms. ${texte ? `Texte : ${texte}` : ''}`).catch(() => {});
  },

  async executeSlash(client, interaction) {
    const texte = interaction.options.getString('texte'); // Obtient l'option 'texte'
    interaction.reply(`🏓 **Mon ping est de :** ${client.ws.ping} ms. ${texte ? `Texte : ${texte}` : ''}`).catch(() => {});
  }
}

command.data = new SlashCommandBuilder()
  .setName(command.name)
  .setDescription(command.description)
  .addStringOption(option => 
    option.setName('texte')
      .setDescription('Texte à afficher')
      .setRequired(false)
  );

module.exports = command;
const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

const command = {
  name: "ping",
  description: "Affiche le ping du bot.",
  aliases: ['pong', 'latency'],
  permissions: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
  botOwnerOnly: false,
  dm: false,

  async executePrefix(client, message, args) {
    const texte = args[0]; 
    message.reply(`🏓 **Mon ping est de :** ${client.ws.ping} ms. ${texte ? `Texte : ${texte}` : ''}`).catch(() => {});
  },

  async executeSlash(client, interaction) {
    const texte = interaction.options.getString('texte'); 
    interaction.reply(`🏓 **Mon ping est de :** ${client.ws.ping} ms. ${texte ? `Texte : ${texte}` : ''}`).catch(() => {});
  }
}

let default_member_permissions = new PermissionsBitField();
command.permissions.forEach(permission => default_member_permissions += BigInt(permission));
command.data = new SlashCommandBuilder()
  .setName(command.name)
  .setDescription(command.description)
  .setDMPermission(command.dm)
  .setDefaultMemberPermissions(default_member_permissions)
  .addStringOption(option => 
    option.setName('texte')
      .setDescription('Texte à afficher')
      .setRequired(false)
  );

module.exports = command;
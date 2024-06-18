const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

const command = {
  name: "ping",
  description: "Affiche le ping du bot.",
  aliases: ['pong', 'latency'],
  permissions: [PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers],
  botOwnerOnly: false,
  dm: true,

  async executePrefix(client, message, args) {
    const texte = args[0]; 
    message.reply(`🏓 **Mon ping est de :** ${client.ws.ping} ms.`).catch(() => {});
  },

  async executeSlash(client, interaction) {
    const texte = interaction.options.getString('texte'); 
    interaction.reply(`🏓 **Mon ping est de :** ${client.ws.ping} ms.`).catch(() => {});
  }
}


let default_member_permissions;
if (command.permissions.length === 0) {
  default_member_permissions = null;
} else {
  default_member_permissions = new PermissionsBitField();
  command.permissions.forEach(permission => default_member_permissions += BigInt(permission));
}
command.data = new SlashCommandBuilder()
  .setName(command.name)
  .setDescription(command.description)
  .setDMPermission(command.dm)
  .setDefaultMemberPermissions(default_member_permissions)
  // ajouter ici les option de la commande slash

let utilisation = '';

command.data.options.forEach(option => {
  let optionUsage = '';

  if (option.type === 3) {
    if (option.choices) {
      option.choices
    }
    optionUsage = option.required ? `<${option.name}>` : `[${option.name}]`;
  } else if (option.type === 4) {
    optionUsage = option.required ? `<${option.name}>` : `[${option.name}]`;
  } else if (option.type === 5) {
    optionUsage = option.required ? `<True|False>` : `[True|False]`;
  } else if (option.type === 6) {
    optionUsage = option.required ? `<@member>` : `[@member]`;
  } else if (option.type === 7) {
    optionUsage = option.required ? `<#channel>` : `[#channel]`;
  } else if (option.type === 8) {
    optionUsage = option.required ? `<@role>` : `[@role]`;
  } else if (option.type === 9) {
    optionUsage = option.required ? `<@mention>` : `[@mention]`;
  } else if (option.type === 10) {
    optionUsage = option.required ? `<${option.name}>` : `[${option.name}]`;
  } else if (option.type === 11) {
    optionUsage = option.required ? `<${option.name}>` : `[${option.name}]`;
  }

  utilisation += ` ${optionUsage}`;
});

utilisation = utilisation.trim(); 
command.utilisation = utilisation;

module.exports = command;
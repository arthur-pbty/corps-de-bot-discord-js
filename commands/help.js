const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

const command = {
  name: "help",
  description: "Affiche la liste des commandes.",
  aliases: ['aide', 'h'],
  permissions: [],
  botOwnerOnly: false,
  dm: true,

  async executePrefix(client, message, args) {
    const command = args[0];
    const commands = client.commands;
    
  },

  async executeSlash(client, interaction) {
    const command = interaction.options.getString('commande');
    const commands = client.commands;
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
  .addStringOption(option => 
    option.setName('commande')
      .setDescription('Commande à affiche')
      .setRequired(false)
  );

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
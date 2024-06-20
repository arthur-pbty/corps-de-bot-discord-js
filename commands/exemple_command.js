const addCommand = require('../fonctions/addCommand');
const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = addCommand(
  this.name = 'exemple_command',
  this.description = 'Commande exemple.',
  this.aliases = ['exemple', 'ex'],
  this.permissions = [],
  this.botOwnerOnly = false,
  this.dm = true,
  
  this.executePrefix = async (client, message, args) => {
    message.reply('Commande exemple.').catch(() => {});
  },

  this.executeSlash = async (client, interaction) => {
    interaction.reply('Commande exemple.').catch(() => {});
  },

  this.slashOptions = new SlashCommandBuilder()
    .addIntegerOption(option => option
      .setName('nombre')
      .setDescription('Un nombre')
      .setRequired(false)
      .addChoices(
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 }
      )
    )
    .addBooleanOption(option => option
      .setName('booléen')
      .setDescription('Un booléen')
      .setRequired(false)
    )
);
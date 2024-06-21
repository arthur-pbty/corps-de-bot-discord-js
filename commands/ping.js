const addCommand = require('../fonctions/addCommand');
const { SlashCommandBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("discord.js");

module.exports = addCommand(
  this.name = 'ping',
  this.description = 'Cette commande permet de vérifier la latence du bot.',
  this.aliases = ['latency', 'lag', 'responseTime'],
  this.permissions = [],
  this.botOwnerOnly = false,
  this.dm = true,

  this.executePrefix = async (client, message, args) => {
    const embed = new EmbedBuilder()
      .setTitle('Pong !')
      .setDescription(`La latence du bot est de ${client.ws.ping}ms.`)
      .setTimestamp();
  },

  this.executeSlash = async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle('Pong !')
      .setDescription(`La latence du bot est de ${client.ws.ping}ms.`)
      .setTimestamp();
  },

  this.slashOptions = new SlashCommandBuilder()
);
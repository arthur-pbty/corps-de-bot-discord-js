const addCommand = require("../fonctions/addCommand");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const getPrefix = require("../fonctions/getPrefix");

module.exports = addCommand(
  (this.name = "prefix"),
  (this.description = "Affiche le préfixe actuel du bot."),
  (this.aliases = ["getprefix", "showprefix"]),
  (this.permissions = []),
  (this.botOwnerOnly = false),
  (this.dm = true),

  (this.executePrefix = async (client, message, args) => {
    let prefix;
    if (message.channel.type === 1) {
      prefix = await getPrefix(message.channel.id);
    } else {
      prefix = await getPrefix(message.guild.id);
    }
    const embed = new EmbedBuilder()
      .setTitle("Préfixe du Bot")
      .setDescription(`Le préfixe actuel du bot est: \`${prefix}\``)
      .setColor("#0099FF")
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }),

  (this.executeSlash = async (client, interaction) => {
    const prefix = await getPrefix(interaction.guild.id);
    const embed = new EmbedBuilder()
      .setTitle("Préfixe du Bot")
      .setDescription(`Le préfixe actuel du bot est: \`${prefix}\``)
      .setColor("#0099FF")
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }),

  (this.slashOptions = new SlashCommandBuilder()),
);

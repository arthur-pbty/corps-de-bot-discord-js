const addCommand = require("../fonctions/addCommand");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = addCommand(
  (this.name = "uptime"),
  (this.description = "Affiche depuis combien de temps le bot est en ligne."),
  (this.aliases = ["up", "online"]),
  (this.permissions = []),
  (this.botOwnerOnly = false),
  (this.dm = true),
  (this.executePrefix = async (client, message, args) => {
    const totalSeconds = client.uptime / 1000;
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds % 60);

    const embed = new EmbedBuilder()
      .setTitle("Temps d'activité")
      .setDescription(
        `Le bot est en ligne depuis ${days > 0 ? `${days} jours, ` : ""}${hours > 0 ? `${hours} heures, ` : ""}${minutes > 0 ? `${minutes} minutes et ` : ""}${seconds} secondes.`,
      )
      .setColor("#0099FF")
      .setTimestamp()
      .setFooter({
        text: `Demandé par ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL(),
      });

    await message.reply({ embeds: [embed] });
  }),
  (this.executeSlash = async (client, interaction) => {
    const totalSeconds = client.uptime / 1000;
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds % 60);

    const embed = new EmbedBuilder()
      .setTitle("Temps d'activité")
      .setDescription(
        `Le bot est en ligne depuis ${days} jours, ${hours} heures, ${minutes} minutes et ${seconds} secondes.`,
      )
      .setColor("#0099FF")
      .setTimestamp()
      .setFooter({
        text: `Demandé par ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [embed] });
  }),
  (this.slashOptions = new SlashCommandBuilder()),
);

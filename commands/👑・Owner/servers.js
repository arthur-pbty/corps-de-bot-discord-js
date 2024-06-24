const addCommand = require("../../fonctions/addCommand");
const {
  SlashCommandBuilder,
  PermissionsBitField,
  EmbedBuilder,
} = require("discord.js");

module.exports = addCommand(
  (this.name = "servers"),
  (this.description = "Affiche la liste des serveurs où le bot est présent."),
  (this.aliases = ["serv", "server", "serverlist", "servlist", "serverslist"]),
  (this.permissions = []),
  (this.botOwnerOnly = true),
  (this.dm = true),
  (this.executePrefix = async (client, message, args) => {
    if (args[0]) {
      const guild = client.guilds.cache.get(args[0]);
      if (!guild) {
        const embed = new EmbedBuilder()
          .setTitle("Erreur")
          .setDescription(
            "Ce serveur n'existe pas ou le bot n'est pas présent dessus.",
          )
          .setColor("#FF0000")
          .setTimestamp()
          .setFooter({
            text: `Demandé par ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL(),
          });

        return message.reply({ embeds: [embed] });
      }
      const owner = guild.members.cache.get(guild.ownerId);
      const ownerName = owner ? owner.user.tag : "Inconnu";
      const joinedTimestamp = guild.joinedTimestamp;
      const joinedDate = new Date(joinedTimestamp).toLocaleString("fr-FR", {
        dateStyle: "short",
        timeStyle: "short",
      });
      const createdAt = new Date(guild.createdAt).toLocaleString("fr-FR", {
        dateStyle: "short",
        timeStyle: "short",
      });

      const embed = new EmbedBuilder()
        .setTitle(`Informations sur le serveur ${guild.name}`)
        .setColor("#00FF00")
        .addFields(
          { name: "Nom", value: guild.name, inline: true },
          { name: "ID", value: guild.id, inline: true },
          { name: "A rejoint le", value: joinedDate, inline: true },
          { name: "Propriétaire", value: ownerName, inline: true },
          {
            name: "Membres",
            value: guild.memberCount.toString(),
            inline: true,
          },
          { name: "Région", value: guild.preferredLocale, inline: true },
          { name: "Créé le", value: createdAt, inline: true },
        )
        .setThumbnail(guild.iconURL())
        .setTimestamp()
        .setFooter({
          text: `Demandé par ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL(),
        });

      message.reply({ embeds: [embed] });
      return;
    }
    const guilds = client.guilds.cache;
    let description = `Nombre de serveurs : ${guilds.size}\n`;

    guilds.forEach((guild) => {
      if (message.guild && guild.id === message.guild.id) {
        description += `**${guild.name} - ${guild.id}**\n`;
      } else {
        description += `${guild.name} - ${guild.id}\n`;
      }
    });
    const embed = new EmbedBuilder()
      .setTitle("Liste des serveurs")
      .setColor("#00FF00")
      .setDescription(description)
      .setTimestamp()
      .setFooter({
        text: `Demandé par ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL(),
      });

    message.reply({ embeds: [embed] });
  }),
  (this.executeSlash = async (client, interaction) => {
    const guildId = interaction.options.getString("id");
    if (guildId) {
      const guild = client.guilds.cache.get(guildId);
      if (!guild) {
        const embed = new EmbedBuilder()
          .setTitle("Erreur")
          .setDescription(
            "Ce serveur n'existe pas ou le bot n'est pas présent dessus.",
          )
          .setColor("#FF0000")
          .setTimestamp()
          .setFooter({
            text: `Demandé par ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL(),
          });

        return message.reply({ embeds: [embed] });
      }
      const owner = guild.members.cache.get(guild.ownerId);
      const ownerName = owner ? owner.user.tag : "Inconnu";
      const joinedTimestamp = guild.joinedTimestamp;
      const joinedDate = new Date(joinedTimestamp).toLocaleString("fr-FR", {
        dateStyle: "short",
        timeStyle: "short",
      });
      const createdAt = new Date(guild.createdAt).toLocaleString("fr-FR", {
        dateStyle: "short",
        timeStyle: "short",
      });

      const embed = new EmbedBuilder()
        .setTitle(`Informations sur le serveur ${guild.name}`)
        .setColor("#00FF00")
        .addFields(
          { name: "Nom", value: guild.name, inline: true },
          { name: "ID", value: guild.id, inline: true },
          { name: "A rejoint le", value: joinedDate, inline: true },
          { name: "Propriétaire", value: ownerName, inline: true },
          {
            name: "Membres",
            value: guild.memberCount.toString(),
            inline: true,
          },
          { name: "Région", value: guild.preferredLocale, inline: true },
          { name: "Créé le", value: createdAt, inline: true },
        )
        .setThumbnail(guild.iconURL())
        .setTimestamp()
        .setFooter({
          text: `Demandé par ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        });

      interaction.reply({ embeds: [embed] });
      return;
    }
    const guilds = client.guilds.cache;
    let description = `Nombre de serveurs : ${guilds.size}\n`;

    guilds.forEach((guild) => {
      if (interaction.guild && guild.id === interaction.guild.id) {
        description += `**${guild.name} - ${guild.id}**\n`;
      } else {
        description += `${guild.name} - ${guild.id}\n`;
      }
    });
    const embed = new EmbedBuilder()
      .setTitle("Liste des serveurs")
      .setColor("#00FF00")
      .setDescription(description)
      .setTimestamp()
      .setFooter({
        text: `Demandé par ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    interaction.reply({ embeds: [embed] });
  }),
  (this.slashOptions = new SlashCommandBuilder().addStringOption((option) =>
    option
      .setName("id")
      .setDescription("L'ID du serveur à afficher.")
      .setRequired(false),
  )),
);

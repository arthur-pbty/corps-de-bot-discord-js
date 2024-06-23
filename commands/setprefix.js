const addCommand = require("../fonctions/addCommand");
const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
const getPrefix = require("../fonctions/getPrefix");
const db = require("../fonctions/setDatabase");

module.exports = addCommand(
  (this.name = "setprefix"),
  (this.description = "Modifie le préfixe du bot."),
  (this.aliases = ["prefixset", "changeprefix"]),
  (this.permissions = [PermissionsBitField.Flags.Administrator]),
  (this.botOwnerOnly = false),
  (this.dm = true),

  (this.executePrefix = async (client, message, args) => {
    const newPrefix = args[0];
    if (!newPrefix) return message.reply("Vous devez spécifier un préfixe.");
    if (newPrefix.length > 5)
      return message.reply("Le préfixe ne doit pas dépasser 5 caractères.");

    let prefix;
    if (message.channel.type === 1) {
      prefix = await getPrefix(message.channel.id);
    } else {
      prefix = await getPrefix(message.guild.id);
    }

    if (newPrefix === prefix)
      return message.reply("Le préfixe spécifié est déjà le préfixe actuel.");

    db.run(
      `INSERT OR REPLACE INTO prefix (guildId, prefix) VALUES (?, ?)`,
      [message.guild.id, newPrefix],
      (err) => {
        if (err) {
          console.error(err.message);
          return message.reply("Une erreur s'est produite.");
        }
        const embed = new EmbedBuilder()
          .setTitle("Préfixe modifié")
          .setDescription(`Le préfixe du bot a été modifié pour \`${newPrefix}\`.`)
          .setColor("#0099FF")
          .setTimestamp()
          .setFooter({
            text: `Demandé par ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL(),
          });

        message.reply({ embeds: [embed] });
      },
    );
  }),

  (this.executeSlash = async (client, interaction) => {
    const newPrefix = interaction.options.getString("prefix");
    if (!newPrefix) return interaction.reply("Vous devez spécifier un préfixe.");
    if (newPrefix.length > 5)
      return interaction.reply("Le préfixe ne doit pas dépasser 5 caractères.");

    let prefix;
    if (interaction.channel.type === 1) {
      prefix = await getPrefix(interaction.channel.id);
    } else {
      prefix = await getPrefix(interaction.guild.id);
    }

    if (newPrefix === prefix)
      return interaction.reply("Le préfixe spécifié est déjà le préfixe actuel.");

    db.run(
      `INSERT OR REPLACE INTO prefix (guildId, prefix) VALUES (?, ?)`,
      [interaction.guild.id, newPrefix],
      (err) => {
        if (err) {
          console.error(err.message);
          return interaction.reply("Une erreur s'est produite.");
        }
        const embed = new EmbedBuilder()
          .setTitle("Préfixe modifié")
          .setDescription(`Le préfixe du bot a été modifié pour \`${newPrefix}\`.`)
          .setColor("#0099FF")
          .setTimestamp()
          .setFooter({
            text: `Demandé par ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL(),
          });

        interaction.reply({ embeds: [embed] });
      },
    );
  }),

  (this.slashOptions = new SlashCommandBuilder()
    .addStringOption((option) =>
      option
        .setName("prefix")
        .setDescription("Le nouveau préfixe du bot.")
        .setRequired(true),
    )),
);

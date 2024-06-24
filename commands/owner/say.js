const addCommand = require("../../fonctions/addCommand");
const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = addCommand(
  (this.name = "say"),
  (this.description = "Fait dire au bot le message spécifié."),
  (this.aliases = ["repeat", "echo", "dire"]),
  (this.permissions = [PermissionsBitField.Flags.Administrator]),
  (this.botOwnerOnly = false),
  (this.dm = true),
  (this.executePrefix = async (client, message, args) => {
    const text = args.join(" ");
    if (!text) return message.reply("Vous devez spécifier un message à dire.");
    message.delete().catch(() => {});
    message.channel.send(text);
  }),
  (this.executeSlash = async (client, interaction) => {
    const text = interaction.options.getString("text");
    if (!text)
      return interaction.reply({
        content: "Vous devez spécifier un message à dire.",
        ephemeral: true,
      });
    interaction.channel.send(text);
    interaction.reply({ content: "Message envoyé.", ephemeral: true });
  }),
  (this.slashOptions = new SlashCommandBuilder().addStringOption((option) =>
    option
      .setName("text")
      .setDescription("Le message à dire.")
      .setRequired(true),
  )),
);

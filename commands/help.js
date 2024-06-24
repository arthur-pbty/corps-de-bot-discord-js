const addCommand = require("../fonctions/addCommand");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const getPrefix = require("../fonctions/getPrefix");

module.exports = addCommand(
  (this.name = "help"),
  (this.description = "Affiche la liste des commandes disponibles."),
  (this.aliases = ["h", "aide"]),
  (this.permissions = []),
  (this.botOwnerOnly = false),
  (this.dm = true),
  (this.executePrefix = async (client, message, args) => {
    if (args[0]) {
      const command =
        client.commands.get(args[0]) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(args[0]),
        );

      if (!command) {
        const embed = new EmbedBuilder()
          .setTitle("Commande introuvable")
          .setDescription(
            "La commande spécifiée n'existe pas. Veuillez réessayer.",
          )
          .setColor("#0099FF")
          .setTimestamp();

        return message.reply({ embeds: [embed] });
      }

      const embed = new EmbedBuilder()
        .setTitle(command.name)
        .setDescription(
          `> **Description :** ${command.description}\n> **Utilisation :** \`${command.utilisation}\`\n> **Catégorie :** ${command.category}`,
        )
        .setColor("#0099FF")
        .setTimestamp();

      return message.reply({ embeds: [embed] });
    }

    let prefix;
    if (message.channel.type === 1) {
      prefix = await getPrefix(message.channel.id);
    } else {
      prefix = await getPrefix(message.guild.id);
    }

    const categories = new Set();

    client.commands.forEach((command) => {
      if (command.category) {
        categories.add(command.category);
      }
    });

    const categoriesArray = Array.from(categories);

    const welcomeEmbed = new EmbedBuilder()
      .setTitle("📚・Accueil")
      .setDescription(
        `Voici le panel d'aide du bot. Pour plus d'informations sur une commande, utilisez \`${prefix}help <commande>\``,
      )
      .setColor("#0099FF")
      .setTimestamp()
      .setFooter({ 
        text: `Page 1/${categories.size + 1} - Demandé par ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL(),
      });

    function createEmbedByCategory(client, category) {
      const commands = [];
      client.commands.forEach((command) => {
        if (command.category && command.category === category) {
          commands.push(command);
        }
      });

      const embed = new EmbedBuilder()
        .setTitle(category)
        .setDescription(
          commands
            .map(
              (command) =>
                `> \`${prefix + command.name} ${command.utilisation}\`\n> ┖ ${command.description}`,
            )
            .join("\n\n"),
        )
        .setColor("#0099FF")
        .setTimestamp()
        .setFooter({ 
          text: `Page ${categoriesArray.indexOf(category) + 2}/${categories.size + 1} - Demandé par ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL(),
        });

      return embed;
    }

    let returnEmbed = [welcomeEmbed];
    categories.forEach((category) => {
      returnEmbed.push(createEmbedByCategory(client, category));
    });
    let page = 1;

    const leftButton = new ButtonBuilder()
      .setCustomId("left")
      .setLabel("◀")
      .setStyle(ButtonStyle.Primary);

    const rightButton = new ButtonBuilder()
      .setCustomId("right")
      .setLabel("▶")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(leftButton, rightButton);

    const sendMessage = await message.reply({
      embeds: [returnEmbed[0]],
      components: [row],
    });

    const filter = (i) => i.customId === "left" || i.customId === "right";
    const collector = sendMessage.createMessageComponentCollector({
      filter,
      time: 120000,
    });
    collector.on("collect", async (i) => {
      if (i.user.id !== message.author.id)
        return i.reply({
          content: "Vous n'êtes pas l'auteur du message.",
          ephemeral: true,
        });

      if (i.customId === "left") {
        if (page === 1) {
          page = returnEmbed.length;
        } else {
          page--;
        }
      } else if (i.customId === "right") {
        if (page === returnEmbed.length) {
          page = 1;
        } else {
          page++;
        }
      }

      sendMessage.edit({ embeds: [returnEmbed[page - 1]] });
      i.deferUpdate();
    });

    collector.on("end", async () => {
      sendMessage.edit({ components: [] });
    });
  }),
  (this.executeSlash = async (client, interaction) => {
    if (interaction.options.getString("command")) {
      const command =
        client.commands.get(interaction.options.getString("command")) ||
        client.commands.find(
          (cmd) =>
            cmd.aliases &&
            cmd.aliases.includes(interaction.options.getString("command")),
        );

      if (!command) {
        const embed = new EmbedBuilder()
          .setTitle("Commande introuvable")
          .setDescription(
            "La commande spécifiée n'existe pas. Veuillez réessayer.",
          )
          .setColor("#0099FF")
          .setTimestamp();

        return interaction.reply({ embeds: [embed] });
      }

      const embed = new EmbedBuilder()
        .setTitle(command.name)
        .setDescription(
          `> **Description :** ${command.description}\n> **Utilisation :** \`${command.utilisation}\`\n> **Catégorie :** ${command.category}`,
        )
        .setColor("#0099FF")
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    let prefix;
    if (interaction.channel.type === 1) {
      prefix = await getPrefix(interaction.channel.id);
    } else {
      prefix = await getPrefix(interaction.guild.id);
    }

    const categories = new Set();

    client.commands.forEach((command) => {
      if (command.category) {
        categories.add(command.category);
      }
    });
    
    const categoriesArray = Array.from(categories);

    const welcomeEmbed = new EmbedBuilder()
      .setTitle("📚・Accueil")
      .setDescription(
        `Voici le panel d'aide du bot. Pour plus d'informations sur une commande, utilisez \`${prefix}help <commande>\``,
      )
      .setColor("#0099FF")
      .setTimestamp()
      .setFooter({ 
        text: `Page 1/${categories.size + 1} - Demandé par ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    function createEmbedByCategory(client, category) {
      const commands = [];
      client.commands.forEach((command) => {
        if (command.category && command.category === category) {
          commands.push(command);
        }
      });

      const embed = new EmbedBuilder()
        .setTitle(category)
        .setDescription(
          commands
            .map(
              (command) =>
                `> \`${prefix + command.name} ${command.utilisation}\`\n> ┖ ${command.description}`,
            )
            .join("\n\n"),
        )
        .setColor("#0099FF")
        .setTimestamp()
        .setFooter({
          text: `Page ${categoriesArray.indexOf(category) + 2}/${categories.size + 1} - Demandé par ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL(),
        });

      return embed;
    }

    let returnEmbed = [welcomeEmbed];
    categories.forEach((category) => {
      returnEmbed.push(createEmbedByCategory(client, category));
    });
    let page = 1;

    const leftButton = new ButtonBuilder()
      .setCustomId("left")
      .setLabel("◀")
      .setStyle(ButtonStyle.Primary);

    const rightButton = new ButtonBuilder()
      .setCustomId("right")
      .setLabel("▶")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(leftButton, rightButton);

    const sendMessage = await interaction.reply({
      embeds: [returnEmbed[0]],
      components: [row],
    });

    const filter = (i) => i.customId === "left" || i.customId === "right";
    const collector = sendMessage.createMessageComponentCollector({
      filter,
      time: 120000,
    });
    collector.on("collect", async (i) => {
      if (i.user.id !== interaction.user.id)
        return i.reply({
          content: "Vous n'êtes pas l'auteur du message.",
          ephemeral: true,
        });

      if (i.customId === "left") {
        if (page === 1) {
          page = returnEmbed.length;
        } else {
          page--;
        }
      } else if (i.customId === "right") {
        if (page === returnEmbed.length) {
          page = 1;
        } else {
          page++;
        }
      }

      sendMessage.edit({ embeds: [returnEmbed[page - 1]] });
      i.deferUpdate();
    });
  }),
  (this.slashOptions = new SlashCommandBuilder().addStringOption((option) =>
    option
      .setName("command")
      .setDescription(
        "La commande pour laquelle vous voulez plus d'informations.",
      )
      .setRequired(false),
  )),
);

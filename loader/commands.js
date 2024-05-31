const fs = require('fs');
const path = require('path');

module.exports = (client) => {
  client.commands = new Map();

  function loadCommandsFromDirectory(directory) {
    fs.readdir(directory, (err, files) => {
      if (err) {
        console.error('Erreur lors de la lecture du dossier:', err);
        return;
      }

      files.forEach(file => {
        const filePath = path.join(directory, file);

        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error('Erreur lors de la récupération des informations du fichier:', err);
            return;
          }

          if (stats.isDirectory()) {
            loadCommandsFromDirectory(filePath);
          } else if (stats.isFile() && file.endsWith('.js')) {
            try {
              const command = require(filePath);
              let commandName = command.name || file.split('.')[0];
              client.commands.set(commandName, command);
              delete require.cache[require.resolve(filePath)];
            } catch (error) {
              console.error(`Erreur lors du chargement de la commande '${file}':`, error);
            }
          }
        });
      });
    });
  }

  loadCommandsFromDirectory(path.join(__dirname, '..', 'commands'));
};
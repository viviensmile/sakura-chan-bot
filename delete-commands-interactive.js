require('dotenv').config();
const { REST, Routes } = require('discord.js');
const readline = require('readline');

const APPLICATION_ID = process.env.APPLICATION_ID;
const TOKEN = process.env.DISCORD_TOKEN;

const rest = new REST({ version: '10' }).setToken(TOKEN);

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  try {
    // Get all global commands
    const commands = await rest.get(Routes.applicationCommands(APPLICATION_ID));

    if (commands.length === 0) {
      console.log('🌸 No global commands to delete!');
      rl.close();
      return;
    }

    console.log('🌸 Global commands list:');
    commands.forEach((cmd, index) => {
      console.log(`${index + 1}. ${cmd.name} (id: ${cmd.id})`);
    });

    rl.question('Enter the numbers of the commands to delete (comma separated), or type "all" to delete all: ', async (answer) => {
      let toDelete = [];

      if (answer.trim().toLowerCase() === 'all') {
        toDelete = commands;
      } else {
        const indices = answer.split(',')
          .map(num => parseInt(num.trim()) - 1)
          .filter(num => num >= 0 && num < commands.length);
        toDelete = indices.map(i => commands[i]);
      }

      for (const cmd of toDelete) {
        await rest.delete(Routes.applicationCommand(APPLICATION_ID, cmd.id));
        console.log(`🌸 Deleted command: ${cmd.name} (id: ${cmd.id})`);
      }

      console.log('🌸 Deletion complete!');
      rl.close();
    });

  } catch (error) {
    console.error(error);
    rl.close();
  }
})();

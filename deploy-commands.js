require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

// Load information from .env
const APPLICATION_ID = process.env.APPLICATION_ID;
const TOKEN = process.env.DISCORD_TOKEN;

// Define commands
const commands = [
  new SlashCommandBuilder()
    .setName('rolelist')
    .setDescription('List all members of a role')
    .addRoleOption(option =>
      option.setName('role')
            .setDescription('The role to list members of')
            .setRequired(true)
    )
    .toJSON()
];

// Create REST object
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('🌸 Started refreshing global application (slash) commands.');

    await rest.put(
      Routes.applicationCommands(APPLICATION_ID),
      { body: commands },
    );

    console.log('🌸 Successfully reloaded global application (slash) commands.');
  } catch (error) {
    console.error(error);
  }
})();

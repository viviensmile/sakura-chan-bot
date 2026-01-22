require('dotenv').config();
const { REST, Routes } = require('discord.js');

// Read credentials from .env
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.APPLICATION_ID;

// Slash command definitions
const commands = [
  {
    name: 'role-list',
    description: 'List all members of a specific role',
    options: [
      {
        name: 'role',
        description: 'Select a role',
        type: 8, // ROLE
        required: true
      }
    ]
  },
  {
    name: 'bot-version',
    description: 'Show Sakura-chan bot version'
  },
  {
    name: 'clean-role',
    description: 'Administrator only: remove all members from a role',
    options: [
      {
        name: 'role',
        description: 'Select a role to clean',
        type: 8,
        required: true
      }
    ]
  }
];

// Create REST client
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('🌸 Fetching existing global commands...');

    // Get currently registered global commands
    const existingCommands = await rest.get(
      Routes.applicationCommands(clientId)
    );

    // Filter commands that are not yet registered
    const newCommands = commands.filter(cmd =>
      !existingCommands.some(c => c.name === cmd.name)
    );

    if (newCommands.length === 0) {
      console.log('🌸 All commands already registered, nothing to deploy.');
      return;
    }

    console.log(`🌸 Registering ${newCommands.length} new command(s)...`);

    // Merge existing commands with new ones
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: [...existingCommands, ...newCommands] }
    );

    console.log('🌸 Command deployment completed!');
  } catch (error) {
    console.error('❌ Failed to deploy commands:', error);
  }
})();

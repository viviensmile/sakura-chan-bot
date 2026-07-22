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
  },
  {
    name: 'create-raid-thread',
    description: 'Create this week\'s raid expedition thread',
    options: [
      {
        name: 'role-1',
        description: 'First role to mention',
        type: 8,
        required: true
      },
      ...[2, 3, 4, 5].map(number => ({
        name: `role-${number}`,
        description: `Additional role ${number} to mention`,
        type: 8,
        required: false
      }))
    ]
  }
];

// Create REST client
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(`🌸 Deploying ${commands.length} command(s)...`);

    // Replace global commands so changed descriptions and options are updated too
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );

    console.log('🌸 Command deployment completed!');
  } catch (error) {
    console.error('❌ Failed to deploy commands:', error);
  }
})();

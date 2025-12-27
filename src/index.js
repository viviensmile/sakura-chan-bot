require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  PermissionFlagsBits
} = require('discord.js');

const msg = require('./messages');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', () => {
  console.log('🌸 桜ちゃん已上線，今天也請多指教~');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== 'rolelist') return;

  // Permission check
  if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
    return interaction.reply({
      content: msg.noPermission(),
      ephemeral: false
    });
  }

  const role = interaction.options.getRole('role');

  // Fetch members
  const members = await interaction.guild.members.fetch();
  const roleMembers = members.filter(m =>
    m.roles.cache.has(role.id)
  );

  if (roleMembers.size === 0) {
    return interaction.reply({
      content: msg.emptyRole(role.name),
      ephemeral: false
    });
  }

  const listText = roleMembers
    .map(m => `• ${m.user.tag}`)
    .join('\n');

  // Discord length limit
  if (listText.length > 1900) {
    return interaction.reply({
      content: msg.tooManyMembers(),
      ephemeral: false
    });
  }

  await interaction.reply({
    content: `${msg.successHeader(role.name)}\n${listText}`,
    ephemeral: false
  });
});

client.login(process.env.DISCORD_TOKEN);

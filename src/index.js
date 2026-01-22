require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  PermissionFlagsBits
} = require('discord.js');

const msg = require('./messages');

// Create Discord client with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// Helper function: get current time in UTC+8
const getNowTimeUTC8 = () => {
  const now = new Date(Date.now() + 8 * 60 * 60 * 1000);
  return now.toISOString().replace('T', ' ').substring(0, 19);
};

// Fired once when the bot is ready
client.once('ready', () => {
  console.log('🌸 桜ちゃん已上線，今天也請多指教~');
});

// Handle slash command interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const currentTime = getNowTimeUTC8();

  // ======================
  // /role-list
  // ======================
  if (interaction.commandName === 'role-list') {

    // Permission check: Manage Roles required
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({
        content: msg.noPermission(),
        ephemeral: false
      });
    }

    // Get selected role
    const role = interaction.options.getRole('role');

    // Fetch all guild members
    const members = await interaction.guild.members.fetch();

    // Filter members who have the selected role
    const roleMembers = members.filter(m =>
      m.roles.cache.has(role.id)
    );

    // If no members in the role
    if (roleMembers.size === 0) {
      return interaction.reply({
        content: msg.emptyRole(role.name),
        ephemeral: false
      });
    }

    // Build member list text
    const listText = roleMembers
      .map(m => `• ${m.user.tag}`)
      .join('\n');

    // Discord message length limit check
    if (listText.length > 1900) {
      return interaction.reply({
        content: msg.tooManyMembers(),
        ephemeral: false
      });
    }

    // Send result message
    await interaction.reply({
      content: `${msg.successHeader(role.name, currentTime)}\n${listText}`,
      ephemeral: false
    });
  }

  // ======================
  // /bot-version
  // ======================
  if (interaction.commandName === 'bot-version') {
    await interaction.reply({
      content: msg.versionInfo(),
      ephemeral: false
    });
  }
  
  // ======================
  // /clean-role (Administrator only)
  // ======================
  if (interaction.commandName === 'clean-role') {
  
    // Permission check: Administrator required
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: msg.noPermission(),
        ephemeral: true
      });
    }
  
    const role = interaction.options.getRole('role');
  
    // Get current time string in UTC+8
    const now = new Date();
    const currentTime = new Date(now.getTime() + 8 * 60 * 60 * 1000)
      .toISOString()
      .replace('T', ' ')
      .split('.')[0]; // yyyy-MM-dd HH:mm:ss
  
    // Bot permission check: Manage Roles
    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({
        content: '🌸 桜ちゃん沒有權限移除這個身分組的成員唷～',
        ephemeral: true
      });
    }
  
    // Bot role hierarchy check
    const botHighestRole = interaction.guild.members.me.roles.highest;
    if (botHighestRole.position <= role.position) {
      return interaction.reply({
        content: '🌸 桜ちゃん的角色在這個身分組之下，無法移除成員唷～\n請把 Sakura 醬角色拖到目標角色上方再試！',
        ephemeral: true
      });
    }
  
    // Initial confirmation message
    await interaction.reply({
      content: msg.cleanRoleStart(role.name),
      ephemeral: false
    });
  
    // Fetch all members with the target role
    let membersWithRole = [];
    try {
      const allMembers = await interaction.guild.members.fetch({ force: false });
      membersWithRole = allMembers.filter(m => m.roles.cache.has(role.id)).map(m => m);
    } catch (err) {
      console.error('Failed to fetch members:', err);
      return interaction.followUp({
        content: '🌸 桜ちゃん提醒：抓取成員太頻繁，請稍後再試～',
        ephemeral: true
      });
    }
  
    // Show member list BEFORE cleanup
    const memberListBefore = membersWithRole.length
      ? membersWithRole.map(m => `- ${m.user.tag}`).join('\n')
      : msg.emptyRole(role.name);
  
    await interaction.followUp({
      content: `--- 成員清單 (清理前) ---\n${memberListBefore}`
    });
  
    // Notify cleanup process
    await interaction.followUp({
      content: msg.cleaningNotice(currentTime)
    });
  
    // Remove role from members in batches to avoid rate limit
    const BATCH_SIZE = 5; // 5 members at a time
    for (let i = 0; i < membersWithRole.length; i += BATCH_SIZE) {
      const batch = membersWithRole.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(m =>
        m.roles.remove(role).catch(() => null)
      ));
      await new Promise(r => setTimeout(r, 1500)); // 1.5s delay between batches
    }
  
    // Fetch again to see remaining members AFTER cleanup
    let remainingMembers = [];
    try {
      const updatedMembers = await interaction.guild.members.fetch({ force: true });
      remainingMembers = updatedMembers.filter(m => m.roles.cache.has(role.id)).map(m => m);
    } catch {
      remainingMembers = [];
    }
  
    // Show member list AFTER cleanup
    const memberListAfter = remainingMembers.length
      ? remainingMembers.map(m => `- ${m.user.tag}`).join('\n')
      : '✅ 該身分組目前沒有成員了！';
  
    await interaction.followUp({
      content: `--- 成員清單 (清理後) ---\n${memberListAfter}`
    });
  
    // Final result message
    await interaction.followUp({
      content: msg.cleanDone
    });
  }
});

// Login using bot token
client.login(process.env.DISCORD_TOKEN);

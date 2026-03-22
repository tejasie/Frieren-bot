const { 
  Client, 
  GatewayIntentBits, 
  Events 
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// READY EVENT (UPDATED)
client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
});

// COMMAND HANDLER
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  try {
    // ===== BASIC COMMAND =====
    if (interaction.commandName === 'frieren') {
      return interaction.reply('Magic is timeless...');
    }

    // ===== GET USER =====
    const target = interaction.options.getUser('user');
    if (!target) {
      return interaction.reply({ content: 'User not found.', ephemeral: true });
    }

    const member = await interaction.guild.members.fetch(target.id).catch(() => null);

    if (!member) {
      return interaction.reply({ content: 'Member not found in server.', ephemeral: true });
    }

    // ===== KICK =====
    if (interaction.commandName === 'kick') {
      await member.kick();
      return interaction.reply(`Kicked ${target.tag}`);
    }

    // ===== BAN =====
    if (interaction.commandName === 'ban') {
      await member.ban();
      return interaction.reply(`Banned ${target.tag}`);
    }

    // ===== MUTE (TIMEOUT) =====
    if (interaction.commandName === 'mute') {
      await member.timeout(10 * 60 * 1000); // 10 minutes
      return interaction.reply(`Muted ${target.tag} for 10 minutes`);
    }

  } catch (err) {
    console.error(err);
    return interaction.reply({ content: 'Error executing command.', ephemeral: true });
  }
});

// LOGIN
client.login(process.env.TOKEN);

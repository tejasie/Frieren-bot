const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('frieren')
    .setDescription('Replies with Frieren message'),

  new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to kick')
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to ban')
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute a user for 10 minutes')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to mute')
        .setRequired(true)
    ),
].map(cmd => cmd.toJSON());

const CLIENT_ID = '1485208613562875976';
const GUILD_ID = '1483907533465714839';
const rest = new REST({ version: '10' }).setToken('MTQ4NTIwODYxMzU2Mjg3NTk3Ng.GEqxad._wHGQEE6bOyqwcRvERIcN3Z_2XQ2Y3ihQyAnIg');

(async () => {
  try {
    console.log('Deploying commands...');

    await rest.put(
      Routes.applicationGuildCommands('1485208613562875976','1483907533465714839'),
      { body: commands }
    );

    console.log('Commands deployed!');
  } catch (error) {
    console.error(error);
  }
})();
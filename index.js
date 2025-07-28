const { Client, GatewayIntentBits, Events, Partials } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel],
});

const VOICE_NOTIFY_CHANNEL_ID = '1266978402414366774';

client.once(Events.ClientReady, () => {
  console.log(`✅ ログイン成功: ${client.user.tag}`);
});

client.on(Events.VoiceStateUpdate, (oldState, newState) => {
  if (!oldState.channel && newState.channel && !newState.member.user.bot) {
    const notifyChannel = client.channels.cache.get(VOICE_NOTIFY_CHANNEL_ID);
    if (notifyChannel && notifyChannel.isTextBased()) {
      notifyChannel.send('こんばんは!');
    }
  }
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  if (content.includes('イクー') || content.includes('いくー')) {
    message.reply({ content: 'イクー', allowedMentions: { repliedUser: false } });
  }

  if (content.includes('inuzaru') || content.includes('inu') || content.includes('犬')) {
    message.reply({ content: 'なんですか!', allowedMentions: { repliedUser: false } });
  }

  if (content.includes('犯すぞ')) {
    message.reply({ content: 'おわった...', allowedMentions: { repliedUser: false } });
  }

  if (content.includes('いぬざる')) {
    message.reply({ content: 'なんですか!', allowedMentions: { repliedUser: false } });
  }

  if (content.includes('いぬ')) {
    message.reply({ content: 'なんですか!', allowedMentions: { repliedUser: false } });
  }

  if (content.includes('三鷹')) {
    message.reply({ content: '消せ', allowedMentions: { repliedUser: false } });
  }

  if (content.includes('こんにちは')) {
    message.reply({ content: 'こんにちは!', allowedMentions: { repliedUser: false } });
  }

  if (content.includes('おはよう')) {
    message.reply({ content: 'おはようございます!', allowedMentions: { repliedUser: false } });
  }

  if (content.includes('ですか')) {
    message.reply({ content: 'そうですよ!', allowedMentions: { repliedUser: false } });
  }
});

client.login(process.env.TOKEN);

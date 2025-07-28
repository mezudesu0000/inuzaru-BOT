const { Client, GatewayIntentBits, Events, Partials } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Channel],
});

const VOICE_NOTIFY_CHANNEL_ID = '1266978402414366774';

client.once(Events.ClientReady, () => {
    console.log(`✅ ログイン成功: ${client.user.tag}`);
});

// 通話参加検知
client.on(Events.VoiceStateUpdate, (oldState, newState) => {
    // 参加したユーザーが人間 && 前のチャンネルが null（新規参加）
    if (!oldState.channel && newState.channel && !newState.member.user.bot) {
        const notifyChannel = client.channels.cache.get(VOICE_NOTIFY_CHANNEL_ID);
        if (notifyChannel && notifyChannel.isTextBased()) {
            notifyChannel.send('こんばんは!');
        }
    }
});

// メッセージ応答処理
client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    if (content.includes('イクー') || content.includes('いくー')) {
        message.reply({ content: 'イクー', allowedMentions: { repliedUser: true } });
    }

    if (content.includes('inuzaru') || content.includes('inu') || content.includes('犬')) {
        message.reply({ content: 'なんですか!', allowedMentions: { repliedUser: true } });
    }
});

client.login(process.env.TOKEN);

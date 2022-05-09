require('dotenv').config();

const Discord = require('discord.js');
const {Rcon} = require('rcon-client');

const {
	BOT_TOKEN,
	CHANNEL_ID,
	RCON_HOST,
	RCON_PASS,
	RCON_PORT,
} = process.env;

const client = new Discord.Client({
	intents: Object.keys(Discord.Intents.FLAGS),
});

client.on('messageCreate', async message => {
	if (message.channel.id !== CHANNEL_ID || !message.content.startsWith('mc whitelist ')) {
		return;
	}
	const mcUsername = message.content.slice('mc whitelist '.length);

	const rcon = new Rcon({
		host: RCON_HOST,
		port: RCON_PORT,
		password: RCON_PASS,
	});

	let response;
	try {
		await rcon.connect();
		response = await rcon.send(`whitelist add ${mcUsername}`);
	} catch (err) {
		console.error(err);
		await message.channel.send('Cannot connect to Minecraft server. Please try again later.');
	}
	if (!rcon) {
		return;
	}

	rcon.end();

	await message.channel.send(`\`\`\`${response}\`\`\``);
});

client.login(BOT_TOKEN);

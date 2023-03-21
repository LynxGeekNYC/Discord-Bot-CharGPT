const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');

// Authenticate with the OpenAI API
const API_KEY = 'YOUR_OPENAI_API_KEY';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (message.content.startsWith('!chatgpt')) {
    const text = message.content.substring('!chatgpt'.length).trim();

    if (!text) {
      message.channel.send('Please provide some text for ChatGPT to process.');
      return;
    }

    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: text,
        max_tokens: 60,
        n: 1,
        stop: null,
        temperature: 0.5,
      }),
    })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      message.channel.send('An error occurred while processing your request.');
      return;
    });

    message.channel.send(response.choices[0].text);
  }
});

client.login('YOUR_DISCORD_BOT_TOKEN');

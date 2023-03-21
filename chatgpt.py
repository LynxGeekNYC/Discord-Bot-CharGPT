import os
import discord
from discord.ext import commands
import openai
import json

bot = commands.Bot(command_prefix='!')

# Authenticate with the OpenAI API
openai.api_key = "YOUR_OPENAI_API_KEY"

@bot.event
async def on_ready():
    print(f'{bot.user.name} has connected to Discord!')

@bot.command(name='chatgpt')
async def chatgpt(ctx, *args):
    if not args:
        await ctx.send('Please provide some text for ChatGPT to process.')
        return

    # Join the args into a single string
    text = ' '.join(args)

    # Call the OpenAI API to get the response from ChatGPT
    response = openai.Completion.create(
        engine="davinci",
        prompt=text,
        max_tokens=60,
        n=1,
        stop=None,
        temperature=0.5,
    )

    # Send the response back to the Discord server
    await ctx.send(response.choices[0].text)

bot.run('YOUR_DISCORD_BOT_TOKEN')
